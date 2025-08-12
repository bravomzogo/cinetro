import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaFilm, FaUsers, FaThumbsUp, FaGlobe } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <Link 
        to="/" 
        className="flex items-center text-yellow-500 hover:text-yellow-400 mb-6 transition-colors text-sm md:text-base"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-gray-700">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          About Cinetro
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            Cinetro is your premier destination for discovering, exploring, and enjoying the world of cinema. 
            Our platform brings together movie enthusiasts from around the globe to share their passion for film.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaFilm className="text-yellow-500 mr-3" />
                Our Mission
              </h2>
              <p>
                To revolutionize how people discover and engage with movies by providing comprehensive, 
                personalized recommendations and a vibrant community for film lovers.
              </p>
            </div>
            
            <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaUsers className="text-yellow-500 mr-3" />
                Our Team
              </h2>
              <p>
                A passionate group of cinephiles, developers, and designers dedicated to creating 
                the ultimate movie discovery platform.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <FaThumbsUp className="text-yellow-500 mr-3" />
              Why Choose Cinetro?
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Vast Library", desc: "Over 100,000 movies and TV shows" },
                { title: "Personalized", desc: "AI-powered recommendations" },
                { title: "Community", desc: "Join millions of film lovers" },
                { title: "Updated Daily", desc: "Fresh content added regularly" },
                { title: "Multi-Platform", desc: "Available on all devices" },
                { title: "Free Access", desc: "No subscription required" }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-700/20 p-4 rounded-lg border border-gray-600/50">
                  <h3 className="font-medium text-yellow-400">{feature.title}</h3>
                  <p className="text-sm mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10 bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/30">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaGlobe className="text-yellow-500 mr-3" />
              Global Reach
            </h2>
            <p>
              Serving movie fans in over 150 countries with localized content and multiple language support. 
              Our platform is continuously expanding to bring you the best cinematic experience worldwide.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}