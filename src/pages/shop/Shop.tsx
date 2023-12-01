import React from "react";
import "./Shop.scss";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import ShopStore from "../../components/shopcomp/store/ShopStore";
import ShopProducts from "../../components/shopcomp/products/ShopProducts";
import ShopReview from "../../components/shopcomp/reviews/ShopReview";
import ShopAboutUs from "../../components/shopcomp/aboutus/ShopAboutUs";

function Shop() {
  const location = useLocation();
  const { shopData, firstName } = location.state || {};

  const [activeComponent, setActiveComponent] = useState('store');

  const showStore = () => setActiveComponent('store');
  const showProducts = () => setActiveComponent('products');
  const showReviews = () => setActiveComponent('reviews');
  const showAboutUs = () => setActiveComponent('aboutUs');

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
        <div className="shop-navbar-text" onClick={showStore}>Store Home</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text" onClick={showProducts}>All Products</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text" onClick={showReviews}>Reviews</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text">Return Policy</div>
        <div className="shop-navbar-spacer"></div>
        <div className="shop-navbar-text" onClick={showAboutUs}>About Us</div>
      </div>

      {activeComponent === 'store' && <ShopStore />}
      {activeComponent === 'products' && <ShopProducts />}
      {activeComponent === 'reviews' && <ShopReview />}
      {activeComponent === 'aboutUs' && <ShopAboutUs />}

      <Footer />
    </div>
  );
}

export default Shop;
