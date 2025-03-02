import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaHeart, FaHeadphones } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SongCard = ({ song, onAddToPlaylist }) => {
  const [isAdded, setIsAdded] = useState(false); // Track if song is in playlist
  const [isPlaying, setIsPlaying] = useState(false); // Track inline playback state
  const audioRef = useRef(null); // Reference to audio element

  // Initialize audio when component mounts
  useEffect(() => {
    audioRef.current = new Audio(song.src);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [song.src]);

  // Handle inline play/stop
  const handleInlinePlayStop = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.error('Playback error:', err));
      setIsPlaying(true);
    }
  };

  // Handle adding/removing from playlist
  const handleAddToPlaylist = () => {
    setIsAdded(!isAdded);
    onAddToPlaylist(song);
  };

  return (
    <div className="group relative bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-500/20">
      {/* Song Cover and Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={song.cover} 
            alt={song.title} 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-md group-hover:brightness-75 transition-all duration-300" 
          />
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-teal-500 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-white truncate">{song.title}</h3>
          <p className="text-xs sm:text-sm text-gray-300 truncate">{song.artist}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-0 right-0 bottom-0 flex items-center gap-2 sm:gap-3 pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Inline Play/Stop Button */}
        <button
          onClick={handleInlinePlayStop}
          className="p-2 rounded-full bg-teal-500 bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-300 shadow-md hover:shadow-lg"
          title={isPlaying ? 'Stop' : 'Play Preview'}
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>

        {/* Navigate to Song Details */}
        <Link
          to={`/song/${song.id}`}
          className="p-2 rounded-full bg-gray-700 bg-opacity-90 hover:bg-teal-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
          title="Go to Song Details"
        >
          <FaHeadphones size={16} />
        </Link>

        {/* Add to Playlist Button */}
        <button
          onClick={handleAddToPlaylist}
          className={`p-2 rounded-full bg-gray-900 bg-opacity-80 hover:bg-gray-700 transition-colors duration-300 ${
            isAdded ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-red-500'
          }`}
          title={isAdded ? 'Remove from Playlist' : 'Add to Playlist'}
        >
          <FaHeart size={16} />
        </button>
      </div>
    </div>
  );
};

export default SongCard;