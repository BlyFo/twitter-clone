import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './content';
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
        <Route path='/' element={<RootPage login={login} setLogin={setLogin} updatePage={GetInfoOnStartUp} />}>
          <Route path='/Home' element={<Content userProfile={login} tweets={tweets} done={done} setTweets={setTweets} updatePage={GetInfoOnStartUp} />} />
          <Route path='/Profile/:postSlug' element={<ProfilePage userProfile={login} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
