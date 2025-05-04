import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/auth/AuthState';
import { RegistryProvider } from './context/registry/RegistryState';
import { ServiceProvider } from './context/service/ServiceState';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/dashboard/Dashboard';
import CreateRegistry from './components/registry/CreateRegistry';
import EditRegistry from './components/registry/EditRegistry';
import ViewRegistry from './components/registry/ViewRegistry';
import CreateService from './components/service/CreateService';
import EditService from './components/service/EditService';
import PublicRegistry from './components/public/PublicRegistry';
import Contribution from './components/public/Contribution';
import NotFound from './components/pages/NotFound';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// CSS
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <RegistryProvider>
        <ServiceProvider>
          <Router>
            <div className="app">
              <Navbar />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/create-registry" element={<PrivateRoute><CreateRegistry /></PrivateRoute>} />
                  <Route path="/edit-registry/:id" element={<PrivateRoute><EditRegistry /></PrivateRoute>} />
                  <Route path="/view-registry/:id" element={<PrivateRoute><ViewRegistry /></PrivateRoute>} />
                  <Route path="/create-service/:registryId" element={<PrivateRoute><CreateService /></PrivateRoute>} />
                  <Route path="/edit-service/:id" element={<PrivateRoute><EditService /></PrivateRoute>} />
                  <Route path="/registry/:slug" element={<PublicRegistry />} />
                  <Route path="/contribute/:serviceId" element={<Contribution />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              <ToastContainer position="bottom-right" autoClose={3000} />
            </div>
          </Router>
        </ServiceProvider>
      </RegistryProvider>
    </AuthProvider>
  );
};

export default App;
