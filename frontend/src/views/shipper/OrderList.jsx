import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderList = () => {
  const orders = [
    { id: 1, customer: 'Khách hàng 1', phone: '0123456789', address: 'Địa chỉ 1', price: 100 },
    { id: 2, customer: 'Khách hàng 2', phone: '0987654321', address: 'Địa chỉ 2', price: 150 },
    { id: 3, customer: 'Khách hàng 3', phone: '0369845621', address: 'Địa chỉ 3', price: 200 },
  ];

  const handleAcceptOrder = (orderId) => {
    console.log(`Đã nhận đơn hàng có ID: ${orderId}`);
  };

  return (
    <div>
      <h2>Danh sách đơn:</h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className="col-lg-2 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{order.customer}</h5>
                <p className="card-text">Số điện thoại: {order.phone}</p>
                <p className="card-text">Địa chỉ: {order.address}</p>
                <p className="card-text">Giá đơn: ${order.price}</p>
                <button className="btn btn-primary" onClick={() => handleAcceptOrder(order.id)}>Nhận đơn</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
