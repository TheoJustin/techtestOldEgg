import React, { useState } from "react";
import "./VgaComp.scss";
import { useLocation } from "react-router-dom";
import {
  Videographics,
  Cpu,
  Motherboard,
  Powersupply,
  Case,
} from "../pchome/PcHome";
import PcHome from "../pchome/PcHome";

interface VideographicsCompProps {
  Videographics: Videographics;
}

const VgaComp = ({ Videographics }: VideographicsCompProps) => {
  return (
    <div>
      <div className="pc-home-item-container">
        <div className="pc-home-item-product">
          <img src={Videographics.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Videographics.name}</div>
        </div>
        <div className="pc-home-item-cores">{Videographics.gpu}</div>
        <div className="pc-home-item-clock">{Videographics.memory}</div>
        <div className="pc-home-item-memory">{Videographics.psu}</div>
        <div className="pc-home-item-tdp">{Videographics.length}</div>
        <div className="pc-home-item-ratings">{Videographics.ratings}</div>
        <div className="pc-home-item-price">{Videographics.product_price}</div>
        <div className="pc-home-item-btn">Add to list</div>
      </div>
    </div>
  );
};

export default VgaComp;
