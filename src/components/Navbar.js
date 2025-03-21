import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sidebar from './images/sidebar-icon.svg';
import SelectorLineasClases from '../pages/Lineas';
import '../styles/output.css';
import MenuSideBar from './MenuSideBar';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="bg-gray-800 p-1 w-full h-17 flex items-center">
            <div className="w-full flex items-center h-full">
                <div className="text-white text-2xl font-bold px-4 h-full flex items-center">
                    GEOBUS
                </div>
                <div className="flex-grow flex justify-center items-center h-full">
                    <div className="bg-gray-800 p-1 rounded-lg w-full max-w-3xl flex justify-center h-full">
                        <SelectorLineasClases />
                    </div>
                </div>
                <div className="flex space-x-4 px-4 h-full items-center cursor-pointer">
                    <img
                        src={sidebar}
                        alt={sidebar}
                        onClick={toggleSidebar}
                        className="rotate-y-180 h-16"
                    />
                </div>
            </div>

            <MenuSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </nav>
    );
}

export default Navbar;
