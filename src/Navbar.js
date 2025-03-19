import React from 'react';
import { Link } from 'react-router-dom';
import './output.css';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 h-[60px]">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">GEOBUS</div>
                <div>
                    <Link
                        to="/"
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
