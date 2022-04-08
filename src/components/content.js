import React from 'react';

import ShowTweets from './showTweets';
import MakeTweet from './makeTweet';


function Content({ userProfile, tweets, done, setTweets, updatePage }) {

  return (
    <>
      <MakeTweet userProfile={userProfile} updatePage={updatePage} />
      {done && <ShowTweets userProfile={userProfile} tweets={tweets} setTweets={setTweets} />}
    </>
  );
}

export default Content;