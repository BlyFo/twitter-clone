import React, { useEffect, useState } from 'react';
import './profilePage.css'
import ShowTweets from '../showTweets';

import { getUser, getUserTweets } from '../../services/endPoints';
import { useParams } from 'react-router-dom';

function ProfilePage({ userProfile }) {

  const [userInfo, setUserInfo] = useState('');

  const [userInfoReady, setUserInfoReady] = useState(false);

  const [profileTweets, setProfileTweets] = useState('');

  const { postSlug } = useParams();


  useEffect(() => {
    GetInfoOnStartUp();
  }, [postSlug])

  async function GetInfoOnStartUp() {
    const userInfo = await getUser({ userName: postSlug });
    if (userInfo !== -1) {
      setUserInfo(userInfo);
    }
    const userTweets = await getUserTweets({ userName: postSlug })
    if (userTweets !== -1) {
      setProfileTweets(userTweets)
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
      {userInfoReady && <ShowTweets userProfile={userProfile} tweets={profileTweets} setTweets={setProfileTweets} />}
    </>
  );
}

export default ProfilePage;