import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = ({ user = { name: "Admin", avatar: "https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff" } }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-4 border-red-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Company Info */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">CT</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cajá Talks</h1>
                <p className="text-sm text-gray-600">Plataforma de Comunicação</p>
              </div>
            </div>
            
            {/* Company Information */}
            <div className="hidden md:block text-sm text-gray-600 border-l border-gray-300 pl-8">
              <p className="font-medium">Rua das Empresas, 123 - Centro, São Paulo/SP</p>
              <p>CNPJ: 00.000.000/0001-00</p>
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5h5m0 0V9a6 6 0 10-12 0v3.586l-1.293 1.293A1 1 0 006 15h9zm0 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notificações</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900">Novo status check criado</p>
                      <p className="text-xs text-gray-600">2 minutos atrás</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900">Sistema atualizado</p>
                      <p className="text-xs text-gray-600">1 hora atrás</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <img
                  className="w-8 h-8 rounded-full ring-2 ring-red-200"
                  src={user.avatar}
                  alt={user.name}
                />
                <span className="hidden md:block font-medium">{user.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">Perfil</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">Configurações</a>
                  <hr className="my-2" />
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">Sair</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} font-medium mt-1`}>
            {change > 0 ? '+' : ''}{change}% vs mês anterior
          </p>
        )}
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

// Status Check Form Component
const StatusCheckForm = ({ onSubmit, loading }) => {
  const [clientName, setClientName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientName.trim()) {
      onSubmit(clientName);
      setClientName('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Status Check</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Cliente
          </label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
            placeholder="Digite o nome do cliente..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Status Check'}
        </button>
      </form>
    </div>
  );
};

// Status Check List Component
const StatusCheckList = ({ statusChecks, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Checks Recentes</h3>
      <div className="space-y-3">
        {statusChecks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum status check encontrado</p>
        ) : (
          statusChecks.map((check) => (
            <div
              key={check.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <div>
                <p className="font-medium text-gray-900">{check.client_name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(check.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Ativo
                </span>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [statusChecks, setStatusChecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const fetchStatusChecks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/status`);
      setStatusChecks(response.data);
    } catch (error) {
      console.error('Erro ao buscar status checks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createStatusCheck = async (clientName) => {
    setCreateLoading(true);
    try {
      await axios.post(`${API}/status`, { client_name: clientName });
      await fetchStatusChecks(); // Refresh the list
    } catch (error) {
      console.error('Erro ao criar status check:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusChecks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Principal</h2>
          <p className="text-gray-600">Bem-vindo à plataforma Cajá Talks. Gerencie seus status checks e monitore suas comunicações.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Checks"
            value={statusChecks.length}
            change={12}
            icon={
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatsCard
            title="Checks Ativos"
            value={statusChecks.length}
            change={8}
            icon={
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <StatsCard
            title="Clientes"
            value={new Set(statusChecks.map(check => check.client_name)).size}
            change={-3}
            icon={
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Hoje"
            value={statusChecks.filter(check => {
              const today = new Date();
              const checkDate = new Date(check.timestamp);
              return checkDate.toDateString() === today.toDateString();
            }).length}
            change={25}
            icon={
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <StatusCheckForm onSubmit={createStatusCheck} loading={createLoading} />
          </div>

          {/* List Column */}
          <div className="lg:col-span-2">
            <StatusCheckList statusChecks={statusChecks} loading={loading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Cajá Talks. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">Plataforma de comunicação profissional</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;