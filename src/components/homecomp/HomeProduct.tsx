import React, { useState } from "react";
import axios from "axios";
import "./HomeProduct.scss";
import computer from "./../../assets/icons/computer.png";
import {useNavigate} from 'react-router-dom';

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

type NavbarProps = {
  firstName: string;
};


const HomeProduct = ({ product, firstName }: { product: Product; firstName:string }) => {

  const navigate = useNavigate();

  const handleShopClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/shop/${product.shop_id}`);


      // Navigate to Shop component with the fetched data
      navigate('/shop', { state: { shopData: response.data, firstName:firstName } });
    } catch (error) {
      console.error('Error fetching shop data:', error);
      // Handle error appropriately
    }
  };

  const handleProductClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${product.id}`);


      // Navigate to Shop component with the fetched data
      navigate('/product', { state: { productData: response.data, firstName:firstName } });
    } catch (error) {
      console.error('Error fetching shop data:', error);
      // Handle error appropriately
    }
  };


  return (
    <div className="home-product-container">
        <img src={product.urlproduct || computer} alt={product.name} className="home-image" onClick={handleProductClick}/>
        <div className="home-product-title">{product.name}</div>
        <div className="home-product-description">Ratings: {product.ratings}</div>
        <div className="home-money">${product.product_price.toFixed(2)}</div>
        <div className="free-shipping">{product.shipping_price === 0 ? 'FREE SHIPPING' : `Shipping: $${product.shipping_price.toFixed(2)}`}</div>
        <div className="home-category">{product.category}</div>
        <div className="home-click" onClick={handleShopClick}>Shop id : {product.shop_id}</div>
    </div>
  );
};

export default HomeProduct;
