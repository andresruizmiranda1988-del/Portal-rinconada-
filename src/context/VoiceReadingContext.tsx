import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types/clinical';
import { getInstitutionalAudioScripts } from '../data/institutionalAudioScripts';

export type InstitutionalSection = 'portal' | 'rights' | 'duties' | 'rights_all' | 'urgency';

export interface VoiceReadingContextType {
  isVoiceReadingEnabled: boolean;
  toggleVoiceReading: () => void;
  setVoiceReadingEnabled: (enabled: boolean) => void;
  activeSection: string | null;
  activeTitle: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  progress: number;
  playSection: (section: InstitutionalSection, overrideLang?: Language) => void;
  playCustomText: (id: string, title: string, text: string, lang?: Language) => void;
  pauseVoice: () => void;
  resumeVoice: () => void;
  stopVoice: () => void;
}

const VoiceReadingContext = createContext<VoiceReadingContextType | undefined>(undefined);

interface VoiceReadingProviderProps {
  children: React.ReactNode;
  currentLanguage: Language;
}

export const VoiceReadingProvider: React.FC<VoiceReadingProviderProps> = ({
  children,
  currentLanguage
}) => {
  const [isVoiceReadingEnabled, setIsVoiceReadingEnabledState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cosam_voice_reading');
      // Default to true for accessibility, unless explicitly disabled
      return stored !== 'false';
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  const setVoiceReadingEnabled = useCallback((enabled: boolean) => {
    setIsVoiceReadingEnabledState(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cosam_voice_reading', String(enabled));
    }
    if (!enabled) {
      stopVoice();
    }
  }, []);

  const toggleVoiceReading = useCallback(() => {
    setVoiceReadingEnabled(!isVoiceReadingEnabled);
  }, [isVoiceReadingEnabled, setVoiceReadingEnabled]);

  const stopVoice = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setActiveSection(null);
    setActiveTitle(null);
    setProgress(0);
    utteranceRef.current = null;
  }, []);

  const pauseVoice = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const resumeVoice = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    }
  }, []);

  const playCustomText = useCallback((id: string, title: string, text: string, lang: Language = currentLanguage) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('La síntesis de voz no está soportada en tu dispositivo o navegador.');
      return;
    }

    // Stop any current playback
    window.speechSynthesis.cancel();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Pick proper language code
    if (lang === 'ht') {
      utterance.lang = 'fr-FR'; // Standard French phonetics as best accessible fallback for Haitian Creole TTS
    } else if (lang === 'en') {
      utterance.lang = 'en-US';
    } else {
      utterance.lang = 'es-CL';
    }

    // Accessible pacing (slightly slower for high comprehension)
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    // Attempt to pick a natural regional voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find(v => v.lang === utterance.lang || v.lang.startsWith(utterance.lang.slice(0, 2)));
      if (match) utterance.voice = match;
    }

    setActiveSection(id);
    setActiveTitle(title);
    setIsPlaying(true);
    setIsPaused(false);
    setProgress(0);

    // Approximate duration based on word count
    const wordsCount = text.split(/\s+/).filter(Boolean).length;
    const estimatedSecs = Math.max(8, Math.round(wordsCount / 2.3));
    let elapsed = 0;

    timerRef.current = window.setInterval(() => {
      elapsed += 0.5;
      const pct = Math.min(99, Math.round((elapsed / estimatedSecs) * 100));
      setProgress(pct);
    }, 500);

    utterance.onend = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      setIsPlaying(false);
      setIsPaused(false);
      setTimeout(() => {
        setActiveSection(null);
        setActiveTitle(null);
        setProgress(0);
      }, 900);
    };

    utterance.onerror = (e) => {
      // Don't report error if it was manually cancelled
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e);
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
      setIsPaused(false);
      setActiveSection(null);
      setActiveTitle(null);
      setProgress(0);
    };

    window.speechSynthesis.speak(utterance);
  }, [currentLanguage]);

  const playSection = useCallback((section: InstitutionalSection, overrideLang?: Language) => {
    const langToUse = overrideLang || currentLanguage;
    const scripts = getInstitutionalAudioScripts(langToUse);
    const script = scripts[section];
    if (script) {
      playCustomText(script.id, script.title, script.text, langToUse);
    }
  }, [currentLanguage, playCustomText]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, [stopVoice]);

  // Stop speech if language changes
  useEffect(() => {
    stopVoice();
  }, [currentLanguage, stopVoice]);

  return (
    <VoiceReadingContext.Provider
      value={{
        isVoiceReadingEnabled,
        toggleVoiceReading,
        setVoiceReadingEnabled,
        activeSection,
        activeTitle,
        isPlaying,
        isPaused,
        progress,
        playSection,
        playCustomText,
        pauseVoice,
        resumeVoice,
        stopVoice
      }}
    >
      {children}
    </VoiceReadingContext.Provider>
  );
};

export const useVoiceReading = (): VoiceReadingContextType => {
  const context = useContext(VoiceReadingContext);
  if (!context) {
    throw new Error('useVoiceReading must be used within a VoiceReadingProvider');
  }
  return context;
};
