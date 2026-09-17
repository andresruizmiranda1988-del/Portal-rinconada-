import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck,
  Glasses,
  Layers,
  ListOrdered
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cosamInfo, teamSections, workshops, medicationCenters } from './data/cosamData';
import { Language, RightsAcknowledgment } from './types/clinical';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { WelcomeHero } from './components/WelcomeHero';
import { TeamSectionList } from './components/TeamSectionList';
import { WorkshopsGrid } from './components/WorkshopsGrid';
import { LabOrdersSection } from './components/LabOrdersSection';
import { MedicationPickup } from './components/MedicationPickup';
import { RightsAndDuties } from './components/RightsAndDuties';
import { UrgencyNetwork } from './components/UrgencyNetwork';
import { MobileNavigation, ActiveTab } from './components/MobileNavigation';
import { ChatbotAssistant } from './components/ChatbotAssistant';
import { QRShareModal } from './components/QRShareModal';
import { LegalLawsModal } from './components/LegalLawsModal';
import { RightsAcknowledgmentModal } from './components/RightsAcknowledgmentModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { NavigationDrawer } from './components/NavigationDrawer';
import { CompactNavGrid } from './components/CompactNavGrid';
import { MainSkeletonScreen } from './components/SkeletonScreen';
import { VoiceReadingProvider } from './context/VoiceReadingContext';
import { ActiveVoicePlayerBanner } from './components/ActiveVoicePlayerBanner';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { ReminderModal } from './components/ReminderModal';
import { DueReminderAlert } from './components/DueReminderAlert';
import { Reminder, ReminderType } from './types/reminder';
import { 
  getStoredReminders, 
  checkDueReminders, 
  markReminderNotified, 
  snoozeReminder 
} from './utils/notificationManager';

