import { useEffect, useState } from 'react';
import { FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Trailer({ youtubeId, downloadUrl, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: '90vw',
    height: '50.625vw' // 16:9 aspect ratio
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Adjust size for larger screens
    const updateSize = () => {
      if (window.innerWidth >= 1536) { // 2xl screens
        setDimensions({
          width: '1000px',
          height: '562.5px' // 16:9
        });
      } else if (window.innerWidth >= 1280) { // xl screens
        setDimensions({
          width: '900px',
          height: '506.25px'
        });
      } else {
        setDimensions({
          width: '90vw',
          height: '50.625vw'
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateSize);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="relative flex flex-col"
          style={{
            width: dimensions.width,
            maxWidth: '95vw',
            maxHeight: '95vh'
          }}
        >
          <button 
            onClick={onClose}
            className="absolute -top-10 right-0 z-50 text-white hover:text-highlight transition-all bg-black/50 rounded-full p-3 hover:bg-black/70 backdrop-blur-sm"
            aria-label="Close trailer"
          >
            <FaTimes className="text-xl sm:text-2xl" />
          </button>
          
          {/* Custom Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10 rounded-t-xl">
              <div className="space-y-4 text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-highlight border-r-highlight animate-spin duration-1000"></div>
                  <div className="absolute inset-2 sm:inset-3 rounded-full border-4 border-transparent border-b-highlight border-l-highlight animate-spin-reverse duration-1200"></div>
                  <div className="absolute inset-4 sm:inset-5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-highlight rounded-full animate-pulse"></div>
                  </div>
                </div>
                <p className="text-highlight font-medium text-sm sm:text-base">Loading Trailer...</p>
              </div>
            </div>
          )}

          <div className="relative bg-gray-900 rounded-t-xl overflow-hidden"
            style={{
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: dimensions.height
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {downloadUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center p-4 sm:p-6 rounded-b-xl border-t border-gray-700"
            >
              <motion.a 
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-highlight to-highlight-dark hover:from-highlight-dark hover:to-highlight text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold transition-all w-full sm:w-auto justify-center shadow-lg hover:shadow-highlight/20 group"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative">
                  <FaDownload className="text-lg sm:text-xl group-hover:animate-bounce" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </span>
                <span className="text-sm sm:text-base">Download Movie</span>
                <FaExternalLinkAlt className="ml-1 text-xs sm:text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}