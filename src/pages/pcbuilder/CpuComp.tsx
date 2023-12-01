import React, { useState } from "react";
import "./CpuComp.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Cpu,
} from "../pchome/PcHome";

interface CpuCompProps {
  Cpu: Cpu;
}

interface FormData {
  pc_id : number;
  product_id : number;
  quantity : number;
}

const CpuComp = ({ Cpu }: CpuCompProps) => {
  const location = useLocation();
  const { pcid } = location.state || {};
  const [formData, setFormData] = useState<FormData>({
    pc_id: pcid || -1,
    product_id: -1,
    quantity: 1,
  });

  const handleClickList = (product_id: number) => {
    const updatedFormData = {
      ...formData,
      product_id: product_id,
    };
  
    setFormData(updatedFormData);
  
    axios.post("http://localhost:8080/pc/insertparts", updatedFormData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

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
        <div className="pc-home-item-btn" onClick={() => handleClickList(Cpu.productid)}>Add to list</div>
      </div>
    </div>
  );
};

export default CpuComp;
