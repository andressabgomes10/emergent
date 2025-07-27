import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { 
  BarChart3, 
  Users, 
  Ticket, 
  MessageSquare, 
  Settings, 
  Search,
  Bell,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import './App.css';

// Mock data
const mockStats = {
  ticketsOpen: 24,
  ticketsProgress: 18,
  ticketsClosed: 156,
  clientsTotal: 89
};

const mockTickets = [
  {
    id: '12345678',
    client: 'João Silva',
    subject: 'Problema com login no sistema',
    priority: 'high',
    status: 'open',
    createdAt: '2025-01-27T10:30:00Z'
  },
  {
    id: '12345679',
    client: 'Maria Santos',
    subject: 'Solicitação de nova funcionalidade',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2025-01-27T09:15:00Z'
  },
  {
    id: '12345680',
    client: 'Pedro Costa',
    subject: 'Erro na geração de relatórios',
    priority: 'urgent',
    status: 'open',
    createdAt: '2025-01-27T08:45:00Z'
  },
  {
    id: '12345681',
    client: 'Ana Oliveira',
    subject: 'Dúvida sobre configuração',
    priority: 'low',
    status: 'closed',
    createdAt: '2025-01-26T16:20:00Z'
  },
  {
    id: '12345682',
    client: 'Carlos Ferreira',
    subject: 'Integração com WhatsApp',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2025-01-26T14:10:00Z'
  }
];

// Components
const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/', active: true },
    { icon: Ticket, label: 'Tickets', path: '/tickets' },
    { icon: Users, label: 'Clientes', path: '/clients' },
    { icon: Users, label: 'Usuários', path: '/users' },
    { icon: MessageSquare, label: 'WhatsApp', path: '/whatsapp' },
    { icon: Settings, label: 'Configurações', path: '/settings' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-16 xl:w-64
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        glass border-r border-border/50 animate-slide-in-left
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <div className="hidden xl:block">
              <h1 className="text-lg font-bold text-gradient">Cajá</h1>
              <p className="text-xs text-muted-foreground">Atendimento</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1 mt-4">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={item.active ? "default" : "ghost"}
              className={`
                w-full justify-start gap-3 h-12
                ${item.active ? 'bg-primary text-primary-foreground shadow-md' : ''}
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden xl:block">{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-4 left-2 right-2">
          <div className="glass rounded-xl p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
              <div className="hidden xl:block flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@caja.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ onMenuClick, darkMode, onToggleDarkMode }) => {
  return (
    <header className="glass border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden lg:block">
            <h2 className="text-2xl font-bold text-gradient">Dashboard de Atendimento</h2>
            <p className="text-sm text-muted-foreground">Monitore todos os seus atendimentos em tempo real</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input
              placeholder="Buscar tickets, clientes..."
              className="pl-10 w-64 glass"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
          </Button>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ title, value, change, isPositive, icon: Icon, bgColor }) => (
  <Card className="hover-lift">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold mb-3">{value}</p>
          <div className="flex items-center space-x-2">
            <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
              {change}
            </Badge>
            <span className="text-xs text-muted-foreground">vs. semana passada</span>
          </div>
        </div>
        <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center text-white shadow-lg hover-scale`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const TicketRow = ({ ticket }) => {
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} horas`;
    return `${Math.floor(diffInMinutes / 1440)} dias`;
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'low': return 'secondary';
      case 'medium': return 'default';
      case 'high': return 'destructive';
      case 'urgent': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in_progress': return 'default';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open': return 'Aberto';
      case 'in_progress': return 'Em Andamento';
      case 'closed': return 'Fechado';
      default: return status;
    }
  };

  return (
    <tr className="hover:bg-muted/50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-primary">#{ticket.id}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium">{ticket.client}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm">{ticket.subject}</span>
      </td>
      <td className="px-6 py-4">
        <Badge variant={getPriorityVariant(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Badge variant={getStatusVariant(ticket.status)}>
          {getStatusLabel(ticket.status)}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-muted-foreground">
          {formatTimeAgo(ticket.createdAt)}
        </span>
      </td>
    </tr>
  );
};

const Dashboard = () => {
  const statsCards = [
    {
      title: 'Tickets Abertos',
      value: mockStats.ticketsOpen.toString(),
      change: '+12%',
      isPositive: false,
      icon: AlertCircle,
      bgColor: 'bg-gradient-to-br from-red-400 to-red-600'
    },
    {
      title: 'Em Andamento',
      value: mockStats.ticketsProgress.toString(),
      change: '+8%',
      isPositive: true,
      icon: Clock,
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      title: 'Resolvidos',
      value: mockStats.ticketsClosed.toString(),
      change: '+24%',
      isPositive: true,
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
      title: 'Total Clientes',
      value: mockStats.clientsTotal.toString(),
      change: '+15%',
      isPositive: true,
      icon: Users,
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
        <CardContent className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-3">
                Dashboard de Atendimento
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitore todos os seus atendimentos em tempo real com insights avançados
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Atualizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tickets Recentes</CardTitle>
              <CardDescription>Últimos tickets criados no sistema</CardDescription>
            </div>
            <Button size="sm">Ver Todos</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Assunto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Prioridade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockTickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover-lift cursor-pointer">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto mb-4 flex items-center justify-center hover-scale">
              <Plus className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="mb-2">Novo Ticket</CardTitle>
            <CardDescription className="mb-4">Criar um novo ticket de atendimento</CardDescription>
            <Button className="w-full">Criar Ticket</Button>
          </CardContent>
        </Card>

        <Card className="text-center hover-lift cursor-pointer">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center hover-scale">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="mb-2">Novo Cliente</CardTitle>
            <CardDescription className="mb-4">Cadastrar um novo cliente</CardDescription>
            <Button variant="secondary" className="w-full">Cadastrar Cliente</Button>
          </CardContent>
        </Card>

        <Card className="text-center hover-lift cursor-pointer">
          <CardContent className="p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center hover-scale">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="mb-2">Relatórios</CardTitle>
            <CardDescription className="mb-4">Visualizar relatórios detalhados</CardDescription>
            <Button variant="secondary" className="w-full">Ver Relatórios</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header 
            onMenuClick={toggleSidebar}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
          
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tickets" element={<div>Tickets Page</div>} />
              <Route path="/clients" element={<div>Clients Page</div>} />
              <Route path="/users" element={<div>Users Page</div>} />
              <Route path="/whatsapp" element={<div>WhatsApp Page</div>} />
              <Route path="/settings" element={<div>Settings Page</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

