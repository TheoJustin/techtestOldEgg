import React, { useState } from "react";
import "./CpuComp.scss";
import { useLocation } from "react-router-dom";
import {
  Videographics,
  Cpu,
  Motherboard,
  Powersupply,
  Case,
} from "../pchome/PcHome";
import PcHome from "../pchome/PcHome";

interface CpuCompProps {
  Cpu: Cpu;
}

const CpuComp = ({ Cpu }: CpuCompProps) => {
  return (
    <div>
      <div className="pc-home-item-container">
        <div className="pc-home-item-product">
          <img src={Cpu.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Cpu.name}</div>
        </div>
        <div className="pc-home-item-cores">{Cpu.cores}-Core</div>
        <div className="pc-home-item-clock">{Cpu.core_clock}</div>
        <div className="pc-home-item-memory">{Cpu.memory}</div>
        <div className="pc-home-item-tdp">{Cpu.tdp}</div>
        <div className="pc-home-item-ratings">{Cpu.ratings}</div>
        <div className="pc-home-item-price">{Cpu.product_price}</div>
        <div className="pc-home-item-btn">Add to list</div>
      </div>
    </div>
  );
};

export default CpuComp;
