import React, { useState } from 'react';

const UserManagement = () => {
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Maria Santos',
      email: 'maria.santos@atendepro.com',
      role: 'admin',
      department: 'Administração',
      status: 'ativo',
      lastLogin: '2025-01-26 16:30',
      ticketsAssigned: 8,
      ticketsResolved: 142,
      avatar: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnR8ZW58MHx8fGJsdWV8MTc1MzY0MTUwNnww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 2,
      name: 'Pedro Lima',
      email: 'pedro.lima@atendepro.com',
      role: 'agente',
      department: 'Suporte Técnico',
      status: 'ativo',
      lastLogin: '2025-01-26 15:45',
      ticketsAssigned: 12,
      ticketsResolved: 89,
      avatar: 'https://images.unsplash.com/photo-1600426976794-d223e39cc5d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxjdXN0b21lciUyMHN1cHBvcnR8ZW58MHx8fGJsdWV8MTc1MzY0MTUwNnww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 3,
      name: 'Ana Silva',
      email: 'ana.silva@atendepro.com',
      role: 'gestao',
      department: 'Gestão de Clientes',
      status: 'ativo',
      lastLogin: '2025-01-26 14:20',
      ticketsAssigned: 5,
      ticketsResolved: 67,
      avatar: 'https://images.unsplash.com/photo-1590650624342-f527904ca1b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8Ymx1ZXwxNzUzNTM2MDk4fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 4,
      name: 'João Santos',
      email: 'joao.santos@atendepro.com',
      role: 'agente',
      department: 'Suporte Técnico',
      status: 'inativo',
      lastLogin: '2025-01-24 10:15',
      ticketsAssigned: 3,
      ticketsResolved: 45,
      avatar: 'https://images.unsplash.com/photo-1716703742196-9986679eb03f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8Ymx1ZXwxNzUzNTM2MDk4fDA&ixlib=rb-4.1.0&q=85'
    }
  ];

  const roleLabels = {
    admin: { label: 'Administrador', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-700', bgColor: 'bg-purple-100' },
    agente: { label: 'Agente', color: 'from-blue-400 to-blue-600', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
    gestao: { label: 'Gestão', color: 'from-green-400 to-green-600', textColor: 'text-green-700', bgColor: 'bg-green-100' }
  };

  const NewUserModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Usuário</h2>
          <button
            onClick={() => setShowNewUserModal(false)}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Função</label>
              <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Administrador</option>
                <option>Agente</option>
                <option>Gestão</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Departamento</label>
              <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Suporte Técnico</option>
                <option>Gestão de Clientes</option>
                <option>Administração</option>
                <option>Vendas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                placeholder="Digite a senha"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Senha</label>
              <input
                type="password"
                placeholder="Confirme a senha"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowNewUserModal(false)}
              className="btn-secondary px-6 py-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary px-6 py-3"
            >
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestão de Usuários</h1>
              <p className="text-gray-600">Gerencie usuários e permissões do sistema</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewUserModal(true)}
            className="btn-primary px-6 py-3 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Novo Usuário</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Usuários</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{users.length}</p>
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
              <p className="text-gray-600 text-sm font-medium">Usuários Ativos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{users.filter(u => u.status === 'ativo').length}</p>
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
              <p className="text-gray-600 text-sm font-medium">Agentes</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{users.filter(u => u.role === 'agente').length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Administradores</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-gray-800">Lista de Usuários</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Usuário</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Função</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Departamento</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Último Login</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Performance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleLabels[user.role].bgColor} ${roleLabels[user.role].textColor}`}>
                      {roleLabels[user.role].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.department}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-800 font-semibold">{user.ticketsAssigned} atribuídos</p>
                      <p className="text-gray-600">{user.ticketsResolved} resolvidos</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-2 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(roleLabels).map(([role, config]) => {
          const roleUsers = users.filter(u => u.role === role);
          return (
            <div key={role} className="glass-card rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{config.label}</h3>
                <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{roleUsers.length}</span>
                </div>
              </div>
              <div className="space-y-3">
                {roleUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.department}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      user.status === 'ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                ))}
                {roleUsers.length > 3 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      +{roleUsers.length - 3} mais
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showNewUserModal && <NewUserModal />}
    </div>
  );
};

export default UserManagement;