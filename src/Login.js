import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, LinearProgress } from "@mui/material";
import { setLogin } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState({ email: "" });
  const [errorlogin, setErrorlogin] = useState(false);
  const [password, setPassword] = useState({
    password: "",
  });
  /////////////////
  const { userLoggedIn, Error, loginLoading } = useSelector(
    (state) => state.loginUser
  );
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));

  //////////////////////////////////////////
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const EmailRegex = emailregex.test(email.email);
  const PassRegex = passregex.test(password.password);
  ////////////////////////////////////////
  useEffect(() => {
    if (EmailRegex && PassRegex) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [email.email, password.password, success, errorlogin, Error]);
  useEffect(() => {
    Error ? setErrorlogin(true) : setErrorlogin(false);
  }, [email.email, password.password, errorlogin, Error, success]);
  const handlesubmit = (e) => {
    e.preventDefault();
    {
      success && dispatch(setLogin(email.email, password.password));
    }
  };
  // window.location.reload()

  const LoggedIn = () => {
    userLoggedIn && window.location.reload();
  };
  LoggedIn();
  return (
    <>
      {localGetuserinfo?.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "relative",
            height: "100%",
            color: "white",
          }}
        >
          <div className="modal">
            <CheckCircleOutlineOutlinedIcon
              className="modalanime"
              style={{ color: "green", fontSize: "70px", fontWeight: "300" }}
            />
            <p className="modalanime  modal-resp" style={{ fontSize: "24px" }}>
              You have successfully Logged in!
            </p>
            <button
              className="modalanime btn btn-signup"
              style={{ width: "90%" }}
              onClick={(e) => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
            <ToastContainer />
          </div>
        </div>
      )}
      {loginLoading && (
        <LinearProgress style={{ width: "100%", position: "relative" }} />
      )}
      <div className="login-cont">
        <div
          className={localGetuserinfo?.length ? "modalActive" : "login-card"}
        >
          <form
            noValidate
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <label className="label-login">
              Email:
              <input
                required
                className="input-login"
                type="email"
                placeholder="Enter your email..."
                onChange={(e) => {
                  setEmail({ email: e.target.value.toLowerCase() });
                }}
              />
              {email.email?.length > 4 && !EmailRegex ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                  }}
                  severity="error"
                >
                  Error - your email is invalid!
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              Password:
              <input
                required
                className="input-login"
                type="password"
                placeholder="Enter your password..."
                onChange={(e) => {
                  setPassword({ password: e.target.value });
                }}
              />
              {password.password?.length >= 4 && !PassRegex ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
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
            {errorlogin && (
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                {Error}
              </Alert>
            )}
            <div className="buttons">
              <button
                disabled={!EmailRegex || !PassRegex ? true : false}
                className="btn-login btn"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn-signup btn"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
