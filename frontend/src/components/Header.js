import React from 'react';

const Header = () => {
  return (
    <header className="glass-card border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo ao AtendePro</h2>
            <p className="text-gray-600">Gerencie seus atendimentos de forma inteligente</p>
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
          <button className="flex items-center space-x-2 bg-white/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20 hover:bg-white/40 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AD</span>
            </div>
            <span className="hidden md:block text-gray-700 font-medium">Admin</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;