import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whfmtlavhmalfsdestfsy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZm10bGF2aG1hbGZzZGV0ZnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDEwMjYsImV4cCI6MjA2OTIxNzAyNn0.KCCHHy3FgnsveExLYWpI8qJMmrHTYFwkkJmQ2H_M-cw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções de autenticação
export const auth = {
  // Login
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Registro
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Verificar usuário atual
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Escutar mudanças de autenticação
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Funções para Tickets
export const tickets = {
  // Listar todos os tickets
  getAll: async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        clients(name, email, company),
        users:assigned_to(name, email)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Buscar por status
  getByStatus: async (status) => {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        clients(name, email, company),
        users:assigned_to(name, email)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Criar novo ticket
  create: async (ticketData) => {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticketData])
      .select(`
        *,
        clients(name, email, company),
        users:assigned_to(name, email)
      `);
    return { data, error };
  },

  // Atualizar ticket
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        clients(name, email, company),
        users:assigned_to(name, email)
      `);
    return { data, error };
  },

  // Deletar ticket
  delete: async (id) => {
    const { data, error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);
    return { data, error };
  }
};

// Funções para Clientes
export const clients = {
  // Listar todos os clientes
  getAll: async () => {
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        tickets(count)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Criar novo cliente
  create: async (clientData) => {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select();
    return { data, error };
  },

  // Atualizar cliente
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  // Deletar cliente
  delete: async (id) => {
    const { data, error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
    return { data, error };
  }
};

// Funções para Usuários
export const users = {
  // Listar todos os usuários
  getAll: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Criar novo usuário
  create: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    return { data, error };
  },

  // Atualizar usuário
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  }
};

// Funções para Estatísticas
export const stats = {
  // Buscar estatísticas do dashboard
  getDashboardStats: async () => {
    const { data: ticketsOpen, error: errorOpen } = await supabase
      .from('tickets')
      .select('id')
      .eq('status', 'open');

    const { data: ticketsProgress, error: errorProgress } = await supabase
      .from('tickets')
      .select('id')
      .eq('status', 'in_progress');

    const { data: ticketsClosed, error: errorClosed } = await supabase
      .from('tickets')
      .select('id')
      .eq('status', 'closed');

    const { data: clientsCount, error: errorClients } = await supabase
      .from('clients')
      .select('id');

    return {
      ticketsOpen: ticketsOpen?.length || 0,
      ticketsProgress: ticketsProgress?.length || 0,
      ticketsClosed: ticketsClosed?.length || 0,
      clientsTotal: clientsCount?.length || 0,
      errors: { errorOpen, errorProgress, errorClosed, errorClients }
    };
  }
};

// Configurar Real-time subscriptions
export const realtime = {
  // Escutar mudanças nos tickets
  subscribeToTickets: (callback) => {
    return supabase
      .channel('tickets_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tickets'
      }, callback)
      .subscribe();
  },

  // Escutar mudanças nos clientes
  subscribeToClients: (callback) => {
    return supabase
      .channel('clients_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'clients'
      }, callback)
      .subscribe();
  }
};