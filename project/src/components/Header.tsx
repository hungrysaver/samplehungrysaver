import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#EAA640] to-[#EBE7E1] shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side navigation */}
          <nav className="flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-800 hover:text-gray-900 transition-colors font-bold"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('overview')}
              className="text-gray-800 hover:text-gray-900 transition-colors font-bold"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-800 hover:text-gray-900 transition-colors font-bold"
            >
              Contact
            </button>
            {currentUser && (
              <Link to="/dashboard" className="text-gray-800 hover:text-gray-900 transition-colors font-bold">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side - User info and logo */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-800 font-medium">
                  {currentUser.email} {userRole && `(${userRole})`}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors font-bold"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-[#EAA640] text-white px-4 py-2 rounded-md hover:bg-[#d4952e] transition-colors font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#EAA640] text-white px-4 py-2 rounded-md hover:bg-[#d4952e] transition-colors font-bold"
                >
                  Register
                </Link>
              </div>
            )}
            
            {/* Logo on the right */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://res-console.cloudinary.com/dlvc4lbod/thumbnails/v1/image/upload/v1750328620/bG9nb19yeDRoNnk=/template_primary/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvZl9wbmc="
                alt="Hungry Saver Logo"
                className="h-12 w-auto"
              />
              <span className="text-gray-800 font-bold text-lg">Hungry Saver</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;