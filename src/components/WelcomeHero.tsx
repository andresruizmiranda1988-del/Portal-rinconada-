import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, Clock, HeartHandshake, Navigation } from 'lucide-react';
import { CosamInfo, Language } from '../types/clinical';
import { translations } from '../data/translations';

interface WelcomeHeroProps {
  info: CosamInfo;
  language: Language;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ info, language }) => {
  const t = translations[language];

  // Real-time Chile Time (America/Santiago) Operational Status
  const getOperationalStatus = () => {
    try {
      const now = new Date();
      const chileTimeString = now.toLocaleString("en-US", { timeZone: "America/Santiago" });
      const chileDate = new Date(chileTimeString);
      const day = chileDate.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
      const hours = chileDate.getHours();
      const minutes = chileDate.getMinutes();
      const timeVal = hours + minutes / 60;

      // Mon-Thu: 08:30 to 17:30
      if (day >= 1 && day <= 4) {
        if (timeVal >= 8.5 && timeVal < 17.5) {
          return {
            open: true,
            text: language === 'ht' ? 'Louvri kounye a jiska 5:30 PM' : language === 'en' ? 'Open now until 17:30 hrs' : 'Abierto ahora hasta las 17:30 hrs',
            sub: language === 'ht' ? 'Atansyon SOME aktif' : language === 'en' ? 'SOME reception active' : 'Atención presencial SOME activa'
          };
        }
      } else if (day === 5) {
        // Friday: 08:30 to 16:30
        if (timeVal >= 8.5 && timeVal < 16.5) {
          return {
            open: true,
            text: language === 'ht' ? 'Louvri kounye a jiska 4:30 PM' : language === 'en' ? 'Open now until 16:30 hrs' : 'Abierto ahora hasta las 16:30 hrs',
            sub: language === 'ht' ? 'Atansyon SOME aktif' : language === 'en' ? 'SOME reception active' : 'Atención presencial SOME activa'
          };
        }
      }

      return {
        open: false,
        text: language === 'ht' ? 'Fèmen - Rezo Urgans disponib' : language === 'en' ? 'Closed - Emergency Network available' : 'Cerrado - Red de Urgencias disponible',
        sub: language === 'ht' ? 'Pou ijans vital rele 131 oswa ale nan SAPU' : language === 'en' ? 'For vital emergencies call 131 or visit SAPU' : 'Para emergencias vitales llame al 131 o acuda a la red de Urgencias'
      };
    } catch (e) {
      return {
        open: true,
        text: 'Abierto en horario hábil',
        sub: 'Lunes a Viernes'
      };
    }
  };

  const status = getOperationalStatus();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 relative overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/30 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full text-center space-y-4">
        {/* Safe space tag & Operational Status Tag */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          <div className="micro-badge bg-purple-100/90 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-700/60 text-purple-800 dark:text-purple-200 font-bold tracking-wide">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />
            <span>{t.welcome.badge}</span>
          </div>

          <div 
            id="welcome-operational-status-badge"
            className={`micro-badge ${
              status.open 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            } font-bold`}
          >
            <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'} shrink-0`} />
            <span>{status.text}</span>
          </div>
        </div>

        {/* Main greeting headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          {t.welcome.title}
        </h2>

        {/* Warm welcoming paragraph */}
        <p className="text-slate-600 dark:text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          {t.welcome.text}
        </p>

        {status.sub && (
          <p className={`text-[11px] font-bold ${status.open ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} max-w-sm mx-auto`}>
            • {status.sub}
          </p>
        )}

        {/* Primary Contact Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center items-stretch sm:items-center">
          <a
            href={`tel:${info.phoneSome}`}
            id="hero-btn-call-some"
            aria-label={
              language === 'ht' 
                ? `Rele SOME nan telefòn ${info.phoneSome}` 
                : language === 'en' 
                ? `Call SOME reception at ${info.phoneSome}` 
                : `Llamar a SOME al teléfono ${info.phoneSome}`
            }
            className="flex-1 min-w-[140px] bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 focus-visible:ring-3 focus-visible:ring-purple-400"
          >
            <Phone className="w-4 h-4" strokeWidth={2.2} />
            <span>{t.welcome.callSome}</span>
          </a>

          <a
            href={`https://wa.me/${info.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-btn-whatsapp-some"
            aria-label={
              language === 'ht' 
                ? `Voye yon mesaj WhatsApp bay SOME nan ${info.whatsappNumber}` 
                : language === 'en' 
                ? `Send a WhatsApp message to SOME at ${info.whatsappNumber}` 
                : `Enviar mensaje de WhatsApp a SOME al ${info.whatsappNumber}`
            }
            className="flex-1 min-w-[140px] bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 focus-visible:ring-3 focus-visible:ring-emerald-400"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2.2} />
            <span>{t.welcome.whatsapp}</span>
          </a>
        </div>

        {/* Physical Address & GPS Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={info.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-btn-maps-location"
            aria-label={
              language === 'ht'
                ? `Ouvri kat jeyografik Google Maps nan ${info.address}`
                : language === 'en'
                ? `Open Google Maps navigation to ${info.address}`
                : `Abrir ubicación en Google Maps en ${info.address}`
            }
            className="w-full bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-purple-800 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-slate-750 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs group focus-visible:ring-3 focus-visible:ring-purple-500"
          >
            <MapPin className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform shrink-0" strokeWidth={2.2} />
            <span className="truncate">{info.address}</span>
            <span className="text-xs text-slate-500 dark:text-slate-300 font-normal shrink-0">({t.welcome.openMaps})</span>
          </a>

          <a
            href={info.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-btn-waze-location"
            aria-label={
              language === 'ht'
                ? `Ouvri navigasyon Waze pou rive nan ${info.address}`
                : language === 'en'
                ? `Open Waze navigation to ${info.address}`
                : `Abrir navegación en Waze hacia ${info.address}`
            }
            className="w-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-800 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-slate-750 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs group focus-visible:ring-3 focus-visible:ring-blue-500"
          >
            <Navigation className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform shrink-0" strokeWidth={2.2} />
            <span>Navegar con Waze</span>
            <span className="text-xs text-slate-500 dark:text-slate-300 font-normal shrink-0">({t.welcome.openWaze})</span>
          </a>
        </div>

        {/* Opening Hours Info Banner */}
        <div className="pt-2 border-t border-purple-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 text-left bg-white/60 dark:bg-slate-800/40 p-3 rounded-xl border border-purple-100/50 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
            <span><strong>{t.welcome.hoursWeekdays}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
            <span><strong>{t.welcome.hoursFriday}</strong></span>
          </div>
          <div className="sm:col-span-2 text-xs text-purple-700 dark:text-purple-300 font-semibold text-center pt-1">
            * {t.welcome.hoursNote}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
