import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignup } from "./action";
import { Alert, AlertTitle } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  ///////////////////
  const [name, setName] = useState({ name: "" });
  const [email, setEmail] = useState({ email: "" });
  const [pwd, setPwd] = useState({ pwd: "" });
  const [rePwd, setRePwd] = useState({
    rePwd: "",
  });
  const [pwdMatch, setPwdMatch] = useState(false);
  const [Error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const { Errorsignup, setuser } = useSelector((state) => state.signUpUser);
  ///////////////////////////////////////////////

  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const EmailRegex = emailregex.test(email.email);
  const PassRegex = passregex.test(pwd.pwd);
  ///////////////////////////

  const passmatch = () => {
    if (pwd.pwd === rePwd.rePwd) {
      setPwdMatch(true);
    } else {
      setPwdMatch(false);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    success && dispatch(setSignup(name.name, email.email, pwd.pwd));
  };
  ////////////////////////////////////
  useEffect(() => {
    if (
      EmailRegex &&
      PassRegex &&
      pwdMatch &&
      !Error &&
      name.name?.length > 2
    ) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [name.name, pwd.pwd, rePwd.rePwd, pwdMatch, Error, success]);
  useEffect(() => {
    passmatch();
  }, [pwd, rePwd, pwdMatch]);
  const nameValidate = () => {
    name.name?.length < 2 ? setError(true) : setError(false);
  };

  useEffect(() => {
    if (name.name?.length) {
      nameValidate();
    }
  }, [name.name, Error]);

  useEffect(() => {
    !setuser?.length ? setErrorRegister(true) : setErrorRegister(false);
  }, [errorRegister]);

  return (
    <>
      {setuser?.length ? (
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
              style={{ color: "green", fontSize: "70px", fontWeight: "300" }}
            />
            <p style={{ fontSize: "24px" }}>
              You have successfully Registered!
            </p>
            <button
              className="btn btn-signup"
              style={{ width: "90%" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <div style={{ width: "100%" }}>
              <p
                onClick={() => navigate(0)}
                style={{ marginLeft: "21px", cursor: "pointer" }}
              >
                Don't have an Account?
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="signup-cont">
        <div className={setuser?.length ? "modalActive" : "signup-card"}>
          <form
            noValidate
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <label className="label-login">
              Name:
              <input
                required
                className="input-login"
                type="text"
                placeholder="Enter your name..."
                onBlur={() => {
                  nameValidate();
                }}
                onChange={(e) => {
                  setName({ name: e.target.value });
                  nameValidate();
                }}
              />
              {Error ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                  severity="error"
                >
                  Error - your name is invalid!
                </Alert>
              ) : (
                ""
              )}
            </label>
            <label className="label-login">
              Email:
              <input
                className="input-login"
                type="text"
                placeholder="Enter your email..."
                onChange={(e) => setEmail({ email: e.target.value })}
              />
              {email.email?.length > 3 && !EmailRegex ? (
                <Alert
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    zIndex: "2",
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
                className="input-login"
                type="password"
                placeholder="Enter your password..."
                onChange={(e) => {
                  setPwd({ pwd: e.target.value });
                }}
              />
              {pwd.pwd?.length >= 4 && !PassRegex ? (
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
                  setRePwd((last) => {
                    return { ...last, rePwd: e.target.value };
                  });
                }}
              />
              {rePwd.rePwd?.length >= 4 && !pwdMatch ? (
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
              {rePwd.rePwd?.length >= 4 && pwdMatch ? (
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
            {Errorsignup?.length ? (
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                {Errorsignup}
              </Alert>
            ) : (
              ""
            )}
            <div className="buttons">
              <button
                className="btn-login btn"
                disabled={
                  !EmailRegex ||
                  !PassRegex ||
                  !pwdMatch ||
                  Error ||
                  !name.name?.length
                    ? true
                    : false
                }
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

export default Signup;
