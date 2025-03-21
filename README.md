!!!IMPORTANTE EJECUTAR ESTE COMANDO EN TERMINAL ANTES DE HACER NADA!!!

npm install


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Estructura de Carpetas
```
📦 proyecto/
│── 📂 backend/           # Carpeta del backend 
│   ├── 📂 app/
│   │   ├── 📂 models/    # Modelos de base de datos con SQLModel
│   │   ├── 📂 routes/    # Rutas de la API (endpoints)
│   │   ├── 📂 services/  # Lógica de negocio
│   │   ├── 📂 schemas/   # Esquemas Pydantic para validación de datos
│   │   ├── 📂 db/        # Configuración de la base de datos
│   │   ├── 📂 core/      # Configuración global (CORS, JWT, etc.)
│   │   ├── 📂 middlewares/ # Middlewares de autenticación, logs, etc.
│   │   ├── main.py      # Punto de entrada de FastAPI
│   ├── requirements.txt # Dependencias de Python
│   ├── .env             # Variables de entorno
│   ├── Dockerfile       # Configuración para Docker (opcional)
│── 📂 frontend/         # Carpeta del frontend 
│   ├── 📂 src/
│   │   ├── 📂 components/  # Componentes reutilizables
│   │   ├── 📂 pages/       # Páginas principales (Home, Login, Dashboard)
│   │   ├── 📂 hooks/       # Custom Hooks para lógica reutilizable
│   │   ├── 📂 context/     # Manejo de estado global (Auth, Theme, etc.)
│   │   ├── 📂 services/    # Llamadas a la API con fetch o axios
│   │   ├── 📂 styles/      # Configuración de TailwindCSS
│   │   ├── App.jsx        # Componente principal de React
│   │   ├── main.jsx       # Punto de entrada de React
│   ├── public/            # Archivos estáticos (favicon, index.html, etc.)
│   ├── package.json       # Dependencias del frontend
│   ├── tailwind.config.js # Configuración de TailwindCSS
│── 📂 docs/               # Documentación del proyecto
│── README.md              # Información del proyecto
│── .gitignore             # Archivos ignorados en Git
│── docker-compose.yml     # Configuración para levantar todo en Docker (opcional)
```

---

## Descripción de la Estructura

### Backend 

- `models/`: Contiene los modelos de la base de datos usando SQLModel.
- `routes/`: Define las rutas de la API.
- `services/`: Contiene la lógica de negocio.
- `schemas/`: Define los esquemas Pydantic para validar los datos.
- `db/`: Configuración y conexión a la base de datos.
- `core/`: Configuración global (CORS, autenticación, etc.).
- `middlewares/`: Funciones intermedias para autenticación, logs, etc.
- `main.py`: Archivo principal que inicializa FastAPI.

### Frontend

- `components/`: Contiene componentes reutilizables.
- `pages/`: Define las páginas principales del sitio.
- `hooks/`: Custom hooks para manejar lógica compartida.
- `context/`: Manejo de estado global:
  - `AuthContext.jsx`: Maneja autenticación.
  - `ThemeContext.jsx`: Maneja tema oscuro/claro.
- `services/`: Llamadas a la API.
- `styles/`: Configuración de TailwindCSS.
- `App.jsx`: Componente principal de la aplicación.
- `main.jsx`: Punto de entrada de React.

---

## Instrucciones de Instalación

### Backend (FastAPI)

```sh
cd backend
python -m venv venv
source venv/bin/activate 
pip install -r requirements.txt
cd ..
uvicorn app.main:app --reload #En caso de fallo ejecutar : uvicorn backend.app.main:app --host 127.0.0.1 --port 8080 --reload
```
Para cerrar el entorno virtual y el servidor hacer lo siguiente:
  - Cerrar el servidor FastApi : Presiona `CTRL + C` en la terminal donde está corriendo el servidor.
  - Desactivar el entorno virtual :
  ```sh
  deactivate
  ```

### Frontend (React)

```sh
cd frontend
npm install
npm run dev
```

---

## Notas

- FastAPI genera automáticamente documentación en `http://localhost:8000/docs`.
- React corre en `http://localhost:5173`.
- Configuren variables en `.env` para credenciales y configuración.

---

