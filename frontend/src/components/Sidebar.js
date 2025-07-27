import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuth();

  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4l2 2 4-4" />
        </svg>
      )
    },
    {
      path: '/tickets',
      name: 'Tickets',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      path: '/clients',
      name: 'Clientes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      path: '/users',
      name: 'Usuários',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      path: '/whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
        </svg>
      )
    }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="w-16 min-h-screen glass-card border-r border-white/20 transition-all duration-300 ease-in-out slide-in-left relative">
      {/* Logo Cajá */}
      <div className="p-4 border-b border-white/10 flex justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-2 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.path} className="relative">
              <Link
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg border-l-4 border-orange-400'
                    : 'text-gray-600 hover:bg-white/30 hover:text-gray-800'
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {item.icon}
                </span>
              </Link>
              
              {/* Tooltip */}
              {hoveredItem === item.name && (
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-50 ml-2">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                    {item.name}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-4 left-2 right-2">
        <div className="space-y-2">
          {/* User Avatar */}
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-semibold text-sm">
                {user?.email ? user.email.substring(0, 2).toUpperCase() : 'AD'}
              </span>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            onMouseEnter={() => setHoveredItem('Sair')}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-12 h-12 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center transition-colors relative mx-auto"
          >
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            
            {/* Logout Tooltip */}
            {hoveredItem === 'Sair' && (
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-50 ml-2">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                  Sair
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;