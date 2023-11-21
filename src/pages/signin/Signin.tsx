import React from "react";
import axios from "axios";
import "./Signin.scss";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password
      });
      // Handle response here. For example:
      console.log("Sign in successful", response.data);

      if (response.data.isBanned) {
        setErrorMessage('Your account has been banned.');
        return; // Stop the function here to prevent navigation
      }
      
      navigate('/home', { state: { email: response.data.email, firstName: response.data.first_name } });
    } catch (error) {
      console.error("Error during sign in:", error);
      setErrorMessage('Invalid credentials. Please try again.');
      // Handle error (e.g., show error message to user)
    }
  }
  

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("http://localhost:8080/users");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getUserData();
  }, []);


  return (
    <div className="signin-container">
      <div className="form">
        <img src={logo} alt="" />
        <h2>Sign In</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="formList">
          <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="holder"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="holder"/>
          <button onClick={handleSignIn} className="signin">
            SIGN IN
          </button>
          <button type="submit" className="code">
            GET ONE-TIME SIGN IN CODE
          </button>
        </div>
      </div>
      <div className="signup">
        <p>New to Newegg?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Signin;
