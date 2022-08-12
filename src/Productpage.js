import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { Star } from "@mui/icons-material";
import { addtobasket } from "./action";
import { useEffect, useState } from "react";
const Productpage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /////////////////
  const [Include, setInclude] = useState(false);
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  const { buybasket } = useSelector((state) => state.basket);
  /////////////////////
  const includeCheck = () => {
    localBasket?.map((item) => {
      let basketitems = item?._id;
      if (basketitems?.includes(state?._id)) {
        setInclude(true);
      }
    });
  };
  useEffect(() => {
    includeCheck();
    JSON.parse(localStorage.getItem("basket"));
  }, []);
  return (
    <>
      <div className="product-cont">
        <div className="product-itemcont">
          <div className="product-items">
            <div className="p-page-leftside">
              <img className="p-page-img" src={state?.image} alt="" />
              <div className="p-page-titles">
                <p style={{ fontSize: "27px", fontWeight: "500" }}>
                  {state?.name}
                </p>
                <div className="p-page-titles2">
                  <p>category: {state?.category}</p>
                  <p>count in stock : {state?.countInStock}</p>
                  <p>brand: {state?.brand}</p>
                  <div className="rating">
                    <Star className="star" />
                    <p>{state?.rating}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-page-rightside">
              <p style={{ fontSize: "22px" }}>
                Price:
                <span style={{ fontSize: "27px" }}> ${state?.price}</span>
              </p>
              {!Include ? (
                <button
                  disabled={state?.countInStock == "0" && true}
                  className="btn btn-addtocart"
                  onClick={() => {
                    state.qty = 1;
                    setInclude(true);
                    includeCheck();
                    dispatch(addtobasket(state,buybasket));
                    navigate(`/product/${state?._id?.toString()}`, {
                      state: state,
                    });
                  }}
                >
                  {state?.countInStock == "0" ? "Out of stock" : "Add to cart"}
                </button>
              ) : (
                <p
                  style={{ color: "black", width: "100%", padding: "9px" }}
                  className="btn btn-signup"
                  onClick={() => {
                    navigate("/basket");
                  }}
                >
                  In your basket! click to see and edit
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-page-descr">
        <h2>Description</h2>
        <p>{state?.description}</p>
      </div>
    </>
  );
};

export default Productpage;
