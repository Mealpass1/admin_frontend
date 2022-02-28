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
import Transactions from "./pages/transactions";
import Width from "./components/width";

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
        </Routes>
      </Router>
    );
  }
}

export default App;
