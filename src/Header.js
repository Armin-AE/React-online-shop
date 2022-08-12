import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Badge } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getOrders } from "./action";
import { useDispatch } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const localGetuserinfo = JSON.parse(localStorage.getItem("userinfo"));
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  function logoutUser() {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("userData");
  }
  return (
    <>
      <div className="header">
        <p onClick={() => navigate("/")}>Home</p>
        <div className="h-right">
          {localBasket?.length ? (
            <>
              <Badge
                onClick={() => navigate("/basket")}
                badgeContent={localBasket?.length}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                color="primary"
                className="basket-badge"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  className="basket"
                  onClick={() => {
                    navigate("/basket");
                  }}
                  icon={faBagShopping}
                />
              </Badge>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                className="basket"
                onClick={() => {
                  navigate("/basket");
                }}
                icon={faBagShopping}
              />
            </>
          )}

          <p
            onClick={() => {
              !localGetuserinfo?.length && navigate("/login");
            }}
          >
            {localGetuserinfo?.length && localGetuserinfo[0]?.token ? (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      style={{ color: "white" }}
                      {...bindTrigger(popupState)}
                    >
                      {localGetuserinfo?.length && localGetuserinfo[0]?.name}
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/setting");
                        }}
                      >
                        Setting
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/orders" , {state:localGetuserinfo[0].token});
                          

                          popupState.close();
                        }}
                      >
                        Orders
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          logoutUser();
                          navigate("/");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            ) : (
              "Login"
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
