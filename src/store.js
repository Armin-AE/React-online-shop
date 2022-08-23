import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import {
  Products,
  loginUser,
  signUpUser,
  basket,
  factor,
  Orders,
  productP,
} from "./reducer";
import thunk from "redux-thunk";
const reducers = combineReducers({
  Products: Products,
  loginUser: loginUser,
  signUpUser: signUpUser,
  basket: basket,
  factor: factor,
  Orders: Orders,
  productP: productP,
});
const localBasket = JSON.parse(localStorage.getItem("basket"))?.length
  ? JSON.parse(localStorage.getItem("basket"))
  : [];
const middleWare = [thunk];
const initialState = {
  basket: { buybasket: [...localBasket] },
};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleWare)
);
export default store;
