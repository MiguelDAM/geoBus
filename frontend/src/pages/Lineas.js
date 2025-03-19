import React, { useState } from 'react';
import './Lineas.css';  // Asegúrate de importar el archivo CSS

const SelectorLineasClases = () => {
  const [lineaSeleccionada, setLineaSeleccionada] = useState('');

  const lineas = [
    { id: 1, nombre: 'Línea 1: Puerto del Rosario – Morro Jable', clase: 'boton-linea1' },
    { id: 2, nombre: 'Línea 2: Puerto del Rosario – Vega de Río Palmas', clase: 'boton-linea2' },
    { id: 3, nombre: 'Línea 3: Puerto del Rosario – Caleta de Fuste – Las Salinas', clase: 'boton-linea3' },
    { id: 4, nombre: 'Línea 4: Pájara – Morro Jable', clase: 'boton-linea4' },
    { id: 5, nombre: 'Línea 5: Costa Calma – Morro Jable', clase: 'boton-linea5' },
    { id: 6, nombre: 'Línea 6: Puerto del Rosario – Corralejo', clase: 'boton-linea6' },
    { id: 7, nombre: 'Puerto del Rosario – El Cotillo', clase: 'boton-linea7' },
    { id: 8, nombre: 'Línea 8: Corralejo – El Cotillo', clase: 'boton-linea8' },
    { id: 9, nombre: 'Línea 9: Pájara – Morro Jable', clase: 'boton-linea9' },
    { id: 10, nombre: 'Línea 10: Puerto del Rosario – Morro Jable (por Pozo Negro)', clase: 'boton-linea10' },
    { id: 11, nombre: 'Línea 11: Tuineje – La Lajita – Gran Tarajal', clase: 'boton-linea11' },
    { id: 12, nombre: 'Línea 12: Gran Tarajal – Las Playitas', clase: 'boton-linea12' }
  ];

  const manejarSeleccion = (linea) => {
    setLineaSeleccionada(linea);
    console.log(`Línea seleccionada: ${linea}`);
  };

  return (
    <div className="selector-lineas" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div className="lineas-list">
        {lineas.map((linea) => (
          <button 
            key={linea.id} 
            onClick={() => manejarSeleccion(linea.nombre)} 
            className={`boton-linea ${linea.clase}`} // Usamos la clase para asignar color
          >
            {linea.id}
          </button>
        ))}
      </div>
      {lineaSeleccionada && (
        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Has seleccionado: <strong>{lineaSeleccionada}</strong>
        </p>
      )}
    </div>
  );
};

export default SelectorLineasClases;
