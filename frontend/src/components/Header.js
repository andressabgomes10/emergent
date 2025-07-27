import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const getUserInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : 'AD';
  };
  
  return (
    <header className="glass-card border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo e Nome da Empresa */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cajá Atendimento</h1>
            </div>
          </div>
          
          {/* Informações Institucionais */}
          <div className="hidden lg:block border-l border-gray-300 pl-6">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Rua das Cajazeiras, 123 - Centro, São Paulo - SP</p>
              <p>CNPJ: 12.345.678/0001-90</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar tickets, clientes..."
              className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/40 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a8.38 8.38 0 010-11L21 2H15m-6 15l-3-3a8.38 8.38 0 010-11L9 2H6" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-white/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20 hover:bg-white/40 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{getUserInitials(user?.email)}</span>
              </div>
              <span className="hidden md:block text-gray-700 font-medium">{user?.email?.split('@')[0]}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl border border-white/20 py-2 z-50">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                  <p className="text-xs text-gray-500">Usuário Logado</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/20 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;