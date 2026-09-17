import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Moon, 
  Sun, 
  QrCode, 
  Type, 
  MessageSquareHeart, 
  Check,
  ChevronDown,
  Glasses,
  SlidersHorizontal,
  X,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  VolumeX,
  Menu,
  Square,
  Sparkles,
  Bell
} from 'lucide-react';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';
import { useVoiceReading } from '../context/VoiceReadingContext';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  isDark: boolean;
  onToggleDark: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  isSimplifiedMode: boolean;
  onToggleSimplifiedMode: () => void;
  onOpenQR: () => void;
  onOpenMenu: () => void;
  onOpenReminders?: () => void;
  activeRemindersCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  isDark,
  onToggleDark,
  fontSize,
  onChangeFontSize,
  isSimplifiedMode,
  onToggleSimplifiedMode,
  onOpenQR,
  onOpenMenu,
  onOpenReminders,
  activeRemindersCount
}) => {
  const t = translations[currentLang];
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isAccessMenuOpen, setIsAccessMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Network status listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Global Voice Reading Context
  const {
    isVoiceReadingEnabled,
    setVoiceReadingEnabled,
    toggleVoiceReading,
    isPlaying,
    isPaused,
    progress,
    activeSection,
    activeTitle,
    playSection,
    pauseVoice,
    resumeVoice,
    stopVoice
  } = useVoiceReading();

  const langMenuRef = useRef<HTMLDivElement>(null);
  const accessMenuRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside or on Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (accessMenuRef.current && !accessMenuRef.current.contains(event.target as Node)) {
        setIsAccessMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLangMenuOpen(false);
        setIsAccessMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const languageNames: Record<Language, { label: string; flag: string; nativeName: string }> = {
    es: { label: 'Español', flag: '🇨🇱', nativeName: 'Castellano' },
    ht: { label: 'Kreyòl', flag: '🇭🇹', nativeName: 'Kreyòl Ayisyen' },
    en: { label: 'English', flag: '🇺🇸', nativeName: 'English' }
  };

  const isCustomAccessibility = isSimplifiedMode || fontSize !== 'normal' || isDark || isVoiceReadingEnabled || isPlaying;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-purple-100 dark:border-slate-800 shadow-xs px-3 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-md mx-auto w-full flex items-center justify-between gap-2 sm:gap-3">
        {/* Institutional Branding - Full Visibility without truncation */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="relative shrink-0">
            <div className="icon-box-lg sm:w-10 sm:h-10 rounded-2xl bg-purple-600 dark:bg-purple-700 text-white shadow-sm shadow-purple-600/25">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
            </div>
            {/* Status dot in the corner */}
            <span
              id="header-online-indicator-dot"
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 transition-all ${
                isOnline 
                  ? 'bg-emerald-500 shadow-sm' 
                  : 'bg-amber-500 animate-pulse shadow-md shadow-amber-500/25'
              }`}
              title={isOnline ? "Conectado" : "Modo Offline local activo"}
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-tight">
              {t.header.institutionName}
            </h1>
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 leading-snug">
              {t.header.programTitle}
            </p>
          </div>
        </div>

        {/* Action Buttons: 1. Idioma | 2. Accesibilidad (Optimized for Mobile Visibility) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 1. Multilingual Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsAccessMenuOpen(false);
              }}
              id="header-btn-language"
              className="h-9 px-2 sm:px-2.5 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/90 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-purple-400"
              aria-label={currentLang === 'ht' ? 'Chanje lang pòtal la' : currentLang === 'en' ? 'Change portal language' : 'Cambiar idioma del portal'}
              aria-haspopup="menu"
              aria-expanded={isLangMenuOpen}
              title="Cambiar idioma"
            >
              <span className="text-sm">{languageNames[currentLang].flag}</span>
              <span className="font-bold text-xs uppercase sm:normal-case">
                <span className="sm:hidden">{currentLang.toUpperCase()}</span>
                <span className="hidden sm:inline">{languageNames[currentLang].label}</span>
              </span>
              <ChevronDown className={`w-3 h-3 opacity-70 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-purple-100 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-label={t.header.languageLabel}
              >
                <div className="px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  {t.header.languageLabel}
                </div>
                {(['es', 'ht', 'en'] as Language[]).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => {
                      onSelectLang(langKey);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer focus-visible:bg-purple-100 dark:focus-visible:bg-purple-900/80 ${
                      currentLang === langKey
                        ? 'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    role="menuitem"
                    aria-label={`Seleccionar idioma ${languageNames[langKey].label}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{languageNames[langKey].flag}</span>
                      <span className="font-semibold">{languageNames[langKey].nativeName}</span>
                    </span>
                    {currentLang === langKey && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Unified Accessibility Dropdown (Modo Lectura + Zoom + Modo Día/Noche + Lector de Audio) */}
          <div className="relative" ref={accessMenuRef}>
            <button
              onClick={() => {
                setIsAccessMenuOpen(!isAccessMenuOpen);
                setIsLangMenuOpen(false);
              }}
              id="header-btn-accessibility"
              className={`h-9 px-2.5 sm:px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-600 dark:focus-visible:ring-purple-400 ${
                isAccessMenuOpen || isSimplifiedMode || isPlaying
                  ? 'bg-purple-600 dark:bg-purple-700 text-white border-purple-600 dark:border-purple-700 shadow-purple-600/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-700 dark:hover:text-purple-300'
              }`}
              aria-label={currentLang === 'ht' ? 'Meni opsyon pou moun ki gen andikap ak aksè fasil' : currentLang === 'en' ? 'Accessibility and visual options menu' : 'Menú de opciones de accesibilidad y modo de lectura'}
              aria-haspopup="dialog"
              aria-expanded={isAccessMenuOpen}
              title={t.header.accessibilityTitle}
            >
              {isPlaying ? (
                <Volume2 className="w-3.5 h-3.5 shrink-0 animate-bounce text-amber-300" />
              ) : (
                <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="font-bold text-xs hidden sm:inline">
                {t.header.accessibilityBtn}
              </span>
              {isCustomAccessibility && (
                <span className={`w-2 h-2 rounded-full ${isAccessMenuOpen || isSimplifiedMode || isPlaying ? 'bg-amber-300' : 'bg-purple-600 dark:bg-purple-400'}`} />
              )}
              <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${isAccessMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isAccessMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 sm:w-84 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-purple-100 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4"
                role="dialog"
                aria-label={t.header.accessibilityTitle}
              >
                {/* Header of Popover */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      {t.header.accessibilityTitle}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsAccessMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Cerrar panel de accesibilidad"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Option 1: Modo Lectura Fácil (Switch) */}
                <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-start gap-2 min-w-0">
                    <Glasses className={`w-4 h-4 mt-0.5 shrink-0 ${isSimplifiedMode ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`} />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {t.header.simplifiedMode}
                      </p>
                      <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                        {isSimplifiedMode ? 'Activo (sin distractores)' : 'Alto contraste visual'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onToggleSimplifiedMode}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-purple-600 ${
                      isSimplifiedMode ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    role="switch"
                    aria-checked={isSimplifiedMode}
                    aria-label={t.header.simplifiedModeTooltip}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isSimplifiedMode ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Option 2: Tamaño de Texto (Zoom A- / A+) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>{t.header.fontSizeLabel}</span>
                    </span>
                    <span className="text-[11px] font-extrabold text-purple-700 dark:text-purple-300">
                      {fontSize === 'normal' ? '100%' : fontSize === 'large' ? '115%' : '130%'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700" role="group" aria-label="Seleccionar tamaño de fuente">
                    <button
                      onClick={() => onChangeFontSize('normal')}
                      aria-pressed={fontSize === 'normal'}
                      aria-label="Tamaño de texto normal al 100%"
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        fontSize === 'normal'
                          ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs border border-purple-200 dark:border-purple-800'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Normal (A)
                    </button>
                    <button
                      onClick={() => onChangeFontSize('large')}
                      aria-pressed={fontSize === 'large'}
                      aria-label="Tamaño de texto grande al 115%"
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        fontSize === 'large'
                          ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs border border-purple-200 dark:border-purple-800'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Grande (A+)
                    </button>
                    <button
                      onClick={() => onChangeFontSize('xlarge')}
                      aria-pressed={fontSize === 'xlarge'}
                      aria-label="Tamaño de texto extra grande al 130%"
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        fontSize === 'xlarge'
                          ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs border border-purple-200 dark:border-purple-800'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Extra (A++)
                    </button>
                  </div>
                </div>

                {/* Option 3: Modo Día / Noche */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {t.header.themeLabel}
                  </span>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label="Seleccionar tema visual">
                    <button
                      onClick={() => { if (isDark) onToggleDark(); }}
                      aria-pressed={!isDark}
                      aria-label="Activar tema claro diurno"
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        !isDark
                          ? 'bg-amber-50 dark:bg-slate-800 border-amber-300 text-amber-900 dark:text-amber-300 shadow-xs ring-1 ring-amber-300'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>{t.header.themeLight}</span>
                    </button>
                    <button
                      onClick={() => { if (!isDark) onToggleDark(); }}
                      aria-pressed={isDark}
                      aria-label="Activar tema oscuro nocturno"
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isDark
                          ? 'bg-purple-950/80 border-purple-700 text-purple-200 shadow-xs ring-1 ring-purple-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-purple-400" />
                      <span>{t.header.themeDark}</span>
                    </button>
                  </div>
                </div>

                {/* Option 4: Lectura por Voz de Textos Institucionales (Accesibilidad Sonora) */}
                <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900/60 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isVoiceReadingEnabled 
                          ? 'bg-purple-600 text-white shadow-xs' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-purple-950 dark:text-purple-200 truncate">
                          {t.header.voiceReadingTitle}
                        </p>
                        <p className="text-[11.5px] text-purple-900/90 dark:text-purple-200 leading-tight">
                          {t.header.voiceReadingDesc}
                        </p>
                      </div>
                    </div>

                    {/* Master Switch Toggle */}
                    <button
                      onClick={toggleVoiceReading}
                      role="switch"
                      aria-checked={isVoiceReadingEnabled}
                      id="switch-voice-reading-enabled"
                      aria-label="Habilitar o deshabilitar lectura por voz de textos institucionales"
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                        isVoiceReadingEnabled ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          isVoiceReadingEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* If Enabled, provide Quick Institutional Sections Reader & Playback Controls */}
                  {isVoiceReadingEnabled ? (
                    <div className="space-y-2 pt-1 border-t border-purple-200/70 dark:border-purple-900/60">
                      {/* Active Status Badge */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          {isPlaying 
                            ? t.rights.voiceActiveReading 
                            : isPaused 
                            ? t.rights.pauseVoiceBtn 
                            : t.header.voiceReadingActive}
                        </span>
                        {activeTitle && (
                          <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold truncate max-w-[130px]">
                            {activeTitle}
                          </span>
                        )}
                      </div>

                      {/* Quick Section Triggers */}
                      <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                        <button
                          onClick={() => playSection('rights')}
                          className={`py-1 px-1.5 rounded-lg font-bold truncate transition-colors cursor-pointer border ${
                            activeSection === 'rights' && (isPlaying || isPaused)
                              ? 'bg-purple-600 text-white border-purple-700'
                              : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                          }`}
                        >
                          Derechos
                        </button>
                        <button
                          onClick={() => playSection('duties')}
                          className={`py-1 px-1.5 rounded-lg font-bold truncate transition-colors cursor-pointer border ${
                            activeSection === 'duties' && (isPlaying || isPaused)
                              ? 'bg-purple-600 text-white border-purple-700'
                              : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                          }`}
                        >
                          Deberes
                        </button>
                        <button
                          onClick={() => playSection('urgency')}
                          className={`py-1 px-1.5 rounded-lg font-bold truncate transition-colors cursor-pointer border ${
                            activeSection === 'urgency' && (isPlaying || isPaused)
                              ? 'bg-red-600 text-white border-red-700'
                              : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-red-300'
                          }`}
                        >
                          Urgencias
                        </button>
                      </div>

                      {/* Audio Playback Controls if active */}
                      {(isPlaying || isPaused) ? (
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between gap-1.5">
                            {isPlaying ? (
                              <button
                                onClick={pauseVoice}
                                aria-label="Pausar lectura"
                                className="flex-1 py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                              >
                                <Pause className="w-3.5 h-3.5 fill-current" />
                                <span>{t.header.audioPauseBtn}</span>
                              </button>
                            ) : (
                              <button
                                onClick={resumeVoice}
                                aria-label="Reanudar lectura"
                                className="flex-1 py-1.5 px-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>{t.header.audioResumeBtn}</span>
                              </button>
                            )}
                            <button
                              onClick={stopVoice}
                              aria-label="Detener lectura de voz"
                              className="py-1.5 px-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <Square className="w-3 h-3 fill-current" />
                              <span>{t.header.audioStopBtn}</span>
                            </button>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-purple-200 dark:bg-purple-900 h-1.5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso de lectura">
                            <div
                              className="bg-purple-600 dark:bg-purple-400 h-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => playSection('portal')}
                          id="btn-play-portal-intro-voice"
                          aria-label="Reproducir introducción institucional"
                          className="w-full py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{t.header.audioListenBtn}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between pt-1 border-t border-purple-200/60 dark:border-purple-900/40">
                      <span>{t.header.voiceReadingInactive}</span>
                      <button
                        onClick={() => setVoiceReadingEnabled(true)}
                        className="text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
                      >
                        Activar
                      </button>
                    </div>
                  )}
                </div>


                {/* QR Code Share Quick Link */}
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Compartir en sala de espera:
                  </span>
                  <button
                    onClick={() => {
                      setIsAccessMenuOpen(false);
                      onOpenQR();
                    }}
                    aria-label="Abrir código QR del portal para sala de espera"
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center gap-1 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{t.header.qrBtn}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Botón Recordatorios y Notificaciones */}
          {onOpenReminders && (
            <button
              type="button"
              onClick={onOpenReminders}
              id="header-btn-reminders"
              aria-label={t.reminders.headerBtnTooltip}
              title={t.reminders.headerBtnTooltip}
              className="relative h-9 px-2 sm:px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Bell className="w-4 h-4 shrink-0 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
              <span className="hidden lg:inline font-bold">
                {currentLang === 'ht' ? 'Rapèl' : currentLang === 'en' ? 'Reminders' : 'Avisos'}
              </span>
              {activeRemindersCount !== undefined && activeRemindersCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full bg-purple-600 text-white text-[11px] font-black flex items-center justify-center animate-pulse">
                  {activeRemindersCount}
                </span>
              )}
            </button>
          )}

          {/* 4. Botón Menú Hamburguesa Desplegable */}
          <button
            type="button"
            onClick={onOpenMenu}
            id="header-btn-hamburger-menu"
            aria-label={t.mobileNav.menuTitle}
            title={t.mobileNav.menuTitle}
            className="h-9 px-2.5 sm:px-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Menu className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline font-extrabold">{t.mobileNav.menuBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};



