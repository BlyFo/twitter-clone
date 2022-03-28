import React from 'react';
import './content.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { styled } from '@mui/material/styles';

function Content(props) {

  const tweets = [
    { 'username': "user_name1", 'name': "name1", "created_at": "now", 'content': "tweeta aaaaaaaa a a a a ", 'likes': 12, 'comments': 1 },
    { 'username': "user_name2", 'name': "name2", "created_at": "now", 'content': "tweet", 'likes': 32, 'comments': 124 },
    { 'username': "user_name3", 'name': "name3", "created_at": "now", 'content': "tweet", 'likes': 82, 'comments': 16 }
  ]

  const FavoriteButton = styled(FavoriteBorderOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'red',
    },
  }));

  const ReplyButton = styled(ChatBubbleOutlineOutlinedIcon)(({ theme }) => ({
    '&:hover': {
      color: 'blue',
    },
  }));

  const TweetSomething = () => {
    return (
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
          />
          <Button variant="contained" sx={{
            borderRadius: 50,
            width: 80,
            marginTop: '20px',
            marginBottom: '10px',
            marginLeft: '77%'
          }}>
            <p style={{ margin: 0, padding: 0, textTransform: 'none' }}>Tweet</p>
          </Button>
        </div>
      </div>
    );
  }

  const Tweets = () => {


    return (
      <>
        {
          tweets.map((tweet, i) => (
            <div key={"posted tweet " + i} className='content-tweet-container'>
              <img
                src={require('../images/default_profile_400x400.png')}
              />
              <div className='content-tweet-content'>
                {/* post tittle */}
                <div className='content-tweet-content-tittle'>
                  <p> {tweet.name}</p>
                  <p> {"@" + tweet.username}</p>
                  <p>•</p>
                  <p> {tweet.created_at}</p>
                </div>
                {/* post content */}
                <p>{tweet.content}</p>
                {/* post likes and coments */}
                <div className='content-tweet-content-buttons'>
                  <button className='button-like'>
                    <FavoriteButton sx={{ fontSize: '20px' }} />
                    <p>{tweet.likes}</p>
                  </button>
                  <button className='button-reply'>
                    <ReplyButton sx={{ fontSize: '20px' }} />
                    <p>{tweet.comments}</p>
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
      <TweetSomething />
      <Tweets />
    </div>
  );
}

export default Content;