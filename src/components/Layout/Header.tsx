import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-6 w-6 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm leading-none">E</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                Edviron Dashboard
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/transactions"
              className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Transactions
            </Link>
            <Link
              to="/schools"
              className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Schools
            </Link>
            <Link
              to="/status-check"
              className="text-gray-700 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Status Check
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user?.name ?? 'User'}</span>
                  {user?.role && (
                    <span className="text-[11px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {user.role}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

