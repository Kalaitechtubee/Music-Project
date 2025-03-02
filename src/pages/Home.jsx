import React, { useState } from 'react';
import { songsData } from '../data';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(JSON.parse(localStorage.getItem('playlist') || '[]'));

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-blue-400 to-teal-500 bg-clip-text text-transparent animate-pulse">
            Tamil Hits
          </h1>
          <p className="text-gray-300 mt-3 text-base md:text-lg font-medium">
            Curated Tamil masterpieces for your listening pleasure
          </p>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {songsData.map((song) => {
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
        </div>
      </div>

      {/* Hidden Audio Element (Optional) */}
      <audio className="hidden" controls />
    </div>
  );
};

export default Home;