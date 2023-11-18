import React from "react";
import axios from "axios";
import "./Shop.scss";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import ShopStore from "../../components/shopcomp/store/ShopStore";
import ShopProducts from "../../components/shopcomp/products/ShopProducts";
import ShopReview from "../../components/shopcomp/reviews/ShopReview";

function Shop() {
  const location = useLocation();
  const { shopData, firstName } = location.state || {};
  return (
    <div className="">
      <Navbar firstName={firstName} />
      <div className="shop-header">
        <div className="shop-title">{shopData.shop_name}</div>

        <div className="shop-description">
          <div className="shop-desc-text">{shopData.sales} Sales</div>
          <div className="desc-spacer"></div>
          <div className="shop-desc-text">{shopData.followers} Followers</div>
          <div className="desc-spacer"></div>
          <div className="shop-desc-text">{shopData.ratings} Ratings</div>
          <div className="desc-spacer"></div>
          <div className="shop-desc-text">
            Created in the last {shopData.monthsCreated} months
          </div>
        </div>

        <div className="shop-btn">
          <div className="shop-follow">FOLLOW</div>
          <div className="shop-contact">CONTACT</div>
        </div>
      </div>

      

      <div className="shop-navbar">
        <div className="shop-navbar-text">Store Home</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text">All Products</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text">Reviews</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text">Return Policy</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text">About Us</div>
      </div>


      {/* <ShopStore/> */}
      {/* <ShopProducts/> */}
      <ShopReview/>

      <Footer />
    </div>
  );
}

export default Shop;
