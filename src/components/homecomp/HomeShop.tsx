import React, { useState } from "react";
import "./HomeShop.scss";
import computer from "./../../assets/icons/computer.png";

interface Shop {
    id: number;
    sales: number;
    followers: number;
    stars: number;
    ratings: number;
    urlBanner: string;
    positive: boolean;
    monthsCreated: number;
    description: string;
    shop_name: string;
  }


const HomeShop = ({ shop }: { shop: Shop }) => {
  return (
    <div className="product-container">
        <img src={shop.urlBanner || computer} alt={shop.shop_name} className="home-image"/>
        <div className="home-product-title">{shop.shop_name}</div>
        <div className="home-product-description">{shop.description}</div>
        <div className="home-money">Followers : {shop.followers}</div>
        <div className="free-shipping">Created at : {shop.monthsCreated} Months Ago</div>
        <div className="home-category">Ratings : {shop.ratings}</div>
        <div className="home-category">Sales : {shop.sales}</div>
    </div>
  );
};

export default HomeShop;
