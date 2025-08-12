import { useEffect, useState, useRef } from 'react';
import MovieCard from './MovieCard';
import { FiChevronLeft, FiChevronRight, FiFilter, FiX, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);

  // Available filters
  const filters = [
    { id: 'all', name: 'All Movies' },
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    {id: 'thriller', name: 'Thriller' },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Simulate network delay for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch('http://localhost:8000/api/movies/' && 'https://movie-backend-6vqf.onrender.com/api/movies/');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const filteredMovies = activeFilter === 'all' 
    ? movies 
    : movies.filter(movie => movie.genres.some(g => g.name.toLowerCase() === activeFilter));

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <div className="h-8 w-48 md:h-10 md:w-64 bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="hidden md:flex space-x-2">
              <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg sm:rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-6 sm:p-8 inline-block max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">Error Loading Content</h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Floating gradient elements */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-purple-600/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-600/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Trending Now
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">Discover the hottest movies right now</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-200 w-full md:w-auto justify-center"
              >
                <FiFilter size={16} />
                <span className="text-sm sm:text-base">Filter</span>
              </button>
              
              <AnimatePresence>
                {filterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl overflow-hidden z-20"
                  >
                    <div className="p-2 border-b border-gray-700 flex justify-between items-center">
                      <span className="font-medium text-sm">Filters</span>
                      <button onClick={() => setFilterOpen(false)}>
                        <FiX size={16} />
                      </button>
                    </div>
                    <div className="p-2">
                      {filters.map(filter => (
                        <button
                          key={filter.id}
                          onClick={() => {
                            setActiveFilter(filter.id);
                            setFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeFilter === filter.id 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'hover:bg-white/10'
                          }`}
                        >
                          {filter.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Active filter indicator */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-gray-400">Showing:</span>
          <span className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm font-medium">
            {filters.find(f => f.id === activeFilter)?.name}
          </span>
          {activeFilter !== 'all' && (
            <button 
              onClick={() => setActiveFilter('all')}
              className="text-xs sm:text-sm text-gray-400 hover:text-white flex items-center gap-1"
            >
              <FiX size={12} /> Clear
            </button>
          )}
        </div>

        {/* Movie Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.slice(0, 5).map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 py-12 text-center">
              <div className="bg-white/5 rounded-xl p-6 inline-block max-w-xs">
                <h3 className="text-lg font-medium text-gray-300 mb-2">No movies found</h3>
                <p className="text-sm text-gray-500 mb-4">Try changing your filters</p>
                <button 
                  onClick={() => setActiveFilter('all')}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-black text-sm font-medium"
                >
                  Show All Movies
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredMovies.length > 5 && (
          <div className="mt-12 text-center">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 overflow-hidden text-white text-sm sm:text-base font-semibold rounded-full group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <span>Load More</span>
                <FiLoader className="animate-spin" size={16} />
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}