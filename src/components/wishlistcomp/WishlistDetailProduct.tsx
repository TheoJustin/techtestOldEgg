import React, { useState } from "react";
import {
  WishlistItem,
  FollowerData,
  User,
} from "../../pages/wishlist/Wishlist";
import "./WishlistDetailProduct.scss";

interface Product {
  id: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shop_id: number;
}

// // Define WishlistItemProps
interface WishlistItemProps {
  item: Product;
}

const WishlistDetailProduct = ({ item }: WishlistItemProps) => {
  return (
    <div className="wishlist-detail-container-item-box">
      <img
        src={item.urlproduct}
        className="wishlist-detail-container-item-img"
      />
      <div className="wishlist-detail-container-item-desc">
        <div className="wishlist-detail-container-item-rating">
          {item.stars} Stars
        </div>
        <div className="wishlist-detail-container-item-name">{item.name}</div>
      </div>
      <div className="wishlist-detail-container-item-buy">
        <div className="wishlist-detail-container-item-price">
          ${item.product_price}
        </div>
        <div className="wishlist-detail-container-item-shipping-price">
          ${item.shipping_price} Shipping
        </div>
        <div className="wishlist-detail-container-item-cart">
          <div className="wishlist-detail-container-item-quantity">Qty : {item.quantity}</div>
          <div className="wishlist-detail-container-item-btn">ADD TO CART</div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDetailProduct;
