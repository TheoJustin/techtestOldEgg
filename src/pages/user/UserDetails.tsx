import React, { useState } from "react";
import "./UserDetails.scss";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  return (
    <div>
      <div className="user-details-container">
        <div className="user-details-navbar">
          <div className="user-details-title">Hi Huksin and bozo</div>
          <div className="user-details-navbar-option">
            <div className="user-details-navbar-option-title">Orders</div>
            <div className="user-details-navbar-option-btn">Order History</div>
            <div className="user-details-navbar-option-btn">Return Status</div>
          </div>
        </div>

        {/* component */}
      </div>
    </div>
  );
};

export default UserDetails;
