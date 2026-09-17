import React, { useState } from 'react';
import { 
  X, 
  Brain, 
  HeartHandshake, 
  Activity, 
  Sprout, 
  FileDown, 
  Sparkles, 
  CheckCircle2, 
  Printer
} from 'lucide-react';
import { Language } from '../types/clinical';
import { 
  downloadCravingGuidePdf, 
  downloadThoughtRestructuringPdf, 
  downloadMotorActivationPdf, 
  downloadWeekendPlannerPdf,
  downloadWorkshopSchedulePdf 
} from '../utils/workshopPdfs';

interface StrategiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const StrategiesModal: React.FC<StrategiesModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'craving' | 'emotions' | 'physical' | 'leisure'>('all');

  if (!isOpen) return null;

  const labels = {
    es: {
      modalTitle: "Estrategias que puedes aplicar",
      modalSubtitle: "Herramientas clínicas y de autocuidado para tu proceso de recuperación",
      allTab: "Todas las Estrategias",
      tab1: "Craving & Urge Surfing",
      tab2: "Regulación Emocional",
      tab3: "Activación Física",
      tab4: "Tiempo Libre & Ocio",
      closeBtn: "Cerrar",
      downloadAllBtn: "Descargar Cronograma General (PDF)",
      strategy1Title: "1. Manejo del Craving: Técnica Urge Surfing (Surfear la Ola)",
      strategy1Lead: "El deseo intenso (craving) funciona como una ola de mar: sube, alcanza una cresta máxima y luego decae de forma natural si no la alimentas.",
      strategy1Steps: [
        "Reconoce y nombra: Di en voz baja 'Estoy sintiendo una ola de deseo, es solo una reacción física y pasará'.",
        "Respira en 4 tiempos: Inhala en 4 segundos, retén 4 y exhala lento en 6 segundos para calmar el sistema nervioso.",
        "Aplica la regla de los 15 minutos: Posterga cualquier impulso por 15 minutos y realiza un cambio de actividad inmediato (beber agua fría, lavarte la cara, cambiar de habitación)."
      ],
      strategy2Title: "2. Regulación Emocional: Reestructuración de Pensamientos",
      strategy2Lead: "Los pensamientos automáticos no son verdades absolutas. Cuestionar tus pensamientos disminuye la angustia y la impulsividad.",
      strategy2Steps: [
        "Identifica el pensamiento trampa: 'No sirvo para nada' o 'Una sola vez no me hará daño'.",
        "Busca la evidencia objetiva: ¿Qué pruebas reales tengo? ¿Qué le diría a un amigo que piensa esto?",
        "Genera un pensamiento alternativo realista: 'Es un día difícil, pero he superado momentos más duros y hoy elijo cuidarme'."
      ],
      strategy3Title: "3. Salud Motora: Activación Rápida y Neurobiología",
      strategy3Lead: "El movimiento muscular de bajo impacto libera endorfinas y dopamina natural, reduciendo los niveles de cortisol.",
      strategy3Steps: [
        "Caminata de descarga: 10 a 15 minutos de caminata a paso firme al aire libre para romper la rumiación mental.",
        "Estiramientos posturales: Elongar hombros, cuello y espalda para distender la tensión muscular acumulada.",
        "Hidratación consciente: Beber un vaso de agua fresca antes y después de cualquier actividad física."
      ],
      strategy4Title: "4. Manejo del Tiempo Libre: Estructura de Fin de Semana Protegido",
      strategy4Lead: "El tiempo libre desestructurado es un factor de vulnerabilidad. Anticipar y planificar actividades significativas protege tu sobriedad.",
      strategy4Steps: [
        "Planifica tus 3 bloques: Define una actividad concreta para la mañana, la tarde y la noche de viernes a domingo.",
        "Evita estímulos y lugares de riesgo: Reemplaza encuentros con personas o entornos asociados al consumo por espacios saludables.",
        "Activa a tu persona de confianza: Avisa a un familiar o amigo que te contacte o acompáñate en momentos críticos."
      ],
      downloadIndividualPdf: "Descargar Pauta PDF de este taller"
    },
    ht: {
      modalTitle: "Estrateji ou ka aplike",
      modalSubtitle: "Zouti klinik ak pou pran swen tèt ou nan pwosesis gerizon an",
      allTab: "Tout Estrateji yo",
      tab1: "Craving & Urge Surfing",
      tab2: "Règleman Emosyonèl",
      tab3: "Aktivite Fizik",
      tab4: "Tan Lib & Detant",
      closeBtn: "Fèmen",
      downloadAllBtn: "Telechaje Orè Jeneral (PDF)",
      strategy1Title: "1. Jesyon Craving: Teknik Navige sou Vag la (Urge Surfing)",
      strategy1Lead: "Gwo anvi a fonksyone tankou yon vag lanmè: li monte, rive nan pwen pi wo a, epi desann natirèlman si w pa kouri satisfè li.",
      strategy1Steps: [
        "Rekonèt epi rele l pa non li: Di dousman 'M santi yon vag anvi, se sèlman yon reyaksyon kò m, li pral pase'.",
        "Respire nan 4 tan: Rale souf nan 4 segonn, kenbe l 4 segonn, epi lage l dousman nan 6 segonn pou kalme nè w.",
        "Aplike règ 15 minit la: Retade nenpòt aksyon pou 15 minit epi fè yon lòt aktivite imedyatman (bwè dlo fre, lave figi w, chanje espas)."
      ],
      strategy2Title: "2. Règleman Emosyonèl: Chanje Estrikti Panse yo",
      strategy2Lead: "Panse otomatik ou yo se pa verite absoli. Poze tèt ou kesyon sou sa w ap panse ede diminye kè sere ak enpilsyon.",
      strategy2Steps: [
        "Idantifye panse ki twonpe w la: 'M pa vo anyen' oswa 'Yon sèl fwa pap fè anyen'.",
        "Chèche prèv reyèl: Ki prèv mwen genyen toutbon? Kisa m ta di yon zanmi k ap panse konsa?",
        "Kreye yon panse ki pi reyalis: 'Jodi a difisil, men mwen pase moman pi rèd deja e jodi a m chwazi pran swen tèt mwen'."
      ],
      strategy3Title: "3. Sante Motè: Aktivasyon Rapid ak Kò",
      strategy3Lead: "Mouvman kò ak egzèsis senp libere andòfin natirèl ki ede kò a kalme epi diminye strès.",
      strategy3Steps: [
        "Mache rapid pou debouse strès: 10 a 15 minit mache deyò pou libere lespri w anba tèt chaje.",
        "Detire kò w: Detire zepòl, kou ak do pou retire tansyon misk yo akimile.",
        "Bwè dlo: Bwè yon bon vè dlo fre anvan ak apre nenpòt ti aktivite fizik."
      ],
      strategy4Title: "4. Jesyon Tan Lib: Planifye Wikenn an Sekirite",
      strategy4Lead: "Lè w gen twòp tan lib san anyen pou fè, sa ka ogmante risk. Prepare aktivite ki gen sans pou pwoteje gerizon w.",
      strategy4Steps: [
        "Planifye 3 moman nan jounen an: Mete yon aktivite klè pou maten, apremidi ak aswè.",
        "Evite kote ak moun ki gen risk: Ranplase ansyen abitid ak espas ki an sekirite epi ki an sante.",
        "Kominike ak moun ou fè konfyans: Fè yon fanmi oswa yon bon zanmi konnen kijan w ap pase wikenn nan."
      ],
      downloadIndividualPdf: "Telechaje Gid PDF pou atelye sa a"
    },
    en: {
      modalTitle: "Strategies you can apply",
      modalSubtitle: "Clinical and self-care recovery tools for your daily routine",
      allTab: "All Strategies",
      tab1: "Craving & Urge Surfing",
      tab2: "Emotional Regulation",
      tab3: "Physical Activity",
      tab4: "Leisure & Free Time",
      closeBtn: "Close",
      downloadAllBtn: "Download Full Schedule (PDF)",
      strategy1Title: "1. Craving Management: Urge Surfing Technique",
      strategy1Lead: "Craving behaves like an ocean wave: it rises, crests at its peak, and naturally subsides if you don't feed it.",
      strategy1Steps: [
        "Recognize and label it: Tell yourself quietly, 'I am experiencing a craving wave; it is just a physiological sensation and will pass.'",
        "4-count box breathing: Inhale for 4 seconds, hold for 4, and exhale slowly for 6 seconds to calm your nervous system.",
        "The 15-minute delay rule: Postpone any impulsive action for 15 minutes and immediately engage in a grounding activity (cold water, changing rooms)."
      ],
      strategy2Title: "2. Emotional Regulation: Cognitive Restructuring",
      strategy2Lead: "Automatic thoughts are not absolute truths. Challenging distorted narratives reduces anxiety and emotional reactivity.",
      strategy2Steps: [
        "Catch the trap thought: 'I will never get through this' or 'Just this once won't hurt.'",
        "Examine objective evidence: What are the facts? What compassionate advice would I give to a close friend?",
        "Formulate a balanced thought: 'Today is challenging, but I have navigated tough days before, and today I choose recovery.'"
      ],
      strategy3Title: "3. Motor Activation: Fast Neurobiological Reset",
      strategy3Lead: "Low-impact physical movement triggers natural endorphin release and dopamine regulation, reducing physiological cortisol.",
      strategy3Steps: [
        "10-minute reset walk: Brisk outdoor walking breaks rumination and activates neuromuscular grounding.",
        "Tension release stretches: Stretch shoulders, neck, and lower back to dissolve stress armor.",
        "Hydration check: Drink a glass of water before and after any movement to stabilize autonomic balance."
      ],
      strategy4Title: "4. Free Time Management: Protected Weekend Structuring",
      strategy4Lead: "Unstructured free time creates vulnerability. Planning safe, meaningful activities shields your sobriety.",
      strategy4Steps: [
        "Structure the 3 daily blocks: Schedule one healthy activity for morning, afternoon, and evening across the weekend.",
        "Avoid trigger people and places: Replace high-risk environments with restorative, alcohol/substance-free spaces.",
        "Activate your support ally: Agree on a check-in with a trusted family member, peer, or sponsor."
      ],
      downloadIndividualPdf: "Download PDF Guideline for this workshop"
    }
  }[language];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="strategies-modal-title"
    >
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-transparent dark:from-purple-950/40 dark:via-slate-900 dark:to-transparent">
          <div className="flex items-center gap-3">
            <div className="icon-box-lg rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/30 shrink-0">
              <Sparkles className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <div>
              <h2 id="strategies-modal-title" className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-display">
                {labels.modalTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {labels.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={labels.closeBtn}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            {labels.allTab}
          </button>
          <button
            onClick={() => setActiveTab('craving')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'craving'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            {labels.tab1}
          </button>
          <button
            onClick={() => setActiveTab('emotions')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'emotions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            {labels.tab2}
          </button>
          <button
            onClick={() => setActiveTab('physical')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'physical'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            {labels.tab3}
          </button>
          <button
            onClick={() => setActiveTab('leisure')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'leisure'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            {labels.tab4}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left text-xs sm:text-sm">
          {/* Strategy 1 */}
          {(activeTab === 'all' || activeTab === 'craving') && (
            <article className="p-4 sm:p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/50 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="icon-box-sm rounded-xl bg-purple-600 text-white shrink-0">
                    <Brain className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base font-display">
                    {labels.strategy1Title}
                  </h3>
                </div>
                <button
                  onClick={() => downloadCravingGuidePdf(language)}
                  title={labels.downloadIndividualPdf}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center gap-1.5 hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" strokeWidth={2.2} />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {labels.strategy1Lead}
              </p>

              <div className="space-y-2 pt-1">
                {labels.strategy1Steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Strategy 2 */}
          {(activeTab === 'all' || activeTab === 'emotions') && (
            <article className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="icon-box-sm rounded-xl bg-indigo-600 text-white shrink-0">
                    <HeartHandshake className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base font-display">
                    {labels.strategy2Title}
                  </h3>
                </div>
                <button
                  onClick={() => downloadThoughtRestructuringPdf(language)}
                  title={labels.downloadIndividualPdf}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" strokeWidth={2.2} />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {labels.strategy2Lead}
              </p>

              <div className="space-y-2 pt-1">
                {labels.strategy2Steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Strategy 3 */}
          {(activeTab === 'all' || activeTab === 'physical') && (
            <article className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="icon-box-sm rounded-xl bg-emerald-600 text-white shrink-0">
                    <Activity className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base font-display">
                    {labels.strategy3Title}
                  </h3>
                </div>
                <button
                  onClick={() => downloadMotorActivationPdf(language)}
                  title={labels.downloadIndividualPdf}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" strokeWidth={2.2} />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {labels.strategy3Lead}
              </p>

              <div className="space-y-2 pt-1">
                {labels.strategy3Steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Strategy 4 */}
          {(activeTab === 'all' || activeTab === 'leisure') && (
            <article className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="icon-box-sm rounded-xl bg-amber-600 text-white shrink-0">
                    <Sprout className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base font-display">
                    {labels.strategy4Title}
                  </h3>
                </div>
                <button
                  onClick={() => downloadWeekendPlannerPdf(language)}
                  title={labels.downloadIndividualPdf}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" strokeWidth={2.2} />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {labels.strategy4Lead}
              </p>

              <div className="space-y-2 pt-1">
                {labels.strategy4Steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => downloadWorkshopSchedulePdf(language)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-purple-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" strokeWidth={2.2} />
            <span>{labels.downloadAllBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors cursor-pointer"
          >
            {labels.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
