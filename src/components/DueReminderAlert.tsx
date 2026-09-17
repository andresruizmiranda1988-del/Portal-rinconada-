import React from 'react';
import { BellRing, X, Clock, MapPin, Pill, Stethoscope, Users, FlaskConical, CheckCircle2 } from 'lucide-react';
import { Reminder } from '../types/reminder';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';

interface DueReminderAlertProps {
  reminder: Reminder | null;
  onDismiss: () => void;
  onSnooze: () => void;
  language: Language;
}

export const DueReminderAlert: React.FC<DueReminderAlertProps> = ({
  reminder,
  onDismiss,
  onSnooze,
  language
}) => {
  if (!reminder) return null;
  const t = translations[language];

  const isMed = reminder.type === 'medication';
  const isDoc = reminder.type === 'medical_appointment';
  const isWorkshop = reminder.type === 'workshop';
  const isExam = reminder.type === 'lab_exam';

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-md w-full p-2 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-2 border-purple-500 dark:border-purple-500 overflow-hidden ring-4 ring-purple-500/20">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-3.5 px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="icon-box-sm rounded-xl bg-white/20 animate-bounce">
              <BellRing className="w-4 h-4 text-amber-300" strokeWidth={2.2} />
            </span>
            <span className="font-extrabold text-xs uppercase tracking-wider">
              {t.reminders.dueAlertTitle}
            </span>
          </div>

          <button
            onClick={onDismiss}
            aria-label="Cerrar aviso"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="icon-box-lg rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shrink-0">
              {isMed ? <Pill className="w-5 h-5" strokeWidth={2.2} /> :
               isDoc ? <Stethoscope className="w-5 h-5" strokeWidth={2.2} /> :
               isWorkshop ? <Users className="w-5 h-5" strokeWidth={2.2} /> :
               isExam ? <FlaskConical className="w-5 h-5" strokeWidth={2.2} /> :
               <Clock className="w-5 h-5" strokeWidth={2.2} />}
            </div>

            <div className="space-y-1 min-w-0">
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-snug">
                {reminder.title}
              </h3>

              {reminder.centerName && (
                <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" strokeWidth={2.2} />
                  <span className="truncate">{reminder.centerName}</span>
                </p>
              )}

              {reminder.notes && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-purple-50 dark:bg-purple-950/40 p-2 rounded-xl border border-purple-100 dark:border-purple-900/50">
                  {reminder.notes}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onSnooze}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <Clock className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>{t.reminders.dueAlertSnooze}</span>
            </button>

            <button
              onClick={onDismiss}
              className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>{t.reminders.dueAlertDismiss}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
