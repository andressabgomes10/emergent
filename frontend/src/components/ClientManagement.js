import React, { useState } from 'react';

const ClientManagement = () => {
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const clients = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      company: 'Tech Solutions Ltda',
      city: 'São Paulo',
      tickets: { open: 2, total: 15 },
      lastContact: '2025-01-26',
      status: 'ativo',
      avatar: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnR8ZW58MHx8fGJsdWV8MTc1MzY0MTUwNnww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 2,
      name: 'Ana Costa',
      email: 'ana.costa@empresa.com',
      phone: '(21) 98888-8888',
      company: 'Digital Marketing Co.',
      city: 'Rio de Janeiro',
      tickets: { open: 1, total: 8 },
      lastContact: '2025-01-25',
      status: 'ativo',
      avatar: 'https://images.unsplash.com/photo-1600426976794-d223e39cc5d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxjdXN0b21lciUyMHN1cHBvcnR8ZW58MHx8fGJsdWV8MTc1MzY0MTUwNnww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 3,
      name: 'Carlos Mendes',
      email: 'carlos@startup.com',
      phone: '(31) 97777-7777',
      company: 'Startup Innovation',
      city: 'Belo Horizonte',
      tickets: { open: 0, total: 22 },
      lastContact: '2025-01-24',
      status: 'inativo',
      avatar: 'https://images.unsplash.com/photo-1716703742196-9986679eb03f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8Ymx1ZXwxNzUzNTM2MDk4fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 4,
      name: 'Lucia Ferreira',
      email: 'lucia.ferreira@corp.com',
      phone: '(41) 96666-6666',
      company: 'Corporate Solutions',
      city: 'Curitiba',
      tickets: { open: 3, total: 35 },
      lastContact: '2025-01-26',
      status: 'ativo',
      avatar: 'https://images.pexels.com/photos/7544433/pexels-photo-7544433.jpeg'
    }
  ];

  const NewClientModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card rounded-2xl border border-white/20 p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Cliente</h2>
          <button
            onClick={() => setShowNewClientModal(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                placeholder="Digite o nome completo"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Digite o email"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
              <input
                type="text"
                placeholder="Nome da empresa"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
              <input
                type="text"
                placeholder="Cidade"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
            <textarea
              rows="3"
              placeholder="Observações sobre o cliente"
              className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowNewClientModal(false)}
              className="btn-secondary px-6 py-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary px-6 py-3"
            >
              Cadastrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {clients.map((client) => (
        <div key={client.id} className="glass-card rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
              <p className="text-gray-600 text-sm">{client.company}</p>
              <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold ${
                client.status === 'ativo' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {client.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {client.email}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {client.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {client.city}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{client.tickets.open}</p>
              <p className="text-xs text-gray-500">Tickets Abertos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{client.tickets.total}</p>
              <p className="text-xs text-gray-500">Total de Tickets</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="p-2 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestão de Clientes</h1>
              <p className="text-gray-600">Gerencie informações dos seus clientes</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-xl transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-xl transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowNewClientModal(true)}
              className="btn-primary px-6 py-3 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Novo Cliente</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Clientes</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{clients.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Clientes Ativos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{clients.filter(c => c.status === 'ativo').length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tickets Abertos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{clients.reduce((acc, client) => acc + client.tickets.open, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Tickets</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{clients.reduce((acc, client) => acc + client.tickets.total, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <GridView />

      {/* Modal */}
      {showNewClientModal && <NewClientModal />}
    </div>
  );
};

export default ClientManagement;