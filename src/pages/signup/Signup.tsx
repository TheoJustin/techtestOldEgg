import React from 'react';
import './Signup.scss';
import logo from './../../assets/logo.png';

function Signup() {
  return (
    <div className='signup-container'>
        <div className="form">
            <img src={logo} alt="" />
            <h2>Create Account</h2>
            <div className='formList'>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="Email Address" />
                <input type="text" placeholder="Mobile Phone Number (optional)" />
                <input type="password" placeholder="Password" />
                <button type="submit" className='signin'>SIGN IN</button>
                <div>
                  <button type="submit" className='code'>GET ONE-TIME SIGN IN CODE</button>
                </div>
                <div className='offer'>
                  <input type="checkbox"/>
                  <p>Subscribe for exclusive e-mail offers and discounts</p>
                </div>
            </div>
        <div className='signup'>
            <p>Have an account?</p>
            <a href="">Sign in</a>
        </div>
        </div>
    </div>
  );
}

export default Signup;
