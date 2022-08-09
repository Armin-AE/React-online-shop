import {
  success,
  loading,
  error,
  successLogin,
  signupsuccess,
  loginLoading,
  addToBasket,
  Errorsignup,
  ErrorLogin,
  orderDone,
  orderError,
  orderLoading,
} from "./constants";
export const Products = (
  state = { product: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case success:
      return payload;

    case loading:
      return payload;

    case error:
      return payload;
    default:
      return state;
      break;
  }
};
export const loginUser = (
  state = { user: [], usertoken: "", Error: "", loginLoading: false },
  { type, payload }
) => {
  switch (type) {
    case successLogin:
      return payload;

    case ErrorLogin:
      return payload;
    case loginLoading:
      return payload;
    default:
      return state;
      break;
  }
};

export const signUpUser = (
  state = { setuser: [], Errorsignup: "" },
  { type, payload }
) => {
  switch (type) {
    case signupsuccess:
      return payload;
    case Errorsignup:
      return payload;
    default:
      return state;
      break;
  }
};

export const basket = (state = { buybasket: [] }, { type, payload }) => {
  switch (type) {
    case addToBasket:
      state.buybasket.push(payload);
    default:
      return state;
  }
};

export const factor = (
  state = { orderData: [], Error: "", done: false },
  { type, payload }
) => {
  switch (type) {
    case orderDone:
      return payload;
    case orderLoading:
      return payload;
    case orderError:
      return payload;
    default:
      return state;
  }
};
