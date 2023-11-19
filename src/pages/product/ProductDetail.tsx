import React, { useState } from "react";
import "./ProductDetail.scss";
import computer from "./../../assets/icons/computer.png";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

const ProductDetail = () => {
  const location = useLocation();
  const { productData, firstName } = location.state || {};
  return (
    <div>
      <Navbar firstName={firstName} />
      <div className="product-detail-container">
        <img
          src={productData.urlproduct}
          alt=""
          className="product-detail-img"
        />
        <div className="product-detail-data">
          <div className="product-detail-title">{productData.name}</div>
          <div className="product-detail-stars">
            {productData.stars} ({productData.ratings})
          </div>
          <div className="product-detail-quantity">
            Stock : {productData.quantity}
          </div>
          <div className="product-detail-options-container">
            <div className="product-detail-options-text">Operating system</div>
            <div className="product-detail-options-btn-container">
              <div className="product-detail-options-btn">Windows 10 pro</div>
              <div className="product-detail-options-btn">Windows 10</div>
            </div>
          </div>
        </div>
        <div className="product-detail-cart-container">
          <div className="product-detail-price">
            Price : ${productData.product_price}
          </div>
          <div className="product-detail-price">
            Shipping : ${productData.shipping_price}
          </div>
          <div className="product-detail-cart">
            <input
              type="number"
              min={1}
              max={productData.quantity}
              className="product-detail-cart-input"
            />
            <div className="product-detail-cart-btn">ADD TO CART</div>
          </div>
          <div className="product-detail-wishlist">
            <div className="product-detail-wishlist-checkbox"></div>
            <div className="">[x] ADD TO WISHLIST</div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetail;
