import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaShieldAlt, FaDatabase, FaUserLock } from 'react-icons/fa'

export default function PrivacyPage() {
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
          <FaShieldAlt className="text-3xl text-yellow-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
        </div>
        
        <div className="space-y-8 text-gray-300">
          <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600">
            <p className="text-lg">
              At Cinetro, we take your privacy seriously. This policy explains how we collect, use, 
              and protect your personal information when you use our services.
            </p>
          </div>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <FaDatabase className="text-yellow-500 text-xl" />
              Information We Collect
            </h2>
            <div className="ml-9 space-y-4">
              <p>
                We collect information to provide better services to all our users. The types of 
                information we gather include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Account Information:</strong> When you create an account, we collect your 
                  name, email address, and other profile information.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information about how you interact with 
                  our services, including search queries, viewed content, and preferences.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect device-specific information such as 
                  hardware model, operating system, and browser type.
                </li>
                <li>
                  <strong>Log Information:</strong> When you use our services, we automatically collect 
                  and store certain information in server logs.
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <FaUserLock className="text-yellow-500 text-xl" />
              How We Use Information
            </h2>
            <div className="ml-9 space-y-4">
              <p>
                We use the information we collect to provide, maintain, protect, and improve our services, 
                to develop new ones, and to protect Cinetro and our users. Specifically, we use information to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Deliver personalized content and recommendations</li>
                <li>Improve our services and develop new features</li>
                <li>Monitor and analyze service usage and trends</li>
                <li>Prevent fraudulent activity and enhance security</li>
                <li>Communicate with you about products, services, and promotions</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing</h2>
            <div className="bg-gray-700/20 p-5 rounded-lg border border-gray-600/50">
              <p>
                We do not share personal information with companies, organizations, or individuals outside 
                of Cinetro except in the following cases:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  <strong>With Your Consent:</strong> We will share personal information with third parties 
                  when we have your explicit consent to do so.
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> We will share personal information if we believe in 
                  good faith that access, use, preservation, or disclosure of the information is reasonably 
                  necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can manage 
              your account information and preferences through your account settings or by contacting us directly.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date below.
            </p>
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