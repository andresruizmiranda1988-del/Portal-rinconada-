import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Pause, Play, Square, Sparkles } from 'lucide-react';
import { useVoiceReading } from '../context/VoiceReadingContext';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';

interface ActiveVoicePlayerBannerProps {
  language: Language;
}

export const ActiveVoicePlayerBanner: React.FC<ActiveVoicePlayerBannerProps> = ({ language }) => {
  const { 
    isPlaying, 
    isPaused, 
    activeTitle, 
    progress, 
    pauseVoice, 
    resumeVoice, 
    stopVoice 
  } = useVoiceReading();

  const t = translations[language];
  const isVisible = isPlaying || isPaused;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="region"
          aria-label="Reproductor de lectura por voz institucional activo"
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40"
        >
          <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-purple-500/40 ring-1 ring-white/10 flex flex-col gap-2.5">
            {/* Header / Info Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="icon-box-sm rounded-xl bg-purple-600/90 text-white shrink-0 shadow-xs relative">
                  <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} strokeWidth={2.2} />
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="micro-badge uppercase font-extrabold tracking-wider text-purple-300">
                      {isPlaying ? t.rights.voiceActiveReading : t.header.voiceReadingInactive}
                    </span>
                    <Sparkles className="w-3 h-3 text-amber-300" strokeWidth={2.2} />
                  </div>
                  <p className="text-xs font-bold text-slate-100 truncate leading-tight">
                    {activeTitle || t.header.voiceReadingTitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                {isPlaying ? (
                  <button
                    onClick={pauseVoice}
                    aria-label={t.rights.pauseVoiceBtn}
                    title={t.rights.pauseVoiceBtn}
                    className="icon-box-md rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <Pause className="w-4 h-4 fill-current" strokeWidth={2.2} />
                  </button>
                ) : (
                  <button
                    onClick={resumeVoice}
                    aria-label={t.rights.resumeVoiceBtn}
                    title={t.rights.resumeVoiceBtn}
                    className="icon-box-md rounded-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" strokeWidth={2.2} />
                  </button>
                )}

                <button
                  onClick={stopVoice}
                  aria-label={t.rights.stopVoiceBtn}
                  title={t.rights.stopVoiceBtn}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer shadow-sm shadow-rose-600/20"
                >
                  <Square className="w-2.5 h-2.5 fill-current shrink-0" strokeWidth={2.2} />
                  <span>{t.rights.stopVoiceBtn}</span>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div 
              className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden" 
              role="progressbar" 
              aria-valuenow={progress} 
              aria-valuemin={0} 
              aria-valuemax={100}
              aria-label="Progreso de narración de texto"
            >
              <div
                className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
