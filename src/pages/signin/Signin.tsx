import React from 'react';
import './Signin.scss';
import logo from './../../assets/logo.png';

function Signin() {
  return (
    <div>
        <div className="form">
            <img src={logo} alt="" />
            <h2>Sign In</h2>
            <div className='formList'>
                <input type="text" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <button type="submit" className='signin'>SIGN IN</button>
                <button type="submit" className='code'>GET ONE-TIME SIGN IN CODE</button>
            </div>
        </div>
        <div className='signup'>
            <p>New to Newegg?</p>
            <a href="">Sign up</a>
        </div>
    </div>
  );
}

export default Signin;
