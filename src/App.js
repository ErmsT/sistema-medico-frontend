import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import DataConsent from './components/DataConsent';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <AuthPage /> : <Navigate to={`/${user.role}-dashboard`} replace />} />
      <Route
        path="/doctor-dashboard"
        element={user && user.role === 'doctor' ? <DoctorDashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/patient-dashboard"
        element={user && user.role === 'patient' ? <PatientDashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function AppWrapper() {
  const [consentGiven, setConsentGiven] = useState(localStorage.getItem('consentGiven'));

  const handleConsent = () => {
    localStorage.setItem('consentGiven', true);
    setConsentGiven(true);
  };

  return (
    <Router>
      <AuthProvider>
        {!consentGiven ? (
          <DataConsent onConsent={handleConsent} />
        ) : (
          <App />
        )}
      </AuthProvider>
    </Router>
  );
}
