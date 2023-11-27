import React, { useState } from "react";
import "./MotherboardComp.scss";
import { useLocation } from "react-router-dom";
import {
  Videographics,
  Cpu,
  Motherboard,
  Powersupply,
  Case,
} from "../pchome/PcHome";
import PcHome from "../pchome/PcHome";

interface MotherboardCompProps {
  Motherboard: Motherboard;
}

const MotherboardComp = ({ Motherboard }: MotherboardCompProps) => {
  return (
    <div>
      <div className="pc-home-item-container">
        <div className="pc-home-item-product">
          <img src={Motherboard.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Motherboard.name}</div>
        </div>
        <div className="pc-home-item-cores">{Motherboard.cpu}</div>
        <div className="pc-home-item-clock">{Motherboard.form}</div>
        <div className="pc-home-item-memory">{Motherboard.max_memory}</div>
        <div className="pc-home-item-tdp">{Motherboard.memory_slot}</div>
        <div className="pc-home-item-ratings">{Motherboard.ratings}</div>
        <div className="pc-home-item-price">{Motherboard.product_price}</div>
        <div className="pc-home-item-btn">Add to list</div>
      </div>
    </div>
  );
};

export default MotherboardComp;
