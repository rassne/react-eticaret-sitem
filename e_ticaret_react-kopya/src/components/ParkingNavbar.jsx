import { NavLink } from 'react-router-dom';

const ParkingNavbar = () => (
  <nav className="parking-navbar">
    <NavLink to="/" className="parking-brand"><i className="fas fa-parking" /> PARKYÖNET</NavLink>
    <div>
      <NavLink to="/">Kontrol Paneli</NavLink>
      <NavLink to="/operations">Araçlar ve Olaylar</NavLink>
      <NavLink to="/tariffs">Tarifeler</NavLink>
      <NavLink to="/privacy">KVKK</NavLink>
    </div>
  </nav>
);

export default ParkingNavbar;
