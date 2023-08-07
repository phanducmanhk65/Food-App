/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
  actFetchDishRequest,
  addToCart, // Import thêm action addToCart
} from "../../store/action";

function Cart({
  cartItems,
  numberCart,
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
  actFetchDishRequest,
  addToCart, // Thêm addToCart vào props
}) {
  useEffect(() => {
    actFetchDishRequest();
  }, [actFetchDishRequest]);

  let ListCart = cartItems;
  let TotalCart = 0;

  TotalCart = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function getProductQuantity(itemId) {
    const itemInCart = cartItems.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {ListCart.length > 0 ? (
              ListCart.filter((item) => item !== null).map((item, key) => (
                <tr key={key}>
                  <td>
                    <i
                      className="badge badge-danger"
                      onClick={() => DeleteCart(item)}>
                      X
                    </i>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.imageUrl}
                      style={{ width: "100px", height: "80px" }}
                    />
                  </td>
                  <td>{item.price} $</td>
                  <td>
                    <span
                      className="btn btn-primary"
                      style={{ margin: "2px" }}
                      onClick={() => DecreaseQuantity(item)}>
                      -
                    </span>
                    <span className="btn btn-info">
                      {getProductQuantity(item.id)}
                    </span>
                    <span
                      className="btn btn-primary"
                      style={{ margin: "2px" }}
                      onClick={() => IncreaseQuantity(item)}>
                      +
                    </span>
                  </td>
                  <td>{item.price * item.quantity} $</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Cart is empty</td>
              </tr>
            )}
            <tr>
              <td colSpan="5">Total Carts</td>
              <td>{Number(TotalCart).toLocaleString("en-US")} $</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state._todoDish._todoProduct.cart, // Lấy thông tin giỏ hàng từ Redux store
    numberCart: state._todoDish._todoProduct.numberCart,
  };
};

export default connect(mapStateToProps, {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
  actFetchDishRequest,
  addToCart, // Thêm addToCart vào action
})(Cart);
