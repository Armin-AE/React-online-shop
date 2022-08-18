import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { orderDetail } from "./action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { OrderDetail } = useSelector((state) => state.Orders);
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(OrderDetail);
  useEffect(() => {
    dispatch(orderDetail(state.itemId, state.token));
  }, []);
  return (
    <>
      <div className="basket-cont">
        <div className="basket-card orderDself">
          <p style={{ display: "flex", gap: "3px" }} className="headTitles">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/orders", { state: localGetuserinfo[0].token });
              }}
            >
              <ArrowBackIcon />
            </span>{" "}
            Details
          </p>
          <div className="item-cont">
            {OrderDetail?.map((item, index) => (
              <div key={index} className="basket-item-cont">
                <div className="space-bet col-resp">
                  <div style={{ width: "55%" }}>
                    <p style={{ display: "flex", gap: "2px" }}>
                      {item?.isDeliverd ? (
                        <span>
                          <CheckCircleOutlineOutlinedIcon />
                        </span>
                      ) : (
                        <span>
                          <AutorenewIcon />
                        </span>
                      )}
                      {item?.isDeliverd ? "Delivered" : " In processing"}
                    </p>
                    <p>
                      <span className="title-slow">Address: </span>
                      {item.shippingAddress.address},{item.shippingAddress.city}
                      ,{item.shippingAddress.address}
                    </p>
                  </div>
                  <div>
                    <p style={{ textAlign: "center" }}>
                      {item?.createdAt.slice(0, 10)}
                    </p>
                    <p>
                      <span className="title-slow">Id: </span> {item._id}
                    </p>
                  </div>
                </div>
                <div className="space-bet borderTop">
                  <div>
                    <p>
                      <span className="title-slow">Items: </span> $
                      {item.itemsPrice}
                    </p>
                    <p>
                      <span className="title-slow">Shipping: </span> $
                      {item.shippingPrice}
                    </p>
                    <p>
                      <span className="title-slow">Total: </span> $
                      {item.totalPrice}
                    </p>
                  </div>
                  <p style={{ alignSelf: "center"  }}>
                    {item.isPaid ? "Paid" : "Not Paid"}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "13px",
                  }}
                >
                  {item.orderItems.map((order, indx) => (
                    <div key={indx}>
                      <div
                        className="borderTop order-detail-items"
                        
                      >
                        <div className="order-detail-img">
                        <img
                          style={{width:"100%",borderRadius:"10px"}}
                          src={order.image}
                          alt=""
                        />

                        <p className="orderDetail-qty">{order.qty}</p>
                        </div>

                        <div className="space-bet">
                          <div>
                            <p>{order.name}</p>
                            <p>${order.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
