import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectorLineasClases from '../pages/Lineas';
import '../styles/output.css';
import menuSideBar from './images/sidebar-icon.svg';
import MenuSideBar from './MenuSideBar';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 w-full">
            <div className="flex w-full items-center">
                <div className="text-lg text-white font-bold px-4">GEOBUS</div>

                <div className="flex flex-grow justify-center items-center">
                    <div className="flex bg-white justify-center p-2 rounded-lg shadow-md w-full max-w-3xl">
                        <SelectorLineasClases />
                    </div>
                </div>

                <div className="flex h-full px-4 space-x-4">
                    <Link
                        to="/admin"
                        className="rounded-md text-gray-300 text-sm font-medium hover:text-white px-3 py-2"
                    >
                        Login
                    </Link>
                    <img
                        src={menuSideBar}
                        alt={menuSideBar}
                        onClick={toggleSidebar}
                        className="cursor-pointer"
                    ></img>
                </div>
            </div>

            <MenuSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </nav>
    );
}

export default Navbar;
