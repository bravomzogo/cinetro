import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaDownload, FaChevronDown, FaTv, FaArrowLeft, FaShare } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

export default function TVShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSeason, setActiveSeason] = useState(1);
  const [expandedEpisode, setExpandedEpisode] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tvshows/${id}/` && `https://movie-backend-6vqf.onrender.com/api/tvshows/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch TV show');
        const data = await response.json();
        setShow(data);
        if (data.seasons?.length > 0) {
          setActiveSeason(data.seasons[0].season_number);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (detailsRef.current) {
        const rect = detailsRef.current.getBoundingClientRect();
        setIsScrolled(rect.top < -100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareShow = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${show.title}`,
        text: `I'm watching ${show.title} on our streaming platform.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleEpisode = (episodeId) => {
    setExpandedEpisode(expandedEpisode === episodeId ? null : episodeId);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-white text-2xl">Loading show details...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-red-500 text-2xl">Error: {error}</div>
    </div>
  );

  if (!show) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-2xl">TV Show not found</div>
    </div>
  );

  const currentSeason = show.seasons?.find(s => s.season_number === activeSeason);

  return (
    <div className="min-h-screen bg-gray-900 text-white" ref={detailsRef}>
      {/* Floating Navigation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -50 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 shadow-lg ${isScrolled ? 'block' : 'hidden'}`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold truncate max-w-md text-center">{show.title}</h1>
          <div className="flex items-center gap-1">
            <button onClick={shareShow} className="text-gray-300 hover:text-white transition-colors">
              <FaShare />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/30 to-transparent z-10" />
        <img
          src={show.backdrop || '/placeholder-backdrop.jpg'}
          alt={show.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        
        {/* Floating Info */}
        <div className="container mx-auto px-4 sm:px-6 relative z-20 h-full flex items-end pb-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{show.title}</h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{show.rating?.toFixed(1) || 'N/A'}</span>
                </div>
                
                <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  <MdDateRange className="mr-1" />
                  <span>{show.release_year}</span>
                </div>
                
                <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  <FaTv className="mr-1" />
                  <span>{show.seasons?.length || 0} Season{show.seasons?.length !== 1 ? 's' : ''}</span>
                </div>
                
                {show.runtime && (
                  <div className="flex items-center bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    <IoMdTime className="mr-1" />
                    <span>{show.runtime} min</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {show.genres.map(genre => (
                  <motion.span 
                    key={genre.id}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </motion.span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareShow}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-medium flex items-center gap-2 transition-all"
                >
                  <FaShare />
                  <span>Share</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full font-medium flex items-center gap-2 transition-all"
                >
                  <FaArrowLeft />
                  <span>Back to Shows</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed">{show.description}</p>
        </motion.div>

        {/* Cast */}
        {show.cast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Cast</h2>
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-gray-300 whitespace-pre-line">{show.cast}</p>
            </div>
          </motion.div>
        )}

        {/* Seasons Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Seasons</h2>
          <div className="flex flex-wrap gap-3">
            {show.seasons?.map(season => (
              <motion.button
                key={season.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSeason(season.season_number)}
                className={`px-5 py-2 rounded-full transition-all ${activeSeason === season.season_number 
                  ? 'bg-yellow-600 text-black font-medium shadow-lg shadow-yellow-600/30' 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                Season {season.season_number}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Episodes */}
        {currentSeason && currentSeason.episodes?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
              Season {currentSeason.season_number} Episodes
            </h2>
            
            <div className="space-y-4">
              {currentSeason.episodes.map((episode, index) => (
                <motion.div 
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-800/50 hover:bg-gray-800/70 transition-colors backdrop-blur-sm"
                >
                  <button 
                    onClick={() => toggleEpisode(episode.id)}
                    className="w-full flex justify-between items-center p-5 transition-all"
                  >
                    <div className="text-left flex items-center gap-4">
                      <div className="text-yellow-400 font-bold text-lg w-8 text-right">
                        {episode.episode_number}.
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {episode.title || 'Untitled Episode'}
                        </h3>
                        {episode.runtime && (
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <IoMdTime className="mr-1" />
                            <span>{episode.runtime} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <FaChevronDown className={`transition-transform ${expandedEpisode === episode.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedEpisode === episode.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-gray-700">
                          {episode.description && (
                            <p className="text-gray-300 mb-4">{episode.description}</p>
                          )}
                          
                          {episode.download_links?.length > 0 ? (
                            <div>
                              <h4 className="font-medium mb-3 text-gray-400">Download Options:</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {episode.download_links.map(link => (
                                  <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <FaDownload className="text-yellow-400" />
                                      <span className="font-medium">{link.quality_display}</span>
                                    </div>
                                    <span className="text-sm text-gray-400">{link.source || 'Unknown source'}</span>
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-400 text-center py-4">No download links available for this episode</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}