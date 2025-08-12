import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <main className="flex-grow w-full">
        {/* Only show Hero on home page */}
        {window.location.pathname === '/' && <Hero />}
        <Outlet /> {/* This will render the current route's component */}
      </main>
      <Footer />
    </div>
  )
}

export default App