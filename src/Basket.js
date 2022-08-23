import { Button } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeProduct, PlusQty, MinusQty } from "./action";
import { useState } from "react";
const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quanity, setQuanity] = useState(0);
  const { buybasket } = useSelector((state) => state.basket);
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));

  //////////////////
  const loadQty = (item) => {
    item?.qty === item?.countInStock && navigate("/basket");
    item?.qty === 1 && navigate("/basket");
  };
  const removeProductLocal = (index) => {
    const help = [...localBasket];
    help.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(help));
    dispatch(removeProduct(buybasket, index));
    navigate("/basket");
  };
  let price = [];
  const total = (x, y) => x + y;
  localBasket?.map((item) => {
    price.push(item?.price * item.qty);
  });
  /////////////////////////////
  const showToast = () => {
    toast.info("Item removed!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      icon: false,
      transition: Slide,
    });
  };
  return (
    <>
      <ToastContainer />
      <div className="basket-cont">
        <div className="basket-card">
          {localBasket?.length ? (
            localBasket?.map((item, index) => (
              <div key={index} className="basket-item-cont">
                <div className="basket-items">
                  <div className="basket-leftside">
                    <img
                      onClick={() =>
                        navigate(`/product/${item._id.toString()}`, {
                          state: item,
                        })
                      }
                      className="basket-img"
                      src={item?.image}
                      alt=""
                    />
                    <div className="basket-titles">
                      <p style={{ fontSize: "21px", fontWeight: "500" }}>
                        {item?.name}
                      </p>
                      <p>
                        $
                        {price.map(
                          (item, ind) => ind === index && item.toFixed(2)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="basket-rightside">
                  
                    <Button
                      disabled={item?.qty === 1}
                      onClick={() => {
                        setQuanity(item?.qty);
                        item?.qty > 1 && dispatch(MinusQty(index));
                        loadQty(item);
                      }}
                      style={{
                        minWidth: "0px",
                        minHeight: "0px",
                        border: "#00a8e8 solid 1px",
                        color: "white",
                        width: "50px",
                      }}
                      variant="outlined"
                    >
                      <Remove fontSize="small" />
                    </Button>
                    <p style={{ fontSize: "26px" }}>{item?.qty}</p>
                    <Button
                      disabled={item?.qty === item?.countInStock}
                      onClick={() => {
                        setQuanity(item?.qty);
                        item?.qty < item?.countInStock &&
                          dispatch(PlusQty(index));
                        loadQty(item);
                      }}
                      style={{
                        minWidth: "0px",
                        minHeight: "0px",
                        border: "#00a8e8 solid 1px",
                        color: "white",
                        width: "50px",
                      }}
                      variant="outlined"
                    >
                      <Add fontSize="small" />
                    </Button>
                    <DeleteIcon
                      className="basket-deleteicon"
                      onClick={() => {
                        removeProductLocal(index);
                        navigate("/basket");
                        showToast();
                      }}
                      sx={{ fontSize: 32, cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="emptybasketcont">
              <div style={{ display: "flex", alignItems: "center" }}>
                <ShoppingCartIcon className="emptybasket" />
                <p>Empty basket!</p>
              </div>
            </div>
          )}
          {localBasket?.length ? (
            <>
              <div className="basket-bottom">
                <p style={{ fontSize: "large" }}>
                  Total price: ${price.reduce(total).toFixed(2)}
                </p>
                <button
                  onClick={() => {
                    !localGetuserinfo?.length
                      ? navigate("/login")
                      : navigate("/address", {
                          state: {
                            totalprice: price.reduce(total).toFixed(2),
                          },
                        });
                  }}
                  className="btn btn-login"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Basket;
