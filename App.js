import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessPage from './components/AccessPage';
import MapComponent from './components/MapComponent';
import GameMap from './components/GameMap';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<AccessPage />} />
                <Route path='/getaccess' element={<AccessPage />} />
                <Route path='/game' element={<GameMap />} />
            </Routes>
        </Router>
    );
}

export default App;
