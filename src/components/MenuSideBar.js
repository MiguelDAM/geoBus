import React from 'react';

function MenuSideBar({ isOpen, toggleSidebar }) {
    return (
        <div
            className={`fixed top-[154.33px] right-0 h-[calc(100%-154.33px)] bg-white shadow-lg p-4 transition-transform transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } w-full md:w-150 z-50`}
        >
            {/* Aquí puedes añadir el contenido del menú lateral */}
        </div>
    );
}

export default MenuSideBar;
