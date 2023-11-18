import React, { useState } from "react";
import "./ShopProducts.scss";
import computer from "./../../../assets/icons/computer.png";
import search from "./../../../assets/icons/search.png";

const ShopProducts = () => {
  return (
    <div className="shop-products-container">
        <div className="shop-products-filter">
          <div className="shop-products-filter-text">Speed</div>
          <div className="shop-products-filter-checkbox">
            <input type="checkbox" className="filter-checkbox"/>
            <div className="filter-checkbox-text">DDR5</div>
          </div>
          <div className="shop-products-filter-checkbox">
            <input type="checkbox" className="filter-checkbox"/>
            <div className="filter-checkbox-text">DDR4</div>
          </div>
        </div>
        <div className="shop-products-page">
            <div className="shop-products-search">
              <input type="text" className="shop-products-searchbar" placeholder="Search Within"/>
              <div className="shop-products-search-btn">
                <img src={search} alt="" className="shop-products-search-btn-img"/>
              </div>
            </div>
            <div>data</div>
        </div>
    </div>
  );
};

export default ShopProducts;
