import { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaPlayCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Header: Navigating to search with query:', searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tvshows' },
    { name: 'Live Streams', path: '/livestreams' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <FaPlayCircle className="text-3xl text-yellow-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Cinetro
            </h1>
          </NavLink>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => {
                  console.log(`Header: NavLink ${link.name} isActive:`, isActive);
                  return `relative text-gray-300 hover:text-yellow-400 transition-colors font-medium ${
                    isActive ? 'text-yellow-400 font-semibold after:w-full' : 'after:w-0 hover:after:w-full'
                  } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all`;
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <div className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
                <input
                  type="text"
                  placeholder="Search movies, TV shows..."
                  className={`bg-gray-800/90 text-white px-4 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full placeholder-gray-400 transition-all duration-300 border ${
                    isSearchFocused ? 'border-yellow-400 shadow-lg' : 'border-gray-600/50 hover:border-gray-500'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <FiSearch 
                  size={18} 
                  className={`absolute left-3 transition-colors ${
                    isSearchFocused ? 'text-yellow-400' : 'text-gray-400'
                  }`} 
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
            </form>

            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-lg shadow-md p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => {
                    console.log(`Header: Mobile NavLink ${link.name} isActive:`, isActive);
                    return `block py-2 px-4 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all ${
                      isActive ? 'bg-yellow-500/20 text-yellow-400' : ''
                    }`;
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <form onSubmit={handleSearch} className="mt-4 relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search movies, TV shows..."
                  className="bg-gray-800/90 text-white px-4 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full placeholder-gray-400 transition-all duration-300 border border-gray-600/50 hover:border-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch 
                  size={18} 
                  className="absolute left-3 text-gray-400" 
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}