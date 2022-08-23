import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { changePwd } from "./action";
import { useDispatch } from "react-redux";
const Setting = () => {
  //////////////////
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));
  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const [userInfo, setUserInfo] = useState({ name: "", email: "", token: "" });
  const [oldpwd, setOldpwd] = useState("");
  const [oldpwdError, setOldpwdError] = useState(false);
  const [newpwd, setNewpwd] = useState("");
  const [repwd, setRepwd] = useState("");
  const [pwdmatch, setPwdmatch] = useState(false);
  const [oldpwdMatch, setOldpwdMatch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //////////////////////////////
  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const oldPassRegex = passregex.test(oldpwd);
  const newPassRegex = passregex.test(newpwd);
  ////////////////////////////
  const Getuser = () => {
    localGetuserinfo?.map((item) => {
      setUserInfo({ email: item.email, name: item.name, token: item.token });
    });
  };
  const Oldpassmatch = () => {
    if (oldpwd == userLocalData[1]) {
      setOldpwdMatch(true);
    } else {
      setOldpwdMatch(false);
    }
  };
  const passmatch = () => {
    if (newpwd === repwd) {
      setPwdmatch(true);
    } else {
      setPwdmatch(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    Oldpassmatch();
    oldpwdMatch
      ? dispatch(
          changePwd(newpwd, userInfo.name, userInfo.email, userInfo.token),
          navigate("/setting"),
          showToast()
        )
      : setOldpwdError(true);
  };
  useEffect(() => {
    Oldpassmatch();
  }, [oldpwd,oldpwdMatch,oldpwdError]);
  useEffect(() => {
    passmatch();
    Getuser();
  }, [newpwd, repwd, pwdmatch]);
  ////////////////////
  const showToast = () => {
    toast.success("Your password has been changed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",

      transition: Slide,
    });
  };
  return (
    <div>
      <ToastContainer />
      <div className="login-cont">
        <div className="login-card">
          <form
            noValidate
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <label className="label-login">
              Old-password:
              <input
                required
                className="input-login"
                type="password"
                placeholder="Enter your old password..."
                onChange={(e) => {
                  setOldpwd(e.target.value);
                  setOldpwdError(false)
                }}
              />
              {oldpwd?.length > 4 && !oldPassRegex ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  <AlertTitle>Error</AlertTitle> Your password must be have at
                  least [ 8 characters long / 1 uppercase & 1 lowercase
                  character / 1 number ]
                </Alert>
              ) : (
                ""
              )}
              {oldpwdError ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  Incorrect password!
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              New-password:
              <input
                className="input-login"
                type="password"
                placeholder="Enter your new password..."
                onChange={(e) => {
                  setNewpwd(e.target.value);
                }}
              />
              {newpwd.length >= 4 && !newPassRegex ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  <AlertTitle>Error</AlertTitle> Your password must be have at
                  least [ 8 characters long / 1 uppercase & 1 lowercase
                  character / 1 number ]
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              Confirm password:
              <input
                className="input-login"
                type="password"
                placeholder="Confirm your password..."
                onFocus={() => passmatch()}
                onChange={(e) => {
                  setRepwd(e.target.value);
                }}
              />
              {repwd?.length >= 4 && !pwdmatch ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  Error - Your password does not match
                </Alert>
              ) : (
                ""
              )}
              {repwd?.length >= 4 && pwdmatch ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="success"
                >
                  Your passwords are match
                </Alert>
              ) : (
                ""
              )}
            </label>
            <div className="buttons">
              <button
                disabled={
                  !pwdmatch || !newPassRegex || !oldPassRegex ? true : false
                }
                className="btn-login btn"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
