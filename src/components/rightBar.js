import React from 'react';
import './rightBar.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

//https://www.schemecolor.com/twitter-shades.php
//https://www.onlinepalette.com/twitter/

function RightBar(props) {

  const happening_list = [
    { 'username': "holas", 'content': 'super cosa increible fuer ade este mundo mundial no lo vas a creeer nsfw', 'comments': 12 },
    { 'username': "holas", 'content': 'super cosa increible fuer ade este mundo mundial no lo vas a creeer nsfw', 'comments': 12 },
    { 'username': "holas", 'content': 'super cosa increible fuer ade este mundo mundial no lo vas a creeer nsfw', 'comments': 12 },
    { 'username': "holas", 'content': 'super cosa increible fuer ade este mundo mundial no lo vas a creeer nsfw', 'comments': 12 }
  ]

  const users_list = [
    { 'username': "holas", 'name': 'nsfw' },
    { 'username': "holas", 'name': 'nsfw' },
    { 'username': "holas", 'name': 'nsfw' }
  ]

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

  const Search = () => {
    return (
      <TextField id="standard-basic" label="Standard" variant="standard" />
    )
  }

  const SubContainer = ({ tittle, children }) => {

    return (
      <div className='rightBar-subContainers' >
        <p>{tittle}</p>
        <div className='rightBar-content'>
          {children}
        </div>
        <Button variant="text" sx={containerStyle}> ShowMore</Button>
      </div>
    )
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
      <SubContainer tittle={`What's happening`} >
        {happening_list.map((tweet, i) => (
          <button key={"tweet " + i} className='rightBar-content-button'>
            <p>{tweet.username}</p>
            <p>{tweet.content}</p>
            <p>{tweet.comments + " coments"}</p>
          </button>
        ))}
      </SubContainer>
      <SubContainer tittle={`Who to follow`} >
        {users_list.map((user, i) => (
          <button key={"user " + i} className='rightBar-content-button' style={{ flexDirection: 'row', alignItems: 'center' }}>
            <img
              src={require('../images/default_profile_400x400.png')}
            />
            <div>
              <p>{user.name}</p>
              <p>{"@" + user.username}</p>
            </div>
          </button>
        ))}
      </SubContainer>
      <Links />
    </div>
  );
}

export default RightBar;