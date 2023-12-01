import React from "react";
import {
  WishlistItem,
  User,
} from "../../pages/wishlist/Wishlist";
import "./WishlistDetailProduct.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

interface WishlistItemProps {
  item: Product;
}

const WishlistDetailProduct = ({ item }: WishlistItemProps) => {
  const location = useLocation();
  const state = location.state as { wishlist: WishlistItem; userData: User };
  const { userData } = state;


  const handleCreateCart = () => {
    const completeFormData = {
      user_id: userData.id,
      product_id: item.id,
      cart_quantity: 1,
    };

    console.log(completeFormData);

    axios
      .post("http://localhost:8080/cart/insert", completeFormData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error creating wishlist item:", error);
      });
  };

  return (
    <div className="wishlist-detail-container-item-box">
      <img
        src={item.urlproduct}
        className="wishlist-detail-container-item-img"
        alt=""
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
          <div className="wishlist-detail-container-item-quantity">
            Qty : {item.quantity}
          </div>
          <div className="wishlist-detail-container-item-btn" onClick={handleCreateCart}>ADD TO CART</div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDetailProduct;
