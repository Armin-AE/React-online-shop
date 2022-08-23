import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes, } from "react-router";
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
import { userAuth } from "./action";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const { userAuthCheck } = useSelector((state) => state.loginUser);
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));
  useEffect(() => {
    localGetuserinfo?.length && dispatch(userAuth(localGetuserinfo[0]?.token));
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/setting"
          element={
            !userAuthCheck ? <Navigate to={"/error"} /> : <Setting />
          }
        />
        <Route
          path="/factor"
          element={
            !userAuthCheck ? <Navigate to={"/error"} /> : <Factor />
          }
        />
        <Route
          path="/address"
          element={
            !userAuthCheck ? <Navigate to={"/error"} /> : <Address />
          }
        />
        <Route
          path="/orders"
          element={
            !userAuthCheck ? (
              <Navigate to={"/error"} />
            ) : (
              <OrdersHistory />
            )
          }
        />
        <Route
          path="/orders/:id"
          element={
            !userAuthCheck ? (
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
