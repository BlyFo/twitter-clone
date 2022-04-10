import React, { useEffect, useState } from 'react';
import './comentsPage.css'

import ShowTweets from '../showTweets';
import MakeComment from '../makeComment';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { useParams } from 'react-router-dom';
import { getTweet, LikeTweet } from '../../services/endPoints';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

function CommentsPage({ userProfile }) {

  const { postSlug } = useParams();
  const [userInfoReady, setUserInfoReady] = useState(false);
  const [tweets, setTweets] = useState([]);

  const FavoriteButton = styled(FavoriteBorderOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'red',
      cursor: 'pointer'
    },
  }));

  const ReplyButton = styled(ChatBubbleOutlineOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'blue',
      cursor: 'pointer'
    },
  }));

  const navigate = useNavigate();

  async function LikeTweetContent(tweetId) {
    const response = await LikeTweet({
      token: userProfile.token,
      tweetId: tweetId,
      userName: userProfile.userName
    })
    if (response !== -1) {
      setTweets(
        tweets.map(item =>
          item.tweet_id === tweetId
            ? {
              ...response
            }
            : item
        )
      )
    }
  }

  useEffect(() => {
    GetInfoOnStartUp();
  }, [postSlug])

  async function GetInfoOnStartUp() {
    const userTweets = await getTweet({ userName: userProfile.userName, tweetId: postSlug })
    if (userTweets !== -1) {
      setTweets(userTweets)
      setUserInfoReady(true);
    }
  }

  const firstTweet = userInfoReady ? (
    <div className='comment-firstTweet'>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img style={{ height: '50px', width: '50px', borderRadius: '50px', marginRight: '10px' }}
          src={require('../../images/default_profile_400x400.png')}
        />
        <div className='comment-firstTweet-content'>

          {/* post tittle */}
          <div className='comment-firstTweet-tittle'>
            <button
              className='comment-firstTweet-userName'
              onClick={() => { navigate('/Profile/' + tweets[0].user_name) }}
            >
              {tweets[0].first_name}
            </button>
            <p> {"@" + tweets[0].user_name}</p>
          </div>
        </div>
      </div>
      <div>
        {/* post's content */}
        <p className='comment-firstTweet-content'>{tweets[0].content}</p>

        <p style={{ fontSize: '14px' }}>{tweets[0].created_at + " • Twitter Web App"}</p>

        {/* post's likes and coments */}
        <div className='comment-firstTweet-likes'>
          <p>{tweets[0].info.like_count + " Likes."}</p>
          <p>{tweets[0].info.comment_count + " Coments."}</p>
        </div>
        <div className='comment-firstTweet-buttons'>
          <button className={tweets[0].info.liked ? 'button-like-activate' : 'button-like'}
            onClick={() => LikeTweetContent(tweets[0].tweet_id)}
          >
            <FavoriteButton sx={{ fontSize: '30px', color: tweets[0].info.liked ? 'red' : 'gray' }} />
          </button>
          <button className={tweets[0].info.liked ? 'button-reply-activate' : 'button-reply'}>
            <ReplyButton sx={{ fontSize: '20px', color: tweets[0].info.commented ? 'blue' : 'black' }} onClick={() => { navigate('/Tweet/' + tweets[0].tweet_id) }} />
          </button>
        </div>

      </div>
    </div>
  ) : null;

  return (
    <>
      {userInfoReady && firstTweet}
      {userInfoReady && userProfile.userName !== '' && <MakeComment userProfile={userProfile} tweet_id={postSlug} />}
      {userInfoReady && <ShowTweets userProfile={userProfile} tweets={tweets.slice(1, tweets.length)} setTweets={setTweets} />}
    </>
  );
}

export default CommentsPage;