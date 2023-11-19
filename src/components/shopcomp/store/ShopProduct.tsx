import React, { useState } from "react";
import "./ShopProduct.scss";
import computer from "./../../assets/icons/computer.png";
import Newsletter from "../../homecomp/NewsLetter";
import { useLocation } from "react-router-dom";

const ShopAboutUs = () => {

  const location = useLocation();
  const { shopData, firstName } = location.state || {};

  return (
    <div>
      <div className="about-product-container">
        
      </div>
    </div>
  );
};

export default ShopAboutUs;
