import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showfactor } from "./action";
import { Modal, Box, Typography } from "@mui/material";
const Address = () => {
  const { orderData, Error, done } = useSelector((state) => state.factor);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fulladdress, setAddress] = useState({
    address: "",
    city: "",
    postcode: 0,
    phone: 0,
  });
  const [errors, setErrors] = useState({
    address: false,
    city: false,
    postcode: false,
    phone: false,
  });
  const [onedit, setOnedit] = useState(false);
  const [btndisable, setBtndisable] = useState(true);
  ///////////////////////////////

  const handlesubmit = (e) => {
    e.preventDefault();
      navigate("/factor" , {state:{address : fulladdress}})
  };
  const addressError = () => {
    !fulladdress?.address?.length || fulladdress?.address?.length < 4
      ? setErrors((last) => {
          return { ...last, address: true };
        })
      : setErrors((last) => {
          return { ...last, address: false };
        });
  };
  const cityError = () => {
    !fulladdress?.city?.length || fulladdress?.city?.length < 3
      ? setErrors((last) => {
          return { ...last, city: true };
        })
      : setErrors((last) => {
          return { ...last, city: false };
        });
  };
  const postcodeError = () => {
    !fulladdress?.postcode?.length || fulladdress?.postcode?.length < 2
      ? setErrors((last) => {
          return { ...last, postcode: true };
        })
      : setErrors((last) => {
          return { ...last, postcode: false };
        });
  };
  const phoneError = () => {
    !fulladdress?.phone?.length || fulladdress?.phone?.length < 5
      ? setErrors((last) => {
          return { ...last, phone: true };
        })
      : setErrors((last) => {
          return { ...last, phone: false };
        });
  };
  ///////////////////////////////

  useEffect(() => {
    if (fulladdress?.address?.length) {
      addressError();
    }
    if (fulladdress?.city?.length) {
      cityError();
    }
    if (fulladdress?.postcode?.length) {
      postcodeError();
    }
    if (fulladdress?.phone?.length) {
      phoneError();
    }
    {
      !fulladdress?.address?.length ||
      !fulladdress?.city?.length ||
      !fulladdress?.postcode?.length ||
      !fulladdress?.phone?.length ||
      errors.address ||
      errors.city ||
      errors.postcode ||
      errors.phone
        ? setBtndisable(true)
        : setBtndisable(false);
    }
  }, [
    fulladdress?.address,
    fulladdress?.city,
    fulladdress?.postcode,
    fulladdress?.phone,
    btndisable,
    errors.address,
    errors.city,
    errors.postcode,
    errors.phone,
  ]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  /////////////////////

  return (
    <>
      <div className="address-cont">
        <div className="address-card">
          <form onSubmit={(e) => handlesubmit(e)}>
            <label className="label-login">
              Address:
              <textarea
                onBlur={() => addressError()}
                onChange={(e) => {
                  setAddress((last) => {
                    return { ...last, address: e.target.value };
                  });
                }}
                style={{ maxWidth: "100%", minWidth: "100%" }}
                className="input-login"
                cols="30"
                rows="7"
                placeholder="Street..."
              ></textarea>
              {errors.address ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  address is invalid!
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              City:
              <input
                onBlur={() => cityError()}
                onChange={(e) => {
                  setAddress((last) => {
                    return { ...last, city: e.target.value };
                  });
                }}
                type="text"
                className="input-login"
                placeholder="city"
              />
              {errors.city ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  city is invalid!
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              Postcode:
              <input
                onBlur={() => postcodeError()}
                onChange={(e) => {
                  setAddress((last) => {
                    return { ...last, postcode: e.target.value };
                  });
                }}
                type="number"
                className="input-login"
                placeholder="post code (123)"
              />
              {errors.postcode ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  Post-code is invalid! Enter number.
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              Phone number:
              <input
                onBlur={() => phoneError()}
                onChange={(e) => {
                  setAddress((last) => {
                    return { ...last, phone: e.target.value };
                  });
                }}
                type="number"
                className="input-login"
                placeholder="(123)000-000"
              />
              {errors.phone ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  Phone number is invalid! Enter number.
                </Alert>
              ) : (
                ""
              )}
            </label>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              <button
                disabled={btndisable === true ? true : false}
                className="btn btn-login"
                
              >
                Next
              </button>
              <button
                className="btn btn-signup"
                onClick={() => navigate("/basket")}
                onMouseOver={() => setOnedit(true)}
                onMouseOut={() => setOnedit(false)}
              >
                Edit
                {onedit && <p className="showmsg">Edit basket</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Address;
