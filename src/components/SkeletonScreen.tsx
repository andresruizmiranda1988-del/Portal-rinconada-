import React from 'react';
import { motion } from 'motion/react';
import { ActiveTab, Language } from '../types/clinical';
import { Loader2 } from 'lucide-react';

interface SkeletonProps {
  className?: string;
  id?: string;
}

/**
 * Base skeleton building block with animated gradient shimmer
 */
export const SkeletonBlock: React.FC<SkeletonProps> = ({ className = '', id }) => (
  <div
    id={id}
    className={`skeleton-shimmer rounded-xl ${className}`}
    aria-hidden="true"
  />
);

/**
 * Skeleton screen for the WelcomeHero component
 */
export const WelcomeHeroSkeleton: React.FC = () => (
  <div 
    id="skeleton-welcome-hero"
    className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xs border border-purple-200/70 dark:border-purple-900/40 relative overflow-hidden space-y-4"
  >
    {/* Safe Space Badge Placeholder */}
    <div className="flex justify-center">
      <SkeletonBlock className="h-6 w-52 rounded-full" />
    </div>

    {/* Main Headline Placeholder */}
    <div className="space-y-2 flex flex-col items-center">
      <SkeletonBlock className="h-7 sm:h-8 w-64 sm:w-80 rounded-xl" />
      <SkeletonBlock className="h-4 w-44 rounded-lg opacity-80" />
    </div>

    {/* Welcoming Description Paragraph Placeholder */}
    <div className="space-y-2 max-w-md mx-auto pt-1">
      <SkeletonBlock className="h-3.5 w-full rounded-md" />
      <SkeletonBlock className="h-3.5 w-5/6 mx-auto rounded-md" />
      <SkeletonBlock className="h-3.5 w-4/6 mx-auto rounded-md" />
    </div>

    {/* Primary Action Buttons (SOME & WhatsApp) */}
    <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center items-stretch">
      <SkeletonBlock className="h-11 flex-1 min-w-[140px] rounded-xl" />
      <SkeletonBlock className="h-11 flex-1 min-w-[140px] rounded-xl" />
    </div>

    {/* Physical Address Button Placeholder */}
    <SkeletonBlock className="h-11 w-full rounded-xl" />

    {/* Hours & Schedule Info Box Placeholder */}
    <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-slate-800/40 border border-purple-100/60 dark:border-slate-800 space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <SkeletonBlock className="h-4 w-40 rounded-md" />
        <SkeletonBlock className="h-4 w-36 rounded-md" />
      </div>
      <SkeletonBlock className="h-3 w-56 mx-auto rounded-md opacity-70" />
    </div>
  </div>
);

/**
 * Skeleton screen for the CompactNavGrid component
 */
export const CompactNavGridSkeleton: React.FC = () => (
  <div 
    id="skeleton-compact-nav-grid"
    className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-xs border border-purple-200/70 dark:border-purple-900/40 space-y-3.5"
  >
    {/* Grid Header */}
    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-purple-100 dark:border-purple-900/40">
      <div className="space-y-1.5">
        <SkeletonBlock className="h-2.5 w-28 rounded" />
        <SkeletonBlock className="h-5 w-44 rounded-lg" />
      </div>
      <SkeletonBlock className="h-8 w-20 rounded-xl" />
    </div>

    {/* 4 Clinical Action Cards Grid (2x2) */}
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {[1, 2, 3, 4].map((item) => (
        <div 
          key={item} 
          className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <SkeletonBlock className="w-9 h-9 rounded-full" />
            <SkeletonBlock className="h-4 w-14 rounded-full" />
          </div>
          <div className="space-y-1.5 pt-1">
            <SkeletonBlock className="h-4 w-24 rounded" />
            <SkeletonBlock className="h-3 w-full rounded" />
          </div>
        </div>
      ))}
    </div>

    {/* Secondary Quick Action Row: Rights & Urgency */}
    <div className="grid grid-cols-2 gap-2 pt-0.5">
      <SkeletonBlock className="h-12 w-full rounded-xl" />
      <SkeletonBlock className="h-12 w-full rounded-xl" />
    </div>
  </div>
);

/**
 * Skeleton screen for clinical team sections list
 */
