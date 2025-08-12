import { useEffect, useState } from 'react';
import TVShowCard from './TVShowCard';
import { FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function TVShowGrid() {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tvshows/');
        if (!response.ok) throw new Error('Failed to fetch TV shows');
        const data = await response.json();
        setTVShows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  const filters = [
    { id: 'all', name: 'All TV Shows' },
    { id: 'trending', name: 'Trending Now' },
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
  ];

  const filteredTVShows = activeFilter === 'all' 
    ? tvShows 
    : activeFilter === 'trending'
      ? tvShows.filter(show => show.is_trending)
      : tvShows.filter(show => show.genres.some(g => g.name.toLowerCase() === activeFilter));

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            TV Shows
          </h2>
          <div className="relative">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
            >
              <FiFilter />
              <span>Filter</span>
            </button>
            
            <AnimatePresence>
              {filterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl z-20"
                >
                  <div className="p-2">
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setActiveFilter(filter.id);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          activeFilter === filter.id ? 'bg-yellow-500/20 text-yellow-400' : 'text-white hover:bg-white/10'
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

        {filteredTVShows.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredTVShows.map(show => (
              <TVShowCard 
                key={show.id} 
                show={{
                  ...show,
                  seasons: show.seasons.length // Convert seasons array to count
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="text-white text-center py-12">
            No TV shows found matching your criteria
          </div>
        )}
      </div>
    </section>
  );
}