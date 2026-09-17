import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  ClipboardList, 
  Stethoscope, 
  Brain, 
  Network,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TeamSection, Language } from '../types/clinical';
import { translations } from '../data/translations';

interface TeamSectionListProps {
  sections: TeamSection[];
  language: Language;
}

export const TeamSectionList: React.FC<TeamSectionListProps> = ({ sections, language }) => {
  const t = translations[language];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (iconName: TeamSection['iconName']) => {
    switch (iconName) {
      case 'award':
        return <Award className="w-5 h-5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />;
      case 'clipboard-list':
        return <ClipboardList className="w-5 h-5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />;
      case 'stethoscope':
        return <Stethoscope className="w-5 h-5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />;
      case 'brain':
        return <Brain className="w-5 h-5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />;
      case 'network':
        return <Network className="w-5 h-5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />;
      default:
        return <Users className="w-5 h-5 text-purple-600 dark:text-purple-300" strokeWidth={2.2} />;
    }
  };

  const getTranslatedSection = (s: TeamSection) => {
    const id = (s.id || '').toLowerCase();
    if (id.includes('dir')) {
      return {
        title: t.team?.directionTitle || s.title,
        role: t.team?.directionRole || s.role,
        desc: t.team?.directionDesc || s.description
      };
    }
    if (id.includes('coord')) {
      return {
        title: t.team?.coordinationTitle || s.title,
        role: t.team?.coordinationRole || s.role,
        desc: t.team?.coordinationDesc || s.description
      };
    }
    if (id.includes('med')) {
      return {
        title: t.team?.medicalTitle || s.title,
        role: t.team?.medicalRole || s.role,
        desc: t.team?.medicalDesc || s.description
      };
    }
    if (id.includes('psic') || id.includes('psych')) {
      return {
        title: t.team?.psychologyTitle || s.title,
        role: t.team?.psychologyRole || s.role,
        desc: t.team?.psychologyDesc || s.description
      };
    }
    if (id.includes('rehab') || id.includes('social')) {
      return {
        title: t.team?.rehabTitle || s.title,
        role: t.team?.rehabRole || s.role,
        desc: t.team?.rehabDesc || s.description
      };
    }
    return { 
      title: s.title || "Área Clínica", 
      role: s.role || "Equipo Profesional", 
      desc: s.description || "" 
    };
  };

  const getSpecialRoleBadge = (sectionId: string) => {
    const id = (sectionId || '').toLowerCase();
    if (id.includes('dir')) return language === 'ht' ? 'Teknik Dirijan' : language === 'en' ? 'Technical Director' : 'Dirección Técnica';
    if (id.includes('coord')) return language === 'ht' ? 'Kowòdinasyon SOME' : language === 'en' ? 'SOME & Schedules' : 'SOME y Agendamiento';
    if (id.includes('med')) return language === 'ht' ? 'RÈSÈT AK LISANS' : language === 'en' ? 'Prescriptions & Licences' : 'Recetas y Licencias';
    if (id.includes('psic') || id.includes('psych')) return language === 'ht' ? 'Sikoterapi' : language === 'en' ? 'Psychotherapy' : 'Psicoterapia';
    if (id.includes('rehab') || id.includes('social')) return language === 'ht' ? 'REZO AK BENEFIS' : language === 'en' ? 'Networks & Benefits' : 'Gestión de Redes y Beneficios';
    return 'Prestación Clínica';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section
      id="seccion-equipo"
      aria-label="Equipo Interdisciplinario"
      className="space-y-4"
    >
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-display">
          <div className="icon-box-md rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-300">
            <Users className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <span className="text-slate-900 dark:text-white">{t.team?.title || "Conoce a tu Equipo"}</span>
        </h3>
        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          {t.team?.subtitle || "Equipo Interdisciplinario"}
        </span>
      </div>

      {/* Team Cards Stack with Uniform Glass Card Styling */}
      <div className="space-y-3.5">
        {sections.map((section, idx) => {
          const trans = getTranslatedSection(section);
          const cardId = section.id || String(idx);
          const isExpanded = expandedId === cardId;
          const specialBadge = getSpecialRoleBadge(cardId);

          return (
            <div
              key={cardId}
              className="group mobile-snap-center rounded-3xl p-4 bg-white dark:bg-slate-900 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.12)] dark:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.25)] border border-purple-300/60 ring-1 ring-purple-400/20 dark:border-purple-500/30 dark:ring-purple-500/20 hover:border-purple-400 transition-all duration-200 relative overflow-hidden"
            >
              <div className="flex items-start gap-3.5">
                {/* Icon Container */}
                <div className="icon-box-lg rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 group-hover:scale-105 transition-transform text-purple-700 dark:text-purple-300 shrink-0">
                  {getIcon(section.iconName)}
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wide font-display">
                      {trans.title}
                    </h4>
                    
                    {/* Double Badges for High Context */}
                    <div className="flex gap-1.5 items-center flex-wrap">
                      <span className="micro-badge bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/60 shrink-0">
                        {trans.role}
                      </span>
                      <span className="micro-badge bg-amber-500/10 dark:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/20 shrink-0 font-extrabold text-[10px]">
                        {specialBadge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-1.5">
                    {section.names}
                  </p>

                  {/* Collapsible Content */}
                  <div className={`mt-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1.5 border-t border-purple-100/50 dark:border-slate-800">
                      {trans.desc}
                    </p>
                  </div>

                  {/* Toggle Accordion Button */}
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => toggleExpand(cardId)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wide border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <span>
                        {isExpanded 
                          ? (language === 'ht' ? 'Kache detay' : language === 'en' ? 'Hide details' : 'Ocultar detalles')
                          : (language === 'ht' ? 'Ver fonksyon ak sèvis' : language === 'en' ? 'View services & duties' : 'Ver funciones y prestaciones')
                        }
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


