import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; 
import Login from './Login';
import Mapa from './MapComponent'; 

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/mapa" element={<Mapa />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
