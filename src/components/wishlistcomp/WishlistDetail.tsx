import React, { useState } from "react";
import "./WishlistDetail.scss";
import WishlistDetailProduct from "./WishlistDetailProduct";
import { WishlistItem, FollowerData, User } from "../../pages/wishlist/Wishlist";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const WishlistDetail = () => {
  const location = useLocation();
  const state = location.state as { wishlist: WishlistItem; userData: User };
  const { wishlist, userData } = state;

  return (
    <div>
      <Navbar firstName={userData.first_name} />
      <div className="wishlist-detail-container">
        <div className="wishlist-detail-container-user">
          <div className="wishlist-detail-container-name">{wishlist.name}</div>
          <div className="wishlist-detail-container-author">
            by {wishlist.user.first_name}
          </div>
          <div className="wishlist-detail-container-btn-container">
            <div className="wishlist-detail-container-btn">FOLLOW</div>
            <div className="wishlist-detail-container-btn">DUPLICATE</div>
          </div>
        </div>
        <div className="wishlist-detail-container-details">
          <div className="wishlist-detail-container-filter">
            <div className="wishlist-detail-container-total-items">
              {wishlist.quantity} Items
            </div>
            <div className="wishlist-detail-container-filter-text">
              Sort by :
            </div>
            <div className="wishlist-detail-container-filter-dropdown">
              Date added
            </div>
            <div className="wishlist-detail-container-filter-text">
              Sold by :
            </div>
            <div className="wishlist-detail-container-filter-dropdown">
              All Sellers
            </div>
            <div className="wishlist-detail-container-filter-text">
              Filter by :
            </div>
            <div className="wishlist-detail-container-filter-dropdown">All</div>
          </div>
          <div className="wishlist-detail-container-items">
            {wishlist.products.map((item) => (
              <WishlistDetailProduct key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistDetail;
