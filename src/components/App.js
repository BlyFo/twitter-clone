import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './content';
import LeftBar from './leftBar';
import RightBar from './rightBar';
import Register_Login from './register_Login';

import { getTweets } from '../services/endPoints';

function App() {

  const [done, setDone] = useState(false);
  const [tweets, setTweets] = useState('');
  const [login, setLogin] = useState({
    logedIn: false,
    token: '',
    firstName: '',
    userName: '',
    password: ''
  });

  useEffect(() => {
    GetInfoOnStartUp();
  }, [login])

  async function GetInfoOnStartUp() {
    if (!done) {
      const userInfo = await getTweets({ userName: login.userName });
      if (userInfo !== -1) {
        setTweets(userInfo);
      }
      setDone(true);
    }
  }

  return (
    <div className='container'>
      <LeftBar login={login.logedIn} userProfile={{ userName: login.userName, firstName: login.firstName }} />
      <Content userProfile={login} tweets={tweets} done={done} />
      <RightBar />
      {!login.logedIn && <Register_Login setLogin={setLogin} />}
    </div>
  );
}

export default App;
