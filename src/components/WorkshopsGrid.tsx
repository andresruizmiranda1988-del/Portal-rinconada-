import React, { useState } from 'react';
import { 
  Users2, 
  Clock, 
  UserCheck, 
  Brain, 
  HeartHandshake, 
  Activity, 
  Sprout, 
  CalendarDays,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Workshop, Language } from '../types/clinical';
import { translations } from '../data/translations';
import { downloadWorkshopSchedulePdf } from '../utils/workshopPdfs';
import { StrategiesModal } from './StrategiesModal';

interface WorkshopsGridProps {
  workshops: Workshop[];
  language: Language;
}

export const WorkshopsGrid: React.FC<WorkshopsGridProps> = ({ workshops, language }) => {
  const [isStrategiesModalOpen, setIsStrategiesModalOpen] = useState(false);
  const [capacities, setCapacities] = useState<Record<number, number>>({
    1: 4,
    2: 0,
    3: 6,
    4: 1,
  });
  const [enrolled, setEnrolled] = useState<Record<number, boolean>>({});
  const t = translations[language];

  const handleEnroll = (num: number) => {
    if (capacities[num] > 0 && !enrolled[num]) {
      setCapacities(prev => ({ ...prev, [num]: prev[num] - 1 }));
      setEnrolled(prev => ({ ...prev, [num]: true }));
    }
  };

  const getWorkshopConfig = (ws: Workshop) => {
    const idOrQuad = String(ws.quadrant || ws.id || '');
    if (idOrQuad.includes('1')) {
      return {
        num: 1,
        title: t.workshops?.ws1Title || ws.title,
        category: t.workshops?.ws1Cat || ws.category,
        schedule: t.workshops?.ws1Time || ws.schedule,
        facilitator: t.workshops?.ws1Leader || ws.facilitator,
        desc: t.workshops?.ws1Desc || ws.description,
        icon: Brain
      };
    }
    if (idOrQuad.includes('2')) {
      return {
        num: 2,
        title: t.workshops?.ws2Title || ws.title,
        category: t.workshops?.ws2Cat || ws.category,
        schedule: t.workshops?.ws2Time || ws.schedule,
        facilitator: t.workshops?.ws2Leader || ws.facilitator,
        desc: t.workshops?.ws2Desc || ws.description,
        icon: HeartHandshake
      };
    }
    if (idOrQuad.includes('3')) {
      return {
        num: 3,
        title: t.workshops?.ws3Title || ws.title,
        category: t.workshops?.ws3Cat || ws.category,
        schedule: t.workshops?.ws3Time || ws.schedule,
        facilitator: t.workshops?.ws3Leader || ws.facilitator,
        desc: t.workshops?.ws3Desc || ws.description,
        icon: Activity
      };
    }
    return {
      num: 4,
      title: t.workshops?.ws4Title || ws.title,
      category: t.workshops?.ws4Cat || ws.category,
      schedule: t.workshops?.ws4Time || ws.schedule,
      facilitator: t.workshops?.ws4Leader || ws.facilitator,
      desc: t.workshops?.ws4Desc || ws.description,
      icon: Sprout
    };
  };

  return (
    <section
      className="space-y-4"
      id="section-workshops-offer"
      aria-label="Talleres Grupales"
    >
      {/* Section Header with Download Schedule Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card mobile-snap-center rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle left gradient indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-indigo-600" />

        <div className="space-y-1 pl-1.5">
          <div className="flex items-center gap-3">
            <div className="icon-box-lg rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
              <Users2 className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                {t.workshops?.title || "Talleres Grupales"}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {t.workshops?.subtitle || "Espacios terapéuticos complementarios"}
              </p>
            </div>
          </div>
        </div>

        {/* Global Download Workshop Schedule Button */}
        <button
          onClick={() => downloadWorkshopSchedulePdf(language)}
          id="btn-download-workshop-schedule"
          aria-label={
            language === 'ht'
              ? 'Telechaje orè konplè atelye klinik yo an fòma PDF'
              : language === 'en'
              ? 'Download complete clinical workshop schedule in PDF format'
              : 'Descargar cronograma completo de talleres clínicos en formato PDF'
          }
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm shadow-purple-600/20 active:scale-95 shrink-0 cursor-pointer focus-visible:ring-3 focus-visible:ring-purple-400"
        >
          <CalendarDays className="w-4 h-4" strokeWidth={2.2} />
          <span>{t.workshops?.downloadScheduleBtn || "Descargar Cronograma (PDF)"}</span>
        </button>
      </div>

      {/* Standardized High-Contrast Workshops List */}
      <div className="grid grid-cols-1 gap-4">
        {workshops.map((ws, index) => {
          const cfg = getWorkshopConfig(ws);
          const IconComp = cfg.icon;

          return (
            <article
              key={ws.id || index}
              id={`workshop-card-${cfg.num}`}
              className="group mobile-snap-center rounded-3xl p-5 bg-white dark:bg-slate-900 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 hover:border-purple-400 transition-all duration-200 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Header Info with Clean Title and Icon */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="icon-box-lg rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base font-display tracking-tight">
                        {cfg.title}
                      </h4>
                      <div className="flex gap-1.5 items-center shrink-0">
                        <span className="micro-badge bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/60 shrink-0">
                          {cfg.category}
                        </span>
                        
                        {/* Dynamic Double Capacity Badge */}
                        {capacities[cfg.num] > 0 ? (
                          <span className="micro-badge bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 font-bold flex items-center gap-1 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {language === 'ht' ? `${capacities[cfg.num]} plas` : language === 'en' ? `${capacities[cfg.num]} spots` : `${capacities[cfg.num]} vacantes`}
                          </span>
                        ) : (
                          <span className="micro-badge bg-rose-500/15 dark:bg-rose-500/25 text-rose-800 dark:text-rose-300 border border-rose-500/20 font-bold flex items-center gap-1 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            {language === 'ht' ? 'Plen' : language === 'en' ? 'Full' : 'Cupo completo'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {cfg.desc}
                </p>
              </div>

              {/* Schedule & Facilitators Meta Box */}
              <div className="rounded-2xl p-3.5 bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-xs space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
                  <span className="font-bold text-xs sm:text-sm">{cfg.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
                  <span className="text-xs">
                    {t.workshops?.byLeader || "Facilitadores"}: <strong className="text-slate-900 dark:text-white font-bold">{cfg.facilitator}</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic Registration Button */}
              <div className="pt-2 border-t border-purple-100/50 dark:border-slate-800">
                {enrolled[cfg.num] ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center text-xs text-emerald-800 dark:text-emerald-300 font-bold space-y-1">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="p-0.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span>
                        {language === 'ht' ? 'Enskripsyon reyisi!' : language === 'en' ? 'Registration Successful!' : '¡Pre-inscripción Exitosa!'}
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {language === 'ht' ? 'Vini ak kat idantite ou jou atelye a' : language === 'en' ? 'Present your ID on the workshop day' : 'Preséntate con tu carnet el día del taller'}
                    </p>
                  </div>
                ) : capacities[cfg.num] > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleEnroll(cfg.num)}
                    className="w-full py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    {language === 'ht' ? 'Pre-enskri mwen' : language === 'en' ? 'Pre-register me' : 'Pre-inscribirme'}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 font-extrabold text-xs cursor-not-allowed border border-slate-200 dark:border-slate-700"
                  >
                    {language === 'ht' ? 'Pa gen plas' : language === 'en' ? 'No vacancies' : 'Cupo completo'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Unified Action Button: "Estrategias que puedes aplicar" */}
      <div className="pt-1">
        <button
          onClick={() => setIsStrategiesModalOpen(true)}
          id="btn-open-strategies"
          aria-label={
            language === 'ht'
              ? 'Ouvri panèl estrateji klinik ak zouti pou kontwòl ak byennèt'
              : language === 'en'
              ? 'Open clinical strategies and self-care coping tools modal'
              : 'Abrir panel de estrategias clínicas y herramientas de autocuidado y regulación'
          }
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-between gap-3 shadow-md shadow-purple-600/25 transition-all duration-200 active:scale-[0.99] cursor-pointer group focus-visible:ring-3 focus-visible:ring-purple-400"
        >
          <div className="flex items-center gap-3">
            <div className="icon-box-md rounded-xl bg-white/20 text-white group-hover:scale-110 transition-transform">
              <Sparkles className="w-4.5 h-4.5" strokeWidth={2.2} />
            </div>
            <div className="text-left">
              <span className="block font-display tracking-tight text-white">
                {t.workshops?.strategiesBtn || "Estrategias que puedes aplicar"}
              </span>
              <span className="block text-xs text-purple-100 font-normal">
                {language === 'es' 
                  ? 'Técnicas de autocontrol, regulación emocional, ejercicio y descanso seguro' 
                  : language === 'ht' 
                  ? 'Teknik pou kontwòl tèt ou, emosyon, egzèsis ak wikenn an sekirite' 
                  : 'Self-control, emotional regulation, physical reset, and safe weekend tools'}
              </span>
            </div>
          </div>
          <div className="icon-box-sm rounded-full bg-white/20 text-white group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
          </div>
        </button>
      </div>

      {/* Interactive Strategies Modal Dialog */}
      <StrategiesModal
        isOpen={isStrategiesModalOpen}
        onClose={() => setIsStrategiesModalOpen(false)}
        language={language}
      />
    </section>
  );
};

