import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";

const EnhancedOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const socket = new io(`http://localhost:3000`, {
      withCredentials: true,
      transports: ["websocket", "polling", "flashsocket"],
    }); // Địa chỉ của máy chủ Socket.io

    socket.on("restaurantapprove", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("restaurantapprove");
      socket.close();
    };
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/order/findorderres/0",
        {
          withCredentials: true,
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleViewOrderDetail = async (idOrder) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/orderdetail/findOrderDetail/${idOrder}`,
        {
          withCredentials: true,
        }
      );
      setOrderDetail(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAcceptOrder = async (order) => {
    try {
      const updatedOrder = {
        idOrder: order.id,
        status: 1,
      };
      const response = await axios.put(
        `http://localhost:3000/order/updateorder/`,
        updatedOrder,
        {
          withCredentials: true,
        }
      );
      if (response.data === "Cập nhật thành công") {
        setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
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
              <td>${order.totalPrice}</td>
              <td>{order.note}</td>
              <td>
                {order.status === 0 && (
                  <>
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAcceptOrder(order)}
                      >
                        Chấp nhận đơn
                      </button>
                    </>
                    <>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleViewOrderDetail(order.id)}
                      >
                        Chi tiết đơn
                      </button>
                    </>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết đơn</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {orderDetail && (
                  <div>
                    <p>ID: {orderDetail.id}</p>
                    <p>Price: {orderDetail.totalPrice}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedOrderStatus;
