import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrders } from "./action";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { LinearProgress  } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
const OrdersHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { OrdersHistory ,loadingHistory} = useSelector((state) => state.Orders);
  useEffect(() => {
    dispatch(getOrders(state));
  }, []);

  return (
    <>
      <div className="basket-cont">
        <div className="basket-card">
          <p className="headTitles">Orders History</p>
          {loadingHistory ? 
          
          (
             
              <LinearProgress  color="inherit"/> 
          )
        
        :
        
          OrdersHistory?.length ? (
            OrdersHistory?.map((item, index) => (
              <div key={index} className="item-cont">
                <div className="items">
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
                  <div style={{ display: "flex" }} className="borderTop">
                    <p>{item?.createdAt.slice(0, 10)}</p>
                    <p style={{ marginLeft: "10px" }}>
                      Price: ${item?.totalPrice}
                    </p>
                  </div>
                  <div className=" orderPage-img borderTop ">
                    {item.orderItems.map((img, indx) => (
                      <img
                        key={indx}
                        className="orderSelfImg"
                        src={img.image}
                        alt=""
                        />
                        ))}
                  </div>
                  <p
                    className="borderTop"
                    style={{ cursor: "pointer", display: "flex" }}
                    onClick={() =>
                      navigate(`/orders/${item._id}`, {
                        state: { itemId: item._id, token: state },
                      })
                    }
                    >
                    Details
                    <span>
                      <KeyboardArrowRightIcon />
                    </span>
                  </p>
                </div>
              </div>
            ))
            ) : (
              <div className="emptybasketcont">
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>No orders found!</p>
              </div>
          </div>
      
      
      )}
        </div>
      </div>
    </>
  );
};

export default OrdersHistory;
