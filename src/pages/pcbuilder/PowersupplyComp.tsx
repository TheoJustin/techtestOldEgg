import React, { useState } from "react";
import "./PowersupplyComp.scss";
import { useLocation } from "react-router-dom";
import {
  Videographics,
  Cpu,
  Motherboard,
  Powersupply,
  Case,
} from "../pchome/PcHome";
import PcHome from "../pchome/PcHome";

interface PowersupplyCompProps {
  Powersupply: Powersupply;
}

const PowersupplyComp = ({ Powersupply }: PowersupplyCompProps) => {
  return (
    <div>
      <div className="pc-home-item-container">
        <div className="pc-home-item-product">
          <img src={Powersupply.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Powersupply.name}</div>
        </div>
        <div className="pc-home-item-cores">{Powersupply.type}</div>
        <div className="pc-home-item-clock">{Powersupply.energy}</div>
        <div className="pc-home-item-memory">{Powersupply.wattage}</div>
        <div className="pc-home-item-tdp">{Powersupply.modular}</div>
        <div className="pc-home-item-ratings">{Powersupply.ratings}</div>
        <div className="pc-home-item-price">{Powersupply.product_price}</div>
        <div className="pc-home-item-btn">Add to list</div>
      </div>
    </div>
  );
};

export default PowersupplyComp;
