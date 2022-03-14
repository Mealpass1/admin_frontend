//packages
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotpassword";
import Diners from "./pages/diners";
import Restaurants from "./pages/restaurants";
import ExploreRestaurants from "./pages/explore/restaurants";
import ExploreRestaurant from "./pages/explore/restaurant";
import ExploreProduct from "./pages/explore/dish";
import Transactions from "./pages/transactions";
import Explore from "./pages/explore";
import Cart from "./pages/explore/cart";
import Width from "./components/width";
import CartItem from "./pages/explore/cart/product";

function App() {
  const [width, setWidth] = React.useState("");

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  if (width > 416) {
    return <Width />;
  } else {
    return (
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/diners" exact element={<Diners />} />
          <Route path="/restaurants" exact element={<Restaurants />} />
          <Route path="/transactions" exact element={<Transactions />} />
          <Route path="/explore" exact element={<Explore />} />
          <Route
            path="/explore/restaurants"
            exact
            element={<ExploreRestaurants />}
          />
          <Route
            path="/explore/restaurants/:id"
            exact
            element={<ExploreRestaurant />}
          />
          <Route
            exact
            path="/explore/products/:restaurant/:product"
            element={<ExploreProduct />}
          />
          <Route path="/explore/cart" exact element={<Cart />} />
          <Route path="/explore/cart/:id" exact element={<CartItem />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
