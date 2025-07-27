import { useState } from 'react'
import { 
  Home, 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  Bell, 
  User,
  Menu,
  X,
  Search,
  Plus
} from 'lucide-react'
import { 
  Button,
  Card, 
  CardHeader, 
  CardTitle, 
  CardIcon, 
  CardContent, 
  CardValue, 
  CardDescription,
  Input,
  Tooltip
} from './components/caja'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('home')

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'users', icon: Users, label: 'Clientes' },
    { id: 'messages', icon: MessageSquare, label: 'Mensagens' },
    { id: 'calendar', icon: Calendar, label: 'Agenda' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ]

  return (
    <div className="caja-layout font-inter">
      {/* Sidebar */}
      <aside className={`caja-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="caja-sidebar-logo">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="caja-sidebar-nav">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Tooltip key={item.id} content={item.label} position="right">
                <div
                  className={`caja-sidebar-item ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => setActiveItem(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={item.label}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveItem(item.id)
                    }
                  }}
                >
                  <Icon size={20} />
                </div>
              </Tooltip>
            )
          })}
        </nav>

        {/* User area */}
        <div className="caja-sidebar-user">
          <Tooltip content="Perfil do usuário" position="right">
            <div 
              className="caja-sidebar-item"
              role="button"
              tabIndex={0}
              aria-label="Perfil do usuário"
            >
              <User size={20} />
            </div>
          </Tooltip>
        </div>
      </aside>

      {/* Header */}
      <header className="caja-header">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div>
            <h1 className="caja-header-title">Cajá Atendimento</h1>
            <p className="caja-header-info">
              Rua das Flores, 123 - Centro | CNPJ: 12.345.678/0001-90
            </p>
          </div>
        </div>

        <div className="caja-header-actions">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="caja-main">
        <div className="max-w-7xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {sidebarItems.find(item => item.id === activeItem)?.label || 'Dashboard'}
            </h2>
            <p className="text-gray-600">
              Bem-vindo ao sistema de atendimento Cajá
            </p>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Atendimentos Hoje</CardTitle>
                <CardIcon color="orange">
                  <MessageSquare size={20} />
                </CardIcon>
              </CardHeader>
              <CardContent>
                <CardValue>24</CardValue>
                <CardDescription>+12% em relação a ontem</CardDescription>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Clientes Ativos</CardTitle>
                <CardIcon color="blue">
                  <Users size={20} />
                </CardIcon>
              </CardHeader>
              <CardContent>
                <CardValue>156</CardValue>
                <CardDescription>+8% este mês</CardDescription>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos</CardTitle>
                <CardIcon color="green">
                  <Calendar size={20} />
                </CardIcon>
              </CardHeader>
              <CardContent>
                <CardValue>8</CardValue>
                <CardDescription>Para hoje</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="primary" size="md">
              <Plus size={16} />
              Novo Atendimento
            </Button>
            <Button variant="secondary" size="md">
              <Users size={16} />
              Cadastrar Cliente
            </Button>
            <Button variant="tertiary" size="md">
              <Calendar size={16} />
              Agendar Reunião
            </Button>
          </div>

          {/* Form example */}
          <Card className="max-w-md" hover={false}>
            <CardTitle className="mb-4">Buscar Cliente</CardTitle>
            <div className="space-y-4">
              <Input
                label="Nome ou CPF"
                placeholder="Digite o nome ou CPF do cliente"
                required
              />
              <Input
                label="Telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                helper="Formato: (XX) XXXXX-XXXX"
              />
              <Button variant="primary" size="md" className="w-full">
                <Search size={16} />
                Buscar Cliente
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default App

