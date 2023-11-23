import React from "react";
import "./WishlistItem.scss";
import { WishlistItem, FollowerData, Product, User } from "../../pages/wishlist/Wishlist";

// Define WishlistItemProps
interface WishlistItemProps {
  item: FollowerData;
}

const WishlistFollower = ({ item }: WishlistItemProps) => {
  return (
    <div className="wishlist-follower">
      <div className="follower-info">
        <h3>Follower Information</h3>
        {item.id}
        {item.follow_date}
      </div>
    </div>
  );
};

export default WishlistFollower;
