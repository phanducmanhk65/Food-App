import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersProcessing = () => {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/order/findOrdership/2`,
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

  const handleFinishOrder = async (order) => {
    try {
      const finishOrder = { idOrder: order.id, status: 3 };
      await axios.put(`http://localhost:3000/order/updateorder`, finishOrder,
        {
          withCredentials: true
        });
      setOrders(prevOrders => prevOrders.filter(o => o.id !== order.id));
    } catch (error) {
      console.error("Error updating order:", error);
      setError(error);
    }
  };

  const handleDeclineOrder = async (order) => {
    try {
      const declineOrder = { idOrder: order.id, status: 1 };
      await axios.put(`http://localhost:3000/order/updateorder`, declineOrder,
        {
          withCredentials: true
        });
      setOrders(prevOrders => prevOrders.filter(o => o.id !== order.id));
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
    <div className="container mt-4">
      {orders.length === 0 ? (
        <h3>Không có đơn hàng nào đang thực hiện</h3>
      ) : (
        <>
          <h3>Đang có {orders.length} đơn đang thực hiện</h3>
          <br></br>
          <div className="row">
            {orders.map(order => (
              <div key={order.id} className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Đang thực hiện</h5>
                    <p className="card-text">Tên khách hàng: {order.idCustomer}</p>
                    <p className="card-text">Địa chỉ khách: {order.idCustomer}</p>
                    <p className="card-text">Số điện thoại: {order.phoneNumber}</p>
                    <p className="card-text">Giá đơn: ${order.totalPrice}</p>
                    <button className="btn btn-primary mx-4" onClick={() => handleFinishOrder(order)}>Xong</button>
                    <button className="btn btn-secondary" onClick={() => handleDeclineOrder(order)}>Hủy đơn</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersProcessing;
