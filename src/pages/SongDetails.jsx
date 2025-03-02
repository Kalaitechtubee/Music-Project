import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { songsData } from '../data';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaHeart, FaVolumeUp, FaVolumeDown, FaTimes, FaHome, FaShareAlt, FaDownload } from 'react-icons/fa';

const SongDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const song = songsData.find((s) => s.id === parseInt(id));
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playlist, setPlaylist] = useState(() => JSON.parse(localStorage.getItem('playlist') || '[]'));

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.play().catch(err => console.error('Playback error:', err)) : audio.pause();
    }
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(formatTime(audio.currentTime));
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };
    
    const setAudioDuration = () => setDuration(formatTime(audio.duration));
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [song, volume]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const goToPreviousSong = () => {
    const currentIndex = songsData.findIndex((s) => s.id === song.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : songsData.length - 1;
    navigate(`/song/${songsData[prevIndex].id}`);
  };

  const goToNextSong = () => {
    const currentIndex = songsData.findIndex((s) => s.id === song.id);
    const nextIndex = currentIndex < songsData.length - 1 ? currentIndex + 1 : 0;
    navigate(`/song/${songsData[nextIndex].id}`);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(formatTime(newTime));
  };

  const handleVolumeChange = (increase) => {
    const newVolume = increase ? Math.min(volume + 0.1, 1) : Math.max(volume - 0.1, 0);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleCancel = () => {
    navigate('/');
    setIsPlaying(false);
  };

  const handleHome = () => {
    navigate('/');
    setIsPlaying(false);
  };

  const togglePlaylist = () => {
    const currentPlaylist = JSON.parse(localStorage.getItem('playlist') || '[]');
    const isInPlaylist = currentPlaylist.some((item) => item.id === song.id);
    const updatedPlaylist = isInPlaylist
      ? currentPlaylist.filter((item) => item.id !== song.id)
      : [...currentPlaylist, song];
    
    localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
    setPlaylist(updatedPlaylist);
  };

  const isInPlaylist = playlist.some((item) => item.id === song.id);

  if (!song) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-center text-gray-400 text-base sm:text-lg font-semibold"
      >
        Song not found!
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-[20rem] sm:max-w-md p-4 sm:p-6 border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <button
            onClick={handleCancel}
            className="text-gray-300 hover:text-white transition-colors duration-300 p-1 sm:p-2 hover:bg-gray-700 rounded-full"
          >
            <FaTimes size={18} sm={{ size: 22 }} />
          </button>
          <button
            onClick={handleHome}
            className="text-gray-300 hover:text-white transition-colors duration-300 p-1 sm:p-2 hover:bg-gray-700 rounded-full"
            title="Back to Home"
          >
            <FaHome size={18} sm={{ size: 22 }} />
          </button>
        </div>

        {/* Song Cover */}
        <div className="relative mb-6 sm:mb-8 mx-auto w-40 h-40 sm:w-56 sm:h-56">
          <motion.img
            src={song.cover}
            alt={song.title}
            className="w-full h-full rounded-full object-cover shadow-xl border-2 border-teal-500/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <svg className="absolute inset-0 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="transparent"
              stroke="#6b7280"
              strokeWidth="3 sm:4"
              strokeDasharray="301"
              strokeDashoffset={301 - (progress * 3.01)}
              className="transform -rotate-90 origin-center"
            />
          </svg>
          <button
            onClick={togglePlayPause}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-teal-500 bg-opacity-90 hover:bg-opacity-100 text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {isPlaying ? <FaPause size={18} sm={{ size: 24 }} /> : <FaPlay size={18} sm={{ size: 24 }} />}
          </button>
        </div>

        {/* Song Info */}
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-2 truncate">{song.title}</h1>
        <p className="text-gray-300 text-sm sm:text-base text-center mb-4 sm:mb-6 truncate">{song.artist}</p>

        {/* Progress Bar */}
        <div className="flex justify-between text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 sm:h-2 bg-gray-700 rounded-full cursor-pointer mb-4 sm:mb-6 accent-teal-500"
          style={{
            background: `linear-gradient(to right, #14b8a6 ${progress}%, #4b5563 ${progress}%)`,
          }}
        />

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={goToPreviousSong}
              className="p-2 sm:p-3 rounded-full bg-gray-700 bg-opacity-80 hover:bg-teal-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaStepBackward size={16} sm={{ size: 18 }} />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-3 sm:p-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isPlaying ? <FaPause size={20} sm={{ size: 24 }} /> : <FaPlay size={20} sm={{ size: 24 }} />}
            </button>
            <button
              onClick={goToNextSong}
              className="p-2 sm:p-3 rounded-full bg-gray-700 bg-opacity-80 hover:bg-teal-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaStepForward size={16} sm={{ size: 18 }} />
            </button>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
            <button
              onClick={() => handleVolumeChange(false)}
              className="p-1 sm:p-2 rounded-full hover:text-white transition-colors duration-300 hover:bg-gray-700"
            >
              <FaVolumeDown size={16} sm={{ size: 18 }} />
            </button>
            <span className="text-xs sm:text-sm font-medium w-10 sm:w-12 text-center">Vol: {(volume * 100).toFixed(0)}%</span>
            <button
              onClick={() => handleVolumeChange(true)}
              className="p-1 sm:p-2 rounded-full hover:text-white transition-colors duration-300 hover:bg-gray-700"
            >
              <FaVolumeUp size={16} sm={{ size: 18 }} />
            </button>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-between text-gray-300 text-sm px-1 sm:px-2">
          <button className="p-1 sm:p-2 rounded-full hover:text-white transition-colors duration-300 hover:bg-gray-700" title="Share">
            <FaShareAlt size={16} sm={{ size: 18 }} />
          </button>
          <button className="p-1 sm:p-2 rounded-full hover:text-white transition-colors duration-300 hover:bg-gray-700" title="Download">
            <FaDownload size={16} sm={{ size: 18 }} />
          </button>
          <button
            onClick={togglePlaylist}
            className={`p-1 sm:p-2 rounded-full transition-colors duration-300 hover:bg-gray-700 ${
              isInPlaylist ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-red-500'
            }`}
            title={isInPlaylist ? "Remove from Playlist" : "Add to Playlist"}
          >
            <FaHeart size={16} sm={{ size: 18 }} />
          </button>
        </div>

        <audio ref={audioRef} src={song.src} />
      </div>
    </motion.div>
  );
};

export default SongDetails;