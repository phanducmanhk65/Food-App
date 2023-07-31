import React from "react";
import "../styles/main.scss";

const Product = (props) => {
  const { name, price, image, restaurant } = props.data;
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
    </div>
  );
};

export default Product;
