import React from 'react';
import './App.css';
import Content from './content';
import LeftBar from './leftBar';
import RightBar from './rightBar';
import Register_Login from './register_Login';

function App() {

  const [login, setLogin] = React.useState({
    logedIn: false,
    token: '',
    firstName: '',
    userName: '',
    password: ''
  });

  return (
    <div className='container'>
      <LeftBar login={login.logedIn} userProfile={{ userName: login.userName, firstName: login.firstName }} />
      <Content userProfile={login} />
      <RightBar />
      {!login.logedIn && <Register_Login setLogin={setLogin} />}
    </div>
  );
}

export default App;
