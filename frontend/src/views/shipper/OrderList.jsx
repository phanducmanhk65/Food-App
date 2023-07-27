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

  const handleAcceptOrder = (orderCustomer) => {
    console.log(`Đã nhận đơn hàng của: ${orderCustomer}`);
  };

  return (
    <div>
      <h2>Danh sách đơn:</h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className="col-lg-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{order.shop}</h5>
                <p className="card-text">Địa chỉ quán: {order.shopAddress}</p>
                <p className="card-text">Tên khách hàng: {order.customer}</p>
                <p className="card-text">Số điện thoại: {order.phone}</p>
                <p className="card-text">Giá đơn: ${order.price}</p>
                <button className="btn btn-primary" onClick={() => handleAcceptOrder(order.customer)}>Nhận đơn</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
