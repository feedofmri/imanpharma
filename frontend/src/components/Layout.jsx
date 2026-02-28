import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/buyer') || location.pathname.startsWith('/seller');

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default Layout;
