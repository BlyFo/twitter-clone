import React from 'react';
import './register_Login.css'

import TwitterIcon from '@mui/icons-material/Twitter';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { RegisterUser, LoginUser } from '../services/endPoints';


function Register_Login({ setLogin }) {

  const [samePassword, setSamePassword] = React.useState(false);
  const [canRegister, setCanRegister] = React.useState(false);
  const [canLogin, setCanLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [datos, setDatos] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    gender: 'other',
    userName: '',
    password: ''
  })

  const handleClose = () => {
    setDatos({
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      gender: 'other',
      userName: '',
      password: ''
    })
    setOpen(false);
  }

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
    if (datos.userName !== '' && datos.password !== '') {
      setCanLogin(true)
    } else {
      setCanLogin(false)
    }
  }

  const CheckPassword = (event) => {
    let check = datos.password === event.target.value;
    setSamePassword(!check);
    setCanRegister(check);
  }

  async function SendDataRegisterUser() {
    const response = await RegisterUser({ user: datos });
    if (response !== -1) {
      handleClose()
    }
  }
  async function SendDataLoginUser() {
    const response = await LoginUser({ user: datos });
    if (response !== -1) {
      setLogin({
        logedIn: true,
        token: response.token,
        firstName: response.firstName,
        userName: datos.userName,
        password: datos.password
      })

      //handleClose()
    }
  }

  const [loginModal, setLoginModal] = React.useState(false);

  const LoginUserModal = (
    <>
      <div className='register-login-header'>
        <Button variant="text" onClick={handleClose} sx={{ borderRadius: 50, minWidth: '35px', fontSize: 15, color: 'black' }}> X </Button>
        <TwitterIcon fontSize='large' sx={{ color: '#55ACEE', marginLeft: '-40px' }} />
        <div></div>
      </div>
      <h1 > Inicia sesión en Twitter </h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField label="User name" value={datos.userName} variant="outlined" name='userName' onChange={handleInputChange} sx={{ width: '300px' }} />
        <TextField label="Password" variant="outlined" name='password' onChange={handleInputChange} type="password" sx={{ marginTop: '10px', width: '300px' }} />
      </div>
      <Button variant="contained" sx={{ textTransform: 'none', width: '300px' }} onClick={() => SendDataLoginUser()} disabled={!canLogin}> Iniciar sesion </Button>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <p>¿No tienes una cuenta?</p>
        <button className='register-login-register-button' onClick={() => setLoginModal(!loginModal)} > Regístrate </button>
      </div>
    </>
  );

  const RegisterUserModal = (
    <>
      <div key={"esta"} className='register-login-header'>
        <Button variant="text" onClick={handleClose} sx={{ borderRadius: 50, minWidth: '35px', fontSize: 15, color: 'black' }}> X </Button>
        <TwitterIcon fontSize='large' sx={{ color: '#55ACEE', marginLeft: '-40px' }} />
        <div></div>
      </div>
      <h1 > Únete a Twitter hoy mismo </h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField label="First name" value={datos.firstName} variant="outlined" name='firstName' onChange={handleInputChange} sx={{ width: '180px', marginRight: '10px' }} />
          <TextField label="Last name" value={datos.lastName} variant="outlined" name='lastName' onChange={handleInputChange} sx={{ width: '180px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          <TextField label="email" value={datos.email} variant="outlined" name='email' onChange={handleInputChange} sx={{ width: '250px' }} />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={datos.gender}
            label="Gender"
            name='gender'
            onChange={handleInputChange}
            sx={{ width: '120px' }}
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='non binary'>Non binary</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </Select>
        </div>
        <TextField label="Bio" value={datos.bio} multiline rows={4} variant="outlined" inputProps={{ maxLength: 255 }} name='bio' onChange={handleInputChange} sx={{ width: '370px', marginTop: '10px' }} />
        <TextField label="User name" value={datos.userName} variant="outlined" name='userName' onChange={handleInputChange} sx={{ width: '300px', marginTop: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          <TextField label="Password" variant="outlined" name='password' onChange={handleInputChange} type="password" sx={{ width: '180px', marginRight: '10px' }} />
          <TextField label="Confirm Password" error={samePassword} onChange={CheckPassword} variant="outlined" type="password" sx={{ width: '180px' }} />
        </div>
      </div>
      <Button variant="contained" sx={{ textTransform: 'none', width: '300px' }} onClick={() => SendDataRegisterUser()} disabled={!canRegister}> Registrarse </Button>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <p>¿Ya tienes una cuenta?</p>
        <button className='register-login-register-button' onClick={() => setLoginModal(!loginModal)}> Iniciar sesión </button>
      </div>
    </>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='register-login-modal' >
          {loginModal ? LoginUserModal : RegisterUserModal}
        </div>
      </Modal>

      <div className='register-login-footer'>
        <div>
        </div>
        <div className='register-login-baner'>
          <p style={{ fontSize: '23px', fontWeight: 'bold' }}>No te pierdas lo que está pasando</p>
          <p>Los usuarios de Twitter son los primeros en enterarse.</p>
        </div>
        <div>
          <Button variant="outlined"
            onClick={() => { setOpen(true); setLoginModal(true); }}
            sx={{
              borderColor: '#F5F8FA',
              borderRadius: '50px',
              color: '#F5F8FA',
              fontWeight: 'bold',
              textTransform: 'none',
              marginRight: '10px'
            }} >
            Iniciar sesión
          </Button>
          <Button variant="outlined"
            onClick={() => { setOpen(true); setLoginModal(false) }}
            sx={{
              backgroundColor: '#F5F8FA',
              borderRadius: '50px',
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'none'
            }}>
            Regístrate
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register_Login;