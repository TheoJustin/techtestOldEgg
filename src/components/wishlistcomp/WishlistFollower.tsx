import React from "react";
import "./WishlistItem.scss";

// Assuming these interfaces are in the same file. If not, import them.
interface FollowerData {
  id: number;
  follow_date: string;
  follower_first_name: string;
  follower_last_name: string;
  follower_email: string;
  wishlist_name: string;
  wishlist_notes: string;
  wishlist_option: string;
  wishlist_quantity: number;
  wishlist_created_date: string;
  product_name: string;
  product_stars: number;
  product_ratings: number;
  product_quantity: number;
  product_price: number;
  shipping_price: number;
  product_bought: number;
  product_category: string;
  product_url: string;
  wishlist_owner_first_name: string;
  wishlist_owner_last_name: string;
  wishlist_owner_email: string;
}

// Define WishlistItemProps
interface WishlistItemProps {
  item: FollowerData;
}

const WishlistFollower = ({ item }: WishlistItemProps) => {
  return (
    <div className="wishlist-follower">
      <div className="follower-info">
        <h3>Follower Information</h3>
        <p className="follower-name">
          <strong>Name:</strong> {item.follower_first_name}{" "}
          {item.follower_last_name}
        </p>
        <p className="follower-email">
          <strong>Email:</strong> {item.follower_email}
        </p>
        {/* Add more follower information as needed */}
      </div>
      <div className="wishlist-info">
        <h3>Wishlist Information</h3>
        <p className="wishlist-name">
          <strong>Wishlist Name:</strong> {item.wishlist_name}
        </p>
        <p className="wishlist-notes">
          <strong>Wishlist Notes:</strong> {item.wishlist_notes}
        </p>
        {/* Add more wishlist information as needed */}
      </div>
      <div className="product-info">
        <h3>Product Information</h3>
        <div className="product-details">
          <img
            src={item.product_url}
            alt={item.product_name}
            className="product-image"
          />
          <div className="product-description">
            <p className="product-name">
              <strong>Product Name:</strong> {item.product_name}
            </p>
            <p className="product-stars">
              <strong>Product Stars:</strong> {item.product_stars}
            </p>
            <p className="product-ratings">
              <strong>Product Ratings:</strong> {item.product_ratings}
            </p>
            {/* Add more product information as needed */}
          </div>
        </div>
      </div>
      <div className="wishlist-owner-info">
        <h3>Wishlist Owner Information</h3>
        <p className="owner-name">
          <strong>Owner Name:</strong> {item.wishlist_owner_first_name}{" "}
          {item.wishlist_owner_last_name}
        </p>
        <p className="owner-email">
          <strong>Owner Email:</strong> {item.wishlist_owner_email}
        </p>
        {/* Add more owner information as needed */}
      </div>
    </div>
  );
};

export default WishlistFollower;
