import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('http://your-django-backend/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: data.message || 'Your message has been sent successfully! We will get back to you soon.'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error.message || 'There was an error sending your message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        
<div className="grid lg:grid-cols-2 gap-8">
  <div>
    <h2 className="text-xl font-semibold text-white mb-6">Get in Touch</h2>
    
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-500/10 rounded-full">
          <FaEnvelope className="text-yellow-500" />
        </div>
        <div>
          <h3 className="font-medium text-white">Email</h3>
          <p className="text-gray-400">support@cinetro.com</p>
          <p className="text-gray-400">business@cinetro.com</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-500/10 rounded-full">
          <FaPhone className="text-yellow-500" />
        </div>
        <div>
          <h3 className="font-medium text-white">Phone</h3>
          <p className="text-gray-400">+1 (555) 123-4567 (Support)</p>
          <p className="text-gray-400">+1 (555) 987-6543 (Business)</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-500/10 rounded-full">
          <FaMapMarkerAlt className="text-yellow-500" />
        </div>
        <div>
          <h3 className="font-medium text-white">Headquarters</h3>
          <p className="text-gray-400">123 Cinema Street</p>
          <p className="text-gray-400">Hollywood, CA 90210</p>
          <p className="text-gray-400">United States</p>
        </div>
      </div>
    </div>
    
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-white mb-4">Office Hours</h3>
      <div className="bg-gray-700/30 p-4 rounded-lg">
        <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
        <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM (PST)</p>
        <p className="text-gray-300">Sunday: Closed</p>
      </div>
    </div>
  </div>
  <div>
    <h2 className="text-xl font-semibold text-white mb-6">Send Us a Message</h2>
            
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitMessage.type === 'success' 
                  ? 'bg-green-900/50 border border-green-700 text-green-300' 
                  : 'bg-red-900/50 border border-red-700 text-red-300'
              }`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                  required
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                  required
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all w-full ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}