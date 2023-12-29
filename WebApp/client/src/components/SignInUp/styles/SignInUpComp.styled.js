import styled from 'styled-components';

export const SignInUpStyled = styled.div`
  // height: calc(100vh - var(--nav-bar-height) - var(--footer-height) - 100px);
  height: 100vh;
  padding: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('https://ik.imagekit.io/hfywj4j0a/tr:w-2500/Personal_Site/drone_running_Xvk-_Re6J.JPG?ik-sdk-version=javascript-1.4.3&updatedAt=1674278601364');

  .sign-in-up-wrapper {
    margin: 0 auto;
    padding: 20px;
    display: block;
    width: 200px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
  }

  .sign-in-up-wrapper input {
    width: 100%;
    display: block;
    margin: 0;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .input-error {
    font-size: 14px;
    color: red;
  }
`;
