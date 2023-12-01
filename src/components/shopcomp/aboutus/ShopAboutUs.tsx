import React from "react";
import "./ShopAboutUs.scss";
import Newsletter from "../../homecomp/NewsLetter";
import { useLocation } from "react-router-dom";

const ShopAboutUs = () => {

  const location = useLocation();
  const { shopData } = location.state || {};

  return (
    <div>
      <div className="about-product-container">
        <div className="about-title">ABOUT US</div>
        <div className="about-store-name">{shopData.shop_name}</div>
        <div className="about-sales">Total sales : {shopData.sales}</div>
        <div className="about-description">{shopData.description}</div>
      </div>
      
      <Newsletter />
    </div>
  );
};

export default ShopAboutUs;
