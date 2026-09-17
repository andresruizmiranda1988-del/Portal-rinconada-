import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Pill, 
  Navigation, 
  MapPin, 
  Phone, 
  Clock, 
  Volume2, 
  VolumeX, 
  Download, 
  CheckCircle2,
  Bell,
  BellRing
} from 'lucide-react';
import { MedicationCenter, Language } from '../types/clinical';
import { translations } from '../data/translations';
import { generateMedicationGuidePdf } from '../utils/pdfGenerator';

interface MedicationPickupProps {
  centers: MedicationCenter[];
  language: Language;
  onOpenReminders?: (presetCenterName?: string) => void;
}

export const MedicationPickup: React.FC<MedicationPickupProps> = ({ centers, language, onOpenReminders }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pickupDates, setPickupDates] = useState<Record<string, string>>({});
  const [activeReminders, setActiveReminders] = useState<Record<string, boolean>>({});
  const t = translations[language];

  // Stop speech when unmounting or language changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const getDaysRemainingText = (dateStr: string) => {
    if (!dateStr) return null;
    const target = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    // Zero out hours/minutes/seconds for reliable day difference calculation
    target.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return {
        label: language === 'ht' ? 'Retire jodi a!' : language === 'en' ? 'Pick up today!' : '¡Retiro hoy!',
        style: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 animate-pulse'
      };
    } else if (diffDays > 0) {
      return {
        label: language === 'ht' ? `Rete ${diffDays} jou` : language === 'en' ? `In ${diffDays} days` : `Faltan ${diffDays} días`,
        style: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/20'
      };
    } else {
      return {
        label: language === 'ht' ? `${Math.abs(diffDays)} jou reta` : language === 'en' ? `${Math.abs(diffDays)} days overdue` : `Atrasado por ${Math.abs(diffDays)} días`,
        style: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/20'
      };
    }
  };

  const step1Text = t.medication.step1Title;
  const step2Text = t.medication.step2Title;
  const step3Text = t.medication.step3Title;

  const handleSpeakSteps = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToRead = language === 'ht'
      ? `Gid twa etap pou retire medikaman w yo nan rezo sante a. Etap 1: ${step1Text}. Etap 2: ${step2Text}. Etap 3: ${step3Text}. Sonje toujou pote kat idantite fizik ak resèt medikal valab.`
      : language === 'en'
      ? `Three-step guide to pick up your medication in the health network. Step 1: ${step1Text}. Step 2: ${step2Text}. Step 3: ${step3Text}. Remember to always present your physical ID card and active medical prescription.`
      : `Guía en tres pasos para retirar tus medicamentos en la red de salud. Paso 1: ${step1Text}. Paso 2: ${step2Text}. Paso 3: ${step3Text}. Recuerda presentar siempre tu cédula de identidad física y receta médica vigente.`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'ht' ? 'fr-FR' : language === 'en' ? 'en-US' : 'es-CL';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      generateMedicationGuidePdf(language);
    } catch (err) {
      console.error('Error generating medication PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.section
        id="retiro-farmacos-section"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 space-y-5"
      >
        {/* Module Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-purple-100 dark:border-purple-900/40">
          <div className="space-y-0.5">
            <span className="micro-badge bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80">
              <Pill className="w-3.5 h-3.5" strokeWidth={2.2} />
              {t.medication.generalTitle}
            </span>
            <h2 className="text-slate-900 dark:text-slate-100 font-extrabold text-lg">
              {t.medication.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.medication.subtitle}
            </p>
          </div>

          {/* Action buttons: Read aloud & PDF */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-leer-pasos-medicamentos"
              type="button"
              onClick={handleSpeakSteps}
              aria-label={isSpeaking ? t.medication.stopListeningBtn : t.medication.listenStepsBtn}
              className={`p-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 border ${
                isSpeaking
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 animate-pulse'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900/80 dark:text-purple-300 border-purple-200 dark:border-purple-800/80'
              }`}
              title={isSpeaking ? t.medication.stopListeningBtn : t.medication.listenStepsBtn}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" strokeWidth={2.2} /> : <Volume2 className="w-4 h-4" strokeWidth={2.2} />}
            </button>

            <button
              id="btn-descargar-guia-medicamentos"
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              aria-label={t.medication.downloadGuideBtn}
              title={t.medication.downloadGuideBtn}
              className="p-2.5 rounded-2xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* 3-Step Compact Horizontal Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-3 flex flex-col items-center justify-between text-center shadow-xs border border-purple-200/50 dark:border-purple-800/40">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md shadow-purple-500/20 mb-2 shrink-0">
              1
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
              {step1Text}
            </span>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-3 flex flex-col items-center justify-between text-center shadow-xs border border-purple-200/50 dark:border-purple-800/40">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md shadow-purple-500/20 mb-2 shrink-0">
              2
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
              {step2Text}
            </span>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-3 flex flex-col items-center justify-between text-center shadow-xs border border-purple-200/50 dark:border-purple-800/40">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md shadow-purple-500/20 mb-2 shrink-0">
              3
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
              {step3Text}
            </span>
          </div>
        </div>

        {/* Medication Reminder Callout Banner */}
        <div className="bg-gradient-to-br from-purple-50 via-indigo-50/50 to-purple-50 dark:from-purple-950/60 dark:via-indigo-950/40 dark:to-purple-950/60 rounded-2xl p-3.5 border border-purple-300/80 dark:border-purple-800/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <div className="icon-box-md rounded-xl bg-purple-600 text-white shrink-0 mt-0.5 shadow-xs">
              <BellRing className="w-4 h-4 text-amber-300 animate-pulse" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-slate-100">
                {t.reminders.medicationPickupBannerTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                {t.reminders.medicationPickupBannerDesc}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenReminders?.()}
            id="btn-programar-recordatorio-medicamentos"
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Bell className="w-3.5 h-3.5" strokeWidth={2.2} />
            <span>{t.reminders.schedulePickupBtn}</span>
          </button>
        </div>

        {/* Dispensation Centers Directory */}
        <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40 space-y-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
              {t.medication.pointsTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.medication.pointsSubtitle}
            </p>
          </div>

          {/* Individual Slim Pharmacy Cards */}
          <div className="space-y-3">
            {centers.map((center) => {
              const isBenzo = center.type === 'benzos';
              const badgeLabel = isBenzo ? t.medication.benzoBadge : t.medication.generalBadge;
              const scheduleText = center.schedule || 'Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00';
              const phoneNumber = center.phone || '225769800';

              return (
                <div
                  key={center.id}
                  className="rounded-2xl bg-white dark:bg-slate-900/80 border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 p-4 space-y-3 shadow-xs hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200"
                >
                  {/* Center Name and Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {center.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {center.sector}
                      </p>
                    </div>

                    <span
                      className={`micro-badge shrink-0 border ${
                        isBenzo
                          ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/80 dark:text-purple-200 border-purple-200/80 dark:border-purple-700'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border-emerald-200/80 dark:border-emerald-700'
                      }`}
                    >
                      {badgeLabel}
                    </span>
                  </div>

                  {/* Details Block: Address, Schedule and Phone */}
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 bg-purple-50/50 dark:bg-purple-950/30 p-2.5 rounded-xl border border-purple-100/60 dark:border-purple-900/50">
                    {center.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" strokeWidth={2.2} />
                        <span className="text-xs leading-tight font-medium text-slate-800 dark:text-slate-200">
                          {center.address}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                      <span className="font-medium text-xs leading-tight text-slate-700 dark:text-slate-300">
                        {scheduleText}
                      </span>
                    </div>

                    {center.phoneFormatted && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={2.2} />
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {t.medication.phoneLabel} {center.phoneFormatted}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="grid grid-cols-3 gap-2 pt-0.5">
                    <a
                      href={center.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir navegación Waze hacia ${center.name}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-200 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-500 shrink-0" strokeWidth={2.2} />
                      <span>{t.medication.wazeBtn}</span>
                    </a>

                    <a
                      href={center.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ubicación en Google Maps para ${center.name}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-200 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" strokeWidth={2.2} />
                      <span>{t.medication.mapsBtn}</span>
                    </a>

                    <a
                      href={`tel:${phoneNumber}`}
                      aria-label={`Llamar a ${center.name} al teléfono ${phoneNumber}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-400"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                      <span>{t.medication.callBtn}</span>
                    </a>
                  </div>

                  {/* Interactive Date Picker & Reminder Countdown */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor={`date-picker-${center.id}`} className="text-[10px] sm:text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wide font-display">
                        {language === 'ht' ? 'Dat pwochen livrezon' : language === 'en' ? 'Next pickup date' : 'Fecha de próximo retiro'}
                      </label>
                      
                      {pickupDates[center.id] && (() => {
                        const daysData = getDaysRemainingText(pickupDates[center.id]);
                        return daysData ? (
                          <span className={`micro-badge font-extrabold text-[10px] shrink-0 ${daysData.style}`}>
                            {daysData.label}
                          </span>
                        ) : null;
                      })()}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        id={`date-picker-${center.id}`}
                        type="date"
                        value={pickupDates[center.id] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPickupDates(prev => ({ ...prev, [center.id]: val }));
                          if (val) {
                            setActiveReminders(prev => ({ ...prev, [center.id]: true }));
                          } else {
                            setActiveReminders(prev => ({ ...prev, [center.id]: false }));
                          }
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-purple-500"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (!pickupDates[center.id]) {
                            // If no date is set, default to today for testing
                            const todayStr = new Date().toISOString().split('T')[0];
                            setPickupDates(prev => ({ ...prev, [center.id]: todayStr }));
                            setActiveReminders(prev => ({ ...prev, [center.id]: true }));
                          } else {
                            setActiveReminders(prev => ({ ...prev, [center.id]: !prev[center.id] }));
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer border ${
                          activeReminders[center.id]
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900/80 dark:text-purple-300 border-purple-200 dark:border-purple-800/80'
                        }`}
                      >
                        {activeReminders[center.id] ? <BellRing className="w-3.5 h-3.5 animate-bounce text-yellow-300" /> : <Bell className="w-3.5 h-3.5" />}
                        <span>
                          {activeReminders[center.id] 
                            ? (language === 'ht' ? 'Rapèl aktif' : language === 'en' ? 'Reminder active' : 'Recordatorio activo')
                            : (language === 'ht' ? 'Pwograme rapèl' : language === 'en' ? 'Schedule reminder' : 'Establecer recordatorio')
                          }
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Clinical Notice */}
        <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/50 flex items-center gap-2.5 text-xs text-purple-900 dark:text-purple-200">
          <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
          <p className="leading-snug">
            {t.medication.pickupNotice}
          </p>
        </div>
      </motion.section>
    </div>
  );
};
