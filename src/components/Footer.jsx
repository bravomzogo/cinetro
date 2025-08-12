import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = {
    discover: [
      { name: "Movies", href: "/movies" },
      { name: "TV Shows", href: "/tvshows" },
      { name: "Trending", href: "/movies?filter=trending" },
      { name: "Coming Soon", href: "/movies?filter=upcoming" },
    ],

    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socials = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-black via-gray-900 to-black border-t border-gray-800 text-gray-300">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 col-span-2">
            <div className="flex items-center mb-4">
              <FaPlayCircle className="text-3xl text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Cinetro
              </h2>
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Your ultimate destination for movie information, reviews, and
              recommendations.
            </p>
            <div className="flex space-x-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 rounded-full bg-white/10 hover:bg-yellow-500 text-white hover:text-black transition-all"
                  aria-label={`Follow us on ${social.icon.type.displayName}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4 capitalize text-white">
                {section}
              </h3>
              <ul className="space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="lg:col-span-1 col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new releases and special offers.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 text-sm text-white px-4 py-3 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 border border-gray-700"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-md hover:shadow-yellow-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0 text-xs md:text-sm text-gray-500 font-mono tracking-wider">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-yellow-500">CINETRO</span> |
            <span className="ml-2">
              DEVELOPED BY
              <span className="relative ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 font-black text-lg">
                  SHAIBU MZOGO
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></span>
              </span>
            </span>
          </p>
          <div className="flex space-x-4 md:space-x-6">
            <Link to="/privacy" className="hover:text-yellow-400 transition-colors text-xs md:text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-yellow-400 transition-colors text-xs md:text-sm">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-yellow-400 transition-colors text-xs md:text-sm">
              Cookies
            </Link>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600 font-mono tracking-widest">
            <span className="opacity-70">UNMATCHED PERSPICACITY COUPLED WITH SHEER INDEFATIGABILITY</span>
            <span className="block mt-1 text-gray-500">MAKES ME A FEARED OPPONENT IN ALL REALMS OF HUMAN ENDEAVOR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}