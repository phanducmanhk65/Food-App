import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EnhancedOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/order/findorderres/0", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAcceptOrder = async (order) => {
    try {
      const updatedOrder = {
        idOrder: order.id,
        status: 1
      };
      const response = await axios.put(
        `http://localhost:3000/order/updateorder/`,
        updatedOrder,
        {
          withCredentials: true
        }
      );
      if (response.data === "Cập nhật thành công") {
        setOrders(prevOrders =>
          prevOrders.map(o => o.id === order.id ? { ...o, status: 1 } : o)
        );
      } else {
        console.error("Backend response:", response.data);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2>Đơn Hàng Mới</h2>
      <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>idCustomer</th>
            <th>idRestaurant</th>
            <th>Price</th>
            <th>Note</th>
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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAcceptOrder(order)}
                  >
                    Chấp nhận đơn
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnhancedOrderStatus;
