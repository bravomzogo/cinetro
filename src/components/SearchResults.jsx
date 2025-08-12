import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/search/?q=${encodeURIComponent(query)}` && `https://movie-backend-6vqf.onrender.com/api/search/?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
    else setLoading(false);
  }, [query]);

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-2xl">Loading...</div>;

  if (error) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-2xl">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white mb-8">Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p className="text-gray-400 text-center">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((item) => (
            <div key={`${item.type}-${item.id}`} className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link to={item.type === 'movie' ? `/movie/${item.id}` : item.type === 'tv' ? `/tv/${item.id}` : `/bongomovie/${item.id}`}>
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={item.poster || '/placeholder.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-sm font-medium">View Details</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-900/80">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>{item.type === 'tv' ? 'TV Show' : item.type === 'movie' ? 'Movie' : 'Bongo Movie'}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}