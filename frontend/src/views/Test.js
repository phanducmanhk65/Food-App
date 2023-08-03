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
      const response = await axios.get(`http://localhost:3000/restaurant/myrestaurant`);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleCreateRestaurant = async (newRestaurant) => {
    try {
      const response = await axios.post("http://localhost:3000/restaurant/create", newRestaurant);
      setRestaurants([...restaurants, response.data]);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/restaurant/deleteres/${id}`);
      const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setEditing(true);
    setCurrentRestaurant(restaurant);
  };

  const handleUpdateRestaurant = async (id, updatedRestaurant) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/restaurant/updateres/${id}`,
        updatedRestaurant
      );

      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) => (restaurant.id === id ? response.data : restaurant))
      );

      setEditing(false);
    } catch (error) {
      console.error("Error updating restaurant:", error);
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