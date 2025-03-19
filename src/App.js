import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import MapComponent from "./components/MapComponent";
import "./styles/output.css";

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
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
