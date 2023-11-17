import React, { useState } from "react";
import "./HomeProduct.scss";
import computer from "./../../assets/icons/computer.png";

const HomeProduct = () => {
  return (
    <div className="product-container">
        <img src={computer} alt="" className="home-image"/>
        <div className="home-product-title">TITLE</div>
        <div className="home-product-description">DESCRIPTION</div>
        <div className="home-money">$99.99</div>
        <div className="free-shipping">FREE SHIPPING</div>
        <div className="home-category">CATEGORY</div>
    </div>
  );
};

export default HomeProduct;