export const TeamSectionSkeleton: React.FC = () => (
  <div id="skeleton-team-section" className="space-y-4">
    {/* Section Header */}
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-200/70 dark:border-purple-900/40 space-y-2">
      <SkeletonBlock className="h-3 w-28 rounded-full" />
      <SkeletonBlock className="h-6 w-56 rounded-lg" />
      <SkeletonBlock className="h-3.5 w-4/5 rounded" />
    </div>

    {/* 3 Team Cards */}
    {[1, 2, 3].map((card) => (
      <div 
        key={card} 
        className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3"
      >
        <div className="flex items-center gap-3">
          <SkeletonBlock className="w-10 h-10 rounded-2xl shrink-0" />
          <div className="space-y-1.5 flex-1">
            <SkeletonBlock className="h-4 w-36 rounded" />
            <SkeletonBlock className="h-3 w-24 rounded-full" />
          </div>
        </div>
        <SkeletonBlock className="h-16 w-full rounded-xl" />
      </div>
    ))}
  </div>
);

/**
 * Skeleton screen for group workshops
 */
export const WorkshopsSkeleton: React.FC = () => (
  <div id="skeleton-workshops" className="space-y-4">
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-200/70 dark:border-purple-900/40 space-y-2">
      <SkeletonBlock className="h-3 w-24 rounded-full" />
      <SkeletonBlock className="h-6 w-48 rounded-lg" />
      <SkeletonBlock className="h-3.5 w-full rounded" />
    </div>

    {[1, 2].map((card) => (
      <div 
        key={card}
        className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3"
      >
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-5 w-28 rounded-full" />
          <SkeletonBlock className="h-4 w-16 rounded" />
        </div>
        <SkeletonBlock className="h-5 w-44 rounded" />
        <SkeletonBlock className="h-12 w-full rounded-xl" />
      </div>
    ))}
  </div>
);

/**
 * Generic clinical section card skeleton
 */
export const GenericSectionSkeleton: React.FC = () => (
  <div id="skeleton-generic-section" className="space-y-4">
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-200/70 dark:border-purple-900/40 space-y-3">
      <SkeletonBlock className="h-4 w-28 rounded-full" />
      <SkeletonBlock className="h-6 w-52 rounded-lg" />
      <SkeletonBlock className="h-3.5 w-full rounded" />
      <SkeletonBlock className="h-3.5 w-3/4 rounded" />
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
      <SkeletonBlock className="h-20 w-full rounded-xl" />
      <SkeletonBlock className="h-12 w-full rounded-xl" />
    </div>
  </div>
);

interface MainSkeletonScreenProps {
  activeTab: ActiveTab;
  isContinuousView: boolean;
  language?: Language;
}

/**
 * Master Skeleton Screen orchestrator with animated shimmering gradients
 */
export const MainSkeletonScreen: React.FC<MainSkeletonScreenProps> = ({
  activeTab,
  isContinuousView,
  language = 'es'
}) => {
  const loadingMessages = {
    es: 'Cargando información de COSAM Rinconada...',
    ht: 'Chaje enfòmasyon sou COSAM Rinconada...',
    en: 'Loading COSAM Rinconada portal information...'
  };

  return (
    <motion.div
      id="main-skeleton-screen"
      role="status"
      aria-live="polite"
      aria-label={loadingMessages[language]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 w-full"
    >
      {/* Subtle indicator bar */}
      <div className="flex items-center justify-center gap-2 py-1 px-3 bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/50 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-300 w-fit mx-auto shadow-2xs">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
        <span>{loadingMessages[language]}</span>
      </div>

      {isContinuousView ? (
        // Continuous Scroll Skeleton
        <div className="space-y-5">
          <WelcomeHeroSkeleton />
          <CompactNavGridSkeleton />
          <TeamSectionSkeleton />
        </div>
      ) : (
        // Tab-specific Skeletons
        <>
          {activeTab === 'home' && (
            <>
              <WelcomeHeroSkeleton />
              <CompactNavGridSkeleton />
            </>
          )}
          {activeTab === 'team' && <TeamSectionSkeleton />}
          {activeTab === 'workshops' && <WorkshopsSkeleton />}
          {(activeTab === 'lab' || activeTab === 'meds' || activeTab === 'rights' || activeTab === 'urgency') && (
            <GenericSectionSkeleton />
          )}
        </>
      )}
    </motion.div>
  );
};
