import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Paperclip, 
  Volume2, 
  VolumeX, 
  Home, 
  MessageSquare,
  PhoneCall,
  Pill,
  Users2,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types/clinical';
import { translations } from '../data/translations';
import { getLocalResponse } from '../data/cosamData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  htmlText: string;
  imageSrc?: string;
  buttons?: string[];
  timestamp: string;
}

interface ChatbotAssistantProps {
  language: Language;
}

export const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ language }) => {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getMenuButtons = (lang: Language): string[] => {
    const tLang = translations[lang];
    return [
      tLang.chat.quickOpt1,
      tLang.chat.quickOpt2,
      tLang.chat.quickOpt3,
      tLang.chat.quickOpt4
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Reset or initialize welcome message on language switch
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        htmlText: t.chat.welcomeMsg,
        buttons: getMenuButtons(language),
        timestamp: 'Online'
      }
    ]);
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Clean text for speech synthesis
  const cleanForSpeech = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.replace(/(📍|⚠️|•|💡|🌟|❓|🚨|✍️|👥|💊|📜|📱|🕒|⏳|🏥|🚑|📞|🔒)/g, '').trim();
  };

  // Text-To-Speech handler
  const handlePlayTTS = (msgId: string, html: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanStr = cleanForSpeech(html);
    const utterance = new SpeechSynthesisUtterance(cleanStr);
    
    if (language === 'ht') utterance.lang = 'fr-HT';
    else if (language === 'en') utterance.lang = 'en-US';
    else utterance.lang = 'es-CL';

    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleShowMainMenu = () => {
    const welcomeMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'assistant',
      htmlText: t.chat.welcomeMsg,
      buttons: getMenuButtons(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, welcomeMsg]);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      htmlText: query || (language === 'ht' ? '📷 Dokiman tache' : language === 'en' ? '📷 Attached document' : '📷 Imagen de documento adjunta'),
      imageSrc: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    const hasImage = !!selectedImage;
    setSelectedImage(null);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = getLocalResponse(query, hasImage, language);

      if (reply) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          htmlText: reply,
          buttons: [t.chat.returnToMenu],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        handleShowMainMenu();
      }
    }, 350);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getButtonIcon = (btnText: string) => {
    if (btnText.includes('WhatsApp') || btnText.includes('Inasistencia') || btnText.includes('Absans') || btnText.includes('Absence')) {
      return <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2.2} />;
    }
    if (btnText.includes('Recetas') || btnText.includes('Farmacia') || btnText.includes('Resèt') || btnText.includes('Prescription')) {
      return <Pill className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" strokeWidth={2.2} />;
    }
    if (btnText.includes('Talleres') || btnText.includes('Horarios') || btnText.includes('Atelye') || btnText.includes('Workshops')) {
      return <Users2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={2.2} />;
    }
    if (btnText.includes('Emergencias') || btnText.includes('Ijans') || btnText.includes('Emergencies')) {
      return <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" strokeWidth={2.2} />;
    }
    return null;
  };

  const getButtonColorStyle = (btnText: string) => {
    if (btnText.includes('WhatsApp') || btnText.includes('Inasistencia') || btnText.includes('Absans') || btnText.includes('Absence')) {
      return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 hover:border-emerald-300';
    }
    if (btnText.includes('Recetas') || btnText.includes('Farmacia') || btnText.includes('Resèt') || btnText.includes('Prescription')) {
      return 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 hover:border-indigo-300';
    }
    if (btnText.includes('Talleres') || btnText.includes('Horarios') || btnText.includes('Atelye') || btnText.includes('Workshops')) {
      return 'bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800 hover:bg-purple-100 hover:border-purple-300';
    }
    if (btnText.includes('Emergencias') || btnText.includes('Ijans') || btnText.includes('Emergencies')) {
      return 'bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 border-red-200 dark:border-red-800 hover:bg-red-100 hover:border-red-300';
    }
    return 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100';
  };

  return (
    <>
      {/* Floating Chatbot Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="btn-open-chatbot"
        aria-label="Abrir orientador virtual"
        className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg shadow-purple-600/30 flex items-center justify-center transition-all z-40 group cursor-pointer focus-visible:ring-3 focus-visible:ring-purple-400"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" strokeWidth={2.2} />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div 
          role="dialog"
          aria-live="polite"
          id="chatbot-window-modal"
          className="fixed bottom-28 sm:bottom-22 right-2 sm:right-6 w-[380px] max-w-[calc(100vw-1rem)] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 flex flex-col overflow-hidden z-50 transition-all h-[540px] max-h-[76vh] animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="icon-box-sm rounded-xl bg-white/20 border border-white/20 text-white">
                <Bot className="w-4 h-4" strokeWidth={2.2} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm font-display leading-tight">
                    {t.chat.title}
                  </h3>
                  <span className="micro-badge font-extrabold uppercase bg-emerald-400/30 text-emerald-200 border border-emerald-300/40">
                    Online
                  </span>
                </div>
                <p className="text-xs text-purple-200">
                  {t.chat.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              id="btn-close-chatbot"
              aria-label="Cerrar chat"
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Privacy Guarantee Pill Banner */}
          <div className="bg-emerald-500/[0.06] dark:bg-emerald-500/[0.03] border-b border-emerald-100 dark:border-emerald-900/40 px-3 py-2 flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 animate-pulse" strokeWidth={2.2} />
            <span className="truncate leading-tight">
              {language === 'es' 
                ? 'Privacidad Garantizada: No almacenamos datos de salud o información clínica.'
                : language === 'ht'
                ? 'Konfidansyalite Garanti: Nou pa anrejistre done sante oswa enfòmasyon klinik.'
                : 'Privacy Guaranteed: We never store health data or clinical information.'}
            </span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto bg-slate-50 dark:bg-slate-850/60 flex flex-col gap-3 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3.5 rounded-2xl max-w-[92%] shadow-xs space-y-2 relative ${
                      isUser
                        ? 'bg-purple-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                    }`}
                  >
                    {/* Image Preview */}
                    {msg.imageSrc && (
                      <img
                        src={msg.imageSrc}
                        alt="Documento adjunto"
                        className="w-full max-h-36 object-cover rounded-xl mb-1.5 border border-purple-200"
                      />
                    )}

                    {/* Content */}
                    <div 
                      className="leading-relaxed text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: msg.htmlText }}
                    />

                    {/* Audio TTS button */}
                    {!isUser && (
                      <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                        <button
                          onClick={() => handlePlayTTS(msg.id, msg.htmlText)}
                          aria-label={t.chat.listenAudio}
                          className="micro-badge font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/60 dark:border-purple-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-purple-500"
                        >
                          {isSpeaking === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-red-500 animate-pulse" strokeWidth={2.2} />
                              <span>{t.chat.stopAudio}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
                              <span>{t.chat.listenAudio}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-2 w-full max-w-[92%]">
                      {msg.buttons.map((btnText, i) => {
                        const isMainBtn = btnText === t.chat.returnToMenu || btnText === 'Menú Principal' || btnText.includes('Menú') || btnText.includes('Menu');
                        const icon = !isMainBtn ? getButtonIcon(btnText) : <Home className="w-3.5 h-3.5" strokeWidth={2.2} />;
                        const styleClass = isMainBtn
                          ? 'bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 shadow-xs flex items-center justify-center gap-2'
                          : `${getButtonColorStyle(btnText)} font-bold text-left p-2.5 flex items-center gap-2 shadow-2xs`;

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              if (isMainBtn) handleShowMainMenu();
                              else handleSendMessage(btnText);
                            }}
                            className={`text-xs rounded-xl border transition-all active:scale-98 focus-visible:ring-2 focus-visible:ring-purple-500 ${styleClass}`}
                          >
                            {icon}
                            <span className="flex-1 leading-tight">{btnText}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <span className="text-xs text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl self-start shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-purple-100 dark:border-slate-800">
            {selectedImage && (
              <div className="mb-2 relative inline-block">
                <img
                  src={selectedImage}
                  alt="Vista previa adjunta"
                  className="h-14 w-auto rounded-lg border border-purple-300 shadow-xs"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
                  aria-label="Eliminar imagen"
                >
                  <X className="w-3 h-3" strokeWidth={2.2} />
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label={t.chat.attachTooltip}
                title={t.chat.attachTooltip}
                className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
              >
                <Paperclip className="w-4 h-4" strokeWidth={2.2} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.chat.inputPlaceholder}
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                disabled={!inputText.trim() && !selectedImage}
                aria-label="Enviar mensaje"
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white p-2 rounded-xl transition-all shadow-xs shrink-0 focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <Send className="w-4 h-4" strokeWidth={2.2} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
