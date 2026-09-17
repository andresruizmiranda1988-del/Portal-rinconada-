import React, { useState, useRef, useEffect } from 'react';
import { X, BookOpen, Download, Search, Shield, Award, CheckCircle2, FileText, ArrowUp } from 'lucide-react';
import { law20584, law21331 } from '../data/legalLaws';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';
import { generateRightsCharterPDF } from '../utils/pdfGenerator';

interface LegalLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LegalLawsModal: React.FC<LegalLawsModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'20584' | '21331'>('20584');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;
    setScrollProgress(pct);
  };

  const handleTabChange = (tab: '20584' | '21331') => {
    setActiveTab(tab);
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const currentLaw = activeTab === '20584' ? law20584 : law21331;

  const filteredArticles = currentLaw.articles.filter(
    art => art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           art.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
           art.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadPDF = () => {
    generateRightsCharterPDF(language);
  };

  const roundedProgress = Math.round(scrollProgress);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="icon-box-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="micro-badge font-bold uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  República de Chile
                </span>
              </div>
              <h2 id="legal-modal-title" className="text-base sm:text-xl font-bold font-display leading-tight">
                {t.legalModal.title}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
                {t.legalModal.subtitle}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label={t.legalModal.closeBtn}
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => handleTabChange('20584')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === '20584'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ley N° 20.584 (General)
            </button>
            <button
              onClick={() => handleTabChange('21331')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === '21331'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ley N° 21.331 (Salud Mental)
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={2.2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículo o tema..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Visual Progress Bar for Legal Text & Articles */}
        <div className="bg-purple-50/50 dark:bg-slate-900/60 border-b border-purple-100 dark:border-slate-800/80 px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-32 sm:w-48 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden shrink-0" role="progressbar" aria-label={t.progressBar.legalReaderProgress} aria-valuenow={roundedProgress} aria-valuemin={0} aria-valuemax={100}>
              <div 
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 h-full transition-[width] duration-150 rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
              {roundedProgress}%
            </span>
            <span className="text-xs text-purple-700 dark:text-purple-300 font-medium truncate hidden sm:inline">
              • {currentLaw.lawNumber}
            </span>
          </div>

          {scrollProgress > 15 && (
            <button
              onClick={scrollToTop}
              className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>{t.progressBar.backToTop}</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6"
        >
          {/* Law Card Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="micro-badge font-extrabold bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
                  {currentLaw.lawNumber}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1.5">
                  {currentLaw.officialTitle}
                </h3>
                <p className="text-xs text-purple-800 dark:text-purple-300 font-semibold mt-1">
                  {currentLaw.promulgationDate}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                  {currentLaw.summary}
                </p>
              </div>
            </div>

            {/* Key Guarantees Box */}
            <div className="mt-4 pt-4 border-t border-purple-200/60 dark:border-purple-900/60">
              <h4 className="text-xs font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-600" strokeWidth={2.2} />
                {t.legalModal.keyPointsTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {currentLaw.keyPoints.map((kp, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/70 dark:bg-slate-900/50 p-2 rounded-xl border border-purple-100/80 dark:border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Articles Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" strokeWidth={2.2} />
                {t.legalModal.articlesTitle} ({filteredArticles.length})
              </h4>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  No se encontraron artículos con el término "{searchQuery}".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredArticles.map((art, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="micro-badge font-extrabold bg-slate-100 dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-mono">
                        {art.number}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {art.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1 border-l-2 border-purple-300 dark:border-purple-700">
                      {art.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Biblioteca del Congreso Nacional de Chile • Ministerio de Salud
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" strokeWidth={2.2} />
              {t.legalModal.downloadPdf}
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              {t.legalModal.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
