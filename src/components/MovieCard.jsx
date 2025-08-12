import { FaStar, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="group bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      <Link to={`/movie/${movie.id}`} className="flex-grow">
        <div className="relative pb-[150%]">
          <img
            src={movie.poster}
            alt={movie.title}
            className="absolute h-full w-full object-cover group-hover:brightness-110 transition-all duration-500"
            loading="lazy"
          />
          
          <div className="absolute top-2 left-2 right-2 flex justify-between">
            {movie.is_new && (
              <span className="bg-highlight text-primary text-xs px-2 py-1 rounded font-bold shadow-md">
                NEW
              </span>
            )}
            {movie.is_4k && (
              <span className="bg-accent text-text text-xs px-2 py-1 rounded font-bold shadow-md">
                4K
              </span>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="w-full">
              <div className="flex items-center mb-2">
                <FaStar className="text-highlight mr-1" />
                <span className="text-text text-sm font-medium">
                  {movie.rating.toFixed(1)}
                </span>
              </div>
              <span className="inline-block bg-highlight text-primary px-3 py-1 rounded text-xs font-semibold">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex-grow-0">
        <Link to={`/movie/${movie.id}`} className="hover:text-highlight transition-colors">
          <h3 className="font-semibold text-lg mb-1 truncate" title={movie.title}>
            {movie.title}
          </h3>
        </Link>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{movie.release_year}</span>
          <span className="text-highlight font-medium truncate max-w-[50%]">
            {movie.genres.map(g => g.name).join(', ')}
          </span>
        </div>
        
        {movie.download_url && (
          <a
            href={movie.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full bg-highlight/90 hover:bg-highlight text-white py-2 rounded-lg font-medium transition"
            onClick={(e) => e.stopPropagation()}
            download
          >
            <FaDownload size={14} /> Download
          </a>
        )}
      </div>
    </div>
  );
}