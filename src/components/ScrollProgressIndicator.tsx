import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, BookOpen, ShieldCheck, HeartPulse } from 'lucide-react';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';

interface ScrollProgressIndicatorProps {
  language: Language;
  isSimplifiedMode?: boolean;
  activeTab?: string;
  isContinuousView?: boolean;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  language,
  isSimplifiedMode = false,
  activeTab,
  isContinuousView = false,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const t = translations[language];

  // Map section IDs to translated labels
  const getSectionName = useCallback((id: string): string => {
    switch (id) {
      case 'seccion-bienvenida':
        return t.progressBar.sectionWelcome;
      case 'seccion-equipo':
        return t.progressBar.sectionTeam;
      case 'seccion-talleres':
        return t.progressBar.sectionWorkshops;
      case 'examenes-laboratorio':
        return t.progressBar.sectionExams;
      case 'seccion-farmacos':
        return t.progressBar.sectionMeds;
      case 'subseccion-deberes':
        return t.progressBar.sectionDuties;
      case 'subseccion-derechos':
      case 'seccion-derechos':
      case 'section-rights-duties':
        return t.progressBar.sectionRights;
      case 'seccion-urgencias':
        return t.progressBar.sectionUrgency;
      default:
        return '';
    }
  }, [t]);

  // Tab fallback when not in continuous mode or when sections not yet in view
  const getTabFallbackName = useCallback((): string => {
    if (!activeTab) return t.progressBar.sectionWelcome;
    switch (activeTab) {
      case 'home':
        return t.progressBar.sectionWelcome;
      case 'team':
      case 'team_workshops':
        return t.progressBar.sectionTeam;
      case 'workshops':
        return t.progressBar.sectionWorkshops;
      case 'exams':
        return t.progressBar.sectionExams;
      case 'meds':
      case 'services':
        return t.progressBar.sectionMeds;
      case 'rights':
        return t.progressBar.sectionRights;
      case 'urgency':
        return t.progressBar.sectionUrgency;
      default:
        return t.progressBar.sectionWelcome;
    }
  }, [activeTab, t]);

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;

      setScrollProgress(scrolled);
      setIsVisible(winScroll > 20);
      setIsScrolling(true);

      // Determine current section or sub-section in viewport
      const scrollPosition = winScroll + 160; // offset for sticky header

      if (isContinuousView) {
        const sections = [
          'seccion-urgencias',
          'subseccion-deberes',
          'subseccion-derechos',
          'seccion-derechos',
          'seccion-farmacos',
          'examenes-laboratorio',
          'seccion-talleres',
          'seccion-equipo',
          'seccion-bienvenida',
        ];

        let found = '';
        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              found = getSectionName(secId);
              break;
            }
          }
        }
        setActiveSectionTitle(found || getSectionName('seccion-bienvenida'));
      } else {
        // In tabbed mode, check if there's a detailed sub-section (like duties inside rights)
        if (activeTab === 'rights') {
          const deberesEl = document.getElementById('subseccion-deberes');
          if (deberesEl && scrollPosition >= deberesEl.offsetTop) {
            setActiveSectionTitle(t.progressBar.sectionDuties);
          } else {
            setActiveSectionTitle(t.progressBar.sectionRights);
          }
        } else {
          setActiveSectionTitle(getTabFallbackName());
        }
      }

      // Clear previous timeout and set new one to auto-hide badge when idle
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 2200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isContinuousView, getSectionName, getTabFallbackName]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const roundedProgress = Math.round(scrollProgress);
  const showBadge = isVisible && (isScrolling || isHovered || roundedProgress >= 99);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      aria-hidden={!isVisible}
    >
      {/* Background Track */}
      <div 
        className="w-full h-1 sm:h-1.5 bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-xs relative overflow-hidden"
        role="progressbar"
        aria-label={t.progressBar.progressLabel}
        aria-valuenow={roundedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Fill Indicator */}
        <div
          className={`h-full transition-[width] duration-150 ease-out relative ${
            isSimplifiedMode
              ? 'bg-purple-700 dark:bg-purple-300'
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-400 dark:from-purple-500 dark:via-indigo-400 dark:to-emerald-300 shadow-[0_0_8px_rgba(147,51,234,0.5)]'
          }`}
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Luminous leading head/sparkle on the progress line */}
          {!isSimplifiedMode && scrollProgress > 0 && scrollProgress < 100 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_15px_#a855f7] transform translate-x-1/2" />
          )}
        </div>
      </div>

      {/* Floating Contextual Reading Badge (Visible while scrolling or hovered) */}
      <div
        className={`pointer-events-auto max-w-md mx-auto px-4 flex justify-end transition-all duration-300 transform ${
          showBadge ? 'opacity-100 translate-y-1.5' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-purple-200/90 dark:border-purple-900/90 shadow-lg px-2.5 py-1 rounded-full flex items-center gap-2 text-xs select-none">
          {/* Section Indicator Icon */}
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shrink-0">
            {activeSectionTitle.includes('Derecho') || activeSectionTitle.includes('Dwa') ? (
              <ShieldCheck className="w-2.5 h-2.5" strokeWidth={2.2} />
            ) : activeSectionTitle.includes('Urgencia') || activeSectionTitle.includes('Ijans') ? (
              <HeartPulse className="w-2.5 h-2.5 text-red-600" strokeWidth={2.2} />
            ) : (
              <BookOpen className="w-2.5 h-2.5" strokeWidth={2.2} />
            )}
          </span>

          {/* Section Name & Percentage */}
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-slate-800 dark:text-slate-200 truncate max-w-[160px] sm:max-w-[220px] text-xs leading-tight">
              {activeSectionTitle}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-mono text-xs font-extrabold">
              {roundedProgress}%
            </span>
          </div>

          {/* Quick Back to Top Button when scrolled down past 20% */}
          {scrollProgress > 20 && (
            <button
              onClick={scrollToTop}
              id="btn-progress-back-to-top"
              title={t.progressBar.backToTop}
              aria-label={t.progressBar.backToTop}
              className="ml-0.5 p-1 rounded-full bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" strokeWidth={2.2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
