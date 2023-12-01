import React, { useState } from "react";
import "./OrderHistory.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

interface Order {
  orderid: number;
  invoice: string;
  productid: string;
  dateordered: string;
  status: string;
  quantity: number;
  userid: number;
}

const OrderHistory = () => {
  const location = useLocation();
  const { userData } = location.state || {};

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>("all");
  const [orderDate, setOrderDate] = useState<string>("recent");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    axios
      .get<Order[]>(`http://localhost:8080/orders/${userData.id}`)
      .then((response) => {
        setOrders(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
      });
  }, [userData.id]);

  useEffect(() => {
    let filtered = orders;

    if (orderStatus !== "all") {
      filtered = filtered.filter((order) => order.status === orderStatus);
    }

    if (orderDate === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(
        (order) => new Date(order.dateordered) >= oneWeekAgo
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((order) => order.invoice.includes(searchTerm));
    }

    setFilteredOrders(filtered);
  }, [orders, orderStatus, orderDate, searchTerm]);

  return (
    <div className="account-settings-container">
      <div className="account-settings-tile">ORDER HISTORY</div>
      <div className="account-settings-desc">
        View and manage your past orders
      </div>

      <div className="order-filters">
        <select
          className="order-filter-dropdown"
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="open">Open Orders</option>
          <option value="cancelled">Cancelled Orders</option>
        </select>

        <select
          className="order-filter-dropdown"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        >
          <option value="recent">Recent Orders</option>
          <option value="custom">Choose Date</option>
        </select>

        <div className="order-search">
          <input
            className="order-search-input"
            type="text"
            placeholder="Search orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>


      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.orderid} className="order-item">
              <div className="order-invoice">Invoice: {order.invoice}</div>
              <div className="order-date">
                Date Ordered: {order.dateordered}
              </div>
              <div className={`order-status ${order.status}`}>
                Status: {order.status}
              </div>
              <div className="order-quantity">Quantity: {order.quantity}</div>
            </div>
          ))
        ) : (
          <div className="no-orders-warning">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
