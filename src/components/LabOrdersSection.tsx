import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Volume2, 
  VolumeX, 
  Download, 
  CheckCircle2,
  Building2,
  MapPin,
  Clock,
  Navigation,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, LabExamInfo } from '../types/clinical';
import { labExamsData, primaryCareCenters } from '../data/cosamData';
import { translations } from '../data/translations';
import { generateLabExamsPdf } from '../utils/pdfGenerator';

interface LabOrdersSectionProps {
  language: Language;
}

export const LabOrdersSection: React.FC<LabOrdersSectionProps> = ({ language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const t = translations[language];

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const getChecklistItemText = (num: number) => {
    switch (num) {
      case 1:
        return language === 'ht' 
          ? 'Lòd medikal orijinal, siyen epi ak so doktè a' 
          : language === 'en' 
          ? 'Original medical order, signed and stamped' 
          : 'Orden médica original firmada y timbrada';
      case 2:
        return language === 'ht' 
          ? 'Jèn 12 èdtan oswa preparasyon espesyal' 
          : language === 'en' 
          ? '12-hour fasting or specific test prep' 
          : 'Ayuno de 12 horas o preparación específica';
      case 3:
        return language === 'ht' 
          ? 'Kat idantite fizik ki valab' 
          : language === 'en' 
          ? 'Valid physical ID card' 
          : 'Cédula de identidad física vigente';
      case 4:
        return language === 'ht' 
          ? 'Konfimasyon dat ak lè nan SOME' 
          : language === 'en' 
          ? 'Appointment confirmed at your CESFAM' 
          : 'Hora coordinada en el SOME de tu CESFAM';
      default:
        return '';
    }
  };

  // Stop speech when unmounting or language changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const step1Text = language === 'ht' ? '1. Lòd Medikal' : language === 'en' ? '1. Medical Order' : '1. Orden Médica';
  const step2Text = language === 'ht' ? '2. Kowòdinasyon nan CESFAM' : language === 'en' ? '2. Coordination at CESFAM' : '2. Coordinación en tu CESFAM';
  const step3Text = language === 'ht' ? '3. Rezilta avèk Resi' : language === 'en' ? '3. Results Pickup with Voucher' : '3. Retiro de Resultados con Voucher';

  const handleSpeakSteps = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToRead = language === 'ht'
      ? `Gid twa etap pou egzamen medikal ou yo. Etap 1: ${step1Text}. Etap 2: ${step2Text}. Etap 3: ${step3Text}.`
      : language === 'en'
      ? `3-step guide for your medical laboratory tests. Step 1: ${step1Text}. Step 2: ${step2Text}. Step 3: ${step3Text}.`
      : `Guía en tres pasos para tus exámenes médicos. Paso 1: ${step1Text}. Paso 2: ${step2Text}. Paso 3: ${step3Text}.`;

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
      generateLabExamsPdf(language);
    } catch (err) {
      console.error('Error generating lab PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const getPreparationBadge = (exam: LabExamInfo) => {
    if (exam.fastingHours > 0) {
      return (
        <span className="micro-badge bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 shrink-0">
          {language === 'ht' ? 'Jèn 8 èdtan' : language === 'en' ? 'Fasting 8 hrs' : 'Ayuno 8 hrs'}
        </span>
      );
    }
    if (exam.category === 'cardiaco') {
      return (
        <span className="micro-badge bg-sky-100 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 border border-sky-300 dark:border-sky-800 shrink-0">
          {language === 'ht' ? 'Rad konfòtab' : language === 'en' ? 'Comfortable clothes' : 'Ropa cómoda'}
        </span>
      );
    }
    return (
      <span className="micro-badge bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 shrink-0">
        {language === 'ht' ? 'San jèn' : language === 'en' ? 'No fasting' : 'Sin ayuno'}
      </span>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.section 
        id="examenes-medicos-section"
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
              <FlaskConical className="w-3.5 h-3.5" strokeWidth={2.2} />
              {t.labExams.badge}
            </span>
            <h2 className="text-slate-900 dark:text-slate-100 font-extrabold text-lg">
              {language === 'ht' ? 'Etap pou egzamen ou yo' : language === 'en' ? 'Steps for your tests' : 'Pasos para tus exámenes'}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.labExams.subtitle}
            </p>
          </div>

          {/* Action buttons: Read aloud & PDF */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-leer-pasos-examenes"
              type="button"
              onClick={handleSpeakSteps}
              aria-label={isSpeaking ? t.labExams.stopListeningBtn : t.labExams.listenStepsBtn}
              className={`p-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 border ${
                isSpeaking
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 animate-pulse'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900/80 dark:text-purple-300 border-purple-200 dark:border-purple-800/80'
              }`}
              title={isSpeaking ? t.labExams.stopListeningBtn : t.labExams.listenStepsBtn}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" strokeWidth={2.2} /> : <Volume2 className="w-4 h-4" strokeWidth={2.2} />}
            </button>

            <button
              id="btn-descargar-guia-lab"
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              aria-label={t.labExams.downloadGuideBtn}
              title={t.labExams.downloadGuideBtn}
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

        {/* Interactive Preparation Checklist */}
        <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider font-display">
              {language === 'ht' ? 'Lis verifikasyon preparasyon' : language === 'en' ? 'Preparation Checklist' : 'Lista de Verificación de Preparación'}
            </h4>
            <span className="text-xs font-black text-purple-700 dark:text-purple-300">
              {completedCount}/4 {language === 'ht' ? 'fè' : language === 'en' ? 'ready' : 'listos'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${(completedCount / 4) * 100}%` }}
            />
          </div>

          {/* Checklist Items */}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((num) => {
              const isChecked = checklist[num];
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setChecklist(prev => ({ ...prev, [num]: !prev[num] }))}
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 hover:border-purple-300 dark:hover:border-purple-800 text-left transition-all duration-200 cursor-pointer flex items-center gap-3 active:scale-[0.99] select-none shadow-3xs"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                    isChecked 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}>
                    {isChecked && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    isChecked 
                      ? 'text-slate-400 dark:text-slate-500 line-through' 
                      : 'text-slate-700 dark:text-slate-200'
                  }`}>
                    {getChecklistItemText(num)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simplified Exam Catalog */}
        <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40 space-y-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
              {t.labExams.catalogTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.labExams.catalogDesc}
            </p>
          </div>

          {/* Slim Horizontal Exam Cards */}
          <div className="space-y-2">
            {labExamsData.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200 shadow-xs"
              >
                <span className="text-slate-900 dark:text-slate-100 font-bold text-sm truncate">
                  {exam.title}
                </span>

                {getPreparationBadge(exam)}
              </div>
            ))}
          </div>
        </div>

        {/* Directory of Sample Collection Centers (CESFAM) */}
        <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40 space-y-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
              <span>{t.labExams.centersDirectoryTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.labExams.centersDirectorySubtitle}
            </p>
          </div>

          <div className="space-y-3">
            {primaryCareCenters.map((center) => (
              <div
                key={center.id}
                className="rounded-2xl bg-white dark:bg-slate-900/80 border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 p-4 space-y-3 shadow-xs hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200"
              >
                {/* Header: Name and Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {center.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {center.role}
                    </p>
                  </div>

                  <span className="micro-badge shrink-0 bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800">
                    {center.badge}
                  </span>
                </div>

                {/* Details: Address, Hours, Phone */}
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 bg-purple-50/50 dark:bg-purple-950/30 p-2.5 rounded-xl border border-purple-100/60 dark:border-purple-900/50">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-xs leading-tight font-medium text-slate-800 dark:text-slate-200">
                      {center.address}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-xs leading-tight font-semibold text-purple-950 dark:text-purple-200">
                      {center.labHours}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={2.2} />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Fono: {center.phoneFormatted}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Waze, Maps, Call */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  <a
                    href={center.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir navegación Waze hacia ${center.name}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-200 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-500 shrink-0" strokeWidth={2.2} />
                    <span>Waze</span>
                  </a>

                  <a
                    href={center.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ubicación en Google Maps para ${center.name}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-200 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" strokeWidth={2.2} />
                    <span>Maps</span>
                  </a>

                  <a
                    href={`tel:${center.phone}`}
                    aria-label={`Llamar a ${center.name} al teléfono ${center.phoneFormatted}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-2xs transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                    <span>Llamar</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Clinical Clarification */}
        <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/50 flex items-center gap-2.5 text-xs text-purple-900 dark:text-purple-200">
          <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
          <p className="leading-snug">
            {t.labExams.resultsNotice}
          </p>
        </div>
      </motion.section>
    </div>
  );
};
