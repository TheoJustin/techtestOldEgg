import React from "react";
import { useState } from "react";
import "./Signup.scss";
import axios from "axios";
import logo from "./../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    password: "",
    isSubscribed: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      console.log(response.data);
      navigate('/home', { state: { email: formData.email, firstName: formData.first_name } });
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };
  
  

  return (
    <div className="signup-container">
      <div className="form">
        <img src={logo} alt="" />
        <h2>Create Account</h2>
        <form className="formList" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="holder"
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="holder"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="holder"
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile_phone"
            placeholder="Mobile Phone Number (optional)"
            className="holder"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="holder"
            onChange={handleChange}
          />
          <div className="offer">
            <input
              type="checkbox"
              name="isSubscribed"
              onChange={handleChange}
              className="check"
            />
            <div>Subscribe for exclusive e-mail offers and discounts</div>
          </div>
          <button type="submit" className="signin">
            SIGN UP
          </button>
        </form>
        <div className="signup">
          <p>Have an account?</p>
          <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
