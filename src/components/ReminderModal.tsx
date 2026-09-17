import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Pill, 
  Stethoscope, 
  Users, 
  FlaskConical, 
  Trash2, 
  Plus, 
  MapPin, 
  Check, 
  Sparkles, 
  Volume2, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { Reminder, ReminderType, ReminderAnticipation, NotificationPermissionState } from '../types/reminder';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';
import { 
  getNotificationPermission, 
  requestNotificationPermission, 
  sendBrowserNotification, 
  getStoredReminders, 
  addReminder, 
  deleteReminder, 
  toggleReminderActive, 
  formatReminderDateTime 
} from '../utils/notificationManager';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialPresetType?: ReminderType;
  initialCenterName?: string;
  initialNotes?: string;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  language,
  initialPresetType,
  initialCenterName,
  initialNotes,
}) => {
  const [permission, setPermission] = useState<NotificationPermissionState>('default');
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [remType, setRemType] = useState<ReminderType>('medication');
  const [title, setTitle] = useState('');
  const [centerName, setCenterName] = useState('COSAM Rinconada');
  const [dateTime, setDateTime] = useState('');
  const [anticipation, setAnticipation] = useState<ReminderAnticipation>(60);
  const [notes, setNotes] = useState('');

  const t = translations[language];

  // Refresh permission and list on open
  useEffect(() => {
    if (isOpen) {
      setPermission(getNotificationPermission());
      const stored = getStoredReminders();
      setReminders(stored);

      // Default date-time: tomorrow at 09:00
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      const formattedDefault = tomorrow.toISOString().slice(0, 16);
      setDateTime(formattedDefault);

      if (initialPresetType) {
        setRemType(initialPresetType);
        setActiveTab('create');
        if (initialPresetType === 'medication') {
          setTitle(language === 'ht' ? 'Retire Medikaman nan Famasi' : language === 'en' ? 'Medication Pickup at Pharmacy' : 'Retiro de Medicamentos en Farmacia');
        }
      } else {
        if (stored.length === 0) {
          setActiveTab('create');
        } else {
          setActiveTab('list');
        }
      }

      if (initialCenterName) {
        setCenterName(initialCenterName);
      }
      if (initialNotes) {
        setNotes(initialNotes);
      }
    }
  }, [isOpen, initialPresetType, initialCenterName, initialNotes, language]);

  // Update default title when type changes in form
  const handleTypeChange = (newType: ReminderType) => {
    setRemType(newType);
    if (!title || title === getDefaultTitleForType(remType, language)) {
      setTitle(getDefaultTitleForType(newType, language));
    }
    if (newType === 'medication' && !notes) {
      setNotes(language === 'ht' ? 'Pote kat idantite fizik ak resèt medikal valab.' : language === 'en' ? 'Bring physical ID card and valid prescription.' : 'Llevar cédula física y receta médica vigente.');
    } else if (newType === 'lab_exam' && !notes) {
      setNotes(language === 'ht' ? 'Egzamen nan maten: vin ajen 8 a 12 èdtan san manje.' : language === 'en' ? 'Morning test: 8 to 12 hours fasting required.' : 'Exámenes de laboratorio: asistir con 8 horas de ayuno.');
    }
  };

  const getDefaultTitleForType = (type: ReminderType, lang: Language): string => {
    switch (type) {
      case 'medication':
        return lang === 'ht' ? 'Retire Medikaman nan Famasi' : lang === 'en' ? 'Medication Pickup at Pharmacy' : 'Retiro de Medicamentos en Farmacia';
      case 'medical_appointment':
        return lang === 'ht' ? 'Kontwòl ak Doktè / Sikyat' : lang === 'en' ? 'Doctor / Psychiatrist Appointment' : 'Control con Médico / Psiquiatra';
      case 'therapy_appointment':
        return lang === 'ht' ? 'Konsiltasyon Sikològ / Travayè Sosyal' : lang === 'en' ? 'Psychology / Social Work Checkup' : 'Consulta Psicológica / Social';
      case 'workshop':
        return lang === 'ht' ? 'Atelye Gwoup Prevansyon Rechit' : lang === 'en' ? 'Relapse Prevention Group Workshop' : 'Taller Grupal de Prevención de Recaídas';
      case 'lab_exam':
        return lang === 'ht' ? 'Toma Egzamen San ak Pipi' : lang === 'en' ? 'Blood & Urine Lab Tests' : 'Toma de Muestras y Exámenes de Sangre';
      default:
        return lang === 'ht' ? 'Rapèl Sante COSAM' : lang === 'en' ? 'COSAM Health Reminder' : 'Recordatorio COSAM Rinconada';
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
    if (res === 'granted') {
      showToast(t.reminders.permissionGranted);
      await sendBrowserNotification('COSAM Rinconada - Notificaciones Activas', {
        body: '¡Excelente! Ahora recibirás avisos en este dispositivo para tus citas y retiro de fármacos.',
      });
    }
  };

  const handleSendTestNotification = async () => {
    if (permission !== 'granted') {
      const p = await requestNotificationPermission();
      setPermission(p);
      if (p !== 'granted') return;
    }

    const success = await sendBrowserNotification(
      '🔔 COSAM Rinconada - Alerta de Prueba',
      {
        body: 'Esta es una notificación de prueba. Tus alertas de citas y farmacia se verán así en tu pantalla.',
      }
    );

    if (success) {
      showToast(t.reminders.testSuccessToast);
    }
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateTime) return;

    const newRem = addReminder({
      title: title.trim(),
      type: remType,
      dateTime,
      remindMinutesBefore: anticipation,
      centerName: centerName.trim(),
      notes: notes.trim() || undefined,
    });

    setReminders(getStoredReminders());
    setActiveTab('list');
    showToast(
      language === 'ht'
        ? 'Rapèl anrejistre avèk siksè!'
        : language === 'en'
        ? 'Reminder successfully scheduled!'
        : '¡Recordatorio programado con éxito!'
    );

    // If permission not granted yet, ask smoothly
    if (permission === 'default') {
      handleRequestPermission();
    }
  };

  const handleDelete = (id: string) => {
    const updated = deleteReminder(id);
    setReminders(updated);
  };

  const handleToggle = (id: string) => {
    const updated = toggleReminderActive(id);
    setReminders(updated);
  };

  // 1-Click quick presets
  const applyPreset = (preset: 'med' | 'doc' | 'workshop' | 'exam') => {
    const d = new Date();
    if (preset === 'med') {
      d.setDate(d.getDate() + 1);
      d.setHours(9, 0, 0, 0);
      setRemType('medication');
      setTitle(getDefaultTitleForType('medication', language));
      setCenterName('Farmacia Central - COSAM Rinconada');
      setAnticipation(60);
      setNotes('Presentar cédula de identidad física y receta médica vigente.');
    } else if (preset === 'doc') {
      d.setDate(d.getDate() + 2);
      d.setHours(10, 30, 0, 0);
      setRemType('medical_appointment');
      setTitle(getDefaultTitleForType('medical_appointment', language));
      setCenterName('COSAM Rinconada');
      setAnticipation(120);
      setNotes('Control de salud mental y evaluación farmacológica.');
    } else if (preset === 'workshop') {
      // Find next Thursday
      const day = d.getDay();
      const diff = (4 + 7 - day) % 7 || 7;
      d.setDate(d.getDate() + diff);
      d.setHours(10, 0, 0, 0);
      setRemType('workshop');
      setTitle(getDefaultTitleForType('workshop', language));
      setCenterName('Sala Multiuso - COSAM Rinconada');
      setAnticipation(60);
      setNotes('Taller grupal de adicciones. Asistir con 10 minutos de anticipación.');
    } else {
      d.setDate(d.getDate() + 3);
      d.setHours(8, 0, 0, 0);
      setRemType('lab_exam');
      setTitle(getDefaultTitleForType('lab_exam', language));
      setCenterName('CESFAM Dr. Raúl Silva Henríquez');
      setAnticipation(1440);
      setNotes('Acudir en ayunas de 8 horas con cédula de identidad física.');
    }
    setDateTime(d.toISOString().slice(0, 16));
    setActiveTab('create');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={t.reminders.modalTitle}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-purple-200 dark:border-purple-900/60 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 text-white flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="icon-box-lg rounded-2xl bg-white/15 backdrop-blur-xs border border-white/20 shadow-inner text-white shrink-0">
              <BellRing className="w-5 h-5 text-amber-300 animate-pulse" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                {t.reminders.modalTitle}
              </h2>
              <p className="text-xs text-purple-200 line-clamp-1 mt-0.5">
                {t.reminders.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar ventana de recordatorios"
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* Browser Permission Banner */}
        <div className="bg-purple-50 dark:bg-slate-950/90 border-b border-purple-100 dark:border-slate-800 p-3 sm:px-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2.5">
            {permission === 'granted' ? (
              <span className="icon-box-xs rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              </span>
            ) : permission === 'denied' ? (
              <span className="icon-box-xs rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 shrink-0">
                <AlertCircle className="w-3.5 h-3.5" strokeWidth={2.2} />
              </span>
            ) : (
              <span className="icon-box-xs rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
                <Info className="w-3.5 h-3.5" strokeWidth={2.2} />
              </span>
            )}

            <div className="min-w-0">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-xs leading-tight">
                {permission === 'granted'
                  ? t.reminders.permissionGranted
                  : permission === 'denied'
                  ? t.reminders.permissionDenied
                  : permission === 'unsupported'
                  ? t.reminders.permissionUnsupported
                  : t.reminders.permissionDefault}
              </p>
              {permission === 'denied' && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                  {t.reminders.permissionHelpDenied}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {permission !== 'granted' && permission !== 'unsupported' && (
              <button
                type="button"
                onClick={handleRequestPermission}
                id="btn-permitir-notificaciones"
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                {t.reminders.enableBtn}
              </button>
            )}

            <button
              type="button"
              onClick={handleSendTestNotification}
              id="btn-probar-notificacion"
              title="Prueba de audio y notificación en pantalla"
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/60 border border-purple-200 dark:border-slate-700 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
              <span>{t.reminders.testBtn}</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 px-4 sm:px-5 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('list')}
            id="tab-mis-recordatorios"
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'border-purple-600 text-purple-700 dark:text-purple-300'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>{t.reminders.activeRemindersTab}</span>
            <span className="micro-badge bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold">
              {reminders.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('create');
              if (!title) {
                setTitle(getDefaultTitleForType(remType, language));
              }
            }}
            id="tab-nuevo-recordatorio"
            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'border-purple-600 text-purple-700 dark:text-purple-300'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
            <span>{t.reminders.newReminderTab}</span>
          </button>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center animate-in fade-in slide-in-from-top-2 duration-150 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={2.2} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: LIST OF REMINDERS */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t.reminders.quickPresetsTitle}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => applyPreset('med')}
                    className="p-2.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 text-left transition-all cursor-pointer group"
                  >
                    <div className="icon-box-sm rounded-xl bg-purple-600 text-white mb-1.5 group-hover:scale-105 transition-transform">
                      <Pill className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {t.reminders.typeMedication}
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-0.5">
                      {language === 'ht' ? 'Demain 09:00' : language === 'en' ? 'Tomorrow 09:00' : 'Mañana 09:00'}
                    </p>
                  </button>

                  <button
                    onClick={() => applyPreset('doc')}
                    className="p-2.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 text-left transition-all cursor-pointer group"
                  >
                    <div className="icon-box-sm rounded-xl bg-indigo-600 text-white mb-1.5 group-hover:scale-105 transition-transform">
                      <Stethoscope className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {t.reminders.typeMedicalAppt}
                    </p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">
                      {language === 'ht' ? 'Kontwòl Sante' : language === 'en' ? 'Psychiatry check' : 'Evaluación'}
                    </p>
                  </button>

                  <button
                    onClick={() => applyPreset('workshop')}
                    className="p-2.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-left transition-all cursor-pointer group"
                  >
                    <div className="icon-box-sm rounded-xl bg-emerald-600 text-white mb-1.5 group-hover:scale-105 transition-transform">
                      <Users className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {t.reminders.typeWorkshop}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      {language === 'ht' ? 'Jedi 10:00' : language === 'en' ? 'Thursday 10:00' : 'Jueves 10:00'}
                    </p>
                  </button>

                  <button
                    onClick={() => applyPreset('exam')}
                    className="p-2.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/60 text-left transition-all cursor-pointer group"
                  >
                    <div className="icon-box-sm rounded-xl bg-amber-600 text-white mb-1.5 group-hover:scale-105 transition-transform">
                      <FlaskConical className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {t.reminders.typeLabExam}
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                      {language === 'ht' ? 'Ajen 8 hrs' : language === 'en' ? 'Fasting 8 hrs' : 'Ayuno 8 hrs'}
                    </p>
                  </button>
                </div>
              </div>

              {/* Reminders List */}
              {reminders.length === 0 ? (
                <div className="text-center py-10 px-4 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="icon-box-xl rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 mx-auto">
                    <Bell className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                      {t.reminders.noReminders}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                      {t.reminders.noRemindersDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.2} />
                    <span>{t.reminders.newReminderTab}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {reminders.map((rem) => {
                    const isMed = rem.type === 'medication';
                    const isDoc = rem.type === 'medical_appointment';
                    const isWorkshop = rem.type === 'workshop';
                    const isExam = rem.type === 'lab_exam';

                    return (
                      <div
                        key={rem.id}
                        className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          rem.active
                            ? 'bg-white dark:bg-slate-900 border-purple-200 dark:border-purple-900/60 shadow-xs'
                            : 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Type Icon */}
                          <div className={`icon-box-md rounded-xl shrink-0 ${
                            isMed ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                            isDoc ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                            isWorkshop ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                            isExam ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {isMed ? <Pill className="w-4 h-4" strokeWidth={2.2} /> :
                             isDoc ? <Stethoscope className="w-4 h-4" strokeWidth={2.2} /> :
                             isWorkshop ? <Users className="w-4 h-4" strokeWidth={2.2} /> :
                             isExam ? <FlaskConical className="w-4 h-4" strokeWidth={2.2} /> :
                             <Clock className="w-4 h-4" strokeWidth={2.2} />}
                          </div>

                          {/* Content */}
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-snug truncate">
                                {rem.title}
                              </h4>
                              {rem.notified && (
                                <span className="micro-badge font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {t.reminders.statusDone}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 flex-wrap">
                              <span className="flex items-center gap-1 font-medium">
                                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
                                {formatReminderDateTime(rem.dateTime, language)}
                              </span>

                              {rem.centerName && (
                                <span className="flex items-center gap-1 font-medium">
                                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" strokeWidth={2.2} />
                                  <span className="truncate max-w-[160px] sm:max-w-[200px]">{rem.centerName}</span>
                                </span>
                              )}
                            </div>

                            {rem.notes && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                                {rem.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Controls: Active Switch & Delete */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 w-full sm:w-auto justify-between sm:justify-end">
                          <button
                            type="button"
                            onClick={() => handleToggle(rem.id)}
                            role="switch"
                            aria-checked={rem.active}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              rem.active
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {rem.active ? t.reminders.statusActive : 'Pausado'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(rem.id)}
                            aria-label={`${t.reminders.deleteBtn} ${rem.title}`}
                            title={t.reminders.deleteBtn}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={2.2} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CREATE REMINDER FORM */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateReminder} className="space-y-4">
              {/* Type Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.reminders.typeLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('medication')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      remType === 'medication'
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-600 text-purple-800 dark:text-purple-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Pill className="w-4 h-4 text-purple-600 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">{t.reminders.typeMedication}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange('medical_appointment')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      remType === 'medical_appointment'
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-600 text-purple-800 dark:text-purple-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4 text-indigo-600 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">{t.reminders.typeMedicalAppt}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange('workshop')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      remType === 'workshop'
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-600 text-purple-800 dark:text-purple-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">{t.reminders.typeWorkshop}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange('lab_exam')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      remType === 'lab_exam'
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-600 text-purple-800 dark:text-purple-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <FlaskConical className="w-4 h-4 text-amber-600 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">{t.reminders.typeLabExam}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange('therapy_appointment')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      remType === 'therapy_appointment'
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-600 text-purple-800 dark:text-purple-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-rose-600 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">{t.reminders.typeTherapyAppt}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange('custom')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      remType === 'custom'
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-600 text-purple-800 dark:text-purple-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Bell className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">Otro Recordatorio</span>
                  </button>
                </div>
              </div>

              {/* Title Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.reminders.titleLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Retiro mensual de Sertralina y Clonazepam"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Center / Location Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.reminders.centerLabel}
                </label>
                <select
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="COSAM Rinconada (Rinconada 1234)">COSAM Rinconada (Rinconada 1234)</option>
                  <option value="Farmacia Central - COSAM Rinconada">Farmacia Central - COSAM Rinconada</option>
                  <option value="CESFAM Dr. Raúl Silva Henríquez">CESFAM Dr. Raúl Silva Henríquez</option>
                  <option value="CESFAM Santa Laura">CESFAM Santa Laura</option>
                  <option value="CESFAM Gabriela Mistral">CESFAM Gabriela Mistral</option>
                  <option value="SAPU La Bandera (Urgencias)">SAPU La Bandera (Urgencias)</option>
                  <option value="Hospital Padre Hurtado">Hospital Padre Hurtado</option>
                </select>
              </div>

              {/* Date & Time + Anticipation Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t.reminders.dateTimeLabel} *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t.reminders.anticipationLabel}
                  </label>
                  <select
                    value={anticipation}
                    onChange={(e) => setAnticipation(Number(e.target.value) as ReminderAnticipation)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-600 cursor-pointer"
                  >
                    <option value={0}>{t.reminders.anticipationAtTime}</option>
                    <option value={15}>{t.reminders.anticipation15Min}</option>
                    <option value={60}>{t.reminders.anticipation1Hour}</option>
                    <option value={120}>{t.reminders.anticipation2Hours}</option>
                    <option value={1440}>{t.reminders.anticipation24Hours}</option>
                  </select>
                </div>
              </div>

              {/* Notes / Clinical Requirements */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.reminders.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.reminders.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-600 resize-none"
                />
              </div>

              {/* Privacy Note */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 text-xs text-purple-900 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40">
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />
                <span>{t.reminders.privacyNote}</span>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {t.reminders.cancelBtn}
                </button>
                <button
                  type="submit"
                  id="btn-guardar-recordatorio"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" strokeWidth={2.2} />
                  <span>{t.reminders.saveBtn}</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
