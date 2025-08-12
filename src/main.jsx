import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import MovieDetails from './components/MovieDetails';
import TVShowDetails from './components/TVShowDetails';
import LiveStream from './components/LiveStream';
import MovieGrid from './components/MovieGrid';
import TVShowGrid from './components/TVShowGrid';
import LiveStreamGrid from './components/LiveStreamGrid';
import Genres from './components/Genres';
import SearchResults from './components/SearchResults';
import DetailsLayout from './components/DetailsLayout';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import './index.css';

console.log('main.jsx: Initializing router');

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-6 bg-red-900/50 rounded-xl">
          <h2 className="text-2xl font-bold text-red-400">Routing Error</h2>
          <p className="mt-2">Something went wrong. Check the console for details.</p>
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        element: <MovieGrid />,
      },
      {
        path: 'movies',
        element: <MovieGrid />,
      },
      {
        path: 'tvshows',
        element: <TVShowGrid />,
      },
      {
        path: 'livestreams',
        element: <LiveStreamGrid />,
      },
      {
        path: 'genres',
        element: <Genres />,
      },
      {
        path: 'search',
        element: <SearchResults />,
      },
      // Company pages
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
    ],
  },
  {
    path: '/movie/:id',
    element: <DetailsLayout />,
    errorElement: (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-6 bg-red-900/50 rounded-xl">
          <h2 className="text-2xl font-bold text-red-400">Routing Error</h2>
          <p className="mt-2">Something went wrong. Check the console for details.</p>
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        element: <MovieDetails />,
      },
    ],
  },
  {
    path: '/tv/:id',
    element: <DetailsLayout />,
    children: [
      {
        index: true,
        element: <TVShowDetails />,
      },
    ],
  },
  {
    path: '/livestream/:id',
    element: <DetailsLayout />,
    children: [
      {
        index: true,
        element: <LiveStream />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-6 bg-red-900/50 rounded-xl">
          <h2 className="text-2xl font-bold text-red-400">404: Page Not Found</h2>
          <p className="mt-2">The requested route does not exist.</p>
        </div>
      </div>
    ),
  },
]);

console.log('main.jsx: Rendering root');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('main.jsx: No element with id="root" found in index.html');
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}