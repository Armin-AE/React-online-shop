import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Factor = () => {
  const dispatch = useDispatch();
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  ///////////
  let orders = [];
  localBasket.map((item) => {
    orders.push({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      countInStock: item.countInStock,
      qty: item.qty,
    });
  });
  const handlesubmit = (e) => {
    e.preventDefault();

    //   dispatch(showfactor(orders, state.totalprice, state.token, fulladdress));
  };
  return (
    <>
      <div className="basket-cont">
        <div className="basket-card">
          {localBasket?.map((item) => {
            <div className="basket-item-cont">
              <div className="basket-items">
                <div></div>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Factor;
