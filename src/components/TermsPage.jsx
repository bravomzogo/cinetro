import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaGavel, FaExclamationTriangle, FaCopyright } from 'react-icons/fa'

export default function TermsPage() {
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
        <div className="flex items-center gap-4 mb-8">
          <FaGavel className="text-3xl text-yellow-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
        </div>
        
        <div className="space-y-8 text-gray-300">
          <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600">
            <p className="text-lg">
              Welcome to Cinetro! These Terms of Service govern your use of our website and services. 
              By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <div className="ml-6 space-y-4">
              <p>
                By accessing or using the Cinetro service, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <div className="ml-6 space-y-4">
              <p>
                Cinetro provides a platform for discovering and learning about movies and TV shows. 
                Our service may include personalized content recommendations, user reviews, and other features.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <div className="ml-6 space-y-4">
              <p>
                You agree to use the service only for lawful purposes and in a way that does not infringe 
                the rights of, restrict or inhibit anyone else's use and enjoyment of Cinetro.
              </p>
              <div className="bg-gray-700/20 p-4 rounded-lg border border-gray-600/50">
                <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  Prohibited Activities
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Violating any laws or regulations</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Distributing malware or harmful code</li>
                  <li>Engaging in fraudulent activity</li>
                  <li>Harassing or harming others</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <div className="ml-6 space-y-4">
              <p>
                All content included on the Cinetro platform, such as text, graphics, logos, and images, 
                is the property of Cinetro or its content suppliers and protected by copyright laws.
              </p>
              <div className="flex items-start gap-3 bg-gray-700/20 p-4 rounded-lg border border-gray-600/50">
                <FaCopyright className="text-yellow-500 mt-1 flex-shrink-0" />
                <p>
                  Movie and TV show information, including but not limited to titles, descriptions, 
                  and images are used under fair use for informational purposes. All copyrighted 
                  material is property of their respective owners.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <div className="ml-6 space-y-4">
              <p>
                Cinetro shall not be liable for any indirect, incidental, special, consequential or 
                punitive damages resulting from your use of or inability to use the service.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to Terms</h2>
            <div className="ml-6 space-y-4">
              <p>
                We may modify these terms at any time. We'll post notice of modifications to these terms 
                on this page. Your continued use of Cinetro constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
            <div className="ml-6 space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State 
                of California, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>
          
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}