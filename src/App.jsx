//packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
