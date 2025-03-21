import React, { useState } from 'react';

const colors = [
    { name: 'General', color: 'bg-white' },
    { name: 'Alternativa 1', color: 'bg-orange-500' },
    { name: 'Alternativa 2', color: 'bg-blue-300' },
    { name: 'Alternativa 3', color: 'bg-yellow-300' },
    { name: 'Alternativa 4', color: 'bg-purple-500' },
    { name: 'Alternativa 5', color: 'bg-green-300' },
    { name: 'Alternativa 6', color: 'bg-cyan-300' },
    { name: 'Alternativa 7', color: 'bg-gray-400' },
    { name: 'Alternativa 8', color: 'bg-red-500' },
];

const schedule = [
    {
        hour: 5,
        minutes: [
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 1' },
        ],
    },
    { hour: 6, minutes: [{ minute: 30, type: 'General' }] },
    {
        hour: 7,
        minutes: [
            { minute: 0, type: 'Alternativa 8' },
            { minute: 15, type: 'Alternativa 2' },
            { minute: 45, type: 'General' },
        ],
    },
    {
        hour: 8,
        minutes: [
            { minute: 15, type: 'Alternativa 3' },
            { minute: 45, type: 'General' },
        ],
    },
    { hour: 9, minutes: [{ minute: 30, type: 'Alternativa 4' }] },
    {
        hour: 10,
        minutes: [
            { minute: 0, type: 'Alternativa 2' },
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 5' },
        ],
    },
    {
        hour: 11,
        minutes: [
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 7' },
        ],
    },
    { hour: 12, minutes: [{ minute: 30, type: 'General' }] },
    {
        hour: 13,
        minutes: [
            { minute: 0, type: 'General' },
            { minute: 15, type: 'Alternativa 5' },
            { minute: 45, type: 'Alternativa 1' },
        ],
    },
    {
        hour: 14,
        minutes: [
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 8' },
        ],
    },
    { hour: 15, minutes: [{ minute: 30, type: 'General' }] },
    {
        hour: 16,
        minutes: [
            { minute: 0, type: 'Alternativa 2' },
            { minute: 15, type: 'Alternativa 4' },
            { minute: 45, type: 'General' },
        ],
    },
    {
        hour: 17,
        minutes: [
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 8' },
        ],
    },
    { hour: 18, minutes: [{ minute: 30, type: 'General' }] },
    {
        hour: 19,
        minutes: [
            { minute: 0, type: 'Alternativa 6' },
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 3' },
        ],
    },
    {
        hour: 20,
        minutes: [
            { minute: 15, type: 'General' },
            { minute: 45, type: 'Alternativa 5' },
        ],
    },
    { hour: 21, minutes: [{ minute: 30, type: 'General' }] },
    {
        hour: 22,
        minutes: [
            { minute: 0, type: 'General' },
            { minute: 15, type: 'Alternativa 8' },
            { minute: 45, type: 'Alternativa 4' },
        ],
    },
    {
        hour: 23,
        minutes: [
            { minute: 15, type: 'Alternativa 1' },
            { minute: 45, type: 'Alternativa 7' },
        ],
    },
];

function MenuSideBar({ isOpen, toggleSidebar }) {
    const [selectedColor, setSelectedColor] = useState('General');

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const renderTable = (title) => (
        <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-xxxxs md:text-xxxs hover:text-xxs transition-all duration-300">
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miércoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Sábado</th>
                            <th>Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((entry, i) => (
                            <tr key={i}>
                                <th className="p-1 border">{entry.hour}:00</th>
                                {Array.from({ length: 7 }, (_, j) => (
                                    <td key={j} className="p-1 border">
                                        {entry.minutes
                                            .filter(
                                                (minute) =>
                                                    selectedColor ===
                                                        'General' ||
                                                    minute.type ===
                                                        selectedColor
                                            )
                                            .map((minute, k) => (
                                                <div
                                                    key={k}
                                                    className={`p-1 rounded ${
                                                        colors.find(
                                                            (color) =>
                                                                color.name ===
                                                                minute.type
                                                        ).color
                                                    }`}
                                                >
                                                    {minute.minute}
                                                </div>
                                            ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div
            className={`fixed top-[68px] right-0 h-[calc(100%-68px)] bg-white shadow-lg p-4 transition-transform transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } w-full md:w-150 z-50 overflow-y-auto`}
        >
            <div className="flex justify-between items-center mb-4 bg-gray-200 p-2 rounded">
                <h2 className="text-xl font-bold">Línea Uno</h2>
                <div className="flex space-x-2">
                    {colors.map((color) => (
                        <div
                            key={color.name}
                            className={`cursor-pointer p-2 rounded-full ${
                                color.color
                            } ${
                                selectedColor === color.name
                                    ? 'ring-2 ring-black'
                                    : ''
                            }`}
                            onClick={() => handleColorSelect(color.name)}
                        ></div>
                    ))}
                </div>
            </div>
            {renderTable('Puerto - Morro')}
            {renderTable('Morro - Puerto')}
        </div>
    );
}

export default MenuSideBar;
