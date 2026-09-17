import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, RotateCcw, FileText, CheckCircle2, X } from 'lucide-react';
import { Language } from '../types/clinical';

interface AudioGuidePlayerProps {
  title: string;
  quadrantNumber?: number;
  workshopNumber?: number;
  scriptText: string;
  language: Language;
  themeColor: 'purple' | 'indigo' | 'emerald' | 'amber';
}

export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  title,
  quadrantNumber,
  workshopNumber,
  scriptText,
  language,
  themeColor
}) => {
  const currentNum = workshopNumber || quadrantNumber || 1;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopPlayback();
    };
  }, []);

  const colorStyles = {
    purple: {
      btn: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25',
      badge: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      activeBorder: 'border-purple-300 dark:border-purple-700',
      bar: 'bg-purple-600 dark:bg-purple-400'
    },
    indigo: {
      btn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25',
      badge: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      activeBorder: 'border-indigo-300 dark:border-indigo-700',
      bar: 'bg-indigo-600 dark:bg-indigo-400'
    },
    emerald: {
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25',
      badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      activeBorder: 'border-emerald-300 dark:border-emerald-700',
      bar: 'bg-emerald-600 dark:bg-emerald-400'
    },
    amber: {
      btn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25',
      badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      activeBorder: 'border-amber-300 dark:border-amber-700',
      bar: 'bg-amber-600 dark:bg-amber-400'
    }
  }[themeColor];

  const startPlayback = () => {
    if (!('speechSynthesis' in window)) {
      alert('La síntesis de voz no está soportada en tu navegador.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(scriptText);
    utteranceRef.current = utterance;

    // Set voice language
    if (language === 'ht') {
      utterance.lang = 'fr-FR'; // French fallback for Creole speech synthesis
    } else if (language === 'en') {
      utterance.lang = 'en-US';
    } else {
      utterance.lang = 'es-CL';
    }

    utterance.rate = 0.95; // slightly slower for maximum accessibility & clarity
    utterance.pitch = 1.0;

    // Estimate duration for progress animation (~1 minute)
    const estimatedDuration = Math.max(30, Math.round(scriptText.split(' ').length / 2.2));
    let elapsed = 0;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      elapsed += 0.5;
      const pct = Math.min(100, Math.round((elapsed / estimatedDuration) * 100));
      setProgress(pct);
    }, 500);

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeout(() => setProgress(0), 1200);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pausePlayback = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const resumePlayback = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      startPlayback();
    }
  };

  const stopPlayback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className={`p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border transition-all ${isPlaying ? colorStyles.activeBorder : 'border-slate-200/80 dark:border-slate-800'}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="icon-box-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
            <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-purple-600 dark:text-purple-400' : ''}`} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
              {language === 'es' ? 'Audio-guía accesible' : language === 'ht' ? 'Odio-gid aksesib' : 'Accessible Audio Guide'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>⏱ ~1 min</span>
              {isPlaying && (
                <span className="font-semibold text-purple-600 dark:text-purple-400 animate-pulse">
                  • {language === 'es' ? 'Reproduciendo...' : language === 'ht' ? 'K ap jwe...' : 'Playing...'}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {!isPlaying && !isPaused ? (
            <button
              onClick={startPlayback}
              id={`btn-play-audio-w${currentNum}`}
              aria-label={`Reproducir audio guía del taller ${title}`}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs active:scale-95 cursor-pointer ${colorStyles.btn}`}
            >
              <Play className="w-3 h-3 fill-current" strokeWidth={2.2} />
              <span>{language === 'es' ? 'Escuchar' : language === 'ht' ? 'Koute' : 'Listen'}</span>
            </button>
          ) : isPlaying ? (
            <div className="flex items-center gap-1">
              <button
                onClick={pausePlayback}
                id={`btn-pause-audio-w${currentNum}`}
                aria-label="Pausar audio"
                className="px-2 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Pause className="w-3 h-3 fill-current" strokeWidth={2.2} />
                <span>{language === 'es' ? 'Pausa' : language === 'ht' ? 'Poz' : 'Pause'}</span>
              </button>
              <button
                onClick={stopPlayback}
                id={`btn-stop-audio-w${currentNum}`}
                aria-label="Detener audio"
                className="p-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 cursor-pointer"
                title="Detener"
              >
                <RotateCcw className="w-3 h-3" strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={resumePlayback}
                id={`btn-resume-audio-w${currentNum}`}
                aria-label="Reanudar audio"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer ${colorStyles.btn}`}
              >
                <Play className="w-3 h-3 fill-current" strokeWidth={2.2} />
                <span>{language === 'es' ? 'Reanudar' : language === 'ht' ? 'Kontinye' : 'Resume'}</span>
              </button>
              <button
                onClick={stopPlayback}
                aria-label="Detener audio"
                className="p-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" strokeWidth={2.2} />
              </button>
            </div>
          )}

          {/* Transcript button */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            id={`btn-transcript-w${currentNum}`}
            aria-label="Ver transcripción de audio"
            className="p-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all cursor-pointer"
            title={language === 'es' ? 'Ver transcripción en texto' : language === 'ht' ? 'Gade tèks transkripsyon an' : 'View text transcript'}
          >
            <FileText className="w-3.5 h-3.5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {isPlaying && (
        <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${colorStyles.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Transcript Collapsible */}
      {showTranscript && (
        <div className="mt-2.5 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
              {language === 'es' ? 'Transcripción de la Audio-guía' : language === 'ht' ? 'Tèks Odio-gid la' : 'Audio-guide Transcript'}
            </span>
            <button
              onClick={() => setShowTranscript(false)}
              aria-label="Cerrar transcripción"
              className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded cursor-pointer"
            >
              <X className="w-3 h-3" strokeWidth={2.2} />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 italic">
            "{scriptText}"
          </p>
        </div>
      )}
    </div>
  );
};
