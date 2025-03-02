import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { songsData, categories } from '../data';
import { FaPlay, FaHeart, FaFilter, FaHeadphones } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Category = () => {
  const { catName } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(JSON.parse(localStorage.getItem('playlist') || '[]'));

  const filteredSongs = catName === 'All' 
    ? songsData 
    : songsData.filter((song) => song.category === catName);

  const goToSongDetails = (songId) => {
    navigate(`/song/${songId}`);
  };

  const togglePlaylist = (song) => {
    const currentPlaylist = JSON.parse(localStorage.getItem('playlist') || '[]');
    const isInPlaylist = currentPlaylist.some((item) => item.id === song.id);
    const updatedPlaylist = isInPlaylist
      ? currentPlaylist.filter((item) => item.id !== song.id)
      : [...currentPlaylist, song];
    
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
            {catName} Songs
          </h1>
          <p className="text-gray-300 mt-3 text-base md:text-lg font-medium">
            {filteredSongs.length} {catName === 'All' ? 'total tracks' : 'tracks in this category'}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <a
              key={category}
              href={`/category/${category}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 shadow-md ${
                catName === category
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-800 bg-opacity-80 text-gray-300 hover:bg-teal-600 hover:text-white'
              }`}
            >
              <FaFilter size={14} />
              {category}
            </a>
          ))}
        </motion.div>

        {/* Songs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredSongs.map((song) => {
            const isInPlaylist = playlist.some((item) => item.id === song.id);

            return (
              <div
                key={song.id}
                className="group relative bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-500/20"
              >
                {/* Song Cover */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-48 object-cover group-hover:brightness-75 transition-all duration-300"
                  />
                  {/* Play Button */}
                  <button
                    onClick={() => goToSongDetails(song.id)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-teal-500 bg-opacity-90 hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaPlay size={22} className="text-white" />
                  </button>
                </div>

                {/* Song Info */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white truncate">{song.title}</h3>
                  <p className="text-sm text-gray-300 truncate">{song.artist}</p>
                </div>

                {/* Add to Playlist Button */}
                <button
                  onClick={() => togglePlaylist(song)}
                  className={`absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-80 transition-colors duration-300 hover:bg-gray-700 ${
                    isInPlaylist ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-red-500'
                  }`}
                >
                  <FaHeart size={18} />
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Category;