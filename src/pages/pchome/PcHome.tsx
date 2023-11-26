import React, { useState } from "react";
import "./PcHome.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

interface Videographics {
  vg_id: number;

  productid: number;
  name: number;
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

interface Motherboard {
  motherboard_id: number;

  productid: number;
  name: number;
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

interface Cpu {
  cpu_id: number;

  productid: number;
  name: number;
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

interface Case {
  caseid: number;

  productid: number;
  name: number;
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

interface Powersupply {
  pwrid: number;

  productid: number;
  name: number;
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
  const { userData, data, pcid } = location.state || {};
  const [vga, setVga] = useState<Videographics[]>([]);
  const [motherboard, setMotherboard] = useState<Motherboard[]>([]);
  const [cpu, setCpu] = useState<Cpu[]>([]);
  const [cases, setCase] = useState<Case[]>([]);
  const [powersupply, setPowersupply] = useState<Powersupply[]>([]);

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
      {vga.map((item, index) => (
        <div key={index}>
          VG ID: {item.vg_id} {/* Display vg_id of each item */}
          {/* Add other properties if needed */}
        </div>
      ))}
      {motherboard.map((item, index) => (
        <div key={index}>
          Motherboard ID: {item.motherboard_id}{" "}
          {/* Display vg_id of each item */}
          {/* Add other properties if needed */}
        </div>
      ))}
      {cpu.map((item, index) => (
        <div key={index}>
          Cpu ID: {item.cpu_id} {/* Display vg_id of each item */}
          {/* Add other properties if needed */}
        </div>
      ))}
      {cases.map((item, index) => (
        <div key={index}>
          Case ID: {item.caseid} {/* Display vg_id of each item */}
          {/* Add other properties if needed */}
        </div>
      ))}
      {powersupply.map((item, index) => (
        <div key={index}>
          Powersupply ID: {item.pwrid} {/* Display vg_id of each item */}
          {/* Add other properties if needed */}
        </div>
      ))}
      {data.user_id}
      {data.maxpower}
      {pcid}
      <Footer />
    </div>
  );
};

export default PcHome;
