// external
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// internal
// css
import { EnterEmailStyled } from './styles/EnterEmail.styled.js';

function EnterEmail() {
  const [email, setEmail] = useState('');
  const [serverReply, setServerReply] = useState(null);

  const formatImageLink = (link) => {
    return `linear-gradient( rgba(0, 0, 0, .5), rgba(0, 0, 0, 5) ), url('${link}')`;
  };

  const handleSubmit = () => {
    axios
      .post('/waitlist', { email })
      .then((res) => {
        setServerReply('You have been added to the waitlist!');
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setServerReply(
            'You are already on the waitlist! Thanks for making sure!'
          );
        } else {
          setServerReply(err.response.data);
        }
      });
  };

  return (
    <EnterEmailStyled
      style={{
        backgroundImage: formatImageLink(
          'https://ik.imagekit.io/hfywj4j0a/LoL/canyon_city_N6bb4PTK3.png'
        ),
      }}
    >
      <div className='fader'></div>
      <div className='container'>
        <div className='center-content'>
          {!serverReply ? (
            <div className='sign-up-form'>
              <h3>Join the Waitlist</h3>
              <div className='input-area'>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type='email'
                  placeholder='Enter your email'
                />
                <div className='menu-button' onClick={handleSubmit}>
                  Notify Me
                </div>
              </div>
            </div>
          ) : (
            <div className='server-message'>{serverReply}</div>
          )}
        </div>
      </div>
    </EnterEmailStyled>
  );
}

export default EnterEmail;
