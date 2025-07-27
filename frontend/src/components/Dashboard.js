import React, { useState, useEffect } from 'react';
import { stats, tickets as ticketService, realtime } from '../lib/supabase';

const Dashboard = () => {
  const statsCards = [
    {
      title: 'Tickets Abertos',
      value: '24',
      change: '+12%',
      isPositive: false,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      bgColor: 'from-red-400 to-red-600'
    },
    {
      title: 'Em Andamento',
      value: '18',
      change: '+8%',
      isPositive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Resolvidos Hoje',
      value: '42',
      change: '+24%',
      isPositive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'from-green-400 to-green-600'
    },
    {
      title: 'Tempo Médio',
      value: '2.4h',
      change: '-15%',
      isPositive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: 'from-blue-400 to-blue-600'
    }
  ];

  const recentTickets = [
    { id: '#001', client: 'João Silva', subject: 'Problema com login', priority: 'alta', status: 'aberto', time: '2 min' },
    { id: '#002', client: 'Maria Santos', subject: 'Dúvida sobre faturamento', priority: 'média', status: 'andamento', time: '15 min' },
    { id: '#003', client: 'Pedro Costa', subject: 'Solicitação de recurso', priority: 'baixa', status: 'fechado', time: '1 hora' },
    { id: '#004', client: 'Ana Lima', subject: 'Bug na aplicação', priority: 'urgente', status: 'aberto', time: '5 min' },
    { id: '#005', client: 'Carlos Dias', subject: 'Configuração de conta', priority: 'média', status: 'andamento', time: '30 min' }
  ];

  return (
    <div className="space-y-6 fade-in-up">
      {/* Welcome Section */}
      <div className="glass-card rounded-2xl p-8 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-600/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard de Atendimento</h1>
            <p className="text-gray-600 text-lg">Monitore todos os seus atendimentos em tempo real</p>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1590650624342-f527904ca1b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8Ymx1ZXwxNzUzNTM2MDk4fDA&ixlib=rb-4.1.0&q=85"
              alt="Team collaboration"
              className="w-32 h-32 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="glass-card rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-semibold ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">vs. semana passada</span>
                </div>
              </div>
              <div className={`w-16 h-16 bg-gradient-to-br ${card.bgColor} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Tickets Recentes</h2>
            <button className="btn-primary text-sm px-4 py-2">
              Ver Todos
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Assunto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prioridade</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tempo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentTickets.map((ticket, index) => (
                <tr key={index} className="hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{ticket.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{ticket.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`status-badge priority-${ticket.priority}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`status-badge status-${ticket.status === 'aberto' ? 'open' : ticket.status === 'andamento' ? 'progress' : 'closed'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ticket.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/20 text-center hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Novo Ticket</h3>
          <p className="text-gray-600 text-sm mb-4">Criar um novo ticket de atendimento</p>
          <button className="btn-primary w-full">Criar Ticket</button>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20 text-center hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Novo Cliente</h3>
          <p className="text-gray-600 text-sm mb-4">Cadastrar um novo cliente</p>
          <button className="btn-secondary w-full">Cadastrar Cliente</button>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20 text-center hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Relatórios</h3>
          <p className="text-gray-600 text-sm mb-4">Visualizar relatórios detalhados</p>
          <button className="btn-secondary w-full">Ver Relatórios</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;