import json
from typing import List
from datetime import datetime

from fastapi import APIRouter, status, HTTPException, Depends

from config.db import conn
from models.tweets import tweets
from models.hashtags import hashtags
from schemas.tweets import Tweet, BaseTweet, TweetInfo, FullTweet
from authentication.auth import AuthHandler

tweet_router = APIRouter(
    prefix="/tweets",
    tags=["Tweets"],
)

auth_handler = AuthHandler()


def create_tweet(tweet_result):
    temp_dict = TweetInfo(
        like_count=tweet_result.likes_count,
        liked_by=tweet_result.likes,
        comment_count=tweet_result.comments_count,
        comment_by=tweet_result.comments
    )
    tweet_response = FullTweet(
        tweet_id=tweet_result.tweet_id,
        reply_to=tweet_result.reply_to,
        user_name=tweet_result.user_name,
        content=tweet_result.content,
        created_at=tweet_result.created_at,
        info=temp_dict
    )
    return tweet_response


@tweet_router.get(path="/",
                  response_model=List[FullTweet],
                  status_code=status.HTTP_200_OK,
                  summary="get all tweets"
                  )
def get_tweets():
    table = conn.execute(tweets.select()).fetchall()
    all_tweets = []
    for tweet in table:
        tweet_response = create_tweet(tweet)
        all_tweets.append(tweet_response)
    return all_tweets


@tweet_router.post(path="/create",
                   status_code=status.HTTP_201_CREATED,
                   response_model=FullTweet,
                   summary="create a tweet",
                   )
def create_Tweet(tweet: BaseTweet, token_username=Depends(auth_handler.auth_wrapper)):
    new_tweet = tweet.dict()

    if new_tweet['user_name'] != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )

    new_hashtags = new_tweet['content']
    hashtags_list = {
        new_hashtags.strip("#") for tag in new_hashtags.split() if new_hashtags.startswith("#")
    }

    for item in hashtags_list:
        result = conn.execute(
            hashtags.select()
            .where(hashtags.c.name == item)
        ).first()
        if result == None:
            inserted_result = conn.execute(
                hashtags.insert()
                .values(name=item, count=0)
            )
        else:
            conn.execute(tweets.update().values(
                count=result.count
            ).where(tweets.c.name == item))

    new_tweet['created_at'] = datetime.now()
    new_tweet['likes_count'] = 0
    new_tweet['comments_count'] = 0
    new_tweet['likes'] = []
    new_tweet['comments'] = []

    inserted_result = conn.execute(
        tweets.insert()
        .values(new_tweet)
    )

    result = conn.execute(
        tweets.select()
        .where(tweets.c.tweet_id == inserted_result.inserted_primary_key[0])
    ).first()

    if result == None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Tweet could not be created"
        )

    if new_tweet['reply_to'] != None:

        old_tweet = get_tweet(new_tweet['reply_to'])

        conn.execute(tweets.update().values(
            comments_count=old_tweet.info['comment_count']+1,
            comments=old_tweet.info['comment_by'] + [result.tweet_id]
        ).where(tweets.c.tweet_id == old_tweet.tweet_id))

    temp_dict = TweetInfo(
        like_count=new_tweet['likes_count'],
        liked_by=new_tweet['likes'],
        comment_count=new_tweet['comments_count'],
        comment_by=new_tweet['comments']
    )
    tweet_response = FullTweet(
        tweet_id=result.tweet_id,
        reply_to=new_tweet['reply_to'],
        user_name=new_tweet['user_name'],
        content=new_tweet['content'],
        created_at=new_tweet['created_at'],
        info=temp_dict
    )

    return tweet_response


@tweet_router.get(
    path="/{tweet_id}",
    status_code=status.HTTP_200_OK,
    response_model=FullTweet,
    summary="get a tweet",
)
def get_tweet(tweet_id: str):

    tweet_result = conn.execute(
        tweets.select().where(tweets.c.tweet_id == tweet_id)
    ).first()

    if tweet_result == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tweet not found"
        )

    tweet_response = create_tweet(tweet_result)

    return tweet_response


@tweet_router.delete(
    path="/{tweet_id}",
    status_code=status.HTTP_200_OK,
    response_model=FullTweet,
    summary="delete a tweet",
)
def delete_tweet(tweet_id: int, user_name: str, token_username=Depends(auth_handler.auth_wrapper)):

    if user_name != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )

    deleted_tweet = conn.execute(tweets.select().where(
        tweets.c.tweet_id == tweet_id)
    ).first()

    if deleted_tweet == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="tweet not found"
        )

    conn.execute(tweets.delete().where(tweets.c.tweet_id == tweet_id))

    check_deleted = conn.execute(
        tweets.select().where(tweets.c.tweet_id == tweet_id)
    ).first()
    if check_deleted != None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="tweet could not be deleted"
        )
    result = create_tweet(deleted_tweet)
    return result


@tweet_router.put(
    path="/{tweet_id}",
    status_code=status.HTTP_200_OK,
    response_model=FullTweet,
    summary="update a tweet's content",
)
def update_tweet(tweet_id: int, user_name: str, tweet_content: str, token_username=Depends(auth_handler.auth_wrapper)):

    if user_name != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )

    get_tweet(tweet_id)

    conn.execute(tweets.update().values(
        content=tweet_content
    ).where(tweets.c.tweet_id == tweet_id))

    result = get_tweet(tweet_id)

    return result


@tweet_router.put(
    path="/like/{tweet_id}",
    status_code=status.HTTP_200_OK,
    response_model=FullTweet,
    summary="like a tweet",
)
def like_tweet(tweet_id: int, user_name: str, token_username=Depends(auth_handler.auth_wrapper)):

    if user_name != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )

    old_tweet = get_tweet(tweet_id)

    if user_name in old_tweet.info['liked_by']:
        return old_tweet

    conn.execute(tweets.update().values(
        likes_count=old_tweet.info['like_count']+1,
        likes=old_tweet.info['liked_by'] + [user_name]
    ).where(tweets.c.tweet_id == tweet_id))

    result = get_tweet(tweet_id)

    return result
