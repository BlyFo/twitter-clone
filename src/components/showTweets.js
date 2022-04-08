import React from 'react';
import './showTweets.css'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Modal } from '@mui/material';

import { styled } from '@mui/material/styles';
import { LikeTweet, DeleteTweet } from '../services/endPoints';
import { useNavigate } from "react-router-dom";
import MakeComment from './makeComment';

function ShowTweets({ userProfile, tweets, setTweets }) {

  const FavoriteButton = styled(FavoriteBorderOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'red',
      cursor: 'pointer'
    },
  }));
  const DeletePostIcon = styled(DeleteIcon)(({ theme }) => ({
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
  const [tweetID, setTweetID] = React.useState()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  }

  async function LikeTweetContent(tweetId) {
    const response = await LikeTweet({
      token: userProfile.token,
      tweetId: tweetId,
      userName: userProfile.userName
    })
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
  async function DeleteTweetContent(tweetId) {
    const response = await DeleteTweet({
      token: userProfile.token,
      tweetId: tweetId,
      userName: userProfile.userName
    })
    if (response !== -1) {
      setTweets(
        tweets.filter(item =>
          item.tweet_id !== tweetId
        )
      )
    }
  }

  function TimeSince(date) {

    let newDate = new Date(date)

    var seconds = Math.floor((new Date() - newDate) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years.";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months.";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days.";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " h.";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " m.";
    }
    return " just now.";
  }

  return (
    <>
      {
        tweets.map((tweet) => (
          <div key={"posted tweet " + tweet.tweet_id} className='content-tweet-container'>
            <img
              src={require('../images/default_profile_400x400.png')}
            />
            <div className='content-tweet-content'>
              {/* post tittle */}
              <div className='content-tweet-content-tittle'>
                <button
                  className='content-tweet-content-userName'
                  onClick={() => { navigate('/Profile/' + tweet.user_name) }}
                >
                  {tweet.first_name}
                </button>
                <p> {"@" + tweet.user_name}</p>
                <p>•</p>
                <p> {TimeSince(tweet.created_at)}</p>
                {
                  (tweet.user_name === userProfile.userName) &&
                  <DeletePostIcon
                    sx={{ fontSize: '20px', position: 'absolute', right: 15 }}
                    onClick={() => DeleteTweetContent(tweet.tweet_id)}
                  />
                }
              </div>
              {/* post's content */}
              <p>{tweet.content}</p>
              {/* post's likes and coments */}
              <div className='content-tweet-content-buttons'>
                <button className={tweet.info.liked ? 'button-like-activate' : 'button-like'}
                  onClick={() => LikeTweetContent(tweet.tweet_id)}
                >
                  <FavoriteButton sx={{ fontSize: '20px', color: tweet.info.liked ? 'red' : 'black' }} />
                  <p>{tweet.info.like_count}</p>
                </button>
                <button className='button-reply'>
                  <ReplyButton sx={{ fontSize: '20px' }} onClick={() => { setOpen(true); setTweetID(tweet.tweet_id); }} />
                  <p>{tweet.info.comment_count}</p>
                </button>
              </div>
            </div>
          </div>
        ))
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='leftBar-tweet-modal' >
          <MakeComment userProfile={userProfile} tweet_id={tweetID} />
        </div>
      </Modal>
    </>
  );
}

export default ShowTweets;