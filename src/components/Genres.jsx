import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/genres/');
        if (!response.ok) throw new Error('Failed to fetch genres');
        const data = await response.json();
        setGenres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  if (error) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center p-6 bg-red-900/50 rounded-xl">
        <h2 className="text-2xl font-bold text-red-400">Error</h2>
        <p className="mt-2">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-8">Genres</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genres/${genre.id}`}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors"
            >
              <h2 className="text-xl font-semibold">{genre.name}</h2>
              <p className="text-gray-400 mt-2">Explore {genre.name} movies and shows</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}