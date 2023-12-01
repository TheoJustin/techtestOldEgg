import React, { useState } from "react";
import "./PowersupplyComp.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Powersupply,
} from "../pchome/PcHome";

interface PowersupplyCompProps {
  Powersupply: Powersupply;
}

interface FormData {
  pc_id : number;
  product_id : number;
  quantity : number;
}

const PowersupplyComp = ({ Powersupply }: PowersupplyCompProps) => {
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
          <img src={Powersupply.urlproduct} alt="" className="pc-home-item-img" />
          <div className="pc-home-item-name">{Powersupply.name}</div>
        </div>
        <div className="pc-home-item-cores">{Powersupply.type}</div>
        <div className="pc-home-item-clock">{Powersupply.energy}</div>
        <div className="pc-home-item-memory">{Powersupply.wattage}</div>
        <div className="pc-home-item-tdp">{Powersupply.modular}</div>
        <div className="pc-home-item-ratings">{Powersupply.ratings}</div>
        <div className="pc-home-item-price">{Powersupply.product_price}</div>
        <div className="pc-home-item-btn" onClick={() => handleClickList(Powersupply.productid)}>Add to list</div>
      </div>
    </div>
  );
};

export default PowersupplyComp;
