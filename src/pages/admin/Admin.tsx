import React, { useState, useEffect } from "react";
import "./Admin.scss";
import axios from "axios";

interface User {
    id:number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  is_subscribed: boolean;
  is_banned: boolean;
}

interface Shop {
  id: number;
  sales: number;
  followers: number;
  stars: number;
  ratings: number;
  urlBanner: string;
  positive: boolean;
  monthsCreated: number;
  description: string;
  shop_name: string;
}

const Admin = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [shopData, setShopData] = useState<Shop[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(true);

  const handleBanUser = async (userId:number) => {
    try {
      const response = await axios.post('http://localhost:8080/update-banned', {
        id: userId,
        is_banned: true
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };
  
  const handleUnbanUser = async (userId:number) => {
    try {
      const response = await axios.post('http://localhost:8080/update-banned', {
        id: userId,
        is_banned: false
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };
  


  useEffect(() => {
    axios
      .get(`http://localhost:8080/users`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });

    axios
      .get(`http://localhost:8080/shops`)
      .then((response) => {
        setShopData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-navbar">
        <button onClick={() => { setShowUsers(true); }}>Show Users</button>
        <button onClick={() => { setShowUsers(false); }}>Show Shops</button>
      </div>
      <div className="admin-page-text">Admin Page</div>
      {showUsers ? (
        <div className="admin-page-container-user">
          <div className="admin-page-container-user-header">User's List</div>
          <div className="admin-page-container-user-box">
            {userData.map((user, index) => (
              <div key={index} className="user-details">
                <p>Name: {user.first_name} {user.last_name}</p>
                <p>Email: {user.email}</p>
                <p>Mobile Phone: {user.mobile_phone}</p>
                <p>Subscribed: {user.is_subscribed ? "Yes" : "No"}</p>
                <p>Banned: {user.is_banned ? "Yes" : "No"}</p>
                <button onClick={() => handleBanUser(user.id)}>Ban</button>
                <button onClick={() => handleUnbanUser(user.id)}>Unban</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="admin-page-container-shop">
          <div className="admin-page-container-shop-header">Shop's List</div>
          <div className="admin-page-container-shop-box">
            {shopData.map((shop, index) => (
              <div key={index} className="shop-details">
                <p>Shop Name: {shop.shop_name}</p>
                <p>Sales: {shop.sales}</p>
                <p>Followers: {shop.followers}</p>
                <p>Ratings : {shop.ratings}</p>
                <p>Stars : {shop.stars}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
