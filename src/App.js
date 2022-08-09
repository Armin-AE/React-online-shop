import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
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

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<Productpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/factor" element={<Factor />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </>
  );
};

export default App;
