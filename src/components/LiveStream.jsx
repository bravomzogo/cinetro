import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Netflix-style loading spinner
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Error display component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
    <div className="max-w-md text-center">
      <h2 className="text-2xl font-bold text-netflix-red mb-4">Error Loading Stream</h2>
      <p className="text-gray-300 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-netflix-red text-white rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Video controls component with memoization
const VideoControls = React.memo(({
  isPlaying,
  togglePlay,
  volume,
  handleVolumeChange,
  currentTime,
  duration,
  handleTimeChange,
  toggleFullscreen,
  isFullscreen,
  showControls
}) => {
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  if (!showControls) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-3"
    >
      {/* Improved Timeline/Progress Bar */}
      <div className="w-full group">
        <div className="relative h-1 bg-gray-600/50 rounded-full cursor-pointer">
          {/* Progress background */}
          <div 
            className="absolute top-0 left-0 h-full bg-netflix-red rounded-full"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          >
            {/* Progress handle (visible on hover) */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-netflix-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          {/* Actual input (invisible but interactive) */}
          <input
            type="range"
            min="0"
            max={duration || 1}
            value={currentTime}
            onChange={handleTimeChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Seek"
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
              aria-label="Volume"
            />
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              ) : (
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

// Video metadata component
const VideoMetadata = React.memo(({ title, created_at, genres, is_live, is_featured }) => (
  <div className="mb-8">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-bold text-white mb-4"
    >
      {title}
    </motion.h1>
    <div className="flex flex-wrap items-center gap-3 text-base md:text-lg">
      <span className="text-green-500 font-semibold">New</span>
      <span className="text-gray-300">{new Date(created_at).getFullYear()}</span>
      {genres?.length > 0 && (
        <span className="text-gray-300 border border-gray-300 px-2 py-0.5 rounded">
          {genres[0].name}
        </span>
      )}
      {is_live && (
        <span className="px-2 py-0.5 bg-red-600 rounded text-sm font-bold flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          LIVE
        </span>
      )}
      {is_featured && (
        <span className="px-2 py-0.5 bg-yellow-500 rounded text-sm font-bold">
          Featured
        </span>
      )}
    </div>
  </div>
));

const LiveStream = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // Fetch video data
  const fetchVideoData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/livestreams/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const selectedVideo = data.find(video => video.id === parseInt(id)) || data[0];
      setVideoData(selectedVideo);
    } catch (err) {
      console.error('Error fetching video data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      video.volume = volume;
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [volume]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Controls visibility timeout
  useEffect(() => {
    if (isMouseMoving && isPlaying) {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setIsMouseMoving(false);
      }, 3000);
    }
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isMouseMoving, isPlaying]);

  // Prevent right-click download
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'VIDEO') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error('Error attempting to play:', err);
          setError('Failed to play video. Please try again.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, []);

  const handleTimeChange = useCallback((e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
        setError('Failed to enter fullscreen. Please try again.');
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setIsMouseMoving(true);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    }
  }, [togglePlay]);

  // Keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} onRetry={fetchVideoData} />;
  if (!videoData) return <ErrorDisplay error="No stream data available" onRetry={fetchVideoData} />;

  return (
    <div 
      className="relative min-h-screen bg-black flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Backdrop Image with Netflix-style gradient overlay */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
        {videoData.backdrop && (
          <img
            src={videoData.backdrop}
            alt={videoData.title}
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
        )}
      </div>
      
      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 pt-16 pb-8 flex-grow">
        {/* Improved Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-30 flex items-center gap-2 group"
          aria-label="Go back"
        >
          <div className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/50 transition-colors">
            <svg 
              className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Back
          </span>
        </motion.button>

        {/* Video Metadata */}
        <div className="max-w-3xl mt-16">
          <VideoMetadata
            title={videoData.title}
            created_at={videoData.created_at}
            genres={videoData.genres}
            is_live={videoData.is_live}
            is_featured={videoData.is_featured}
          />
        </div>

        {/* Video Player Container */}
        <div 
          ref={videoContainerRef}
          className="relative mt-8 rounded-lg overflow-hidden shadow-2xl max-w-5xl mx-auto bg-black"
        >
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full aspect-video"
            poster={videoData.poster}
            title={videoData.title}
            controls={false}
            onClick={togglePlay}
            playsInline
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={videoData.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls */}
          <VideoControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            currentTime={currentTime}
            duration={duration}
            handleTimeChange={handleTimeChange}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            showControls={showControls}
          />

          {/* Play/Pause overlay */}
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 z-10 transition-opacity"
              aria-label="Play"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.button>
          )}
        </div>

        {/* Description and Additional Info */}
        <div className="max-w-3xl mx-auto mt-8">
          {videoData.description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 text-lg leading-relaxed mb-8"
            >
              {videoData.description}
            </motion.p>
          )}

          {/* Additional Info - Netflix style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
              <div className="space-y-2">
                <p><span className="text-gray-400">Genres:</span> {videoData.genres?.map(g => g.name).join(', ')}</p>
                <p><span className="text-gray-400">Released:</span> {new Date(videoData.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Status</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Stream:</span> {videoData.is_live ? (
                    <span className="text-red-500 flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      Live Now
                    </span>
                  ) : (
                    <span>Offline</span>
                  )}
                </p>
                {videoData.is_featured && (
                  <p><span className="text-gray-400">Featured:</span> Yes</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;