import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaTv, FaPlay } from 'react-icons/fa';
import Trailer from './Trailer';

export default function TVShowCard({ show }) {
  const [showTrailer, setShowTrailer] = useState(false);

  // Format trailer_url to a full YouTube URL if it's just a video ID
  const trailerUrl = show.trailer_url && !show.trailer_url.startsWith('http')
    ? `https://www.youtube.com/watch?v=${show.trailer_url}`
    : show.trailer_url;

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative group overflow-hidden rounded-lg shadow-lg"
      >
        <Link to={`/tv/${show.id}`} className="block">
          <div className="aspect-[2/3] relative overflow-hidden">
            <img
              src={show.poster || '/placeholder-tv.jpg'}
              alt={show.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">View Details</span>
              </div>
              {trailerUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTrailer(true);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all"
                >
                  <FaPlay />
                  <span>Watch Trailer</span>
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="p-3 bg-gray-900/80">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{show.title}</h3>
            <div className="flex items-center justify-between mt-2 text-xs">
              <div className="flex items-center gap-1 text-yellow-500">
                <FaStar size={12} />
                <span>{show.rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <FaTv size={12} />
                <span>Season {show.seasons}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      <AnimatePresence>
        {showTrailer && (
          <Trailer 
            youtubeId={trailerUrl.includes('youtube.com') ? trailerUrl.split('v=')[1] : trailerUrl}
            onClose={() => setShowTrailer(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}