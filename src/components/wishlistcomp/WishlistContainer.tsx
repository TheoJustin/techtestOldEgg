// In WishlistContainer.tsx
import React from "react";
import { WishlistItem, FollowerData, Product, User } from "../../pages/wishlist/Wishlist";
import "./WishlistContainer.scss";
import WishlistItemComponent from "./WishlistItem";

interface WishlistContainerProps {
  wishlist: WishlistItem;
}

const WishlistContainer = ({ wishlist }: WishlistContainerProps) => {
  return (
    <div className="wishlist-container-box">
      <div className="wishlist-container-text">{wishlist.name}</div>

      <div className="wishlist-container-content">
        {wishlist.products.map((item) => (
          <WishlistItemComponent key={item.id} item={item} />
        ))}
        <div className="wishlist-container-description">
          <div className="wishlist-container-total">
            {wishlist.quantity} Items
          </div>
          <div className="wishlist-container-price">$123</div>
        </div>
      </div>
    </div>
  );
};

export default WishlistContainer;
