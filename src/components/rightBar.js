import React from 'react';
import './rightBar.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

//https://www.schemecolor.com/twitter-shades.php

function RightBar(props) {

  const containerStyle = {
    width: '100%',
    height: '58px',
    bottom: '0px',
    justifyContent: 'flex-start',
    margin: '0px',
    padding: '0px',
    paddingLeft: '20px',
  }

  const Search = () => {
    return (
      <TextField id="standard-basic" label="Standard" variant="standard" />
    )
  }

  const SubContainer = ({ width, height, text, children }) => {

    return (
      <div className='rightBar-subContainers' style={{ minWidth: `${width}px`, minHeight: `${height}px` }}>
        <p>{text}</p>
        <div className='rightBar-content'>
          {children}
        </div>
        <Button variant="text" sx={containerStyle}> ShowMore</Button>
      </div>
    )
  }

  return (
    <div className='rightBar-container'>
      <Search />
      <SubContainer width={350} height={480} text={`What's happening`} >
        <p>content</p>
      </SubContainer>
      <SubContainer width={350} height={240} text={`Who to follow`} >
        <p>content</p>
      </SubContainer>
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
      <Link underline="never" color="inherit">
        © 2022 Twitter Clone, Inc.
      </Link>
    </div>
  );
}

export default RightBar;