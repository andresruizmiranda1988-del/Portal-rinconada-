import React from 'react';
import { 
  Home, 
  Users, 
  Sparkles, 
  FlaskConical, 
  Pill, 
  Scale, 
  PhoneCall, 
  Layers, 
  ListOrdered,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveTab, Language } from '../types/clinical';
import { translations } from '../data/translations';

export type { ActiveTab };

interface MobileNavigationProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isContinuousView: boolean;
  onToggleViewMode: () => void;
  onOpenMenu: () => void;
  language: Language;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentTab,
  onSelectTab,
  isContinuousView,
  onToggleViewMode,
  language
}) => {
  const t = translations[language];

  // Mobile Bottom Bar Tabs (5 single-word ergonomic tabs for quick thumb navigation)
  const mobileBottomTabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
    {
      id: 'home',
      label: t.mobileNav.tabHomeShort,
      icon: Home
    },
    {
      id: 'team',
      label: t.mobileNav.tabTeamShort,
      icon: Users
    },
    {
      id: 'workshops',
      label: t.mobileNav.tabWorkshopsShort,
      icon: Sparkles
    },
    {
      id: 'exams',
      label: t.mobileNav.tabExamsShort,
      icon: FlaskConical
    },
    {
      id: 'meds',
      label: t.mobileNav.tabMedsShort,
      icon: Pill
    }
  ];

  // Tablet & Desktop Top Pill Tabs (Includes all main modules)
  const desktopTabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
    {
      id: 'home',
      label: t.mobileNav.tabHome,
      icon: Home
    },
    {
      id: 'team',
      label: t.mobileNav.tabTeam,
      icon: Users
    },
    {
      id: 'workshops',
      label: t.mobileNav.tabWorkshopsOnly,
      icon: Sparkles
    },
    {
      id: 'exams',
      label: t.mobileNav.tabExamsOnly,
      icon: FlaskConical
    },
    {
      id: 'meds',
      label: t.mobileNav.tabMedsOnly,
      icon: Pill
    },
    {
      id: 'rights',
      label: t.mobileNav.tabRights,
      icon: Scale
    },
    {
      id: 'urgency',
      label: t.mobileNav.tabUrgency,
      icon: PhoneCall
    }
  ];

  return (
    <>
      {/* 1. Top Segmented Navigation Pills (Visible on sm: / md: / lg:) */}
      <div className="hidden sm:block sticky top-[57px] z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-purple-100 dark:border-slate-800 px-3 sm:px-6 py-2 shadow-xs transition-colors">
        <div className="max-w-md mx-auto w-full flex items-center justify-between gap-1.5">
          {/* Scrollable Horizontal Pill List */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 pr-1" role="tablist" aria-label="Secciones de navegación">
            {desktopTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id || 
                (tab.id === 'team' && currentTab === 'team_workshops') ||
                (tab.id === 'exams' && currentTab === 'services');

              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ir a ${tab.label}`}
                  onClick={() => onSelectTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-95 ${
                    isActive 
                      ? 'bg-purple-700 text-white shadow-xs' 
                      : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} strokeWidth={2.2} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle (Tabbed vs Continuous) */}
          <button
            onClick={onToggleViewMode}
            id="btn-toggle-continuous-view-top"
            title={t.mobileNav.switchViewModeTooltip}
            aria-label={isContinuousView ? 'Cambiar a modo por pestañas' : 'Cambiar a vista continua'}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {isContinuousView ? (
              <>
                <ListOrdered className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
                <span className="hidden md:inline">{t.mobileNav.tabbedMode}</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" strokeWidth={2.2} />
                <span className="hidden md:inline">{t.mobileNav.viewAllMode}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Fixed Mobile Bottom App Bar (Thumb navigation dock with active pill highlight) */}
      <nav 
        aria-label="Navegación Móvil Inferior"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-purple-100 dark:border-slate-800 px-1.5 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] sm:hidden pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto" role="tablist" aria-label="Pestañas de atención clínica para celular">
          {mobileBottomTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id || 
              (tab.id === 'team' && currentTab === 'team_workshops') ||
              (tab.id === 'exams' && currentTab === 'services');

            return (
              <button
                key={tab.id}
                id={`mobile-bottom-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Pestaña ${tab.label}`}
                onClick={() => onSelectTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all cursor-pointer min-h-[46px] select-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  isActive
                    ? 'text-purple-800 dark:text-purple-200 font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold'
                }`}
              >
                {/* Active Capsule Pill Highlight with Motion Spring Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeBottomTabPill"
                    className="absolute inset-0 bg-purple-100/80 dark:bg-purple-950/70 border border-purple-200/70 dark:border-purple-800/60 rounded-xl"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                {/* Icon & Label Layer */}
                <div className="relative z-10 flex flex-col items-center">
                  <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 text-purple-700 dark:text-purple-300' : 'text-slate-500 dark:text-slate-400'}`} strokeWidth={2.2} />
                  <span className="text-xs font-bold tracking-tight leading-none text-center truncate max-w-full px-0.5 mt-1">
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
