import React, { useState } from "react";
import "./UserDetails.scss";
import { useLocation } from "react-router-dom";
import AccountSettings from "../../components/usercomp/AccountSettings";
import OrderHistory from "../../components/usercomp/OrderHistory";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

type ActiveComponent = 'orderHistory' | 'accountSettings' | '';

const UserDetails = () => {
  const location = useLocation();
  const { userData } = location.state || {};

  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('orderHistory');

  const handleComponentChange = (componentName: ActiveComponent) => {
    setActiveComponent(componentName);
  };

  return (
    <div>
      <Navbar firstName={userData.first_name} />

      <div className="user-details-container">
        <div className="user-details-navbar">
          <div className="user-details-title">
            HI, {userData.first_name} {userData.last_name}
          </div>
          <div className="user-details-navbar-option">
            <div className="user-details-navbar-option-title">Orders</div>
            <div
              className="user-details-navbar-option-btn"
              onClick={() => handleComponentChange("orderHistory")}
            >
              Order History
            </div>
            <div className="user-details-navbar-option-btn">
              Return Status / History
            </div>
            <div className="user-details-navbar-option-btn">
              Marketplace Claim History
            </div>
          </div>

          <div className="user-details-navbar-option">
            <div className="user-details-navbar-option-title">
              Manage Account
            </div>
            <div
              className="user-details-navbar-option-btn"
              onClick={() => handleComponentChange("accountSettings")}
            >
              Account Settings
            </div>
            <div className="user-details-navbar-option-btn">Address Book</div>
            <div className="user-details-navbar-option-btn">
              Payment Options
            </div>
          </div>
        </div>

        {activeComponent === 'orderHistory' && <OrderHistory />}
        {activeComponent === 'accountSettings' && <AccountSettings />}
      </div>
      <Footer />
    </div>
  );
};

export default UserDetails;
