import GlobalStyle from "../styles/globalStyle.js";
import Payment from "./Checkout/Payment";
import Shipping from "./Checkout/Shipping";
import Confirm from "./Checkout/Confirm";
import { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import CartContext from "../contexts/CartContext.js";
import PaymentContext from "../contexts/PaymentContext.js";
import Header from "./Header/Header.js";
import ProductsList from "./ProductsList/ProductsList.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./Details/Details";
import SignUp from "./SignUp/SignUp.js";
import Cart from "./Cart/Cart";
import { getCart } from "../services/bootstore.js";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [payment, setPayment] = useState({});

  useEffect(() => {
    if (user) {
      getCart(user.token)
        .then((response) => setCart(response.data))
        .catch((error) => alert("Ocorreu algum erro! Tente novamente."));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <Route path="/" component={ProductsList} exact />
            <Route exact path="/products/:code">
              <Header />
              <Details />
            </Route>
            <Route path="/sign-up" exact>
              <Header />
              <SignUp />
            </Route>
            <Route exact path="/cart">
              <Header />
              <Cart />
            </Route>
            <PaymentContext.Provider value={{ payment, setPayment }}>
              <Route exact path="/checkout/payment">
                <Payment />
              </Route>
              <Route exact path="/checkout/shipping">
                <Shipping />
              </Route>
              <Route exact path="/checkout/confirm">
                <Confirm />
              </Route>
            </PaymentContext.Provider>
            {/* <Redirect to="/" /> */}
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
