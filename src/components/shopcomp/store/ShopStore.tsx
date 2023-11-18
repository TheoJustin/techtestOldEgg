import React, { useState } from "react";
import "./ShopStore.scss";
import computer from "./../../../assets/icons/computer.png";

const ShopStore = () => {
  return (
    <div className="">
      <div className="shop-url">
        <img src={computer} alt="{shopData.shopName}" />
      </div>

      <div className="products-container">
        <div className="products-title">FEATURED PRODUCTS</div>
        <div className="thumbnail-container">data</div>
      </div>
    </div>
  );
};

export default ShopStore;
