import React from "react";
import { useEffect } from "react";
// import { Card, Button } from "react-bootstrap";
import { CardContent, Typography } from "@mui/material";
import "font-awesome/css/font-awesome.min.css";
import { getData } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material";
const Home = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.Products);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "1000px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{ width: "70px", height: "70px" }} />
        </div>
      ) : (
        <>
          {error && (
            <div>
              <p className="error">{error}!</p>
            </div>
          )}
          <div className="products">
            {product?.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className="cardbody"
                    onClick={() =>
                      navigate(`product/${item._id.toString()}`, {
                        state: item,
                      })
                    }
                  >
                    <div className="imagecont">
                      <img className="p-img" src={item.image} alt={item.name} />
                    </div>

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                      </Typography>
                    </CardContent>
                    <div className="cardbottom">
                      <div className="rating">
                        <Star className="star" />
                        <p>{item.rating}</p>
                      </div>
                      <p style={{ fontSize: "large" }}>${item.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
