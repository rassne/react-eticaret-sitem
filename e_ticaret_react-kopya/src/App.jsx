import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParkingProvider } from './context/ParkingContext';
import ParkingNavbar from './components/ParkingNavbar';
import ParkingDashboard from './pages/ParkingDashboard';
import ParkingOperations from './pages/ParkingOperations';
import Tariffs from './pages/Tariffs';
import Privacy from './pages/Privacy';
import './styles/globals.css';
import './styles/parking.css';

function AppContent() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ParkingNavbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ParkingDashboard />} />
            <Route path="/operations" element={<ParkingOperations />} />
            <Route path="/tariffs" element={<Tariffs />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ParkingProvider><AppContent /></ParkingProvider>
  );
}

export default App;
