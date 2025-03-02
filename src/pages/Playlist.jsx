import React, { useState, useEffect } from 'react';
import { FaPlay, FaTrash, FaHeart, FaHeadphones } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Playlist = () => {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist') || '[]');
    setPlaylist(storedPlaylist);
  }, []);

  const goToSongDetails = (songId) => {
    navigate(`/song/${songId}`);
  };

  const removeFromPlaylist = (songId) => {
    const updatedPlaylist = playlist.filter((song) => song.id !== songId);
    localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
    setPlaylist(updatedPlaylist);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-blue-400 to-teal-500 bg-clip-text text-transparent flex items-center justify-center gap-2 animate-pulse">
            <FaHeadphones className="text-teal-400" size={32} />
            My Playlist
          </h1>
          <p className="text-gray-300 mt-3 text-base md:text-lg font-medium">
            {playlist.length > 0
              ? `Enjoy your ${playlist.length} favorite tracks`
              : 'Your playlist is empty. Add some songs!'}
          </p>
        </motion.div>

        {/* Playlist Songs */}
        {playlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-400 text-lg md:text-xl font-medium py-10"
          >
            <FaHeart className="inline-block mb-2 text-teal-400" size={24} />
            <p>No songs in your playlist yet.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {playlist.map((song) => (
              <div
                key={song.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-500/20"
              >
                {/* Song Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-20 h-20 rounded-lg object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">{song.title}</h3>
                    <p className="text-sm text-gray-300 truncate">{song.artist}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => goToSongDetails(song.id)}
                    className="p-3 rounded-full bg-teal-500 bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    title="Play Song"
                  >
                    <FaPlay size={18} />
                  </button>
                  <button
                    onClick={() => removeFromPlaylist(song.id)}
                    className="p-3 rounded-full bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    title="Remove from Playlist"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Playlist;