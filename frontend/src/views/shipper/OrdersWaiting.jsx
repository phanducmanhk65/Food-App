import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersWaiting = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async (order) => {
    try {
      const response = await axios.get(`http://localhost:3000/order/findOrdership/${order.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAcceptOrder = async (order) => {
    try {
      const updatedOrder = { ...order, status: 2 };
      await axios.put(`http://localhost:3000/order/updateorder`, updatedOrder);
      setOrders(orders.map(o => o.id === order.id ? updatedOrder : o));
    } catch (error) {
      console.error("Error updating order:", error);
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">{order.shop}</h5>
              <p className="card-text">Địa chỉ quán: {order.shopAddress}</p>
              <p className="card-text">Tên khách hàng: {order.customer}</p>
              <p className="card-text">Số điện thoại: {order.phone}</p>
              <p className="card-text">Giá đơn: ${order.price}</p>
              <button className="btn btn-primary" onClick={() => handleAcceptOrder(order)}>Nhận đơn</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersWaiting;
