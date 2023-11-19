import React, { useState } from "react";
import "./ShopStore.scss";
import computer from "./../../../assets/icons/computer.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import HomeProduct from "../../homecomp/HomeProduct";

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

interface RecommendedProduct {
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

const ShopStore = () => {
  const location = useLocation();
  const { shopData, firstName } = location.state || {};
  const [products, setProducts] = React.useState<Product[]>([]);
  const [recProducts, setRecProducts] = React.useState<RecommendedProduct[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/shop/products/${shopData.id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/shop/products/recommendation/${shopData.id}`)
      .then((response) => {
        setRecProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  if (shopData && shopData.positive === false) {
    return (
      <div className="banned-shop-message">This shop has been banned.</div>
    );
  }

  return (
    <div className="">
      <div className="shop-url">
        <img src={shopData.urlBanner} alt={shopData.shopName} />
      </div>

      <div className="products-container">
        <div className="products-title">SHOP PRODUCTS</div>
        <div className="thumbnail-container">
          {products.map((product) => (
            <HomeProduct key={product.id} product={product} firstName={firstName}/>
          ))}
        </div>
      </div>

      <div className="products-container">
        <div className="products-title">SHOP RECOMMENDATION (Ratings)</div>
        <div className="thumbnail-container">
          {recProducts.map((recProducts) => (
            <HomeProduct key={recProducts.id} product={recProducts} firstName={firstName}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopStore;
