import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import Playlist from './pages/Playlist';
import SongDetails from './pages/SongDetails';
import Footer from './components/Footer'; // Import the new Footer component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:catName" element={<Category />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/song/:id" element={<SongDetails />} />
            </Routes>
          </motion.div>
        </main>

     
        

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;