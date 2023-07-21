import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderStatus = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      image:
        "https://i-giadinh.vnecdn.net/2023/04/16/Buoc-11-Thanh-pham-11-7068-1681636164.jpg",
      name: "Bún Chả",
      price: 10,
      status: "Đang chờ",
    },
    {
      id: 2,
      image:
        "https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/09_2022/quan-com-tam-o-ha-noi-.jpg",
      name: "Cơm tấm",
      price: 15,
      status: "Đang chờ",
    },
    {
      id: 3,
      image:
        "https://daynauan.info.vn/wp-content/uploads/2020/11/com-rang-dua-bo.jpg",
      name: "Cơm rang dưa bò",
      price: 20,
      status: "Đang chờ",
    },
    {
      id: 4,
      image:
        "https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg",
      name: "Phở bò",
      price: 25,
      status: "Đang chờ",
    },
    {
      id: 5,
      image:
        "https://cdn.tgdd.vn/Files/2017/10/22/1034982/cach-lam-banh-cuon-bang-bot-lam-banh-cuon-mikko-202111111226513462.jpg",
      name: "Bánh cuốn",
      price: 15,
      status: "Đang chờ",
    },
    {
      id: 6,
      image:
        "https://cdn.tgdd.vn/2021/05/CookProduct/Banhcanhcuabien-1200x676.jpg",
      name: "Bánh canh cua",
      price: 20,
      status: "Đang chờ",
    },
    // Add more orders as needed
  ]);

  useEffect(() => {
    // Set the initial status and button label when the component mounts
    setInitialStatus();
  }, []);

  const setInitialStatus = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        status: "Đang chờ",
      }))
    );
  };

  const handleStatusChange = (orderId) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status:
                order.status === "Đang chờ"
                  ? "Đang nấu"
                  : order.status === "Đang nấu"
                  ? "Đang vận chuyển"
                  : order.status,
            }
          : order
      );
    });
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div className="container">
      <h2>Order Status</h2>
      <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <img src={order.image} alt={order.name} width="250" />
              </td>
              <td>{order.name}</td>
              <td>${order.price}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "Đang chờ" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleStatusChange(order.id)}
                  >
                    Chấp nhận đơn
                  </button>
                )}
                {order.status === "Đang nấu" && (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleStatusChange(order.id)}
                  >
                    Vận chuyển
                  </button>
                )}
                {order.status === "Đang vận chuyển" && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Hoàn thành
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

export default OrderStatus;
