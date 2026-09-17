import React, { useState, useEffect } from 'react';
import { X, QrCode, Download, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { CosamInfo } from '../types/clinical';

interface QRShareModalProps {
  info: CosamInfo;
  onClose: () => void;
}

export const QRShareModal: React.FC<QRShareModalProps> = ({ info, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cosam-rinconada.minsal.cl';

  useEffect(() => {
    QRCode.toDataURL(currentUrl, {
      width: 380,
      margin: 2,
      color: {
        dark: '#581c87', // deep purple
        light: '#ffffff'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [currentUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-Portal-${info.name.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-2xl overflow-hidden my-auto flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="icon-box-sm rounded-xl bg-white/20 border border-white/20 text-white">
              <QrCode className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-sm font-display leading-tight">
                Código QR del Portal
              </h3>
              <p className="text-xs text-purple-200">
                {info.name} • Sala de Espera
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* QR Display Card */}
        <div className="p-6 text-center space-y-4">
          <div className="bg-purple-50/50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50 inline-block shadow-inner">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Código QR Portal COSAM Rinconada"
                className="w-52 h-52 mx-auto rounded-xl shadow-xs"
              />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center text-slate-400 text-xs">
                Generando QR...
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Escanea para abrir en tu celular
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Acceso directo a teléfonos de SOME, equipo clínico, talleres y fármacos.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleCopyLink}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.2} /> : <Copy className="w-3.5 h-3.5" strokeWidth={2.2} />}
              <span>{copied ? '¡Copiado!' : 'Copiar Enlace'}</span>
            </button>

            <button
              onClick={handleDownloadQR}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>Descargar PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
