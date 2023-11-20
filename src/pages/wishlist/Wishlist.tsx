import React, { useState } from "react";
import "./Wishlist.scss";
import computer from "./../../assets/icons/computer.png";
import WishlistItemComponent from "../../components/wishlistcomp/WishlistItem";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  is_subscribed: boolean;
}

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

interface WishlistItem {
  wishlist_id: number;
  user: User;
  product: Product;
  quantity: number;
  notes: string;
  created_date: string;
}

const Wishlist = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/wishlist/${userData.id}`)
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  return (
    <div>
      <div className="wishlist-container">
        {wishlist.map((item) => (
          <WishlistItemComponent key={item.wishlist_id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
