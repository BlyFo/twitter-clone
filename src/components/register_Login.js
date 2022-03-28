import React from 'react';
import './register_Login.css'

import TwitterIcon from '@mui/icons-material/Twitter';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Register_Login(props) {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState('other');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [login, setLogin] = React.useState(false);

  const LoginUser = () => {
    return (
      <>
        <div className='register-login-header'>
          <Button variant="text" onClick={handleClose} sx={{ borderRadius: 50, minWidth: '35px', fontSize: 15, color: 'black' }}> X </Button>
          <TwitterIcon fontSize='large' sx={{ color: '#55ACEE', marginLeft: '-40px' }} />
          <div></div>
        </div>
        <h1 > Inicia sesión en Twitter </h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField label="User name" variant="outlined" sx={{ width: '300px' }} />
          <TextField label="Password" variant="outlined" type="password" sx={{ marginTop: '10px', width: '300px' }} />
        </div>
        <Button variant="contained" sx={{ textTransform: 'none', width: '300px' }}> Iniciar sesion </Button>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <p>¿No tienes una cuenta?</p>
          <button className='register-login-register-button' onClick={() => setLogin(!login)} > Regístrate </button>
        </div>
      </>
    );
  }

  const RegisterUser = () => {
    return (
      <>
        <div className='register-login-header'>
          <Button variant="text" onClick={handleClose} sx={{ borderRadius: 50, minWidth: '35px', fontSize: 15, color: 'black' }}> X </Button>
          <TwitterIcon fontSize='large' sx={{ color: '#55ACEE', marginLeft: '-40px' }} />
          <div></div>
        </div>
        <h1 > Únete a Twitter hoy mismo </h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField label="First name" variant="outlined" sx={{ width: '180px', marginRight: '10px' }} />
            <TextField label="Last name" variant="outlined" sx={{ width: '180px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            <TextField label="email" variant="outlined" sx={{ width: '250px' }} />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Gender"
              onChange={handleChange}
              sx={{ width: '120px' }}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='non binary'>Non binary</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
          </div>
          <TextField label="Bio" multiline rows={4} variant="outlined" inputProps={{ maxLength: 255 }} sx={{ width: '370px', marginTop: '10px' }} />
          <TextField label="User name" variant="outlined" sx={{ width: '300px' }} />
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            <TextField label="Password" variant="outlined" type="password" sx={{ width: '180px', marginRight: '10px' }} />
            <TextField label="Confirm Password" variant="outlined" type="password" sx={{ width: '180px' }} />
          </div>
        </div>
        <Button variant="contained" sx={{ textTransform: 'none', width: '300px' }}> Registrarse </Button>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <p>¿Ya tienes una cuenta?</p>
          <button className='register-login-register-button' onClick={() => setLogin(!login)}> Iniciar sesión </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='register-login-modal' >
          {login ? <LoginUser /> : <RegisterUser />}
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
            onClick={() => { setOpen(true); setLogin(true); }}
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
            onClick={() => { setOpen(true); setLogin(false) }}
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