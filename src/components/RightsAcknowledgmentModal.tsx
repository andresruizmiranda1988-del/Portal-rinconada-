import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle, FileCheck, Award, Printer, Check } from 'lucide-react';
import { Language, RightsAcknowledgment } from '../types/clinical';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

interface RightsAcknowledgmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAcknowledged: (ack: RightsAcknowledgment) => void;
}

export const RightsAcknowledgmentModal: React.FC<RightsAcknowledgmentModalProps> = ({
  isOpen,
  onClose,
  language,
  onAcknowledged
}) => {
  const [rut, setRut] = useState('');
  const [name, setName] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedAck, setConfirmedAck] = useState<RightsAcknowledgment | null>(null);

  const t = translations[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!rut.trim()) {
      setErrorMessage(t.acknowledgmentModal.errorRequired);
      return;
    }

    if (!hasAgreed) {
      setErrorMessage(t.acknowledgmentModal.errorCheckbox);
      return;
    }

    const folioId = `COSAM-ACK-${Date.now().toString().slice(-6)}`;
    const newAck: RightsAcknowledgment = {
      id: folioId,
      rutOrRecord: rut.trim(),
      patientName: name.trim() || undefined,
      acceptedAt: new Date().toLocaleString(language === 'es' ? 'es-CL' : language === 'ht' ? 'fr-HT' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      timestamp: Date.now(),
      language
    };

    // Save in localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('cosam_acknowledgments') || '[]');
      existing.push(newAck);
      localStorage.setItem('cosam_acknowledgments', JSON.stringify(existing));
      localStorage.setItem('cosam_last_ack', JSON.stringify(newAck));
    } catch {
      // ignore storage errors
    }

    setConfirmedAck(newAck);
    onAcknowledged(newAck);

    // Launch celebratory confetti for completing onboarding
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ack-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-box-lg rounded-2xl bg-white/20 text-white shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h3 id="ack-modal-title" className="text-base sm:text-lg font-bold font-display">
                {t.acknowledgmentModal.title}
              </h3>
              <p className="text-xs text-emerald-100">
                {t.acknowledgmentModal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {confirmedAck ? (
            /* Success Receipt Screen */
            <div className="text-center space-y-4">
              <div className="icon-box-xl rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mx-auto shadow-inner">
                <Check className="w-8 h-8" strokeWidth={2.5} />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.acknowledgmentModal.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {t.acknowledgmentModal.successDesc}
                </p>
              </div>

              {/* Digital Certificate Receipt */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-emerald-200/60 dark:border-emerald-900/60">
                  <span className="micro-badge font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                    {t.acknowledgmentModal.folioLabel}
                  </span>
                  <span className="font-mono font-extrabold text-emerald-800 dark:text-emerald-200">
                    {confirmedAck.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">{t.acknowledgmentModal.rutLabel}:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{confirmedAck.rutOrRecord}</span>
                </div>
                {confirmedAck.patientName && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Paciente:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{confirmedAck.patientName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">{t.acknowledgmentModal.dateLabel}:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{confirmedAck.acceptedAt}</span>
                </div>
                <div className="pt-2 text-xs text-emerald-700 dark:text-emerald-400 italic">
                  Conformidad registrada de acuerdo a Ley 20.584 y 21.331.
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  {t.acknowledgmentModal.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            /* Entry Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {t.acknowledgmentModal.formIntro}
              </p>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {t.acknowledgmentModal.rutLabel} *
                </label>
                <input
                  type="text"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  placeholder={t.acknowledgmentModal.rutPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {t.acknowledgmentModal.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.acknowledgmentModal.namePlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-950">
                  <input
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 dark:bg-slate-800 border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    {t.acknowledgmentModal.checkboxLabel}
                  </span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" strokeWidth={2.2} />
                  {t.acknowledgmentModal.submitBtn}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
