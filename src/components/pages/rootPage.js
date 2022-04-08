import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

import LeftBar from '../leftBar';
import RightBar from '../rightBar';
import Register_Login from '../register_Login';

function RootPage({ login, setLogin, updatePage }) {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/Home');
  }, [])

  return (
    <div className='container'>
      <LeftBar login={login.logedIn} userProfile={login} updatePage={updatePage} />

      <div className='content-container'>
        <Outlet />
      </div>

      <RightBar login={login} />
      {!login.logedIn && <Register_Login setLogin={setLogin} />}
    </div>
  );
}

export default RootPage;