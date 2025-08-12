import { useEffect, useState } from 'react';
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Trailer from './Trailer';

export default function Hero() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await fetch('http://localhost:8000/api/movies/featured/' && 'https://movie-backend-6vqf.onrender.com/api/movies/featured/');
        const data = await response.json();
        setFeaturedMovies(data);
      } catch (error) {
        console.error('Error fetching featured movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedMovies();
  }, []);

  useEffect(() => {
    if (featuredMovies.length > 1 && !isHovering) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentMovie((prev) => (prev + 1) % featuredMovies.length);
          setIsTransitioning(false);
        }, 800);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [featuredMovies, isHovering]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovie((prev) => (prev + 1) % featuredMovies.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovie((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handleWatchNow = () => {
    setShowTrailer(true);
  };

  const handleMoreInfo = () => {
    const movie = featuredMovies[currentMovie];
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaStar className="text-yellow-500 animate-pulse" size={20} />
          </div>
        </div>
      </div>
    );
  }

  if (!featuredMovies.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-bold text-red-400 mb-2">No Featured Content</h2>
          <p className="text-gray-300">Check back later for updates</p>
        </div>
      </div>
    );
  }

  const movie = featuredMovies[currentMovie];

  return (
    <section 
      className="relative h-screen max-h-[900px] overflow-hidden bg-black text-white"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* BACKDROP IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {featuredMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              currentMovie === index ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
          >
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {movie.logo_url ? (
              <motion.img 
                src={movie.logo_url} 
                alt={movie.title} 
                className="h-20 sm:h-24 object-contain mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            ) : (
              <motion.h1 
                className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {movie.title}
              </motion.h1>
            )}

            <motion.div 
              className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full">
                <FaStar className="text-yellow-400" /> {movie.rating}
              </span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.genres.map(g => g.name).join(', ')}</span>
              <span>•</span>
              <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
            </motion.div>

            <motion.p 
              className="text-sm sm:text-base text-gray-100 leading-relaxed mb-6 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {movie.description}
            </motion.p>

            <motion.div 
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button 
                onClick={handleWatchNow}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
              >
                <FaPlay /> Watch Now
              </button>
              <button 
                onClick={handleMoreInfo}
                className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-105"
              >
                <FaInfoCircle /> More Info
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION ARROWS */}
      {featuredMovies.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 transition-all"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 transition-all"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* PROGRESS INDICATOR */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-3">
              {featuredMovies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentMovie(index);
                      setIsTransitioning(false);
                    }, 500);
                  }}
                  className="relative group"
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    currentMovie === index ? 'w-8 bg-yellow-400' : 'w-4 bg-white/40'
                  }`} />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-300 bg-black/40 px-3 py-1 rounded-full">
              {currentMovie + 1} / {featuredMovies.length}
            </div>
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      <AnimatePresence>
        {showTrailer && movie?.trailer_url && (
          <Trailer 
            youtubeId={movie.trailer_url}
            onClose={() => setShowTrailer(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}