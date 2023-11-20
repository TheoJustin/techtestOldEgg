import React, { useState } from "react";
import "./AccountSettings.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../footer/Footer";

const AccountSettings = () => {
  const location = useLocation();
  const { userData } = location.state || {};

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newMobilePhone, setNewMobilePhone] = useState(
    userData.mobile_phone || ""
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = () => {
    if (oldPassword === userData.password) {
      axios
        .post("http://localhost:8080/update-password", {
          id: userData.id,
          password: newPassword,
        })
        .then((response) => {
          setSuccessMessage("Password updated successfully!");
          // Reset the password fields
          setOldPassword("");
          setNewPassword("");
        })
        .catch((error) => {
          // Handle error here
          setSuccessMessage("Failed to update password.");
        });
    } else {
      setSuccessMessage("Old password is incorrect.");
    }
  };

  const handleMobilePhoneChange = () => {
    axios.post("http://localhost:8080/update-phone", {
      id: userData.id,
      mobile_phone: newMobilePhone,
    });
  };

  return (
    <div className="account-settings-container">
      <div className="account-settings-tile">ACCOUNT SETTINGS</div>
      <div className="account-settings-desc">
        Control, Protect, and secure your account
      </div>

      <div className="account-settings-information">
        <div className="account-settings-display">Account Information</div>
        <input
          className="account-settings-text"
          value={userData.first_name}
        ></input>
        <div className="account-settings-btn">EDIT</div>
      </div>
      <div className="account-settings-information">
        <div className="account-settings-display">Mobile Number</div>
        <input
          className="account-settings-text"
          value={newMobilePhone}
          onChange={(e) => setNewMobilePhone(e.target.value)}
        />
        <div className="account-settings-btn" onClick={handleMobilePhoneChange}>
          EDIT
        </div>
      </div>
      <div className="account-settings-information">
        <div className="account-settings-display">Account Information</div>
        <input
          className="account-settings-text"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="account-settings-text"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="account-settings-btn" onClick={handlePasswordChange}>
          EDIT
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
