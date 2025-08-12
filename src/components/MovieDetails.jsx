import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaPlay, FaArrowLeft, FaDownload, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Trailer from './Trailer';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/movies/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch movie');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDownload = async () => {
    if (!movie?.download_url) {
      setDownloadError('No download link available');
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadError(null);

      const link = document.createElement('a');
      link.href = movie.download_url;
      link.setAttribute('download', `${movie.title.replace(/\s+/g, '_')}.mp4`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        const openedWindow = window.open(movie.download_url, '_blank');
        if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
          throw new Error('Popup blocked. Please allow popups for this site.');
        }
      }, 200);

    } catch (err) {
      setDownloadError(err.message || 'Failed to initiate download');
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return null;

  if (error) return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="text-center p-6 bg-red-900/50 rounded-xl">
        <FaExclamationTriangle className="text-4xl text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-400">Error Loading Movie</h2>
        <p className="text-gray-300 mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!movie) return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-300">Movie Not Found</h2>
        <p className="text-gray-500 mt-2">The requested movie could not be loaded</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-highlight hover:bg-highlight/90 rounded-lg transition-colors"
        >
          Browse Movies
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>

      <AnimatePresence>
        {downloadError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-red-900/80 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 backdrop-blur-sm border border-red-700"
          >
            <FaExclamationTriangle className="text-yellow-400" />
            <span>{downloadError}</span>
            <button 
              onClick={() => setDownloadError(null)} 
              className="ml-2 text-white hover:text-gray-200 text-lg"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative h-[70vh] min-h-[500px] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img 
          src={movie.backdrop} 
          alt={movie.title} 
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-10">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-3 text-shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {movie.title}
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap gap-4 text-lg items-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-1 bg-highlight/20 px-3 py-1 rounded-full">
                <FaStar className="text-yellow-400" /> 
                <span className="font-medium">{movie.rating.toFixed(1)}</span>
              </span>
              <span>{movie.release_year}</span>
              <span>•</span>
              <span className="bg-accent/20 px-2 py-1 rounded text-sm font-bold">
                {movie.is_4k ? '4K ULTRA HD' : 'HD'}
              </span>
            </motion.div>
          </div>
        </div>

        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 bg-black/60 hover:bg-black/80 p-3 rounded-full z-20 transition-all backdrop-blur-sm border border-gray-700"
        >
          <FaArrowLeft className="text-white text-xl" />
        </button>
      </motion.div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20">
        <motion.div 
          className="flex flex-col lg:flex-row gap-10 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="lg:w-1/3 flex flex-col">
            <div className="relative group">
              <motion.img 
                src={movie.poster} 
                alt={movie.title} 
                className="rounded-xl shadow-2xl w-full transform group-hover:scale-105 transition-transform duration-500"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
              />
              
              <div className="absolute top-3 left-3 right-3 flex justify-between">
                {movie.is_new && (
                  <span className="bg-highlight text-black text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    NEW RELEASE
                  </span>
                )}
                {movie.is_4k && (
                  <span className="bg-accent text-black text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    4K UHD
                  </span>
                )}
              </div>
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="bg-highlight hover:bg-highlight/90 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform group-hover:scale-110 transition-all"
                >
                  <FaPlay /> Watch Trailer
                </button>
              </div>
            </div>

            <motion.button 
              onClick={handleDownload}
              disabled={!movie.download_url || isDownloading}
              className={`mt-6 w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all relative overflow-hidden ${
                movie.download_url 
                  ? 'bg-gradient-to-r from-highlight to-highlight-dark text-black hover:shadow-highlight/30' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              } ${isDownloading ? 'opacity-90' : ''}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              whileHover={movie.download_url ? { scale: 1.02 } : {}}
            >
              {isDownloading ? (
                <>
                  <div className="absolute inset-0 bg-highlight/20 animate-pulse"></div>
                  <svg className="animate-spin h-6 w-6 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Preparing Download...</span>
                </>
              ) : (
                <>
                  <FaDownload className="text-lg" />
                  <span>{movie.download_url ? 'Download Movie' : 'Download Unavailable'}</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="lg:w-2/3">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-4">Movie Overview</h2>
              <p className="text-lg leading-relaxed mb-8 text-gray-300">{movie.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-highlight rounded-full"></span>
                    Production Details
                  </h3>
                  <div className="space-y-3">
                    <p>
                      <span className="text-gray-400 font-medium">Director:</span> 
                      <span className="ml-2">{movie.director || 'Not specified'}</span>
                    </p>
                    <p>
                      <span className="text-gray-400 font-medium">Cast:</span> 
                      <span className="ml-2">{movie.cast || 'Not specified'}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full"></span>
                    Technical Specifications
                  </h3>
                  <div className="space-y-3">
                    <p>
                      <span className="text-gray-400 font-medium">Duration:</span> 
                      <span className="ml-2">{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                    </p>
                    <p>
                      <span className="text-gray-400 font-medium">Audio:</span> 
                      <span className="ml-2">{movie.audio || 'Dolby Digital 5.1'}</span>
                    </p>
                    <p>
                      <span className="text-gray-400 font-medium">Genres:</span> 
                      <span className="ml-2">
                        {movie.genres.map((g, i) => (
                          <span key={g.id} className="mr-1">
                            {g.name}{i < movie.genres.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showTrailer && (
          <Trailer 
            youtubeId={movie.trailer_url} 
            downloadUrl={movie.download_url}
            onClose={() => setShowTrailer(false)} 
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiLz48ZyBvcGFjaXR5PSIwLjAyIj48cGF0aCBkPSJNMCwwIEwxMDAwLDEwMDAgTTEwMDAsMCBMMCwxMDAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')]"></div>
      </div>
    </div>
  );
}
