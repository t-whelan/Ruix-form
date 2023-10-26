import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './style.css';

function SignUpForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false, // Added a state for the "Remember Me" checkbox
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // For checkbox inputs, update the state based on the "checked" property
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
  // Initialize Google Sign-In
  

<GoogleOAuthProvider clientId="<488769516169-39cfs28fl3f2vmjkd617mm63m9c5si34.apps.googleusercontent.com>">...</GoogleOAuthProvider>;
  const initializeGoogleSignIn = async () => {
    // Replace 'YOUR_CLIENT_ID' with your actual Google API Client ID
    // const CLIENT_ID = '488769516169-39cfs28fl3f2vmjkd617mm63m9c5si34.apps.googleusercontent.com';

    try {
      await window.gapi.load('auth2', async () => {
        await window.gapi.auth2.init({
          client_id: "488769516169-39cfs28fl3f2vmjkd617mm63m9c5si34.apps.googleusercontent.com"
        });
      });
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
    }
  };

  useEffect(() => {
    initializeGoogleSignIn();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
  
      // Get the Google user's ID token
      const idToken = googleUser.getAuthResponse().id_token;
  
      // Send the ID token to your backend for verification and registration
      const response = await axios.post('http://localhost:8800/google-auth2', { idToken });
  
      if (response.data.success) {
        console.log('Google login successful!!!');
        // Redirect or update the UI upon successful Google login
      } else {
        setErrorMessage('Google login failed. Please try again.');
      }
    } catch (error) {
      console.error('Google authentication error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Client-side validation
    if (!values.name || !values.email || !values.password) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }
    if (!values.password.match(/^(?=.*\d).{6,}$/)) {
      // Handle invalid password criteria
      alert('Password must be at least 6 characters and contain at least one number');
      return;
    }
    

    // Reset error message
    setErrorMessage('');

    

    // Make an API request to register the user
    axios
    .post('http://localhost:8800/signup', values) // Update the endpoint to match your backend
    .then((res) => {
      if (res.data.success) {
        console.log('Registered successfully!!!');
        // Redirect to a new page upon successful registration
        window.location.href = './success.html'; // Update the URL as needed
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    })
    .catch((err) => {
      console.error(err);
      setErrorMessage('An error occurred during registration.');
    });
};

  return (
    <div className="container">
      <div className="form-container">
        <img className="logo" src="../logo.png" alt="logo" />
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <p>Create an account to get started</p>
          <button className="google" onClick={handleGoogleLogin}>
  <img src="./google.png" alt="Google Logo" className="button-icon" />
  Continue with Google
</button>

          <div className="separator">
            <span className="separator-line" />
            <span className="separator-text">or</span>
            <span className="separator-line" />
          </div>
          <div>
            <input type="text" placeholder="Name" name="name" value={values.name} onChange={handleChange} />
          </div>
          <div>
            <input type="email" placeholder="Email" name="email" value={values.email} onChange={handleChange} />
          </div>
          <div>
            <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
          </div>
          <div className="remember-me">
            <label>
              <input type="checkbox" name="rememberMe" checked={values.rememberMe} onChange={handleChange} />
              <span>Remember Me</span>
            </label>
          </div>
          <div>
            <button className="register" type="submit">
              Register
            </button>
          </div>
        </form>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <p className="login">
          Already have an account? <a href="/login">Log in</a>
        </p>
        <div className="side">
          <img src="../background.jpg" alt="background" />
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
