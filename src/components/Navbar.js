import React from "react";
import { Link } from "react-router-dom";
import SelectorLineasClases from "../pages/Lineas";
import "../styles/output.css";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="w-full flex items-center">
        <div className="text-white text-lg font-bold px-4">GEOBUS</div>

        <div className="flex-grow flex justify-center items-center">
          <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-3xl flex justify-center">
            <SelectorLineasClases />
          </div>
        </div>

        <div className="flex space-x-4 px-4 h-full">
          <Link
            to="/inicio"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/map"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Ver mapa
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
