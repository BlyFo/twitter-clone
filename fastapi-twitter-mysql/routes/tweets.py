import json

from traceback import print_tb
from typing import List, Optional
from datetime import datetime
from pydantic import Field

from fastapi import APIRouter, status, HTTPException, Depends, Header

from config.db import conn
from models.tweets import tweets
from models.hashtags import hashtags
from models.commented_by import commented_by
from models.liked_by import liked_by
from models.users import users
from schemas.tweets import BaseTweet, TweetInfo, FullTweet, SimpleTweet, FullTweetInfo, UserNameTweet
from authentication.auth import AuthHandler

from sqlalchemy import desc, join
from sqlalchemy.sql import select

tweet_router = APIRouter(
    prefix="/tweets",
    tags=["Tweets"],
)

auth_handler = AuthHandler()


def create_tweet(tweet_result, user_name):

    liked_result = conn.execute(liked_by.select().where(
        liked_by.c.tweet_id == tweet_result.tweet_id and liked_by.c.user_name == user_name)
    ).first()
    liked_by_user = False
    if liked_result != None:
        liked_by_user = True

    comment_result = conn.execute(commented_by.select().where(
        commented_by.c.tweet_id == tweet_result.tweet_id and commented_by.c.user_name == user_name)
    ).first()
    commented_by_user = False
    if comment_result != None:
        commented_by_user = True

    temp_dict = TweetInfo(
        like_count=tweet_result.likes_count,
        liked=liked_by_user,
        comment_count=tweet_result.comments_count,
        commented=commented_by_user
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


def create_fullTweet(tweet_result, user_name):

    like_result = conn.execute(liked_by.select().where(
        liked_by.c.tweet_id == tweet_result.tweet_id, liked_by.c.user_name == user_name)
    ).first()

    liked_by_user = False
    if like_result != None:
        liked_by_user = True

    comment_result = conn.execute(commented_by.select().where(
        commented_by.c.tweet_id == tweet_result.tweet_id, commented_by.c.user_name == user_name)
    ).first()
    commented_by_user = False
    if comment_result != None:
        commented_by_user = True

    liked_result = conn.execute(liked_by.select().where(
        liked_by.c.tweet_id == tweet_result.tweet_id)
    ).fetchall()
    liked_result_list = map(lambda x: x['user_name'], liked_result)

    commented_result = conn.execute(commented_by.select().where(
        commented_by.c.tweet_id == tweet_result.tweet_id)
    ).fetchall()
    commented_result_list = map(lambda x: x['user_name'], commented_result)

    user_first_name = conn.execute(users.select().where(
        users.c.user_name == tweet_result.user_name
    )).first()

    temp_dict = FullTweetInfo(
        like_count=tweet_result.likes_count,
        liked=liked_by_user,
        liked_by=list(liked_result_list),
        comment_count=tweet_result.comments_count,
        commented=commented_by_user,
        comment_by=list(commented_result_list),
    )
    tweet_response = FullTweet(
        tweet_id=tweet_result.tweet_id,
        reply_to=tweet_result.reply_to,
        user_name=tweet_result.user_name,
        first_name=user_first_name.first_name,
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
def get_tweets(user_name: Optional[str] = Header(None)):

    table = conn.execute(
        tweets.select().order_by(desc(tweets.c.created_at))
    ).fetchall()

    all_tweets = []
    for tweet in table:
        tweet_response = create_fullTweet(tweet, user_name)
        all_tweets.append(tweet_response)
    return all_tweets


@tweet_router.post(path="/create",
                   status_code=status.HTTP_201_CREATED,
                   response_model=SimpleTweet,
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
        tag.strip("#") for tag in new_hashtags.split() if tag.startswith("#")
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
            conn.execute(hashtags.update().values(
                count=result.count+1
            ).where(hashtags.c.name == item))

    new_tweet['created_at'] = datetime.now()
    new_tweet['likes_count'] = 0
    new_tweet['comments_count'] = 0
    new_tweet['hashtags'] = list(hashtags_list)

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

        print(new_tweet['reply_to'])

        old_tweet = get_tweet(new_tweet['reply_to'], new_tweet['user_name'])

        conn.execute(tweets.update().values(
            comments_count=old_tweet[0].info['comment_count']+1,
        ).where(tweets.c.tweet_id == old_tweet[0].tweet_id))

        conn.execute(
            commented_by.insert().values(
                tweet_id=new_tweet['reply_to'],
                user_name=new_tweet['user_name'],
                tweet_comment_id=result['tweet_id']
            )
        )

    temp_dict = TweetInfo(
        like_count=new_tweet['likes_count'],
        liked=False,
        comment_count=new_tweet['comments_count'],
        commented=False
    )
    tweet_response = SimpleTweet(
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
    # response_model=FullTweet,
    summary="get a tweet",
)
def get_tweet(tweet_id: str, user_name: str):

    tweets_list = []
    tweet_result = conn.execute(
        tweets.select().where(tweets.c.tweet_id == tweet_id)
    ).first()

    if tweet_result == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tweet not found"
        )

    tweet_response = create_fullTweet(tweet_result, user_name)
    tweets_list.append(tweet_response)

    tweet_comment = conn.execute(
        tweets.select().where(
            commented_by.c.tweet_id == tweet_id,
            commented_by.c.tweet_comment_id == tweets.c.tweet_id
        )
    ).fetchall()

    for tweet in tweet_comment:
        tweet_response = create_fullTweet(tweet, user_name)
        tweets_list.append(tweet_response)

    return tweets_list


@tweet_router.put(
    path="/delete/{tweet_id}",
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

    conn.execute(liked_by.delete().where(liked_by.c.tweet_id == tweet_id))

    conn.execute(tweets.delete().where(tweets.c.tweet_id == tweet_id))

    check_deleted = conn.execute(
        tweets.select().where(tweets.c.tweet_id == tweet_id)
    ).first()
    if check_deleted != None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="tweet could not be deleted"
        )
    result = create_fullTweet(deleted_tweet, user_name)
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
    # response_model=FullTweet,
    summary="like a tweet",
)
def like_tweet(tweet_id: int, user_name: str, token_username=Depends(auth_handler.auth_wrapper)):

    if user_name != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )
    old_tweet = get_tweet(tweet_id, user_name)

    like_result = conn.execute(
        liked_by.select().where(liked_by.c.tweet_id ==
                                tweet_id and liked_by.c.user_name == user_name)
    ).first()

    if like_result == None:
        # the user never liked the tweet
        conn.execute(tweets.update().values(
            likes_count=old_tweet[0].info['like_count']+1,
        ).where(tweets.c.tweet_id == tweet_id))

        conn.execute(
            liked_by.insert()
            .values(tweet_id=tweet_id, user_name=user_name)
        )
    else:
        conn.execute(tweets.update().values(
            likes_count=old_tweet[0].info['like_count']-1,
        ).where(tweets.c.tweet_id == tweet_id))

        conn.execute(
            liked_by.delete()
            .where(liked_by.c.tweet_id == tweet_id and liked_by.c.user_name == user_name)
        )
    print('a')
    result = get_tweet(tweet_id, user_name)
    print('b')
    return result


@tweet_router.get(
    path="/user/{user_name}",
    status_code=status.HTTP_200_OK,
    response_model=List[FullTweet],
    summary="get a user's tweets",
)
def get_users_tweets(user_name: str):

    table = conn.execute(
        tweets.select().where(tweets.c.user_name == user_name).order_by(
            desc(tweets.c.created_at))
    ).fetchall()

    all_tweets = []
    for tweet in table:
        tweet_response = create_fullTweet(tweet, user_name)
        all_tweets.append(tweet_response)
    return all_tweets
