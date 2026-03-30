import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShopsPage from './pages/ShopsPage';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Навігація згідно з макетом ТЗ */}
        <nav className="navbar">
          <Link to="/" className="nav-link">Shop</Link>
          <span className="divider">|</span>
          <Link to="/cart" className="nav-link">Shopping Cart</Link>
        </nav>

        {/* Контент сторінок */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ShopsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;