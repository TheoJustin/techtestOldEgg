import React, { useState } from "react";
import "./HomeProduct.scss";
import computer from "./../../assets/icons/computer.png";

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

const HomeProduct = ({ product }: { product: Product }) => {
  return (
    <div className="product-container">
        <img src={product.urlproduct || computer} alt={product.name} className="home-image"/>
        <div className="home-product-title">{product.name}</div>
        <div className="home-product-description">Ratings: {product.ratings}</div>
        <div className="home-money">${product.product_price.toFixed(2)}</div>
        <div className="free-shipping">{product.shipping_price === 0 ? 'FREE SHIPPING' : `Shipping: $${product.shipping_price.toFixed(2)}`}</div>
        <div className="home-category">{product.category}</div>
        <div className="home-category">{product.shop_id}</div>
    </div>
  );
};

export default HomeProduct;
