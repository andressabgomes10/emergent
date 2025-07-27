-- AtendePro Database Setup
-- Execute este script no Supabase SQL Editor

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários do sistema (não confundir com auth.users do Supabase)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'agent', 'customer')) DEFAULT 'agent',
    department VARCHAR(255),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    city VARCHAR(255),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('open', 'in_progress', 'closed')) DEFAULT 'open',
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens/comentários dos tickets
CREATE TABLE IF NOT EXISTS ticket_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE, -- Mensagem interna (apenas funcionários) ou pública
    attachment_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo
INSERT INTO users (id, email, name, role, department, status, phone) VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'admin@atendepro.com', 'Administrador', 'admin', 'Administração', 'active', '(11) 99999-0000'),
    ('550e8400-e29b-41d4-a716-446655440001', 'maria.santos@atendepro.com', 'Maria Santos', 'agent', 'Suporte Técnico', 'active', '(11) 99999-0001'),
    ('550e8400-e29b-41d4-a716-446655440002', 'pedro.lima@atendepro.com', 'Pedro Lima', 'agent', 'Suporte Técnico', 'active', '(11) 99999-0002'),
    ('550e8400-e29b-41d4-a716-446655440003', 'ana.silva@atendepro.com', 'Ana Silva', 'agent', 'Gestão de Clientes', 'active', '(11) 99999-0003')
ON CONFLICT (email) DO NOTHING;

INSERT INTO clients (id, name, email, phone, company, city, status) VALUES 
    ('660e8400-e29b-41d4-a716-446655440000', 'João Silva', 'joao.silva@empresa.com', '(11) 98888-0000', 'Tech Solutions Ltda', 'São Paulo', 'active'),
    ('660e8400-e29b-41d4-a716-446655440001', 'Ana Costa', 'ana.costa@empresa.com', '(21) 98888-0001', 'Digital Marketing Co.', 'Rio de Janeiro', 'active'),
    ('660e8400-e29b-41d4-a716-446655440002', 'Carlos Mendes', 'carlos@startup.com', '(31) 98888-0002', 'Startup Innovation', 'Belo Horizonte', 'active'),
    ('660e8400-e29b-41d4-a716-446655440003', 'Lucia Ferreira', 'lucia.ferreira@corp.com', '(41) 98888-0003', 'Corporate Solutions', 'Curitiba', 'active')
ON CONFLICT (email) DO NOTHING;

INSERT INTO tickets (id, client_id, subject, description, status, priority, assigned_to, created_by) VALUES 
    ('770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Problema com autenticação no sistema', 'Cliente não consegue fazer login após alteração de senha.', 'open', 'high', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000'),
    ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'Dúvida sobre faturamento', 'Cliente questiona valores cobrados no último mês.', 'in_progress', 'medium', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000'),
    ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'Solicitação de novo recurso', 'Cliente solicita implementação de relatório personalizado.', 'closed', 'low', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000'),
    ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'Sistema apresentando lentidão', 'Performance muito baixa durante horário comercial.', 'open', 'urgent', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Inserir algumas mensagens de exemplo
INSERT INTO ticket_messages (ticket_id, user_id, message, is_internal) VALUES 
    ('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Ticket recebido. Iniciando análise do problema.', false),
    ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Enviamos uma explicação detalhada por email.', false),
    ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'Recurso implementado e testado com sucesso.', false);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para usuários
CREATE POLICY "Usuários podem ver todos os dados" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Apenas admins podem modificar usuários" ON users FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Políticas de segurança para clientes
CREATE POLICY "Usuários autenticados podem ver clientes" ON clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem criar/editar clientes" ON clients FOR ALL TO authenticated USING (true);

-- Políticas de segurança para tickets
CREATE POLICY "Usuários autenticados podem ver tickets" ON tickets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem criar/editar tickets" ON tickets FOR ALL TO authenticated USING (true);

-- Políticas de segurança para mensagens
CREATE POLICY "Usuários autenticados podem ver mensagens" ON ticket_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuários autenticados podem criar mensagens" ON ticket_messages FOR INSERT TO authenticated WITH CHECK (true);

-- Habilitar Realtime para todas as tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE clients;
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE ticket_messages;