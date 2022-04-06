import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './content';
import Test from './pages/test';
import RootPage from './pages/rootPage';
import ProfilePage from './pages/profilepage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    const userInfo = await getTweets({ userName: login.userName });
    if (userInfo !== -1) {
      setTweets(userInfo);
      setDone(true);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootPage login={login} setLogin={setLogin} />}>
          <Route path='/test' element={<Test />} />
          <Route path='/Home' element={<Content userProfile={login} tweets={tweets} done={done} setTweets={setTweets} />} />
          <Route path='/Profile' element={<ProfilePage userProfile={login} tweets={tweets} done={done} setTweets={setTweets} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
