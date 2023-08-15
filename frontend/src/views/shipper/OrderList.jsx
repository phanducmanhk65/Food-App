import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderList = () => {
  const orders = [
    {
      id: 1,
      shop: 'Quán X',
      shopAddress: 'Địa chỉ của Quán X',
      customer: 'Nguyễn A',
      phone: '0123456789',
      address: 'Địa chỉ của Nguyễn A',
      price: 50,
    },
    {
      id: 2,
      shop: 'Quán Y',
      shopAddress: 'Địa chỉ của Quán Y',
      customer: 'Phạm B',
      phone: '0987654321',
      address: 'Địa chỉ của Phạm B',
      price: 40,
    },
    {
      id: 3,
      shop: 'Quán Z',
      shopAddress: 'Địa chỉ của Quán Z',
      customer: 'Trần C',
      phone: '0369845621',
      address: 'Địa chỉ của Trần C',
      price: 30,
    },
  ];

  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [showAllCards, setShowAllCards] = useState(true);
  const [showGetOrderCard, setShowGetOrderCard] = useState(false);
  const [showFinishOrderCard, setShowFinishOrderCard] = useState(false);

  const handleAcceptOrder = (order) => {
    console.log(`Đã nhận đơn hàng của: ${order.customer}`);
    setAcceptedOrders([order]);
    setShowAllCards(false);
    setShowGetOrderCard(true);
  };

  const handleGetOrder = () => {
    setShowGetOrderCard(false);
    setShowFinishOrderCard(true);
  };

  const handleFinishOrder = () => {
    setShowFinishOrderCard(false);
    setShowAllCards(true);
    setAcceptedOrders([]);
  };

  return (
    <div>
      {showAllCards && (
        <div>
          <h2>Danh sách đơn:</h2>
          <div className="row order_list">
            {orders.map((order) => (
              <div key={order.id} className="col-lg-3 mb-3">
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
        </div>
      )}
      {showGetOrderCard && (
        <div>
          <h2>Trạng thái: Đang lấy đơn</h2>
          <div className="row order">
            <div key={acceptedOrders[0].id} className="col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{acceptedOrders[0].shop}</h5>
                  <p className="card-text">Địa chỉ quán: {acceptedOrders[0].shopAddress}</p>
                  <p className="card-text">Tên khách hàng: {acceptedOrders[0].customer}</p>
                  <p className="card-text">Số điện thoại: {acceptedOrders[0].phone}</p>
                  <p className="card-text">Giá đơn: ${acceptedOrders[0].price}</p>
                  <button className="btn btn-primary" onClick={handleGetOrder}>Đã lấy đơn</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showFinishOrderCard && (
        <div>
          <h2>Trạng thái: Đang giao</h2>
          <div className="row order_finish">
            <div key={acceptedOrders[0].id} className="col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Tên khách hàng: {acceptedOrders[0].customer}</h5>
                  <p className="card-text">Địa chỉ khách hàng: {acceptedOrders[0].address}</p>
                  <p className="card-text">Số điện thoại: {acceptedOrders[0].phone}</p>
                  <p className="card-text">Giá đơn: ${acceptedOrders[0].price}</p>
                  <button className="btn btn-primary" onClick={handleFinishOrder}>Xong</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderList;