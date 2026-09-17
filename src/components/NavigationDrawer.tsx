import React, { useEffect } from 'react';
import { 
  X, 
  Users, 
  Sparkles, 
  FlaskConical, 
  Pill, 
  Home, 
  Scale, 
  PhoneCall, 
  ChevronRight, 
  ShieldCheck, 
  Phone, 
  Layers, 
  ListOrdered,
  QrCode,
  RotateCw,
  Bell,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, Language } from '../types/clinical';
import { translations } from '../data/translations';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isContinuousView: boolean;
  onToggleViewMode: () => void;
  onOpenQR: () => void;
  onRefresh?: () => void;
  onOpenReminders?: () => void;
  activeRemindersCount?: number;
  language: Language;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  isContinuousView,
  onToggleViewMode,
  onOpenQR,
  onRefresh,
  onOpenReminders,
  activeRemindersCount,
  language
}) => {
  const t = translations[language];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={t.mobileNav.menuTitle}>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Sliding Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-sm sm:max-w-md bg-[#F4F2FB] dark:bg-slate-900 h-full flex flex-col shadow-2xl z-50 border-l border-purple-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-purple-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="icon-box-sm rounded-xl bg-purple-600 dark:bg-purple-700 text-white shadow-xs">
                  <ShieldCheck className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t.mobileNav.menuTitle}
                  </h3>
                  <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">
                    {t.mobileNav.menuSubtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t.mobileNav.closeMenu}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" strokeWidth={2.2} />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {/* Recordatorios y Notificaciones Callout */}
              {onOpenReminders && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenReminders();
                  }}
                  id="drawer-btn-reminders"
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white flex items-center justify-between gap-3 shadow-md shadow-purple-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="icon-box-sm rounded-xl bg-white/20 text-white shrink-0">
                      <Bell className="w-4 h-4 text-amber-300 animate-pulse" strokeWidth={2.2} />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-xs font-black leading-tight flex items-center gap-1.5">
                        <span className="truncate">{t.reminders.modalTitle}</span>
                        {activeRemindersCount !== undefined && activeRemindersCount > 0 && (
                          <span className="micro-badge bg-amber-400 text-slate-900 font-black">
                            {activeRemindersCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-purple-100 line-clamp-1 mt-0.5">
                        {language === 'ht' ? 'Randevou & Lè pou pran medikaman' : language === 'en' ? 'Appointments & Med pickup schedule' : 'Citas médicas y retiro de fármacos'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-80 shrink-0" strokeWidth={2.2} />
                </button>
              )}

              {/* Categoría 1: Área Clínica y Talleres (Equipo y Talleres) */}
              <div className="space-y-2">
                <span className="micro-badge font-black uppercase tracking-wider text-purple-700 dark:text-purple-400 px-1">
                  {t.mobileNav.groupClinical}
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {/* Opción: Equipo Clínico */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('team')}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'team' || activeTab === 'team_workshops'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-purple-600/20'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-purple-400 dark:hover:border-purple-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`icon-box-md rounded-xl shrink-0 ${
                        activeTab === 'team' || activeTab === 'team_workshops'
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300'
                      }`}>
                        <Users className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                          <span>{t.mobileNav.tabTeam}</span>
                          <span className={`micro-badge font-medium ${
                            activeTab === 'team' ? 'bg-white/25 text-white' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                          }`}>
                            {t.mobileNav.teamTag}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${
                          activeTab === 'team' ? 'text-purple-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {t.mobileNav.teamDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      activeTab === 'team' ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={2.2} />
                  </button>

                  {/* Opción: Talleres Grupales */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('workshops')}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'workshops'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-indigo-400 dark:hover:border-indigo-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`icon-box-md rounded-xl shrink-0 ${
                        activeTab === 'workshops'
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                      }`}>
                        <Sparkles className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                          <span>{t.mobileNav.tabWorkshopsOnly}</span>
                          <span className={`micro-badge font-medium ${
                            activeTab === 'workshops' ? 'bg-white/25 text-white' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}>
                            {t.mobileNav.workshopsTag}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${
                          activeTab === 'workshops' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {t.mobileNav.workshopsDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      activeTab === 'workshops' ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Categoría 2: Laboratorio y Farmacia (Exámenes y Fármacos) */}
              <div className="space-y-2">
                <span className="micro-badge font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 px-1">
                  {t.mobileNav.groupHealth}
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {/* Opción: Exámenes Médicos */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('exams')}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'exams'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/20'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`icon-box-md rounded-xl shrink-0 ${
                        activeTab === 'exams'
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300'
                      }`}>
                        <FlaskConical className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                          <span>{t.mobileNav.tabExamsOnly}</span>
                          <span className={`micro-badge font-medium ${
                            activeTab === 'exams' ? 'bg-white/25 text-white' : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            {t.mobileNav.examsTag}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${
                          activeTab === 'exams' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {t.mobileNav.examsDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      activeTab === 'exams' ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={2.2} />
                  </button>

                  {/* Opción: Retiro de Fármacos */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('meds')}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'meds'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-emerald-400 dark:hover:border-emerald-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`icon-box-md rounded-xl shrink-0 ${
                        activeTab === 'meds'
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        <Pill className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                          <span>{t.mobileNav.tabMedsOnly}</span>
                          <span className={`micro-badge font-medium ${
                            activeTab === 'meds' ? 'bg-white/25 text-white' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}>
                            {t.mobileNav.medsTag}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${
                          activeTab === 'meds' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {t.mobileNav.medsDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      activeTab === 'meds' ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Categoría 3: Información, Derechos y Urgencias */}
              <div className="space-y-2">
                <span className="micro-badge font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1">
                  {t.mobileNav.groupInfo}
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {/* Opción: Inicio */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('home')}
                    className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'home'
                        ? 'bg-purple-900 text-white border-purple-900'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="icon-box-sm rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shrink-0">
                        <Home className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold leading-tight block">{t.mobileNav.tabHome}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.mobileNav.homeDesc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2.2} />
                  </button>

                  {/* Opción: Derechos y Deberes */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('rights')}
                    className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'rights'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="icon-box-sm rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 shrink-0">
                        <Scale className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold leading-tight block">{t.mobileNav.tabRights}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.mobileNav.rightsDesc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2.2} />
                  </button>

                  {/* Opción: Red de Urgencias 24/7 */}
                  <button
                    type="button"
                    onClick={() => handleItemClick('urgency')}
                    className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer group ${
                      activeTab === 'urgency'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-purple-200/70 dark:border-slate-750 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="icon-box-sm rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 shrink-0">
                        <PhoneCall className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold leading-tight block">{t.mobileNav.tabUrgency}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.mobileNav.urgencyDesc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Modo de Visualización (Pestañas vs Vista Continua) */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-purple-200/70 dark:border-slate-750 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Modo de navegación:
                  </span>
                  <span className="micro-badge font-semibold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {isContinuousView ? t.mobileNav.viewAllMode : t.mobileNav.tabbedMode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onToggleViewMode}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/60 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isContinuousView ? (
                    <>
                      <ListOrdered className="w-3.5 h-3.5" strokeWidth={2.2} />
                      <span>Cambiar a vista por pestañas</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5" strokeWidth={2.2} />
                      <span>Cambiar a vista continua (una página)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-purple-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
              <a
                href="tel:225769800"
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={2.2} />
                <span>Llamar SOME COSAM</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQR();
                }}
                aria-label="Abrir código QR del portal"
                title="Compartir portal por QR"
                className="p-2.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-purple-50 dark:bg-slate-800 text-purple-800 dark:text-purple-300 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" strokeWidth={2.2} />
              </button>

              {onRefresh && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRefresh();
                  }}
                  aria-label="Recargar datos clínicos"
                  title="Recargar datos clínicos con pantalla de carga"
                  className="p-2.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-purple-50 dark:bg-slate-800 text-purple-800 dark:text-purple-300 hover:bg-purple-100 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" strokeWidth={2.2} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
