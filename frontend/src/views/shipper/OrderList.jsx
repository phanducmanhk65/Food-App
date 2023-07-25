import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderList = () => {
  const orders = [
    { id: 1, customer: 'Khách hàng 1', address: 'Địa chỉ 1' },
    { id: 2, customer: 'Khách hàng 2', address: 'Địa chỉ 2' },
    { id: 3, customer: 'Khách hàng 3', address: 'Địa chỉ 3' },
  ];

  const handleAcceptOrder = (orderId) => {
    console.log(`Đã nhận đơn hàng có ID: ${orderId}`);
  };

  return (
    <div>
      <h2>Danh sách đơn:</h2>
      <table className="table table-striped"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Địa chỉ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleAcceptOrder(order.id)}>Nhận đơn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
