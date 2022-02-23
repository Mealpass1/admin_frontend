//packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
