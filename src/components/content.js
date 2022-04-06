import React from 'react';
import './content.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { SendTweet } from '../services/endPoints';

import ShowTweets from './showTweets';


function Content({ userProfile, tweets, done, setTweets }) {

  const [tweetContent, setTweetContent] = React.useState('');


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

  return (
    <>
      {TweetSomething}
      {done && <ShowTweets userProfile={userProfile} tweets={tweets} setTweets={setTweets} />}
    </>
  );
}

export default Content;