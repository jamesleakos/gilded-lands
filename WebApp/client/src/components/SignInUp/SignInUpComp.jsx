// dependancies
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// imports
import { SignInUpStyled } from './styles/SignInUpComp.styled.js';
import AuthContext from '../../contexts/AuthContext.js';

function SignInUp() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const handleSubmit = function () {
    axios
      .post('/auth/register_login', {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoggedIn(true);
        console.log(res);
        navigate('/collections');
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <SignInUpStyled>
      <div className='sign-in-up-wrapper'>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type='button' onClick={handleSubmit} value='Submit' />
      </div>
      {error ? <p>{error}</p> : null}
    </SignInUpStyled>
  );
}

export default SignInUp;
