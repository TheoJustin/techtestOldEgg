import React, { useState } from "react";
import "./ProductDetail.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  is_subscribed: boolean;
}

const ProductDetail = () => {
  const location = useLocation();
  const { productData, firstName } = location.state || {};
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${firstName}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!", error);
      });
  }, [firstName]);
  
  const handleCreateCart = () => {
    if (userData) {
      const completeFormData = {
        user_id: userData.id,
        product_id: productData.id,
        cart_quantity: 1,
      };
  
      axios
        .post("http://localhost:8080/cart/insert", completeFormData)
        .then((response) => {
          console.log("Product added to cart:", productData.id);
        })
        .catch((error) => {
          console.error("Error adding product to cart:", productData.id, error);
        });
    } else {
      console.error("User data is not available");
    }
  };
  


  return (
    <div>
      <Navbar firstName={firstName} />
      <div className="product-detail-container">
        <img
          src={productData.urlproduct}
          alt=""
          className="product-detail-img"
        />
        <div className="product-detail-data">
          <div className="product-detail-title">{productData.name}</div>
          <div className="product-detail-stars">
            {productData.stars} ({productData.ratings})
          </div>
          <div className="product-detail-quantity">
            Stock : {productData.quantity}
          </div>
          <div className="product-detail-options-container">
            <div className="product-detail-options-text">Operating system</div>
            <div className="product-detail-options-btn-container">
              <div className="product-detail-options-btn">Windows 10 pro</div>
              <div className="product-detail-options-btn">Windows 10</div>
            </div>
          </div>
        </div>
        <div className="product-detail-cart-container">
          <div className="product-detail-price">
            Price : ${productData.product_price}
          </div>
          <div className="product-detail-price">
            Shipping : ${productData.shipping_price}
          </div>
          <div className="product-detail-cart">
            <input
              type="number"
              min={1}
              max={productData.quantity}
              className="product-detail-cart-input"
            />
            <div className="product-detail-cart-btn" onClick={handleCreateCart}>ADD TO CART</div>
          </div>
          <div className="product-detail-wishlist">
            <div className="product-detail-wishlist-checkbox"></div>
            <div className="product-detail-wishlist-addwishlist-container">
              <div className="product-detail-wishlist-addwishlist">
                ADD TO WISHLIST
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
