import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import Cookies from 'js-cookie';

const OrderStatus = () => {
  const [orders, setOrders] = useState([
  ]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/order/findorderres/0`, {
          data: {
            status: 0,
          },
          withCredentials: true,
         
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container">
      <h2>New Status</h2>
      <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "12.5%" }} />
          <col style={{ width: "12.5%" }} />
          <col style={{ width: "12.5%" }} />
          <col style={{ width: "12.5%" }} />
          <col style={{ width: "12.5%" }} />
          <col style={{ width: "12.5%" }} />

        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>idCustomer</th>
            <th>idRestaurant</th>
            <th>Price</th>
            <th>note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.idCustomer}</td>
              <td>{order.idRestaurant}</td>
              <td>${order.totalPrice}</td>
              <td>{order.note}</td>
              <td>
                {order.status === 0 && (
                  <button className="btn btn-primary">Chấp nhận đơn</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatus;