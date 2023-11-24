import React from "react";
import "./WishlistFollower.scss";
import { WishlistItem, FollowerData, Product, User } from "../../pages/wishlist/Wishlist";


interface WishlistItemProps {
  item: FollowerData;
}

const WishlistFollower = ({ item }: WishlistItemProps) => {
  return (
    <div className="wishlist-follower">
      <div className="follower-info">
        <h3 className="follower-heading">Follower Information</h3>
        <div className="follower-detail">
          <span className="follower-label">ID:</span> 
          <span className="follower-data">{item.id}</span>
        </div>
        <div className="follower-detail">
          <span className="follower-label">Wishlist ID:</span> 
          <span className="follower-data">{item.wishlist_id}</span>
        </div>
        <div className="follower-detail">
          <span className="follower-label">User ID:</span> 
          <span className="follower-data">{item.follower_user_id}</span>
        </div>
        <div className="follower-detail">
          <span className="follower-label">Follow Date:</span> 
          <span className="follower-data">{item.follow_date}</span>
        </div>
      </div>
    </div>
  );
};

export default WishlistFollower;