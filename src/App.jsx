import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import './i18n'; // Ensure this file is imported

function App() {
  const { t, i18n } = useTranslation();

  // Sync HTML direction with language (RTL for Arabic)
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language]);

  const toggleLanguage = () => {
    i18n.changeLanguage( i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#ededed] transition-all duration-500">
        {/* Navigation Bar */}
        <nav className="sticky top-0 bg-[#0a0a0a] max-w-4xl mx-auto w-full p-6 flex justify-between items-center border-b border-gray-900 z-[199]">
          <Link to="/" className="text-xl font-black tracking-tighter text-[#d97706]">ISMAIL</Link>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
              <Link to="/" className="hover:text-[#d97706] transition-colors">{t('nav_home')}</Link>
              <Link to="/about" className="hover:text-[#d97706] transition-colors">{t('nav_about')}</Link>
            </div>
            <button onClick={toggleLanguage} className="text-[10px] border border-gray-700 px-2 py-1 rounded hover:bg-white hover:text-black transition-all">
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto px-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="border-t border-gray-900 py-8 w-full mt-auto">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-[#d97706] font-bold tracking-tighter">ISMAIL TAHMOUT</span>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-1">{t('footer_text')}</p>
            </div>
            <div className="text-gray-600 text-[9px] uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} — {t('rights')}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
