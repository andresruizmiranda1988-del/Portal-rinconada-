import React from 'react';
import { 
  Users, 
  Sparkles, 
  FlaskConical, 
  Pill, 
  Scale, 
  PhoneCall, 
  ArrowUpRight,
  Menu,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { ActiveTab, Language } from '../types/clinical';
import { translations } from '../data/translations';

interface CompactNavGridProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMenu: () => void;
  language: Language;
}

export const CompactNavGrid: React.FC<CompactNavGridProps> = ({
  onSelectTab,
  onOpenMenu,
  language
}) => {
  const t = translations[language];

  return (
    <section 
      aria-label={t.mobileNav.compactGridTitle}
      className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 space-y-3.5 sm:space-y-4"
    >
      {/* Header with Eyebrow, Title and "Menú Completo" Button */}
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-purple-100/80 dark:border-purple-900/40">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 block">
            {t.mobileNav.quickAccessTitle}
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
            {t.mobileNav.compactGridTitle}
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenMenu}
          id="btn-open-navigation-drawer"
          aria-label="Abrir menú de navegación completo"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/80 text-purple-800 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/80 transition-all cursor-pointer active:scale-95 shrink-0 focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <Menu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
          <span>{t.mobileNav.menuBtn}</span>
        </button>
      </div>

      {/* 4 Principal Clinical Modules Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {/* Card 1: Equipo Profesional (Amatista Púrpura) */}
        <button
          type="button"
          id="nav-card-team"
          onClick={() => onSelectTab('team')}
          className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-purple-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200/80 hover:border-purple-300 dark:border-slate-700/60 dark:hover:border-purple-600/50 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {/* Top Row: Standard Icon Box + Micro-tag */}
          <div className="flex items-center justify-between gap-1 w-full mb-2.5">
            <div className="icon-box-md rounded-xl bg-purple-600 dark:bg-purple-900/60 text-white dark:text-purple-300 shadow-xs group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <span className="micro-badge bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200 border border-purple-200/60 dark:border-purple-800/50">
              {language === 'ht' ? '5 Espesyalite' : language === 'en' ? '5 Specialties' : '5 Especialidades'}
            </span>
          </div>

          {/* Body: Title + 2-Line Subtitle */}
          <div className="w-full">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-[13px] sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors line-clamp-1">
                {t.mobileNav.tabTeam}
              </h4>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" strokeWidth={2.2} />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight mt-1">
              {t.mobileNav.teamDesc}
            </p>
          </div>
        </button>

        {/* Card 2: Talleres y Grupos (Índigo Profundo) */}
        <button
          type="button"
          id="nav-card-workshops"
          onClick={() => onSelectTab('workshops')}
          className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-indigo-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200/80 hover:border-indigo-300 dark:border-slate-700/60 dark:hover:border-indigo-600/50 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between gap-1 w-full mb-2.5">
            <div className="icon-box-md rounded-xl bg-indigo-600 dark:bg-indigo-900/60 text-white dark:text-indigo-300 shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <span className="micro-badge bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/50">
              {language === 'ht' ? '4 Atelye' : language === 'en' ? '4 Workshops' : '4 Talleres'}
            </span>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-[13px] sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors line-clamp-1">
                {t.mobileNav.tabWorkshopsOnly}
              </h4>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" strokeWidth={2.2} />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight mt-1">
              {t.mobileNav.workshopsDesc}
            </p>
          </div>
        </button>

        {/* Card 3: Toma de Exámenes (Azul Cerúleo) */}
        <button
          type="button"
          id="nav-card-exams"
          onClick={() => onSelectTab('exams')}
          className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-sky-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200/80 hover:border-sky-300 dark:border-slate-700/60 dark:hover:border-sky-600/50 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between gap-1 w-full mb-2.5">
            <div className="icon-box-md rounded-xl bg-sky-600 dark:bg-sky-900/60 text-white dark:text-sky-300 shadow-xs group-hover:scale-105 transition-transform">
              <FlaskConical className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <span className="micro-badge bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200 border border-sky-200/60 dark:border-sky-800/50">
              {language === 'ht' ? 'SOME kowòdinasyon' : language === 'en' ? 'Prep checklist' : 'Requisitos SOME'}
            </span>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-[13px] sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors line-clamp-1">
                {t.mobileNav.tabExamsOnly}
              </h4>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" strokeWidth={2.2} />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight mt-1">
              {t.mobileNav.examsDesc}
            </p>
          </div>
        </button>

        {/* Card 4: Farmacia y Recetas (Verde Esmeralda Terapéutico) */}
        <button
          type="button"
          id="nav-card-meds"
          onClick={() => onSelectTab('meds')}
          className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200/80 hover:border-emerald-300 dark:border-slate-700/60 dark:hover:border-emerald-600/50 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="flex items-center justify-between gap-1 w-full mb-2.5">
            <div className="icon-box-md rounded-xl bg-emerald-600 dark:bg-emerald-900/60 text-white dark:text-emerald-300 shadow-xs group-hover:scale-105 transition-transform">
              <Pill className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <span className="micro-badge bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/50">
              {language === 'ht' ? '3 Pwen livrezon' : language === 'en' ? '3 Locations' : '3 Puntos de entrega'}
            </span>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-[13px] sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-1">
                {t.mobileNav.tabMedsOnly}
              </h4>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" strokeWidth={2.2} />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight mt-1">
              {t.mobileNav.medsDesc}
            </p>
          </div>
        </button>
      </div>

      {/* Secondary Quick Action Row: Tus Derechos (Ámbar) & Red Urgencias 24/7 (Carmesí) */}
      <div className="grid grid-cols-2 gap-2 pt-0.5">
        <button
          type="button"
          id="nav-quick-rights"
          onClick={() => onSelectTab('rights')}
          className="p-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 dark:bg-slate-800/90 dark:hover:bg-amber-950/40 border border-amber-200/80 hover:border-amber-300 dark:border-amber-900/50 flex items-center justify-between gap-2 text-left cursor-pointer transition-all active:scale-[0.98] group shadow-2xs"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="icon-box-sm rounded-lg bg-amber-500 text-white shadow-xs">
              <Scale className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate group-hover:text-amber-800 dark:group-hover:text-amber-300">
                {t.mobileNav.tabRights}
              </span>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 block truncate">
                {t.mobileNav.rightsTag}
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600/70 dark:text-amber-400/70 group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          id="nav-quick-urgency"
          onClick={() => onSelectTab('urgency')}
          className="p-2.5 rounded-xl bg-rose-50/80 hover:bg-rose-100/90 dark:bg-slate-800/90 dark:hover:bg-rose-950/40 border border-rose-200/80 hover:border-rose-300 dark:border-rose-900/50 flex items-center justify-between gap-2 text-left cursor-pointer transition-all active:scale-[0.98] group shadow-2xs"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="icon-box-sm rounded-lg bg-rose-600 text-white shadow-xs">
              <PhoneCall className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate group-hover:text-rose-800 dark:group-hover:text-rose-300">
                {t.mobileNav.tabUrgency}
              </span>
              <span className="text-xs font-semibold text-rose-700 dark:text-rose-300 block truncate">
                {t.mobileNav.urgencyTag}
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-rose-600/70 dark:text-rose-400/70 group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
};
