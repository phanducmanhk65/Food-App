import React, { useContext } from "react";
import "../styles/main.scss";
import { ShopContext } from "../context/shop-context";

const Product = (props) => {
  const { id, name, price, image, restaurant } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];
  return (
    <div className="product">
      <img src={image} alt={name} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
      </div>
      <p>${price}</p>
      <p>{restaurant}</p>
      <button className="addToCartBtn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
      </button>
    </div>
  );
};

export default Product;
