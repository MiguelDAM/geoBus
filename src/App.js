import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import MapComponent from "./MapComponent";
import "./output.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/contact" element={<div>Contacto</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
