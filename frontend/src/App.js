import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import TicketManagement from './components/TicketManagement';
import ClientManagement from './components/ClientManagement';
import UserManagement from './components/UserManagement';
import WhatsAppIntegration from './components/WhatsAppIntegration';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tickets" element={<TicketManagement />} />
              <Route path="/clients" element={<ClientManagement />} />
              <Route path="/users" element={<UserManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;