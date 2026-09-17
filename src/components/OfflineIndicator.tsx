import React, { useState, useEffect } from 'react';
import { 
  WifiOff, 
  CheckCircle2, 
  RefreshCw, 
  X,
  Database
} from 'lucide-react';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check and precache request to Service Worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_DOCS_NOW' });
    }

    const handleSwMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'DOCS_CACHED_SUCCESS') {
        setSyncedSuccess(true);
        setTimeout(() => setSyncedSuccess(false), 3500);
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSwMessage);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleSwMessage);
      }
    };
  }, []);

  const handleManualCacheDocs = async () => {
    setIsSyncing(true);
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'CACHE_DOCS_NOW' });
      }

      // Also ensure caches API stores local state if accessible
      if ('caches' in window) {
        const cache = await caches.open('cosam-docs-v3');
        await cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/icon.svg'
        ]).catch(() => {});
      }

      setSyncedSuccess(true);
      setTimeout(() => setSyncedSuccess(false), 3500);
    } catch (err) {
      console.warn('[Offline Cache Error]:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // If online and no sync toast, don't show the large warning banner, but we can show offline capability status if requested
  if (isOnline && !syncedSuccess) {
    return null;
  }

  if (dismissed && !syncedSuccess) {
    return null;
  }

  return (
    <div className="px-3 sm:px-6 pt-3">
      {syncedSuccess && (
        <div 
          role="status"
          aria-live="polite"
          className="max-w-2xl mx-auto mb-2 bg-emerald-600 text-white p-3 rounded-2xl shadow-md flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" strokeWidth={2.2} />
            <span>{t.offline.syncedToast}</span>
          </div>
          <button
            onClick={() => setSyncedSuccess(false)}
            aria-label="Cerrar notificación"
            className="p-1 hover:bg-emerald-700 rounded-lg text-emerald-100 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.2} />
          </button>
        </div>
      )}

      {/* Removed large banner container to avoid content pushing. Handled by the header micro-dot indicator. */}
    </div>
  );
};
