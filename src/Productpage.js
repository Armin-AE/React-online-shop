import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "@mui/icons-material";
import { addtobasket } from "./action";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { productP } from "./action";

const Productpage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /////////////////
  const [Include, setInclude] = useState(false);
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  const { buybasket } = useSelector((state) => state.basket);
  const { productp, loading } = useSelector((state) => state.productP);
  /////////////////////
  const includeCheck = () => {
    localBasket?.map((item) => {
      let basketitems = item?._id;
      if (basketitems?.includes(id)) {
        setInclude(true);
      }
    });
  };
  useEffect(() => {
    dispatch(productP(id));
    includeCheck();
    JSON.parse(localStorage.getItem("basket"));
  }, []);
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <div className="product-cont">
            <div className="product-itemcont">
              <div className="product-items">
                <div className="p-page-leftside">
                  <img className="p-page-img" src={productp[0]?.image} alt="" />
                  <div className="p-page-titles">
                    <p style={{ fontSize: "27px", fontWeight: "500" }}>
                      {productp[0]?.name}
                    </p>
                    <div className="p-page-titles2">
                      <p>category: {productp[0]?.category}</p>
                      <p>count in stock : {productp[0]?.countInStock}</p>
                      <p>brand: {productp[0]?.brand}</p>
                      <div className="rating">
                        <Star className="star" />
                        <p>{productp[0]?.rating}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-page-rightside">
                  <p style={{ fontSize: "22px" }}>
                    Price:
                    <span style={{ fontSize: "27px" }}>
                      {" "}
                      ${productp[0]?.price}
                    </span>
                  </p>
                  {!Include ? (
                    <button
                      disabled={productp[0]?.countInStock == "0" && true}
                      className="btn btn-addtocart"
                      onClick={() => {
                        productp[0].qty = 1;
                        setInclude(true);
                        includeCheck();
                        dispatch(addtobasket(productp[0], buybasket));
                        navigate(`/product/${productp[0]?._id?.toString()}`);
                      }}
                    >
                      {productp[0]?.countInStock == "0"
                        ? "Out of stock"
                        : "Add to cart"}
                    </button>
                  ) : (
                    <button
                      style={{
                        color: "black",
                        padding: "10px",
                      }}
                      className={
                        !includeCheck ? "btn btn-signup" : "btn-signup inBasket-btn"
                      }
                      onClick={() => {
                        navigate("/basket");
                      }}
                    >
                      In your Basket! Click to Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-page-descr">
            <h2>Description</h2>
            <p>{productp[0]?.description}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Productpage;
