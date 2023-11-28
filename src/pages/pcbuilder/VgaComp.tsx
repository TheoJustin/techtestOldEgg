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
import axios from "axios";

interface VideographicsCompProps {
  Videographics: Videographics;
}

interface FormData {
  pc_id : number;
  product_id : number;
  quantity : number;
}

const VgaComp = ({ Videographics }: VideographicsCompProps) => {
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
          <img src={Videographics.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Videographics.name}</div>
        </div>
        <div className="pc-home-item-cores">{Videographics.gpu}</div>
        <div className="pc-home-item-clock">{Videographics.memory}</div>
        <div className="pc-home-item-memory">{Videographics.psu}</div>
        <div className="pc-home-item-tdp">{Videographics.length}</div>
        <div className="pc-home-item-ratings">{Videographics.ratings}</div>
        <div className="pc-home-item-price">{Videographics.product_price}</div>
        <div className="pc-home-item-btn" onClick={() => handleClickList(Videographics.productid)}>Add to list</div>
      </div>
    </div>
  );
};

export default VgaComp;