export default function App() {
  // Language state (default 'es' or saved)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cosam_lang') as Language;
      if (saved && (saved === 'es' || saved === 'ht' || saved === 'en')) {
        return saved;
      }
    }
    return 'es';
  });

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cosam_theme');
      if (saved) return saved === 'dark';
      return false;
    }
    return false;
  });

  // Simplified reading mode state (high accessibility & contrast)
  const [isSimplifiedMode, setIsSimplifiedMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cosam_simplified_mode') === 'true';
    }
    return false;
  });

  // Font size accessibility
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Navigation tab state (for mobile & section-based navigation)
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isContinuousView, setIsContinuousView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cosam_view_continuous') === 'true';
    }
    return false;
  });

  // Modals state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isAckModalOpen, setIsAckModalOpen] = useState(false);

  // Web Push / Reminder Modals & Alert State
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderModalPresetType, setReminderModalPresetType] = useState<ReminderType | undefined>(undefined);
  const [reminderModalCenterName, setReminderModalCenterName] = useState<string | undefined>(undefined);
  const [dueReminder, setDueReminder] = useState<Reminder | null>(null);
  const [activeRemindersCount, setActiveRemindersCount] = useState<number>(0);

  // Helper to refresh the active count badge
  const updateRemindersBadge = () => {
    const list = getStoredReminders();
    const count = list.filter((r) => r.active && !r.notified).length;
    setActiveRemindersCount(count);
  };

  // Check due reminders immediately and every 25 seconds
  useEffect(() => {
    updateRemindersBadge();

    const checkNow = async () => {
      const due = await checkDueReminders(currentLang);
      if (due) {
        setDueReminder(due);
      }
      updateRemindersBadge();
    };

    checkNow();
    const interval = setInterval(checkNow, 25000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const handleOpenReminders = (presetCenterName?: string, presetType?: ReminderType) => {
    setReminderModalCenterName(presetCenterName);
    setReminderModalPresetType(presetType || (presetCenterName ? 'medication' : undefined));
    setIsReminderModalOpen(true);
  };

  const handleDismissDueReminder = () => {
    if (dueReminder) {
      markReminderNotified(dueReminder.id);
      setDueReminder(null);
      updateRemindersBadge();
    }
  };

  const handleSnoozeDueReminder = () => {
    if (dueReminder) {
      snoozeReminder(dueReminder.id, 15);
      setDueReminder(null);
      updateRemindersBadge();
    }
  };

  // Acknowledgment State
  const [lastAck, setLastAck] = useState<RightsAcknowledgment | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cosam_last_ack');
        if (saved) return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Skeleton Screen Loading State for smooth initial content preparation
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initial loading simulation (750ms) to ensure smooth hydration and animated gradient skeletons
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshData = () => {
    setIsInitialLoading(true);
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 700);
  };

  const t = translations[currentLang];

  // Sync dark class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cosam_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cosam_theme', 'light');
    }
  }, [isDark]);

  // Persist language selection
  const handleSelectLanguage = (lang: Language) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cosam_lang', lang);
    }
  };

  const handleToggleSimplifiedMode = () => {
    setIsSimplifiedMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cosam_simplified_mode', String(next));
      }
      return next;
    });
  };

  const handleToggleContinuousView = () => {
    setIsContinuousView((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cosam_view_continuous', String(next));
      }
      return next;
    });
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (isContinuousView) {
      // Scroll to target section ID
      const targetMap: Record<ActiveTab, string> = {
        home: 'seccion-bienvenida',
        team: 'seccion-equipo',
        workshops: 'seccion-talleres',
        exams: 'examenes-laboratorio',
        meds: 'seccion-farmacos',
        team_workshops: 'seccion-equipo',
        services: 'examenes-laboratorio',
        rights: 'seccion-derechos',
        urgency: 'seccion-urgencias'
      };
      const element = document.getElementById(targetMap[tab]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-[15px] leading-relaxed';
    if (fontSize === 'xlarge') return 'text-[17px] leading-loose';
    return 'text-sm leading-normal';
  };

  return (
    <VoiceReadingProvider currentLanguage={currentLang}>
      <div className={`min-h-screen ${isSimplifiedMode ? 'simplified-reading' : ''} bg-[#F4F2FB] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans ${getFontSizeClass()}`}>
        {/* Top of Screen Visual Scroll Progress Indicator */}
        <ScrollProgressIndicator
          language={currentLang}
          isSimplifiedMode={isSimplifiedMode}
          activeTab={activeTab}
          isContinuousView={isContinuousView}
        />

        {/* Institutional Sticky Header */}
        <Header
        currentLang={currentLang}
        onSelectLang={handleSelectLanguage}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        isSimplifiedMode={isSimplifiedMode}
        onToggleSimplifiedMode={handleToggleSimplifiedMode}
        onOpenQR={() => setIsQRModalOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReminders={() => handleOpenReminders()}
        activeRemindersCount={activeRemindersCount}
      />

      {/* Adaptive Mobile / Tab Navigation System */}
      <MobileNavigation
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        isContinuousView={isContinuousView}
        onToggleViewMode={handleToggleContinuousView}
        onOpenMenu={() => setIsMenuOpen(true)}
        language={currentLang}
      />

      {/* Offline Status & Cached Documents Availability Banner */}
      <OfflineIndicator language={currentLang} />

      {/* Simplified Reading Mode Active Announcement Banner */}
      {isSimplifiedMode && (
        <div className="px-3 sm:px-6 pt-3">
          <div 
            role="status" 
            aria-live="polite"
            className="max-w-md mx-auto bg-amber-100 dark:bg-amber-950/90 border-2 border-amber-500 dark:border-amber-400 p-3 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-amber-100"
          >
            <div className="flex items-center gap-2.5 text-left">
              <Glasses className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" strokeWidth={2.2} />
              <span>{t.header.simplifiedBannerText}</span>
            </div>
            <button
              onClick={handleToggleSimplifiedMode}
              className="w-full sm:w-auto px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl border border-amber-600 text-xs shrink-0 transition-all cursor-pointer text-center"
            >
              {t.header.exitSimplifiedMode}
            </button>
          </div>
        </div>
      )}

      {/* Main Single-Column Clean Content Canvas with Mobile Scroll Snap */}
      <main className="max-w-md mx-auto w-full min-h-screen px-4 py-6 flex flex-col gap-5 flex-1 pb-32 sm:pb-28 mobile-snap-container">
        {/* Mobile-only view mode toggle (Pestañas vs Vista Continua) */}
        <div className="sm:hidden flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isContinuousView ? t.mobileNav.viewAllMode : t.mobileNav.tabbedMode}
          </span>
          <button
            type="button"
            onClick={handleToggleContinuousView}
            title={t.mobileNav.switchViewModeTooltip}
            className="micro-badge bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80 shadow-2xs transition-all active:scale-95 cursor-pointer hover:border-purple-300"
          >
            {isContinuousView ? (
              <>
                <ListOrdered className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
                <span>{t.mobileNav.tabbedMode}</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" strokeWidth={2.2} />
                <span>{t.mobileNav.viewAllMode}</span>
              </>
            )}
          </button>
        </div>
        <AnimatePresence mode="wait">
          {isInitialLoading ? (
            <MainSkeletonScreen 
              key="portal-skeleton"
              activeTab={activeTab} 
              isContinuousView={isContinuousView} 
              language={currentLang} 
            />
          ) : isContinuousView ? (
            /* Continuous Scroll Mode (All Sections Sequentially with Mobile Snap) */
            <motion.div 
              key="continuous-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 mobile-snap-container"
            >
              {/* 1. BIENVENIDA & ESPACIO SEGURO */}
              <div id="seccion-bienvenida" className="mobile-snap-center">
                <WelcomeHero info={cosamInfo} language={currentLang} />
              </div>

              {/* 2. NUESTRO EQUIPO INTERDISCIPLINARIO */}
              <div id="seccion-equipo" className="mobile-snap-center">
                <TeamSectionList sections={teamSections} language={currentLang} />
              </div>

              {/* 3. TALLERES GRUPALES */}
              <div id="seccion-talleres" className="mobile-snap-center">
                <WorkshopsGrid workshops={workshops} language={currentLang} />
              </div>

              {/* 4. ÓRDENES DE EXÁMENES DE LABORATORIO */}
              <div id="examenes-laboratorio" className="mobile-snap-center">
                <LabOrdersSection language={currentLang} />
              </div>

              {/* 5. RETIRO DE MEDICAMENTOS */}
              <div id="seccion-farmacos" className="mobile-snap-center">
                <MedicationPickup 
                  centers={medicationCenters} 
                  language={currentLang} 
                  onOpenReminders={handleOpenReminders}
                />
              </div>

              {/* 6. DERECHOS Y DEBERES EXTENDIDO (LEYES 20.584 Y 21.331 + CONFIRMACIÓN) */}
              <div id="seccion-derechos" className="mobile-snap-center">
                <RightsAndDuties
                  language={currentLang}
                  onOpenLegalModal={() => setIsLegalModalOpen(true)}
                  onOpenAckModal={() => setIsAckModalOpen(true)}
                  lastAck={lastAck}
                />
              </div>

              {/* 7. RED DE URGENCIAS */}
              <div id="seccion-urgencias" className="mobile-snap-center">
                <UrgencyNetwork language={currentLang} />
              </div>
            </motion.div>
          ) : (
            /* Segmented / Focused Mobile Tab Mode (Optimal Ergonomics with Snap) */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-6 mobile-snap-container"
            >
              {activeTab === 'home' && (
                <>
                  <div className="mobile-snap-center">
                    <WelcomeHero info={cosamInfo} language={currentLang} />
                  </div>

                  {/* Compact Clinical Navigation Grid */}
                  <div className="mobile-snap-center pt-1">
                    <CompactNavGrid 
                      onSelectTab={handleSelectTab}
                      onOpenMenu={() => setIsMenuOpen(true)}
                      language={currentLang}
                    />
                  </div>
                </>
              )}

              {/* Vista Individual: Equipo Clínico */}
              {activeTab === 'team' && (
                <div className="mobile-snap-center">
                  <TeamSectionList sections={teamSections} language={currentLang} />
                </div>
              )}

              {/* Vista Individual: Talleres Grupales */}
              {activeTab === 'workshops' && (
                <div className="mobile-snap-center">
                  <WorkshopsGrid workshops={workshops} language={currentLang} />
                </div>
              )}

              {/* Vista Individual: Exámenes Médicos */}
              {activeTab === 'exams' && (
                <div className="mobile-snap-center">
                  <LabOrdersSection language={currentLang} />
                </div>
              )}

              {/* Vista Individual: Fármacos / Medicamentos */}
              {activeTab === 'meds' && (
                <div className="mobile-snap-center">
                  <MedicationPickup 
                    centers={medicationCenters} 
                    language={currentLang} 
                    onOpenReminders={handleOpenReminders}
                  />
                </div>
              )}

              {activeTab === 'team_workshops' && (
                <>
                  <div className="mobile-snap-center">
                    <TeamSectionList sections={teamSections} language={currentLang} />
                  </div>
                  <div className="mobile-snap-center">
                    <WorkshopsGrid workshops={workshops} language={currentLang} />
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <div className="mobile-snap-center">
                    <LabOrdersSection language={currentLang} />
                  </div>
                  <div className="mobile-snap-center">
                    <MedicationPickup 
                      centers={medicationCenters} 
                      language={currentLang} 
                      onOpenReminders={handleOpenReminders}
                    />
                  </div>
                </>
              )}

              {activeTab === 'rights' && (
                <div className="mobile-snap-center">
                  <RightsAndDuties
                    language={currentLang}
                    onOpenLegalModal={() => setIsLegalModalOpen(true)}
                    onOpenAckModal={() => setIsAckModalOpen(true)}
                    lastAck={lastAck}
                  />
                </div>
              )}

              {activeTab === 'urgency' && (
                <div className="mobile-snap-center">
                  <UrgencyNetwork language={currentLang} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Interactive Chatbot Floating Assistant */}
      <ChatbotAssistant language={currentLang} />

      {/* Navigation Hamburger Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isContinuousView={isContinuousView}
        onToggleViewMode={handleToggleContinuousView}
        onOpenQR={() => setIsQRModalOpen(true)}
        onRefresh={handleRefreshData}
        onOpenReminders={() => handleOpenReminders()}
        activeRemindersCount={activeRemindersCount}
        language={currentLang}
      />

      {/* Browser Web Push & Medication / Appointment Reminders Modal */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => {
          setIsReminderModalOpen(false);
          updateRemindersBadge();
        }}
        language={currentLang}
        initialPresetType={reminderModalPresetType}
        initialCenterName={reminderModalCenterName}
      />

      {/* Floating Interactive Alert when a Reminder is Due */}
      <DueReminderAlert
        reminder={dueReminder}
        onDismiss={handleDismissDueReminder}
        onSnooze={handleSnoozeDueReminder}
        language={currentLang}
      />

      {/* QR Code Modal for Waiting Room Share */}
      {isQRModalOpen && (
        <QRShareModal
          info={cosamInfo}
          onClose={() => setIsQRModalOpen(false)}
        />
      )}

      {/* Full Legal Text Modal (Laws 20.584 & 21.331) */}
      <LegalLawsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        language={currentLang}
      />

      {/* Patient Rights Onboarding & Acknowledgment Form */}
      <RightsAcknowledgmentModal
        isOpen={isAckModalOpen}
        onClose={() => setIsAckModalOpen(false)}
        language={currentLang}
        onAcknowledged={(ack) => setLastAck(ack)}
      />

      {/* Institutional Clean Footer */}
      <footer className="border-t border-purple-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 mb-14 sm:mb-0">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {t.footer.rightsReserved}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.footer.confidentialNotice}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
            {cosamInfo.address} • SOME: {cosamInfo.phoneSome}
          </p>
        </div>
      </footer>

      {/* Floating Active Voice Reading Player Controller */}
      <ActiveVoicePlayerBanner language={currentLang} />
    </div>
  </VoiceReadingProvider>
  );
}

