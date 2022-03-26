import React from 'react';
import './rightBar.css'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//https://www.schemecolor.com/twitter-shades.php

function RightBar(props) {

  const Search = () => {
    return (
      <TextField id="standard-basic" label="Standard" variant="standard" />
    )
  }

  const WhatsHappening = () => {
    return (
      <Box
        sx={{
          width: 350,
          height: 480,
          marginTop: '10px',
          backgroundColor: '#E1E8ED',
          borderRadius: '20px',
        }}
      />
    )
  }

  const WhoToFollow = () => {
    return (
      <Box
        sx={{
          width: 350,
          height: 350,
          marginTop: '20px',
          backgroundColor: '#E1E8ED',
          borderRadius: '20px',
        }}
      />
    )
  }

  return (
    <div className='rightBar-container'>
      <Search />
      <WhatsHappening />
      <WhoToFollow />
    </div>
  );
}

export default RightBar;