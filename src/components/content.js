import React from 'react';
import './content.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { styled } from '@mui/material/styles';

import { SendTweet, LikeTweet, DeleteTweet } from '../services/endPoints';

function Content({ userProfile, tweets, done, setTweets }) {

  const [tweetContent, setTweetContent] = React.useState('');

  const FavoriteButton = styled(FavoriteBorderOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'red',
    },
  }));
  const DeletePostIcon = styled(DeleteIcon)(({ theme }) => ({
    '&:hover': {
      color: 'red',
    },
  }));

  const ReplyButton = styled(ChatBubbleOutlineOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'blue',
    },
  }));

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
      return Math.floor(interval) + " minutes.";
    }
    return Math.floor(seconds) + " just now.";
  }

  async function sendATweet() {
    const tweetToSend = {
      reply_to: null,
      user_name: userProfile.userName,
      content: tweetContent
    }
    SendTweet({ token: userProfile.token, tweetInfo: tweetToSend })

  }

  const TweetSomething = (
    <div className='content-tweetSomething'>
      <img
        src={require('../images/default_profile_400x400.png')}
      />
      <div className='content-tweetSomething-post'>
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="What's happening?"
          multiline={true}
          style={{ width: '92%', fontSize: 20 }}
          sx={{ fontSize: 20 }}
          inputProps={{ maxLength: 255, style: { fontSize: 20 } }}
          value={tweetContent}
          onChange={event => setTweetContent(event.target.value)}
        />
        <Button variant="contained"
          sx={{
            borderRadius: 50,
            width: 80,
            marginTop: '20px',
            marginBottom: '10px',
            marginLeft: '77%'
          }}
          onClick={() => sendATweet()}
        >
          <p style={{ margin: 0, padding: 0, textTransform: 'none' }}>Tweet</p>
        </Button>
      </div>
    </div>
  );

  const Tweets = () => {


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
                  <p> {tweet.first_name}</p>
                  <p> {"@" + tweet.user_name}</p>
                  <p>•</p>
                  <p> {TimeSince(tweet.created_at)}</p>
                  {
                    (tweet.user_name === userProfile.userName) &&
                    <DeletePostIcon
                      sx={{ fontSize: '20px', marginLeft: '29%' }}
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
                    <ReplyButton sx={{ fontSize: '20px' }} />
                    <p>{tweet.info.comment_count}</p>
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </>
    );
  }

  return (
    <div className='content-container'>
      {TweetSomething}
      {done && <Tweets />}
    </div>
  );
}

export default Content;