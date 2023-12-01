import React, { useState } from "react";
import "./PcHome.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import CpuComp from "../pcbuilder/CpuComp";
import MotherboardComp from "../pcbuilder/MotherboardComp";
import VgaComp from "../pcbuilder/VgaComp";
import CaseComp from "../pcbuilder/CaseComp";
import PowersupplyComp from "../pcbuilder/PowersupplyComp";

export interface Videographics {
  vg_id: number;

  productid: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shopid: number;

  gpu: string;
  memory: string;
  psu: string;
  length: string;
  wattage: number;
}

export interface Motherboard {
  motherboard_id: number;

  productid: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shopid: number;

  cpu: string;
  form: string;
  max_memory: string;
  memory_slot: string;
  wattage: number;
}

export interface Cpu {
  cpu_id: number;

  productid: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shopid: number;

  cores: string;
  core_clock: string;
  memory: string;
  tdp: string;
  wattage: number;
}

export interface Case {
  caseid: number;

  productid: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shopid: number;

  type: string;
  color: string;
  led: string;
  material: string;
  wattage: number;
}

export interface Powersupply {
  pwrid: number;

  productid: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shopid: number;

  type: string;
  energy: string;
  modular: string;
  wattage: number;
}


const PcHome = () => {
  const location = useLocation();
  const { userData, pcid } = location.state || {};
  const [vga, setVga] = useState<Videographics[]>([]);
  const [motherboard, setMotherboard] = useState<Motherboard[]>([]);
  const [cpu, setCpu] = useState<Cpu[]>([]);
  const [cases, setCase] = useState<Case[]>([]);
  
  const [powersupply, setPowersupply] = useState<Powersupply[]>([]);

  const [activeCategory, setActiveCategory] = useState("");

  const handleCpuClick = () => setActiveCategory("cpu");
  const handleMotherboardClick = () => setActiveCategory("motherboard");
  const handleVgaClick = () => setActiveCategory("videographics");
  const handleCaseClick = () => setActiveCategory("case");
  const handlePowersupplyClick = () => setActiveCategory("powersupply");

  const navigate = useNavigate();

  const handleNavigate = () => { 
    navigate('/pc/parts', { state: { userData: userData, pcid: pcid} });
  }
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/pc/cpus")
      .then((response) => {
        setCpu(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cpus!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pc/videographics")
      .then((response) => {
        setVga(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the videographics!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pc/motherboards")
      .then((response) => {
        setMotherboard(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the motherboards!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pc/cases")
      .then((response) => {
        setCase(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cases!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pc/powersupplies")
      .then((response) => {
        setPowersupply(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cases!", error);
      });
  }, []);

  return (
    <div>
      <Navbar firstName={userData.first_name} />
      <div className="pc-home-container">
        <div className="pc-home-filter-container">
          <div className="pc-home-filter-header">Newegg Pc Builder</div>
          <div className="pc-home-filter-content">
            <input
              type="checkbox"
              name=""
              id=""
              className="pc-home-filter-checkbox"
            />
            <div className="pc-home-filter-text">Filter by Ratings</div>
          </div>

          <div className="pc-home-filter-content">
            <input
              type="checkbox"
              name=""
              id=""
              className="pc-home-filter-checkbox"
            />
            <div className="pc-home-filter-text">Filter by Price</div>
          </div>
        </div>
        <div className="pc-home-spacer"></div>
        {activeCategory === "cpu" && (
          <div className="pc-home-content-container">
            <div className="pc-home-item-container-header">
              <div className="pc-home-item-product-bold">Product</div>
              <div className="pc-home-item-cores-bold"># of cores</div>
              <div className="pc-home-item-clock-bold">Core clock</div>
              <div className="pc-home-item-memory-bold">Memory</div>
              <div className="pc-home-item-tdp-bold">TDP</div>
              <div className="pc-home-item-ratings-bold">Ratings</div>
              <div className="pc-home-item-price-bold">Price</div>
            </div>
            {cpu.map((item, index) => (
              <CpuComp key={index} Cpu={item} />
            ))}
          </div>
        )}

        {activeCategory === "motherboard" && (
          <div className="pc-home-content-container">
            <div className="pc-home-item-container-header">
              <div className="pc-home-item-product-bold">Product</div>
              <div className="pc-home-item-cores-bold">Socket</div>
              <div className="pc-home-item-clock-bold">FormFactor</div>
              <div className="pc-home-item-memory-bold">MaxMemory</div>
              <div className="pc-home-item-tdp-bold">MemorySlot</div>
              <div className="pc-home-item-ratings-bold">Ratings</div>
              <div className="pc-home-item-price-bold">Price</div>
            </div>
            {motherboard.map((item, index) => (
              <MotherboardComp key={index} Motherboard={item} />
            ))}
          </div>
        )}

        {activeCategory === "videographics" && (
          <div className="pc-home-content-container">
            <div className="pc-home-item-container-header">
              <div className="pc-home-item-product-bold">Product</div>
              <div className="pc-home-item-cores-bold">GPU</div>
              <div className="pc-home-item-clock-bold">Memory</div>
              <div className="pc-home-item-memory-bold">PSU</div>
              <div className="pc-home-item-tdp-bold">Length</div>
              <div className="pc-home-item-ratings-bold">Ratings</div>
              <div className="pc-home-item-price-bold">Price</div>
            </div>
            {vga.map((item, index) => (
              <VgaComp key={index} Videographics={item} />
            ))}
          </div>
        )}

        {activeCategory === "case" && (
          <div className="pc-home-content-container">
            <div className="pc-home-item-container-header">
              <div className="pc-home-item-product-bold">Product</div>
              <div className="pc-home-item-cores-bold">Type</div>
              <div className="pc-home-item-clock-bold">Color</div>
              <div className="pc-home-item-memory-bold">LED</div>
              <div className="pc-home-item-tdp-bold">Material</div>
              <div className="pc-home-item-ratings-bold">Ratings</div>
              <div className="pc-home-item-price-bold">Price</div>
            </div>
            {cases.map((item, index) => (
              <CaseComp key={index} Case={item} />
            ))}
          </div>
        )}

        {activeCategory === "powersupply" && (
          <div className="pc-home-content-container">
            <div className="pc-home-item-container-header">
              <div className="pc-home-item-product-bold">Product</div>
              <div className="pc-home-item-cores-bold">Type</div>
              <div className="pc-home-item-clock-bold">Energy</div>
              <div className="pc-home-item-memory-bold">Wattage</div>
              <div className="pc-home-item-tdp-bold">Modular</div>
              <div className="pc-home-item-ratings-bold">Ratings</div>
              <div className="pc-home-item-price-bold">Price</div>
            </div>
            {powersupply.map((item, index) => (
              <PowersupplyComp key={index} Powersupply={item} />
            ))}
          </div>
        )}

        <div className="pc-home-navbar-container">
          <div className="pc-home-navbar-icons" onClick={handleCpuClick}>
            CPU
          </div>
          <div
            className="pc-home-navbar-icons"
            onClick={handleMotherboardClick}
          >
            Motherboard
          </div>
          <div className="pc-home-navbar-icons" onClick={handleVgaClick}>
            Video Graphics
          </div>
          <div className="pc-home-navbar-icons" onClick={handleCaseClick}>
            Case
          </div>
          <div
            className="pc-home-navbar-icons"
            onClick={handlePowersupplyClick}
          >
            Power Supply
          </div>
          <div
            className="pc-home-navbar-icons"
            onClick={handleNavigate}
          >
            Go to list
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PcHome;
