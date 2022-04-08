import React, { useState, useEffect } from 'react';
import './rightBar.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { getUsers, getTweets } from '../services/endPoints';
import { useNavigate } from "react-router-dom";

//https://www.schemecolor.com/twitter-shades.php
//https://www.onlinepalette.com/twitter/

function RightBar({ login }) {

  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [tweetsList, setTweetsList] = useState([]);

  const [userInfoReady, setUserInfoReady] = useState(false);

  useEffect(() => {
    GetInfoOnStartUp();
  }, [login])

  async function GetInfoOnStartUp() {
    const userInfo = await getUsers({ userName: login.userName });
    if (userInfo !== -1) {
      setUsersList(userInfo)
    }
    const userTweets = await getTweets({ userName: '' })
    if (userTweets !== -1) {
      setTweetsList(userTweets.slice(0, 4))
      setUserInfoReady(true);
    }
  }

  const Search = () => {
    return (
      <TextField id="standard-basic" label="Standard" variant="standard" />
    )
  }

  const containerStyle = {
    width: '100%',
    height: '58px',
    bottom: '0px',
    justifyContent: 'flex-start',
    margin: '0px',
    padding: '0px',
    paddingLeft: '20px',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px'
  }

  const SubContainer = ({ tittle, children, path }) => {

    return userInfoReady ? (
      <div className='rightBar-subContainers' >
        <p>{tittle}</p>

        <div className='rightBar-content'>
          {children}
        </div>

        <Button variant="text" sx={containerStyle} onClick={() => { navigate(path) }}> ShowMore</Button>
      </div>
    ) : null;
  }

  const Links = () => {
    return (
      <>
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 13, width: '350px', marginTop: '20px' }}>
          <Link underline="hover" color="inherit" target="_blank" rel="noopener noreferrer" href="https://twitter.com/es/tos">
            Terms of Service
          </Link>
          <Link underline="hover" target="_blank" rel="noopener noreferrer" color="inherit" href="https://twitter.com/es/privacy">
            Privacy Policy
          </Link>
          <Link underline="hover" target="_blank" rel="noopener noreferrer" color="inherit" href="https://help.twitter.com/es/rules-and-policies/twitter-cookies">
            Cookie Policy
          </Link>
          <Link underline="hover" target="_blank" rel="noopener noreferrer" color="inherit" href="https://help.twitter.com/es/resources/accessibility">
            Accessibility
          </Link>
          <Link underline="hover" target="_blank" rel="noopener noreferrer" color="inherit" href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo">
            Ads info
          </Link>
        </Breadcrumbs>
        <Link underline="none" color="inherit">
          © 2022 Twitter Clone, Inc.
        </Link>
      </>
    );
  }

  return (
    <div className='rightBar-container'>

      <Search />

      <SubContainer tittle={`What's happening`} path={'/home'} >
        {tweetsList.map((tweet, i) => (
          <button key={"tweet " + i} className='rightBar-content-button'>
            <p>{tweet.user_name}</p>
            <p>{tweet.content}</p>
            <p>{tweet.info.comment_count + " coments"}</p>
          </button>
        ))}
      </SubContainer>

      <SubContainer tittle={`Who to follow`} path={'/home'} >
        {usersList.map((user, i) => (
          <button
            key={"user " + i}
            className='rightBar-content-button'
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onClick={() => { navigate('/Profile/' + user.user_name) }}
          >
            <img
              src={require('../images/default_profile_400x400.png')}
            />
            <div>
              <p>{user.first_name}</p>
              <p>{"@" + user.user_name}</p>
            </div>
          </button>
        ))}
      </SubContainer>

      <Links />

    </div>
  );
}

export default RightBar;