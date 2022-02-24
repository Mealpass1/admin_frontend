//packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotpassword";
import Diners from "./pages/diners";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        <Route path="/diners" exact element={<Diners />} />
      </Routes>
    </Router>
  );
}

export default App;
