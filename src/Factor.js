import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showfactor, clearBasket } from "./action";
import Swal from "sweetalert2";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const Factor = () => {
  const [payment, setPayment] = useState("Credit-card");
  const [shipprice] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderData } = useSelector((state) => state.factor);
  const [onedit, setOnedit] = useState(false);
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));
  let userToken = localGetuserinfo[0]?.token;
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
  let finalprice = 0;
  const finalPrice = () => {
    finalprice = parseInt(state.totalprice) + shipprice;
  };
  finalPrice();
  const Done = () => {
    Swal.fire({
      icon: "success",
      title: "Order Successfully Placed",
      text: "Thank you for ordering",
      allowOutsideClick: false,
      confirmButtonColor: "#00a8e8",
    }).then(function () {
      dispatch(clearBasket());
      localStorage.removeItem("basket");
      navigate("/");
    });
  };
  return (
    <>
      {orderData?.length ? (
        Done()
      ) : (
        <div className="basket-cont">
          <div className="factor-card">
            <p
              className="headTitles"
              style={{ fontSize: "larger", color: "whitesmoke" }}
            >
              Factor
            </p>
            <div className="factor">
              <div className="factor-orders-cont">
                <div className="factor-orders">
                  {orders?.map((item, index) => (
                    <div className="factor-order-items" key={index}>
                      <img className="factor-img" src={item.image} alt="" />
                      <p className="factor-qty">{item.qty}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="factor-address">
                <p className="headTitles" style={{ fontSize: "large" }}>
                  Delivery
                </p>
                <div>
                  Address: {state.address.address}, City: {state.address.city},
                  Post code: {state.address.postcode}, Phone:{" "}
                  {state.address.phone}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="payment-method ">
                  <FormControl>
                    <FormLabel
                      id="demo-radio-buttons-group-label"
                      style={{ fontWeight: "600", color: "whitesmoke" }}
                    >
                      Payment
                    </FormLabel>
                    <RadioGroup
                      onChange={(e) => setPayment(e.target.value)}
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Credit-card"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Credit-card"
                        control={<Radio />}
                        label="Credit card"
                      />
                      <FormControlLabel
                        value="Cash"
                        control={<Radio />}
                        label="Cash"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="factor-total">
                  <p
                    style={{
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(245, 245, 245, 0.151)",
                    }}
                  >
                    Items price: ${state.totalprice}
                  </p>
                  <p
                    style={{
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(245, 245, 245, 0.151)",
                    }}
                  >
                    Shipping: ${shipprice}
                  </p>
                  <p>Total price : ${finalprice}</p>
                </div>
              </div>
              <div
                className="btnGap"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "25px",
                }}
              >
                <button
                  className="btn btn-signup"
                  onClick={() => navigate("/basket")}
                  onMouseOver={() => setOnedit(true)}
                  onMouseOut={() => setOnedit(false)}
                >
                  Edit
                  {onedit && <p className="showmsg">Edit basket</p>}
                </button>
                <button
                  className="btn btn-login"
                  onClick={() => {
                    dispatch(
                      showfactor(
                        orders,
                        state.totalprice,
                        userToken,
                        state.address,
                        payment,
                        shipprice,
                        finalprice
                      )
                    );
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Factor;
