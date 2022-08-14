import axios from "axios";
import {
  success,
  loading,
  successLogin,
  signupsuccess,
  loginLoading,
  ErrorLogin,
  Errorsignup,
  orderDone,
  orderError,
  orderLoading,
  clearbasket,
  clearOrder,
  GetOrders,
  getDetail,
} from "./constants";
export const getData = () => async (dispatch) => {
  dispatch({ type: loading, payload: { loading: true } });
  try {
    const { data } = await axios.get("http://5.161.141.215:5000/api/products");
    dispatch({
      type: success,
      payload: { product: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: error,
      payload: { loading: false, error: error.message },
    });
  }
};

export const setLogin = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: loginLoading,
    payload: {
      ...getState(),
      loginLoading: true,

      userLoggedIn: false,
    },
  });
  try {
    const { data } = await axios.post(
      "http://5.161.141.215:5000/api/users/login",
      {
        email: email,
        password: password,
      },
      {}
    );
    dispatch({
      type: successLogin,
      payload: {
        loginLoading: false,
        user: [data],
        userLoggedIn: true,
        usertoken: data.token,
        Error: "",
      },
    });
    localStorage.setItem("userinfo", JSON.stringify([data]));
    localStorage.setItem("userData", JSON.stringify([email, password]));
  } catch (error) {
    dispatch({
      type: ErrorLogin,
      payload: {
        loginLoading: false,
        Error: "Invalid Email or Password",
        userLoggedIn: false,
      },
    });
  }
};
export const setSignup = (name, email, pwd) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://5.161.141.215:5000/api/users", {
      name: name,
      email: email,
      password: pwd,
    });
    dispatch({ type: signupsuccess, payload: { setuser: [data], Error: "" } });
  } catch (error) {
    dispatch({
      type: Errorsignup,
      payload: { Errorsignup: "User Already Exist!" },
    });
  }
};

export const addtobasket = (product, buybasket) => (dispatch, getstate) => {
  const help = buybasket;
  help.push(product);
  localStorage.setItem("basket", JSON.stringify(help));
};
export const removeProduct = (buybasket, index) => () => {
  const help = buybasket;
  help.splice(index, 1);
};

export const changePwd = (pwd, name, email, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      "http://5.161.141.215:5000/api/users/profile",
      {
        name: name,
        email: email,
        password: pwd,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch({
      type: Error,
      payload: { Error: "Invalid Email or Password" },
    });
  }
};

export const PlusQty = (index) => (dispatch, getstate) => {
  const {
    basket: { buybasket },
  } = getstate();
  const help = [...buybasket];
  help[index].qty += 1;
  localStorage.setItem("basket", JSON.stringify(help));
};
export const MinusQty = (index) => (dispatch, getstate) => {
  const {
    basket: { buybasket },
  } = getstate();
  const help = [...buybasket];
  help[index].qty -= 1;
  localStorage.setItem("basket", JSON.stringify(help));
};

export const showfactor =
  (orders, totalprice, token, address, payment, shipPrice, finalPrice) =>
  async (dispatch, getstate) => {
    dispatch({ type: orderLoading, payload: { ...getstate(), done: false } });
    try {
      const { data } = await axios.post(
        "http://5.161.141.215:5000/api/orders",
        {
          orderItems: [...orders],
          shippingAddress: {
            address: address.address,
            city: address.city,
            postalCode: address.postcode,
            phone: address.phone,
          },
          paymentMethod: payment,
          itemsPrice: totalprice,
          shippingPrice: shipPrice,
          totalPrice: finalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: orderDone,
        payload: { done: true, orderData: [data], Error: "" },
      });
    } catch (error) {
      dispatch({
        type: orderError,
        payload: { done: false, Error: error.message },
      });
    }
  };

export const clearBasket = () => (dispatch) => {
  dispatch({ type: clearbasket, payload: [] });
  dispatch({ type: clearOrder, payload: [] });
};

export const getOrders = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://5.161.141.215:5000/api/orders/myorders",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GetOrders, payload: { OrdersHistory: [...data] } });
  } catch (error) {}
};

export const orderDetail = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://5.161.141.215:5000/api/orders/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: getDetail, payload: { OrderDetail: [data] } });
    console.log(data);
  } catch (error) {}
};
