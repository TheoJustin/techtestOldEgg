import React, { useState } from "react";
import "./HomeBrand.scss";
import computer from "./../../assets/icons/computer.png";

interface Brand {
  brandID: number;
  brandName: string;
  brandURL: string;
  soldProducts: number;
}

const HomeBrand = ({ brand }: { brand: Brand }) => {
  return (
    <div className="product-container"> 
      <img
        src={brand.brandURL || computer}
        alt={brand.brandName}
        className="home-image"
      />
      <div className="home-product-title">{brand.brandName}</div>
      <div className="home-product-description">
        Total Sold: {brand.soldProducts}
      </div>
    </div>
  );
};

export default HomeBrand;