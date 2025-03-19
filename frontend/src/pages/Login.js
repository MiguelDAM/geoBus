import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import eyeOpen from '../components/images/eye-open.png'; // Importa la imagen del ojo abierto
import eyeClosed from '../components/images/eye-closed.png'; // Importa la imagen del ojo cerrado

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user, password); // Implementa tu lógica de autenticación aquí
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Servicio de Autentificación</h1>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user"
          >
            Usuario
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="user"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-2 top-2.5"
              style={{ zIndex: 1 }} // Asegúrate de que el botón esté encima del input
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? eyeOpen : eyeClosed}
                alt={showPassword ? "Visible" : "Invisible"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
