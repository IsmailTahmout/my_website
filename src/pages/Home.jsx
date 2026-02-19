import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-1000 py-20">
      <div className="mb-8 relative z-50">
        <div 
          onClick={() => setIsZoomed(!isZoomed)}
          className={`cursor-pointer transition-all duration-500 ease-in-out ${isZoomed ? "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" : "w-32 h-32 rounded-full border-2 border-[#d97706] p-1 overflow-hidden"}`}
        >
          <img 
            src="/me.jpg" 
            alt="Ismail" 
            className={`object-cover transition-all duration-500 ${isZoomed ? "max-w-full max-h-[80vh] rounded-2xl grayscale-0" : "w-full h-full rounded-full grayscale hover:grayscale-0"}`}
          />
          {isZoomed && (
            <p className="absolute bottom-10 text-gray-400 text-sm animate-pulse">
              {t('close_img')}
            </p>
          )}
        </div>
        {!isZoomed && <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-[#0a0a0a] rounded-full animate-pulse"></span>}
      </div>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight max-w-2xl">
        {t('hero_title')} <span className="text-[#d97706]">{t('hero_subtitle')}</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-lg">{t('hero_desc')}</p>
      
      {/* Exploration Button */}
      <button 
        onClick={() => navigate('/about')}
        className="px-8 py-3 bg-[#d97706] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-widest shadow-lg shadow-[#d97706]/20"
      >
        {t('explore_btn')}
      </button>
    </section>
  );
}

export default Home;
