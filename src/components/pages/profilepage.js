import React, { useEffect, useState } from 'react';
import './profilePage.css'
import ShowTweets from '../showTweets';

import { getUser } from '../../services/endPoints';

function ProfilePage({ userProfile, tweets, done, setTweets }) {

  const [userInfo, setUserInfo] = useState('');

  const [userInfoReady, setUserInfoReady] = useState(false);

  useEffect(() => {
    GetInfoOnStartUp();
  }, [])

  async function GetInfoOnStartUp() {
    const userInfo = await getUser({ userName: userProfile.userName });
    if (userInfo !== -1) {
      setUserInfo(userInfo);
      setUserInfoReady(true);
    }
  }

  return (
    <>
      <div className='profile-banner'>
        <div className='profile-banner-image'></div>
        <img className='profile-banner-avatar'
          src={require('../../images/default_profile_400x400.png')}
        />
        {userInfoReady &&
          <div className='profile-banner-userInfo'>
            <p style={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'capitalize' }}>{userInfo.first_name}</p>
            <p style={{ fontSize: '15px' }}>{"@" + userInfo.user_name}</p>
            <p style={{ marginTop: '20px' }}>{userInfo.bio}</p>
          </div>
        }
        <p>Tweets</p>
      </div>
      {done && <ShowTweets userProfile={userProfile} tweets={tweets} setTweets={setTweets} />}
    </>
  );
}

export default ProfilePage;
//{done && <ShowTweets userProfile={userProfile} tweets={tweets} setTweets={setTweets} />}