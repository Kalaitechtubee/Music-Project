import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-teal-900 to-gray-800 text-gray-300 py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Website Name */}
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Tamil Music Player
          </h3>

          {/* Copyright */}
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} Tamil Music Player. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;