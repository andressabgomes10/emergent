import React, { useState } from 'react';

const TicketManagement = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  const tickets = [
    {
      id: '#TK-001',
      client: 'João Silva',
      subject: 'Problema com autenticação no sistema',
      description: 'Cliente não consegue fazer login após alteração de senha.',
      priority: 'alta',
      status: 'aberto',
      assignee: 'Maria Santos',
      created: '2025-01-26 14:30',
      updated: '2025-01-26 15:45'
    },
    {
      id: '#TK-002',
      client: 'Ana Costa',
      subject: 'Dúvida sobre faturamento',
      description: 'Cliente questiona valores cobrados no último mês.',
      priority: 'média',
      status: 'andamento',
      assignee: 'Pedro Lima',
      created: '2025-01-26 10:15',
      updated: '2025-01-26 16:20'
    },
    {
      id: '#TK-003',
      client: 'Carlos Mendes',
      subject: 'Solicitação de novo recurso',
      description: 'Cliente solicita implementação de relatório personalizado.',
      priority: 'baixa',
      status: 'fechado',
      assignee: 'Ana Silva',
      created: '2025-01-25 09:30',
      updated: '2025-01-26 11:00'
    },
    {
      id: '#TK-004',
      client: 'Lucia Ferreira',
      subject: 'Sistema apresentando lentidão',
      description: 'Performance muito baixa durante horário comercial.',
      priority: 'urgente',
      status: 'aberto',
      assignee: 'João Santos',
      created: '2025-01-26 16:45',
      updated: '2025-01-26 16:45'
    }
  ];

  const tabs = [
    { id: 'all', label: 'Todos', count: tickets.length },
    { id: 'open', label: 'Abertos', count: tickets.filter(t => t.status === 'aberto').length },
    { id: 'progress', label: 'Em Andamento', count: tickets.filter(t => t.status === 'andamento').length },
    { id: 'closed', label: 'Fechados', count: tickets.filter(t => t.status === 'fechado').length }
  ];

  const getFilteredTickets = () => {
    if (selectedTab === 'all') return tickets;
    if (selectedTab === 'open') return tickets.filter(t => t.status === 'aberto');
    if (selectedTab === 'progress') return tickets.filter(t => t.status === 'andamento');
    if (selectedTab === 'closed') return tickets.filter(t => t.status === 'fechado');
    return tickets;
  };

  const NewTicketModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Ticket</h2>
          <button
            onClick={() => setShowNewTicketModal(false)}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cliente</label>
              <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Selecione um cliente</option>
                <option>João Silva</option>
                <option>Ana Costa</option>
                <option>Carlos Mendes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prioridade</label>
              <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
                <option>Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Assunto</label>
            <input
              type="text"
              placeholder="Digite o assunto do ticket"
              className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
            <textarea
              rows="4"
              placeholder="Descreva o problema ou solicitação"
              className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Responsável</label>
            <select className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Auto-atribuir</option>
              <option>Maria Santos</option>
              <option>Pedro Lima</option>
              <option>Ana Silva</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowNewTicketModal(false)}
              className="btn-secondary px-6 py-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary px-6 py-3"
            >
              Criar Ticket
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestão de Tickets</h1>
              <p className="text-gray-600">Gerencie todos os tickets de atendimento</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="btn-primary px-6 py-3 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Novo Ticket</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all relative ${
                selectedTab === tab.id
                  ? 'text-blue-600 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/20'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
              {selectedTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {getFilteredTickets().map((ticket, index) => (
          <div key={index} className="glass-card rounded-2xl p-6 border border-white/20 hover:transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-lg font-bold text-blue-600">{ticket.id}</span>
                  <span className={`status-badge priority-${ticket.priority}`}>
                    {ticket.priority}
                  </span>
                  <span className={`status-badge status-${ticket.status === 'aberto' ? 'open' : ticket.status === 'andamento' ? 'progress' : 'closed'}`}>
                    {ticket.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.subject}</h3>
                <p className="text-gray-600 mb-4">{ticket.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Cliente:</span>
                    <span className="ml-2 font-semibold text-gray-800">{ticket.client}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Responsável:</span>
                    <span className="ml-2 font-semibold text-gray-800">{ticket.assignee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Atualizado:</span>
                    <span className="ml-2 font-semibold text-gray-800">{ticket.updated}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="p-2 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showNewTicketModal && <NewTicketModal />}
    </div>
  );
};

export default TicketManagement;