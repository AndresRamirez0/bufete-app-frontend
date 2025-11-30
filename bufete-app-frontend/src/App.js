import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ListaExpedientes from './pages/ListaExpedientes';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext); // Uso del Contexto

  return (
    <Router>
      {user && <Navbar />} {/* La barra de navegación solo se ve si hay login */}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
        {/* Rutas Privadas del Bufete */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/expedientes" element={user ? <ListaExpedientes /> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;