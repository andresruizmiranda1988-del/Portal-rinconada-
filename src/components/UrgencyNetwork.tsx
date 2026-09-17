import React from 'react';
import { motion } from 'motion/react';
import { 
  Ambulance, 
  Hospital, 
  Activity, 
  PhoneCall, 
  AlertTriangle,
  MapPin,
  Clock,
  Navigation,
  Phone,
  ShieldAlert,
  Volume2,
  Pause,
  Play,
  Square,
  Sparkles
} from 'lucide-react';
import { urgencyPhones, urgencyHospitals } from '../data/cosamData';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';
import { useVoiceReading } from '../context/VoiceReadingContext';

interface UrgencyNetworkProps {
  language: Language;
}

export const UrgencyNetwork: React.FC<UrgencyNetworkProps> = ({ language }) => {
  const t = translations[language];
  const { 
    isVoiceReadingEnabled, 
    activeSection, 
    isPlaying, 
    isPaused, 
    playSection, 
    pauseVoice, 
    resumeVoice, 
    stopVoice 
  } = useVoiceReading();

  const isReadingUrgency = activeSection === 'urgency' && (isPlaying || isPaused);

  return (
    <motion.section
      id="red-urgencias-section"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
          <div className="icon-box-sm rounded-xl bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 shadow-xs">
            <Ambulance className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <span>{t.urgency.title}</span>
        </h3>

        <div className="flex items-center gap-2">
          {/* Voice Reading Button for Urgency */}
          {isVoiceReadingEnabled && (
            <div>
              {isReadingUrgency ? (
                <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/80 px-2.5 py-1 rounded-full border border-red-300 dark:border-red-800 shadow-2xs">
                  <span className="text-[10px] font-bold text-red-700 dark:text-red-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-red-600 animate-spin" />
                    {isPlaying ? t.rights.voiceActiveReading : t.rights.pauseVoiceBtn}
                  </span>
                  {isPlaying ? (
                    <button
                      onClick={pauseVoice}
                      aria-label={t.rights.pauseVoiceBtn}
                      className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 cursor-pointer shadow-2xs"
                    >
                      <Pause className="w-3 h-3 fill-current" />
                    </button>
                  ) : (
                    <button
                      onClick={resumeVoice}
                      aria-label={t.rights.resumeVoiceBtn}
                      className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center hover:bg-red-700 cursor-pointer shadow-2xs"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  )}
                  <button
                    onClick={stopVoice}
                    aria-label={t.rights.stopVoiceBtn}
                    className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 cursor-pointer"
                  >
                    <Square className="w-2.5 h-2.5 fill-current" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => playSection('urgency')}
                  id="btn-voice-read-urgency"
                  aria-label={`${t.urgency.listenUrgencyBtn} - Protocolo y fonos de emergencia`}
                  className="micro-badge bg-red-50 hover:bg-red-100 dark:bg-red-950/70 dark:hover:bg-red-900/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" strokeWidth={2.2} />
                  <span>{t.urgency.listenUrgencyBtn}</span>
                </button>
              )}
            </div>
          )}

          <span className="micro-badge text-red-600 dark:text-red-400 font-bold uppercase tracking-wider bg-red-50 dark:bg-red-950/60 border border-red-200/80 dark:border-red-900/60">
            {t.urgency.badge}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(239,68,68,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(239,68,68,0.22)] border transition-all duration-300 space-y-5 ${
          isReadingUrgency
            ? 'border-red-500 ring-2 ring-red-400/40 dark:border-red-400 dark:ring-red-500/30'
            : 'border-red-300/60 ring-1 ring-red-400/20 dark:border-red-500/30 dark:ring-red-500/20'
        }`}
      >
        {/* Vital Warning */}

        <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-2xl border border-red-200 dark:border-red-900/60 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-red-700 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 animate-pulse" strokeWidth={2.2} />
            <span>{t.urgency.warningTitle}</span>
          </div>
          <p className="text-xs text-red-900/90 dark:text-red-300 pl-6 leading-relaxed">
            {t.urgency.warningDesc}
          </p>
        </div>

        {/* Hospital & SAPU Directory Header */}
        <div className="space-y-1 pt-1">
          <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Hospital className="w-4 h-4 text-red-600 dark:text-red-400" strokeWidth={2.2} />
            <span>{t.urgency.hospDirectoryTitle}</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.urgency.hospDirectorySubtitle}
          </p>
        </div>

        {/* Hospital & SAPU Rich Cards */}
        <div className="space-y-3.5">
          {urgencyHospitals.map((hosp) => {
            const isRefHospital = hosp.isHospital;
            return (
              <div 
                key={hosp.id}
                className={`rounded-2xl p-4 space-y-3 shadow-xs hover:border-red-400 dark:hover:border-red-500 transition-all duration-200 border ${
                  isRefHospital
                    ? 'bg-red-500/[0.03] dark:bg-red-500/[0.01] border-red-500 ring-2 ring-red-500/25 animate-[pulse_4s_infinite]'
                    : 'bg-slate-50/70 dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80'
                }`}
              >
                {/* Name, Type & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isRefHospital ? (
                        <Hospital className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" strokeWidth={2.5} />
                      ) : (
                        <Activity className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" strokeWidth={2.2} />
                      )}
                      <h5 className={`text-sm font-extrabold leading-snug ${
                        isRefHospital ? 'text-red-700 dark:text-red-400 font-black' : 'text-slate-900 dark:text-white'
                      }`}>
                        {hosp.name}
                      </h5>
                    </div>
                    
                    {isRefHospital && (
                      <div className="pl-6">
                        <span className="micro-badge bg-red-600 text-white font-black border-none text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-sm">
                          {language === 'ht' ? 'Lopital Referans Prensipal' : language === 'en' ? 'Primary Reference Hospital' : 'Hospital de Referencia Principal'}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-6">
                      {hosp.type}
                    </p>
                  </div>

                  {hosp.badge && (
                    <span className={`micro-badge shrink-0 border ${
                      isRefHospital 
                        ? 'bg-red-600 text-white border-none font-black' 
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800/80'
                    }`}>
                      {hosp.badge}
                    </span>
                  )}
                </div>

                {/* Details Block: Address, Schedule & Phone */}
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-900/70 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-xs leading-tight font-medium text-slate-800 dark:text-slate-200">
                      {hosp.address}
                    </span>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-xs leading-tight font-medium text-slate-700 dark:text-slate-300">
                      {hosp.schedule}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={2.2} />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {t.urgency.phoneLabel} {hosp.phoneFormatted}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Waze, Maps, Direct Call */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  <a
                    href={hosp.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir navegación Waze hacia ${hosp.name}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-500 shrink-0" strokeWidth={2.2} />
                    <span>{t.urgency.wazeBtn}</span>
                  </a>

                  <a
                    href={hosp.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ubicación en Google Maps para ${hosp.name}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" strokeWidth={2.2} />
                    <span>{t.urgency.mapsBtn}</span>
                  </a>

                  <a
                    href={`tel:${hosp.phone}`}
                    aria-label={`Llamar de urgencia a ${hosp.name} al teléfono ${hosp.phoneFormatted}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                    <span>{t.urgency.callBtn}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 24/7 Telephone Assistance & Crisis Lines */}
        <div className="bg-red-50/70 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-red-900 dark:text-red-300 flex items-center gap-1.5 uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5 text-red-600 dark:text-red-400" strokeWidth={2.2} />
                <span>{t.urgency.crisisLinesTitle}</span>
              </p>
              <p className="text-xs text-red-800/80 dark:text-red-300/80">
                {t.urgency.crisisLinesSubtitle}
              </p>
            </div>
            <span className="micro-badge text-red-700 dark:text-red-400 font-bold bg-red-100 dark:bg-red-900/60 shrink-0">
              {t.urgency.phonesFree}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {urgencyPhones.map((phone, idx) => {
              const isShortCode = phone.number.startsWith('*') || phone.number.length <= 4;

              return (
                <a
                  key={idx}
                  href={phone.telUri}
                  id={`btn-emergency-${phone.number.replace('*', 'star')}`}
                  aria-label={`Llamar a ${phone.label} al número ${phone.number}`}
                  className={`p-3 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-red-400 flex flex-col justify-between gap-1.5 border ${
                    phone.isPrimary
                      ? 'bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-red-600/20'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-red-200/80 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-slate-800/90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <PhoneCall className={`w-4 h-4 shrink-0 ${phone.isPrimary ? 'text-white animate-pulse' : 'text-red-600 dark:text-red-400'}`} strokeWidth={2.2} />
                      <span className="font-extrabold text-xs leading-tight">{phone.label}</span>
                    </div>
                    <span className={`micro-badge font-black shrink-0 ${
                      phone.isPrimary 
                        ? 'bg-red-700 text-white' 
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {phone.number}
                    </span>
                  </div>

                  {phone.description && (
                    <p className={`text-xs font-normal leading-snug pl-6 ${
                      phone.isPrimary ? 'text-red-100' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {phone.description}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
