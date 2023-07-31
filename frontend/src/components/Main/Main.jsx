import React from "react";
import { Products } from "../../constants";
import Product from "../Product";
import "../../styles/main.scss";
// import { ShopContext } from "../../context/shop-context";

const main = () => {
  return (
    <>
      <div className="shop">
        <div className="shopTitle">
          <h1>Shop</h1>
        </div>
        <div className="products">
          {""}
          {Products.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default main;
