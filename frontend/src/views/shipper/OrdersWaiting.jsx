import React, { useState, useEffect } from 'react';
import axios from 'axios';



const OrdersWaiting = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);


  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/order/findOrdership/1`,
        {
          withCredentials: true
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error);
    }
  };

  const handleAcceptOrder = async (order) => {
    try {
      const updatedOrder = { ...order, status: 2 };
      await axios.put(`http://localhost:3000/order/updateorder`, updatedOrder,
        {
          withCredentials: true
        });
      console.log("Orders before update:", orders); // <-- Log orders before update
      setOrders(orders.map(o => o.id === order.id ? updatedOrder : o));
    } catch (error) {
      console.error("Error updating order:", error);
      setError(error);
    }
  };



  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{order.shop}</h5>
                <p className="card-text">Địa chỉ quán: {order.idRestaurant}</p>
                <p className="card-text">Tên khách hàng: {order.idCustomer}</p>
                <p className="card-text">Note: {order.note}</p>
                <p className="card-text">Giá đơn: ${order.totalPrice}</p>
                <button className="btn btn-primary" onClick={() => handleAcceptOrder(order)}>Nhận đơn</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default OrdersWaiting;
