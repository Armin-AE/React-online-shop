import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Productpage from "./Productpage";
import Basket from "./Basket";
import Setting from "./Setting";
import Address from "./Address";
import Notfound from "./Notfound";
import Factor from "./Factor";
import OrdersHistory from "./Orders";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";

const App = () => {
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/setting"
          element={
            !localGetuserinfo?.length ? <Navigate to={"/error"} /> : <Setting />
          }
        />
        <Route
          path="/factor"
          element={
            !localGetuserinfo?.length ? <Navigate to={"/error"} /> : <Factor />
          }
        />
        <Route
          path="/address"
          element={
            !localGetuserinfo?.length ? <Navigate to={"/error"} /> : <Address />
          }
        />
        <Route
          path="/orders"
          element={
            !localGetuserinfo?.length ? (
              <Navigate to={"/error"} />
            ) : (
              <OrdersHistory />
            )
          }
        />
        <Route
          path="/orders/:id"
          element={
            !localGetuserinfo?.length ? (
              <Navigate to={"/error"} />
            ) : (
              <OrderDetails />
            )
          }
        />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/error" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
