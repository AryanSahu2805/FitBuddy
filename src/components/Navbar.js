import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/assets/images/logo.png" alt="FitBuddy Logo" className="logo-img" />
          <span className="logo-text">FitBuddy</span>
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/workout-plans">Workout Plans</Link></li>
          {user && (
            <>
              <li><Link to="/custom-workout">Create Custom</Link></li>
              <li><Link to="/my-workouts">My Workouts</Link></li>
            </>
          )}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="user-greeting">Hey, {user.name}!</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;