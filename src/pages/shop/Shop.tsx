import React from "react";
import axios from "axios";
import "./Shop.scss";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

function Shop() {
  const location = useLocation();
  const { shopData, firstName } = location.state || {};
  return (
    <div className="">
      <Navbar firstName={firstName} />
      <div className="shop-name">{shopData.shop_name}</div>
      <div className="shop-url">
        <img src={shopData.urlBanner} alt={shopData.shopName} />
      </div>
      <Footer/>
    </div>
  );
}

export default Shop;
