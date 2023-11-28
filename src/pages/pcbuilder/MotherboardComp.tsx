import React, { useState } from "react";
import "./MotherboardComp.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
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

interface FormData {
  pc_id : number;
  product_id : number;
  quantity : number;
}

const MotherboardComp = ({ Motherboard }: MotherboardCompProps) => {
  const location = useLocation();
  const { userData, data, pcid } = location.state || {};

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
          <img src={Motherboard.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Motherboard.name}</div>
        </div>
        <div className="pc-home-item-cores">{Motherboard.cpu}</div>
        <div className="pc-home-item-clock">{Motherboard.form}</div>
        <div className="pc-home-item-memory">{Motherboard.max_memory}</div>
        <div className="pc-home-item-tdp">{Motherboard.memory_slot}</div>
        <div className="pc-home-item-ratings">{Motherboard.ratings}</div>
        <div className="pc-home-item-price">{Motherboard.product_price}</div>
        <div className="pc-home-item-btn" onClick={() => handleClickList(Motherboard.productid)}>Add to list</div>
      </div>
    </div>
  );
};

export default MotherboardComp;
