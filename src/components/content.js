import React from 'react';
import './content.css'


function Content(props) {

  const TweetSomething = () => {
    return (
      <div></div>
    );
  }

  const Tweets = () => {
    return (
      <div></div>
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