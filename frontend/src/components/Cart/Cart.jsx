import React, { useContext } from "react";
import ShopContext from "../../context/shop-context";
import { Products } from "../../constants";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {Products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
          // Nếu số lượng sản phẩm là 0 thì không cần trả về gì
          return null;
        })}
      </div>
    </div>
  );
};

export default Cart;
