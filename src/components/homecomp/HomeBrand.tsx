import React from "react";
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
    <div className="home-product-container">
      <div className="img-container">
        <img
          src={brand.brandURL || computer}
          alt={brand.brandName}
          className="home-image"
        />
      </div>
      <div className="home-product-title">{brand.brandName}</div>
      <div className="home-product-description">
        Total Sold: {brand.soldProducts}
      </div>
    </div>
  );
};

export default HomeBrand;
