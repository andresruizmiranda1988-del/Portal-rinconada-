import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  PenTool,
  Check,
  Volume2,
  Pause,
  Play,
  Square,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, RightsAcknowledgment } from '../types/clinical';
import { translations } from '../data/translations';
import { generateRightsCharterPDF } from '../utils/pdfGenerator';
import { useVoiceReading } from '../context/VoiceReadingContext';

interface RightsAndDutiesProps {
  language: Language;
  onOpenLegalModal: () => void;
  onOpenAckModal: () => void;
  lastAck: RightsAcknowledgment | null;
}

export const RightsAndDuties: React.FC<RightsAndDutiesProps> = ({
  language,
  onOpenLegalModal,
  onOpenAckModal,
  lastAck
}) => {
  const [expandedRightIdx, setExpandedRightIdx] = useState<number | null>(null);
  const [expandedDutyIdx, setExpandedDutyIdx] = useState<number | null>(null);
  const t = translations[language];

  const getRightDetailText = (idx: number) => {
    if (language === 'ht') {
      switch(idx) {
        case 0: return "Ou gen dwa pou yo rele w pa non sosyal ou, pou yo trete w nan yon espas ki pwòp, ki an sekirite, san okenn fòm diskriminasyon.";
        case 1: return "Dosye medikal ou yo ak konvèsasyon w yo se bagay ki konfidansyèl nèt. Pyès moun andeyò ekip la pa ka gen aksè ak enfòmasyon w yo.";
        case 2: return "Ekip medikal la ap esplike w preskripsyon w yo, dòz yo, ak objektif chak terapi nan yon langaj ki senp pou w ka konprann.";
        default: return "";
      }
    } else if (language === 'en') {
      switch(idx) {
        case 0: return "You have the right to be called by your social name, to be cared for in a clean, safe space, free of any form of discrimination.";
        case 1: return "Your clinical records and conversations are strictly confidential. Nobody outside your care team has access to your information.";
        case 2: return "The medical team will explain your prescription, doses, and therapeutic goals in a clear, simple, and understandable language.";
        default: return "";
      }
    } else {
      switch(idx) {
        case 0: return "Tienes derecho a ser llamado por tu nombre social, ser atendido en un ambiente limpio, seguro y libre de cualquier forma de discriminación.";
        case 1: return "Tus fichas clínicas y conversaciones son absolutamente privadas. Nadie ajeno a tu equipo de tratamiento tiene acceso a tu información.";
        case 2: return "El equipo médico te explicará tu receta, dosis, y los objetivos de cada terapia en un lenguaje sencillo y comprensible.";
        default: return "";
      }
    }
  };

  const getDutyDetailText = (idx: number) => {
    if (language === 'ht') {
      switch(idx) {
        case 0: return "Respè a dwe fèt nan de (2) sans yo. Yo p ap aksepte okenn fòm jouman, kòlè, vyolans vèbal oswa fizik nan lokal la.";
        case 1: return "Lè w rive nan lè yo fikse a, sa pèmèt tout pwosesis sèvis la mache byen epi sa bay pwofesyonèl la tan pou l pran swen w nèt.";
        case 2: return "Si w avèti nou 24 èdtan davans, nou ka libere plas ou a pou yon lòt pasyan ki ta bezwen yon sèvis an ijans.";
        default: return "";
      }
    } else if (language === 'en') {
      switch(idx) {
        case 0: return "Respect is mutual. Verbal insults, shouting, or any form of physical or verbal aggression will not be tolerated in the facility.";
        case 1: return "Arriving on time allows the schedule to flow smoothly so the professional can dedicate the full scheduled slot to your treatment.";
        case 2: return "If you cancel 24 hours in advance, we can offer your appointment slot to another patient who needs urgent attention.";
        default: return "";
      }
    } else {
      switch(idx) {
        case 0: return "El respeto es mutuo. No se tolerarán insultos, gritos o agresiones verbales o físicas de ningún tipo en el establecimiento.";
        case 1: return "Llegar a la hora programada permite que la agenda funcione de forma fluida y que el profesional te dedique el tiempo completo de tu sesión.";
        case 2: return "Si avisas con 24 horas de anticipación, podemos liberar tu cupo para otro paciente que necesite una atención de urgencia.";
        default: return "";
      }
    }
  };
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

  const isReadingRights = (activeSection === 'rights' || activeSection === 'rights_all') && (isPlaying || isPaused);
  const isReadingDuties = (activeSection === 'duties' || activeSection === 'rights_all') && (isPlaying || isPaused);

  const handleDownloadPDF = () => {
    generateRightsCharterPDF(language);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-4"
      id="section-rights-duties"
    >
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="icon-box-md rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
            <Scale className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              {t.rights.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.rights.subtitle}
            </p>
          </div>
        </div>

        {/* Action badges: Laws reference and Play All Voice button */}
        <div className="flex items-center gap-2">
          {isVoiceReadingEnabled && (
            <button
              onClick={() => {
                if (activeSection === 'rights_all' && isPlaying) {
                  pauseVoice();
                } else if (activeSection === 'rights_all' && isPaused) {
                  resumeVoice();
                } else {
                  playSection('rights_all');
                }
              }}
              id="btn-voice-read-all-rights"
              aria-label={t.rights.listenAllBtn}
              title={t.rights.listenAllBtn}
              className={`micro-badge transition-all shadow-xs cursor-pointer border ${
                activeSection === 'rights_all' && (isPlaying || isPaused)
                  ? 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300 dark:ring-purple-800'
                  : 'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/80'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${activeSection === 'rights_all' && isPlaying ? 'animate-bounce' : ''}`} strokeWidth={2.2} />
              <span>{t.rights.listenAllBtn}</span>
            </button>
          )}

          <span className="micro-badge hidden sm:inline-flex bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Leyes N° 20.584 y N° 21.331
          </span>
        </div>
      </div>

      {/* Single Column Stack for Rights & Duties */}
      <div className="grid grid-cols-1 gap-4">
        {/* Tus Derechos Card */}
        <motion.div
          id="subseccion-derechos"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`p-5 rounded-3xl bg-white dark:bg-slate-900 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border transition-all duration-300 flex flex-col justify-between space-y-4 ${
            isReadingRights 
              ? 'border-emerald-500 ring-2 ring-emerald-400/40 dark:border-emerald-400 dark:ring-emerald-500/30'
              : 'border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="icon-box-sm rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  {t.rights.rightsTitle}
                </h4>
              </div>

              {/* Voice Reading Trigger for Rights */}
              {isVoiceReadingEnabled && (
                <div className="flex items-center gap-1">
                  {activeSection === 'rights' && (isPlaying || isPaused) ? (
                    <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-300 dark:border-emerald-800">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mr-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                        {isPlaying ? t.rights.voiceActiveReading : t.rights.pauseVoiceBtn}
                      </span>
                      {isPlaying ? (
                        <button
                          onClick={pauseVoice}
                          aria-label={t.rights.pauseVoiceBtn}
                          className="icon-box-sm rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 cursor-pointer"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        </button>
                      ) : (
                        <button
                          onClick={resumeVoice}
                          aria-label={t.rights.resumeVoiceBtn}
                          className="icon-box-sm rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                      <button
                        onClick={stopVoice}
                        aria-label={t.rights.stopVoiceBtn}
                        className="icon-box-sm rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 cursor-pointer"
                      >
                        <Square className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => playSection('rights')}
                      id="btn-voice-read-rights"
                      aria-label={`${t.rights.listenRightsBtn} - Leyes 20.584 y 21.331`}
                      className="micro-badge bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2.2} />
                      <span>{t.rights.listenRightsBtn}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              {t.rights.rightsList.map((item, idx) => {
                const isExpanded = expandedRightIdx === idx;
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedRightIdx(isExpanded ? null : idx)}
                      className="w-full p-3 flex items-center justify-between text-left transition-colors hover:bg-emerald-500/5 gap-2.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2.2} />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{item}</span>
                      </div>
                      <div className="text-slate-400 shrink-0">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100/60 dark:border-slate-800/60">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {getRightDetailText(idx)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Respaldo legal: Ley 20.584 de Derechos y Ley 21.331 de Salud Mental.</span>
            {isVoiceReadingEnabled && (
              <span className="hidden sm:inline-flex text-xs text-purple-600 dark:text-purple-400 font-semibold items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" strokeWidth={2.2} />
                {t.rights.voiceBadge}
              </span>
            )}
          </div>
        </motion.div>

        {/* Tus Deberes Card */}
        <motion.div
          id="subseccion-deberes"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
          className={`p-5 rounded-3xl bg-white dark:bg-slate-900 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border transition-all duration-300 flex flex-col justify-between space-y-4 ${
            isReadingDuties 
              ? 'border-purple-500 ring-2 ring-purple-400/40 dark:border-purple-400 dark:ring-purple-500/30'
              : 'border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="icon-box-sm rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400">
                  <FileText className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  {t.rights.dutiesTitle}
                </h4>
              </div>

              {/* Voice Reading Trigger for Duties */}
              {isVoiceReadingEnabled && (
                <div className="flex items-center gap-1">
                  {activeSection === 'duties' && (isPlaying || isPaused) ? (
                    <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-1 rounded-xl border border-purple-300 dark:border-purple-800">
                      <span className="text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1 mr-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                        {isPlaying ? t.rights.voiceActiveReading : t.rights.pauseVoiceBtn}
                      </span>
                      {isPlaying ? (
                        <button
                          onClick={pauseVoice}
                          aria-label={t.rights.pauseVoiceBtn}
                          className="icon-box-sm rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 cursor-pointer"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        </button>
                      ) : (
                        <button
                          onClick={resumeVoice}
                          aria-label={t.rights.resumeVoiceBtn}
                          className="icon-box-sm rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                      <button
                        onClick={stopVoice}
                        aria-label={t.rights.stopVoiceBtn}
                        className="icon-box-sm rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 cursor-pointer"
                      >
                        <Square className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => playSection('duties')}
                      id="btn-voice-read-duties"
                      aria-label={`${t.rights.listenDutiesBtn} - Normas y deberes asistenciales`}
                      className="micro-badge bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
                      <span>{t.rights.listenDutiesBtn}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              {t.rights.dutiesList.map((item, idx) => {
                const isExpanded = expandedDutyIdx === idx;
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDutyIdx(isExpanded ? null : idx)}
                      className="w-full p-3 flex items-center justify-between text-left transition-colors hover:bg-purple-500/5 gap-2.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{item}</span>
                      </div>
                      <div className="text-slate-400 shrink-0">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100/60 dark:border-slate-800/60">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {getDutyDetailText(idx)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex items-start gap-2.5 text-rose-700 dark:text-rose-400 font-medium bg-rose-50/80 dark:bg-rose-950/30 p-3.5 rounded-2xl border border-rose-100 dark:border-rose-900/50">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                <span className="text-xs leading-tight">{t.rights.dutiesAlertItem}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Avisar inasistencias con 24h al SOME para reprogramación.</span>
            {isVoiceReadingEnabled && (
              <span className="hidden sm:inline-flex text-xs text-purple-600 dark:text-purple-400 font-semibold items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" strokeWidth={2.2} />
                {t.rights.voiceBadge}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Unified, Organized Institutional Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Secondary Documents Actions: View Law & Download PDF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
            <button
              onClick={onOpenLegalModal}
              id="btn-view-full-laws"
              aria-label={
                language === 'ht'
                  ? 'Gade atik konplè lwa 20.584 ak 21.331 sou dwa pasyan yo'
                  : language === 'en'
                  ? 'View full legal texts of laws 20.584 and 21.331 on mental healthcare rights'
                  : 'Ver artículos completos de las leyes 20.584 y 21.331 sobre derechos en salud'
              }
              className="h-10 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700 hover:border-purple-300 text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-purple-300 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
              <span className="truncate">{t.rights.viewFullLawsBtn}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              id="btn-download-charter-pdf"
              aria-label={
                language === 'ht'
                  ? 'Telechaje chèt dwa ak devwa pasyan an an fòma PDF'
                  : language === 'en'
                  ? 'Download patient rights and duties charter in PDF format'
                  : 'Descargar carta oficial de derechos y deberes del paciente en PDF'
              }
              className="h-10 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700 hover:border-purple-300 text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-purple-300 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Download className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
              <span className="truncate">{t.rights.downloadPdfBtn}</span>
            </button>
          </div>

          {/* Primary Patient Action / Confirmation Status */}
          <div className="lg:shrink-0">
            {lastAck ? (
              <div 
                id="badge-confirmed-reception"
                className="h-10 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[3]" />
                <span className="truncate">{t.rights.confirmedBadge}</span>
                <span className="micro-badge bg-emerald-200/80 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-mono">
                  {lastAck.id}
                </span>
              </div>
            ) : (
              <button
                onClick={onOpenAckModal}
                id="btn-confirm-reception"
                aria-label={
                  language === 'ht'
                    ? 'Ouvri fòmilè pou konfime ou resevwa kopye enfòmasyon sou dwa ou'
                    : language === 'en'
                    ? 'Open patient confirmation modal for informed receipt of rights charter'
                    : 'Confirmar recepción informada de la carta de derechos del paciente'
                }
                className="w-full lg:w-auto h-10 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-3 focus-visible:ring-purple-400"
              >
                <PenTool className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                <span>{t.rights.confirmReceptionBtn}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

