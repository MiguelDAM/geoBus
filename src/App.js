import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Login";
import Lineas from "./Lineas";
import Navbar from "./Navbar";
import MapComponent from "./MapComponent";
import "./output.css";

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Renderizar Navbar solo si no estamos en la página de Login */}
      {location.pathname !== "/admin" && <header className="App-header"><Navbar /></header>}

      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/contact" element={<div>Contacto</div>} />
      </Routes>
    </div>
  );
}
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import MapComponent from "./MapComponent";
import "./output.css";
>>>>>>> e8c564d70bfb5c52f26a8352a5028da29359ef30

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <AppContent />
=======
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/contact" element={<div>Contacto</div>} />
        </Routes>
      </div>
>>>>>>> e8c564d70bfb5c52f26a8352a5028da29359ef30
    </Router>
  );
}

export default App;
