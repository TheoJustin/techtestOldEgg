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
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password
      });
      // Handle response here. For example:
      console.log("Sign in successful", response.data);
      // Redirect to another page or update the UI accordingly
      navigate('/home');
    } catch (error) {
      console.error("Error during sign in:", error);
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
        <div className="formList">
          <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
