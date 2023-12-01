import React from "react";
import "./NewsLetter.scss";

const Newsletter = () => {
  return (
    <div className="background-news">
      <div className="newsletter">
        <div className="titlenews">DEALS JUST FOR YOU</div>
        <div className="signupnews">
          Sign up to receive exclusive offers in your inbox.
        </div>
        <div className="input-text">
          <input
            type="text"
            name=""
            id=""
            className="email"
            placeholder="Enter your e-mail address"
          />
          <div className="signuptext">SIGN UP</div>
        </div>
        <p className="deals">View Latest Email Deals</p>
      </div>
    </div>
  );
};

export default Newsletter;
