import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMusic, FaList, FaHeadphones } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-teal-900 to-gray-800 p-4 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FaHeadphones className="text-teal-500" />
          <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Tamil Music Player
          </span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
          >
            <FaHome className="text-teal-400" size={18} />
            <span className="text-base font-medium">Home</span>
          </Link>
          <Link 
            to="/category/All" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
          >
            <FaMusic className="text-teal-400" size={18} />
            <span className="text-base font-medium">Categories</span>
          </Link>
          <Link 
            to="/playlist" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
          >
            <FaList className="text-teal-400" size={18} />
            <span className="text-base font-medium">Playlist</span>
          </Link>
          <Link 
            to="/song/1" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
          >
            <FaHeadphones className="text-teal-400" size={18} />
            <span className="text-base font-medium">Song Details</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-200 hover:text-teal-400 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-1 bg-current rounded transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-1 bg-current rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-1 bg-current rounded transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-800 bg-opacity-95 rounded-lg p-4 shadow-lg">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaHome className="text-teal-400" size={18} />
            <span className="text-base font-medium">Home</span>
          </Link>
          <Link 
            to="/category/All" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaMusic className="text-teal-400" size={18} />
            <span className="text-base font-medium">Categories</span>
          </Link>
          <Link 
            to="/playlist" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaList className="text-teal-400" size={18} />
            <span className="text-base font-medium">Playlist</span>
          </Link>
          <Link 
            to="/song/1" 
            className="flex items-center gap-2 text-gray-200 hover:text-teal-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-700/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaHeadphones className="text-teal-400" size={18} />
            <span className="text-base font-medium">Song Details</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;