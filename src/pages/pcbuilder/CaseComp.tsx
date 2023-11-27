import React, { useState } from "react";
import "./CaseComp.scss";
import { useLocation } from "react-router-dom";
import {
  Videographics,
  Cpu,
  Motherboard,
  Powersupply,
  Case,
} from "../pchome/PcHome";
import PcHome from "../pchome/PcHome";

interface CaseCompProps {
  Case: Case;
}

const CaseComp = ({ Case }: CaseCompProps) => {
  return (
    <div>
      <div className="pc-home-item-container">
        <div className="pc-home-item-product">
          <img src={Case.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Case.name}</div>
        </div>
        <div className="pc-home-item-cores">{Case.type}</div>
        <div className="pc-home-item-clock">{Case.color}</div>
        <div className="pc-home-item-memory">{Case.led}</div>
        <div className="pc-home-item-tdp">{Case.material}</div>
        <div className="pc-home-item-ratings">{Case.ratings}</div>
        <div className="pc-home-item-price">{Case.product_price}</div>
        <div className="pc-home-item-btn">Add to list</div>
      </div>
    </div>
  );
};

export default CaseComp;
