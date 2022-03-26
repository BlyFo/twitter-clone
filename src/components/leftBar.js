import React from 'react';
import './leftBar.css'

import Button from '@mui/material/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function LeftBar(props) {

  const Buttons = () => {

    return (
      <div className='buttons-container'>
        <Button variant="text" className='leftBar-button'>
          <TwitterIcon fontSize='large' sx={{ color: '#55ACEE' }} />
        </Button>
        <Button variant="text" className='leftBar-button'>
          <HomeOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>Home</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <TagOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>Explore</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <NotificationsNoneOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>Notification</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <EmailOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>Message</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <BookmarkBorderOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>Bookmarks</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <ArticleOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>List</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <PermIdentityIcon sx={{ fontSize: '30px' }} />
          <p>Profile</p>
        </Button>
        <Button variant="text" className='leftBar-button'>
          <MoreHorizOutlinedIcon sx={{ fontSize: '30px' }} />
          <p>More</p>
        </Button>
        <Button variant="contained" className='leftBar-button'>
          Tweet
        </Button >
      </div >
    )
  }
  return (
    <div className='leftBar-container'>
      <Buttons />
      <Button className='leftBar-profile'>
        <img
          src={require('../images/default_profile_400x400.png')}
          alt="profile Picture"
        />
        <div className='leftBar-username'>
          <p>Name</p>
          <p>@userName</p>
        </div>
        <MoreHorizOutlinedIcon sx={{ marginLeft: '0px' }} />
      </Button>
    </div>
  );
}

export default LeftBar;