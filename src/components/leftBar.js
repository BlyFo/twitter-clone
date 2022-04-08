import React from 'react';
import './leftBar.css'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import MakeTweet from './makeTweet';

import { useNavigate } from "react-router-dom";

function LeftBar({ login, userProfile, updatePage }) {

  const profile = {
    marginBottom: '10px',
    marginTop: '20px',
    marginRight: '0px',
    borderRadius: '50px',
    color: 'black',
  }

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  }

  const Buttons = () => {

    const buttonsStyle = {
      color: 'black',
      borderRadius: '50px',
      justifyContent: 'flex-start',
      fontSize: '16px',
      minWidth: '10px',
    }

    return (
      <div className='buttons-container'>
        <Button variant="text" className='leftBar-button' sx={buttonsStyle}>
          <TwitterIcon fontSize='large' sx={{ color: '#55ACEE' }} />
        </Button>
        {login &&
          <Button variant="text" className='leftBar-button' sx={buttonsStyle} onClick={() => { navigate('/Home') }}>
            <HomeOutlinedIcon sx={{ fontSize: '30px' }} />
            <p>Home</p>
          </Button>
        }
        <Button variant="text" className='leftBar-button' sx={buttonsStyle} onClick={() => { navigate('/Home') }}>
          <TagOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
          <p >Explore</p>
        </Button>
        {login &&
          <>
            <Button variant="text" className='leftBar-button' sx={buttonsStyle}>
              <NotificationsNoneOutlinedIcon sx={{ fontSize: '30px' }} />
              <p>Notification</p>
            </Button>
            <Button variant="text" className='leftBar-button' sx={buttonsStyle}>
              <EmailOutlinedIcon sx={{ fontSize: '30px' }} />
              <p>Message</p>
            </Button>
            <Button variant="text" className='leftBar-button' sx={buttonsStyle}>
              <BookmarkBorderOutlinedIcon sx={{ fontSize: '30px' }} />
              <p>Bookmarks</p>
            </Button>
            <Button variant="text" className='leftBar-button' sx={buttonsStyle}>
              <ArticleOutlinedIcon sx={{ fontSize: '30px' }} />
              <p>List</p>
            </Button>
            <Button variant="text" className='leftBar-button' sx={buttonsStyle} onClick={() => { navigate('/Profile/' + userProfile.userName) }}>
              <PermIdentityIcon sx={{ fontSize: '30px' }} />
              <p>Profile</p>
            </Button>
            <Button variant="text" className='leftBar-button' sx={buttonsStyle}>
              <MoreHorizOutlinedIcon sx={{ fontSize: '30px' }} />
              <p>More</p>
            </Button>
            <Button variant="contained" className='leftBar-button' sx={buttonsStyle} onClick={() => setOpen(true)}>
              <p style={{ marginLeft: '0px', fontWeight: 'bold', color: 'white' }}>Tweet</p>
            </Button >
          </>
        }
      </div >
    )
  }
  return (
    <>
      <div className='leftBar-container'>
        <Buttons />
        {login &&
          <Button className='leftBar-profile' sx={profile}>
            <img
              src={require('../images/default_profile_400x400.png')}
            />
            <div className='leftBar-username'>
              <p>{userProfile.firstName}</p>
              <p>{"@" + userProfile.userName}</p>
            </div>
            <div>
              <MoreHorizOutlinedIcon sx={{ marginLeft: '0px' }} />
            </div>
          </Button>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='leftBar-tweet-modal' >
          <MakeTweet userProfile={userProfile} updatePage={updatePage} />
        </div>
      </Modal>
    </>
  );
}

export default LeftBar;