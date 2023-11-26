import React, { useState } from "react";
import "./PcHome.scss";
import computer from "./../../assets/icons/computer.png";
import { useLocation } from "react-router-dom";

const PcHome = () => {

  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div>
        {data.user_id}
        {data.maxpower}
    </div>
  );
};

export default PcHome;