import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import { initializeProductsStorage } from './data/products';
import './styles/globals.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/slider.css';
import './styles/product.css';
import './styles/auth.css';
import './styles/admin-products.css';

// Admin paneline erişimi kontrol eden bileşen
function AdminRoute({ component: Component }) {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin ? <Component /> : <Navigate to="/login" replace />;
}

function AppContent() {
  // Initialize products storage on app load
  useEffect(() => {
    initializeProductsStorage();
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminRoute component={Admin} />} />
            <Route path="/admin/products" element={<AdminRoute component={AdminProducts} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
