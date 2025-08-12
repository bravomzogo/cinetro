import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function BongoMovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bongomovies/');
        if (!response.ok) throw new Error('Failed to fetch Bongo movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-2xl">Loading...</div>;

  if (error) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-2xl">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white mb-8">Bongo Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <motion.div 
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <Link to={`/bongomovie/${movie.id}`} className="block">
              <div className="aspect-[2/3] relative overflow-hidden">
                <img
                  src={movie.poster || '/placeholder-movie.jpg'}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">View Details</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-900/80">
                <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{movie.title}</h3>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar size={12} />
                    <span>{movie.rating?.toFixed(1) || 'N/A'}</span>
                  </div>
                  <div className="text-gray-400">{movie.release_year}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}