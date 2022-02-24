//packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotpassword";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
