import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Verificar usuário atual
    const getInitialSession = async () => {
      const { data: { user }, error } = await auth.getCurrentUser();
      if (user && !error) {
        setUser(user);
      }
      setLoading(false);
    };

    getInitialSession();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (session) {
        setUser(session.user);
        setSession(session);
      } else {
        setUser(null);
        setSession(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Erro no login:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true);
      const { data, error } = await auth.signUp(email, password, userData);
      
      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await auth.signOut();
      
      if (error) {
        throw error;
      }

      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error('Erro no logout:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};