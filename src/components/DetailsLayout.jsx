import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function DetailsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}