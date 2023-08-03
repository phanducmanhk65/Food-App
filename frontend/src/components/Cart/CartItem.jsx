import React from "react";

const CartItem = (props) => {
  const { name, price, image, restaurant } = props.data;

  return (
    <div className="cartItem">
      <img src={image} alt="img" />
      <p>
        <b>{name}</b>
      </p>
      <p>${price}</p>
      <p>{restaurant}</p>
    </div>
  );
};

export default CartItem;
