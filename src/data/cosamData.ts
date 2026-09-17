import { TeamSection, Workshop, MedicationCenter, CosamInfo, UrgencyContact, UrgencyHospital, HealthCenterInfo, Language, LabExamInfo } from '../types/clinical';

export const cosamInfo: CosamInfo = {
  name: "COSAM RINCONADA",
  subtitle: "Centro de Salud Mental y Tratamiento en Adicciones",
  program: "Programa de Tratamiento en Adicciones",
  welcomeMessage: "En COSAM Rinconada (San Ramón) estamos aquí para acompañarte. Este es un espacio de cuidado y respeto, diseñado para orientarte y apoyarte en tu proceso.",
  phoneSome: "225769844",
  phoneFormatted: "2 2576 9844",
  whatsappNumber: "56955118624",
  whatsappFormatted: "+56 9 5511 8624",
  address: "Rinconada 8460, San Ramón",
  mapsUrl: "https://maps.google.com/?q=Rinconada+8460,+San+Ram%C3%B3n,+Regi%C3%B3n+Metropolitana",
  wazeUrl: "https://waze.com/ul?q=Rinconada+8460+San+Ramon",
  hours: {
    weekdays: "Lunes a Jueves: 08:00 a 19:00 hrs",
    friday: "Viernes: 08:00 a 16:00 hrs",
    note: "Por favor, recuerda llegar siempre 10 minutos antes a tus citas."
  }
};

export const teamSections: TeamSection[] = [
  {
    id: "direction",
    title: "Dirección del Centro",
    role: "Dirección",
    names: "Carolina Urra Esquivel",
    description: "Vela por que encuentres un espacio de acogida y trato humano durante todo tu proceso.",
    iconName: "award"
  },
  {
    id: "coordination",
    title: "Coordinación del Programa",
    role: "Coordinación",
    names: "T.R. Katherine Astudillo Carrillo",
    description: "Gestiona tu plan de atención y facilita el acceso a todas nuestras prestaciones.",
    iconName: "clipboard-list"
  },
  {
    id: "medical",
    title: "Área Médica",
    role: "Médicos Tratantes",
    names: "Dr. Matías Moreno Venegas | Dr. Andrés Ruiz Miranda",
    description: "Responsables de tu evaluación clínica y ajuste de tratamiento según tus avances.",
    iconName: "stethoscope"
  },
  {
    id: "psychology",
    title: "Área de Psicología",
    role: "Psicólogos Clínicos",
    names: "Ps. Romina Lucero Donoso | Ps. Benjamín Rebolledo",
    description: "Te ofrecen un entorno de escucha segura para fortalecer tus cambios personales.",
    iconName: "brain"
  },
  {
    id: "rehab_social",
    title: "Rehabilitación y Social",
    role: "Trabajo Social y Terapia",
    names: "T.S. Pablo Díaz | T.R. Fernando Carrasco",
    description: "Trabajan para robustecer tus vínculos con la comunidad y red de apoyo familiar.",
    iconName: "network"
  }
];

export const workshops: Workshop[] = [
  {
    id: "ws-1",
    quadrant: 1,
    title: "Psicoeducación Médica y Craving",
    schedule: "Miércoles: 17:00 a 19:00 hrs",
    facilitator: "Dr. Andrés Ruiz Miranda y Katherine Astudillo",
    category: "Neurobiología y Prevención de Recaídas",
    description: "Manejo médico del craving, técnica de Urge Surfing (surfear la ola del deseo), control de impulsos y farmacoterapia.",
    pdfTitle: "Guía de Manejo del Craving y Urge Surfing (PDF)",
    pdfType: "craving",
    audioScript: "Bienvenido a la audio-guía del Taller de Psicoeducación Médica y Craving, facilitado por el Doctor Andrés Ruiz y Katherine Astudillo. El craving o deseo intenso es como una ola en el mar: sube, alcanza un punto máximo durante 15 a 20 minutos y luego desciende. Para surfear la ola, realiza tres cosas: primero, reconoce la sensación sin asustarte; segundo, practica respiración diafragmática inhalando en cuatro segundos y exhalando en ocho; tercero, cambia de ambiente o bebe un vaso con agua fría. Recuerda que no estás solo: puedes descargar la guía completa en PDF o acudir a nuestro taller cada miércoles de 17 a 19 horas."
  },
  {
    id: "ws-2",
    quadrant: 2,
    title: "Psicoterapia y Regulación Emocional",
    schedule: "Miércoles: 17:00 a 19:00 hrs",
    facilitator: "Ps. Romina Lucero Donoso y Benjamín Rebolledo",
    category: "Reestructuración Cognitiva y Afecto",
    description: "Espacio de contención para identificar pensamientos automáticos, procesar la angustia, modular el afecto y fortalecer vínculos seguros.",
    pdfTitle: "Ficha de Reestructuración de Pensamientos (PDF)",
    pdfType: "thoughts",
    audioScript: "Hola, te presentamos la audio-guía del Taller de Psicoterapia y Regulación Emocional, guiado por los psicólogos Romina Lucero y Benjamín Rebolledo. Muchas veces sufrimos no por lo que pasa, sino por cómo lo interpretamos. Cuando sientas rabia, culpa o ganas de aislarte, haz una pausa y pregúntate: ¿Es cien por ciento real lo que pienso? ¿Qué le diría a un buen amigo en mi lugar? Descarga tu ficha de registro en PDF para practicar y te esperamos los miércoles a las 17 horas."
  },
  {
    id: "ws-3",
    quadrant: 3,
    title: "Actividad Física y Salud",
    schedule: "Lun y Vie: 10:00 a 12:00 hrs",
    facilitator: "T.S. Pablo Díaz",
    category: "Salud Motora y Acondicionamiento",
    description: "Activación física integral, liberación de endorfinas, reducción del cortisol y estrés a través de rutinas de ejercicio adaptadas.",
    pdfTitle: "Pauta de Activación Motora y Salud (PDF)",
    pdfType: "motor",
    audioScript: "Esta es la audio-guía del Taller de Actividad Física y Salud, a cargo de Pablo Díaz. Mover tu cuerpo activa endorfinas y dopamina natural que reducen la ansiedad y el estrés. Te recomendamos comenzar cada mañana con 10 minutos de movilidad y estiramientos, y caminar a paso firme durante 20 a 30 minutos. Descarga la pauta motora diaria en PDF y súmate a nuestras sesiones grupales los lunes y viernes de 10 a 12 horas."
  },
  {
    id: "ws-4",
    quadrant: 4,
    title: "Tiempo Libre, Ocio y Huerto",
    schedule: "Viernes: 10:00 a 16:00 hrs",
    facilitator: "T.R. Fernando Carrasco",
    category: "Terapia Ocupacional y Huerto Comunitario",
    description: "Estructuración de fines de semana protegidos, resignificación del tiempo libre, cultivo agroecológico y red comunitaria.",
    pdfTitle: "Planificador de Fin de Semana Seguro (PDF)",
    pdfType: "weekend",
    audioScript: "Bienvenido a la audio-guía del Taller de Tiempo Libre, Ocio y Huerto, facilitado por Fernando Carrasco. Los fines de semana concentran momentos de riesgo cuando no están planificados. Te invitamos a estructurar tus tardes de viernes y sábados con actividades gratificantes, contactar a tu red de apoyo y participar en nuestro huerto agroecológico los viernes de 10 a 16 horas. Descarga tu planificador de fin de semana en PDF."
  }
];

export const medicationCenters: MedicationCenter[] = [
  {
    id: "med-allende",
    name: "CESFAM Salvador Allende",
    sector: "Población La Bandera, San Ramón",
    address: "Pedro Aguirre Cerda 0190, San Ramón",
    type: "general",
    badge: "CESFAM Base",
    schedule: "Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00",
    phone: "225769800",
    phoneFormatted: "2 2576 9800",
    wazeUrl: "https://waze.com/ul?q=Cesfam+Salvador+Allende+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Cesfam+Salvador+Allende+Pedro+Aguirre+Cerda+0190+San+Ramon"
  },
  {
    id: "med-modelo",
    name: "CECOSF Modelo",
    sector: "Sector Modelo, San Ramón",
    address: "Modelo 1210 (esq. Almirante Latorre), San Ramón",
    type: "general",
    badge: "CECOSF",
    schedule: "Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00",
    phone: "225769850",
    phoneFormatted: "2 2576 9850",
    wazeUrl: "https://waze.com/ul?q=CECOSF+Modelo+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=CECOSF+Modelo+1210+San+Ramon"
  },
  {
    id: "med-bandera",
    name: "CESFAM La Bandera",
    sector: "San Ramón (Retiro Exclusivo de Benzodiacepinas)",
    address: "La Bandera 8900 (esq. Venancia Leiva), San Ramón",
    type: "benzos",
    badge: "Benzodiacepinas",
    schedule: "Lun a Vie 08:30 - 16:30 (Receta retenida)",
    phone: "225769820",
    phoneFormatted: "2 2576 9820",
    wazeUrl: "https://waze.com/ul?q=Cesfam+La+Bandera+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Cesfam+La+Bandera+8900+San+Ramon"
  },
  {
    id: "med-mistral",
    name: "CESFAM Gabriela Mistral",
    sector: "Sector Gabriela Mistral, San Ramón",
    address: "San Francisco 8540, San Ramón",
    type: "general",
    badge: "CESFAM Base",
    schedule: "Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00",
    phone: "225769860",
    phoneFormatted: "2 2576 9860",
    wazeUrl: "https://waze.com/ul?q=Cesfam+Gabriela+Mistral+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Cesfam+Gabriela+Mistral+San+Francisco+8540+San+Ramon"
  },
  {
    id: "med-farmacia-popular",
    name: "Farmacia Popular San Ramón",
    sector: "Edificio Consistorial Municipal",
    address: "Av. Santa Rosa 7941, San Ramón",
    type: "general",
    badge: "Farmacia Municipal",
    schedule: "Lun a Jue 08:30 - 17:00 • Vie 08:30 - 16:00",
    phone: "225101500",
    phoneFormatted: "2 2510 1500",
    wazeUrl: "https://waze.com/ul?q=Municipalidad+de+San+Ramon+Santa+Rosa+7941",
    mapsUrl: "https://maps.google.com/?q=Municipalidad+de+San+Ramon+Santa+Rosa+7941"
  }
];

export const labExamsData: LabExamInfo[] = [
  {
    id: "exam-profile",
    title: "Perfil Bioquímico",
    category: "sangre",
    fastingHours: 8,
    preparationBadge: "Requiere ayuno 8 hrs",
    instructions: "Ayuno de 8 a 12 horas (solo agua permitida). Presentar orden médica en SOME de tu CESFAM base.",
    coordinationPlace: "SOME Central CESFAM base",
    estimatedDays: "3 a 5 días hábiles"
  },
  {
    id: "exam-tox",
    title: "Orina / Toxicológico",
    category: "orina",
    fastingHours: 0,
    preparationBadge: "Sin ayuno",
    instructions: "No requiere ayuno de alimentos. Frasco estéril para muestra en tu CESFAM base.",
    coordinationPlace: "Unidad Toma de Muestras CESFAM",
    estimatedDays: "24 a 48 horas"
  },
  {
    id: "exam-ecg",
    title: "Electrocardiograma (ECG)",
    category: "cardiaco",
    fastingHours: 0,
    preparationBadge: "Ropa cómoda",
    instructions: "No requiere ayuno. Acudir con ropa cómoda de dos piezas a tu CESFAM.",
    coordinationPlace: "Toma de ECG CESFAM base",
    estimatedDays: "Entrega inmediata"
  },
  {
    id: "exam-liver",
    title: "Pruebas Hepáticas",
    category: "sangre",
    fastingHours: 8,
    preparationBadge: "Requiere ayuno 8 hrs",
    instructions: "Ayuno estricto de 8 horas. No ingerir alcohol 48 horas antes.",
    coordinationPlace: "SOME Central CESFAM base",
    estimatedDays: "3 a 5 días hábiles"
  },
  {
    id: "exam-renal",
    title: "Función Renal (Creatinina / ELP)",
    category: "sangre",
    fastingHours: 8,
    preparationBadge: "Requiere ayuno 8 hrs",
    instructions: "Ayuno de 8 horas. Hidratación normal con agua pura.",
    coordinationPlace: "SOME Central CESFAM base",
    estimatedDays: "3 a 5 días hábiles"
  }
];

export const patientRights = [
  "Recibir un trato digno y respetuoso en todo momento.",
  "Privacidad y estricta confidencialidad de tu diagnóstico.",
  "Recibir información clara sobre tu tratamiento."
];

export const patientDuties = [
  "Tratar con respeto a todo el equipo de salud y usuarios.",
  "Asistir puntualmente a tus citas (llegar 10 min antes).",
  "Avisar con 24h de anticipación si no puedes asistir.",
  "3 inasistencias sin justificar son causal de alta administrativa."
];

export const urgencyHospitals: UrgencyHospital[] = [
  {
    id: "hosp-padre-hurtado",
    name: "Hospital Padre Hurtado",
    type: "Hospital Base de Urgencias (Alta Complejidad)",
    badge: "Urgencia 24 Horas",
    address: "Esperanza 2150 (Metro Santa Rosa Línea 4A), San Ramón",
    phone: "225760000",
    phoneFormatted: "2 2576 0000",
    schedule: "Atención Continua 24/7 • Urgencia Adulto, Infantil y Maternidad",
    wazeUrl: "https://waze.com/ul?q=Hospital+Padre+Hurtado+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Hospital+Padre+Hurtado+Esperanza+2150+San+Ramon",
    isHospital: true
  },
  {
    id: "sapu-salvador-allende",
    name: "SAPU Salvador Allende",
    type: "Servicio de Atención Primaria de Urgencia",
    badge: "SAPU Nocturno y Festivos",
    address: "Pedro Aguirre Cerda 0190 (Sector La Bandera), San Ramón",
    phone: "225769805",
    phoneFormatted: "2 2576 9805",
    schedule: "Lun a Vie: 17:00 a 08:00 hrs • Sáb, Dom y Festivos: 24 horas continuas",
    wazeUrl: "https://waze.com/ul?q=Cesfam+Salvador+Allende+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=SAPU+Salvador+Allende+Pedro+Aguirre+Cerda+0190+San+Ramon",
    isHospital: false
  },
  {
    id: "sapu-gabriela-mistral",
    name: "SAPU Gabriela Mistral",
    type: "Servicio de Atención Primaria de Urgencia",
    badge: "SAPU Vespertino",
    address: "San Francisco 8540, San Ramón",
    phone: "225769865",
    phoneFormatted: "2 2576 9865",
    schedule: "Lun a Vie: 17:00 a 00:00 hrs • Sáb, Dom y Festivos: 08:00 a 00:00 hrs",
    wazeUrl: "https://waze.com/ul?q=Cesfam+Gabriela+Mistral+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Cesfam+Gabriela+Mistral+San+Francisco+8540+San+Ramon",
    isHospital: false
  }
];

export const urgencyPhones: UrgencyContact[] = [
  {
    label: "Fono Prevención Suicidio (*4141)",
    number: "*4141",
    telUri: "tel:*4141",
    description: "Línea gratuita de ayuda psicológica inmediata 24/7 (Minsal)",
    isPrimary: true
  },
  {
    label: "Fono Drogas y Alcohol SENDA (1412)",
    number: "1412",
    telUri: "tel:1412",
    description: "Orientación confidencial y gratuita en adicciones y crisis 24 horas",
    isPrimary: true
  },
  {
    label: "SAMU Ambulancias (131)",
    number: "131",
    telUri: "tel:131",
    description: "Rescate médico y emergencias vitales de salud 24 horas",
    isPrimary: false
  },
  {
    label: "Salud Responde Minsal",
    number: "600 360 7777",
    telUri: "tel:6003607777",
    description: "Orientación médica y apoyo psicológico ministerial continuo 24 horas",
    isPrimary: false
  },
  {
    label: "Fono Familia Carabineros (149)",
    number: "149",
    telUri: "tel:149",
    description: "Contención, orientación y ayuda ante violencia intrafamiliar 24/7",
    isPrimary: false
  },
  {
    label: "31ª Comisaría San Ramón",
    number: "229224420",
    telUri: "tel:229224420",
    description: "Av. Santa Rosa 8091 • Seguridad y cuadrantes comunales",
    isPrimary: false
  }
];

export const primaryCareCenters: HealthCenterInfo[] = [
  {
    id: "cesfam-allende",
    name: "CESFAM Salvador Allende",
    role: "Centro de Salud Familiar y Toma de Muestras",
    badge: "CESFAM Base",
    address: "Pedro Aguirre Cerda 0190 (Sector La Bandera), San Ramón",
    phone: "225769800",
    phoneFormatted: "2 2576 9800",
    labHours: "Toma de Muestras: Lun a Vie 08:00 - 10:30 hrs",
    someHours: "Atención SOME: Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00",
    wazeUrl: "https://waze.com/ul?q=Cesfam+Salvador+Allende+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Cesfam+Salvador+Allende+Pedro+Aguirre+Cerda+0190+San+Ramon"
  },
  {
    id: "cesfam-mistral",
    name: "CESFAM Gabriela Mistral",
    role: "Centro de Salud Familiar y Toma de Muestras",
    badge: "CESFAM Base",
    address: "San Francisco 8540, San Ramón",
    phone: "225769860",
    phoneFormatted: "2 2576 9860",
    labHours: "Toma de Muestras: Lun a Vie 08:00 - 10:30 hrs",
    someHours: "Atención SOME: Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00",
    wazeUrl: "https://waze.com/ul?q=Cesfam+Gabriela+Mistral+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=Cesfam+Gabriela+Mistral+San+Francisco+8540+San+Ramon"
  },
  {
    id: "cecosf-modelo",
    name: "CECOSF Modelo",
    role: "Centro Comunitario de Salud Familiar",
    badge: "CECOSF",
    address: "Modelo 1210 (esq. Almirante Latorre), San Ramón",
    phone: "225769850",
    phoneFormatted: "2 2576 9850",
    labHours: "Coordinación de tomas según agenda territorial",
    someHours: "Atención SOME: Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00",
    wazeUrl: "https://waze.com/ul?q=CECOSF+Modelo+San+Ramon",
    mapsUrl: "https://maps.google.com/?q=CECOSF+Modelo+1210+San+Ramon"
  }
];

export const MAIN_MENU_OPTIONS = [
  "Horarios",
  "Citas / Inasistencias",
  "Solicitud de Recetas",
  "Retiro de Medicamentos",
  "Exámenes de Laboratorio",
  "Talleres",
  "Certificados e Informes",
  "Urgencias"
];

export function getLocalResponse(text: string, hasImage: boolean, language: Language = 'es'): string | null {
  if (hasImage) {
    if (language === 'ht') {
      return "Mwen resevwa dokiman w lan. Pou pwoteje konfidansyalite klinik ou, ou dwe prezante kanè oswa resèt sa a an pèsòn nan biwo SOME nan COSAM.";
    }
    if (language === 'en') {
      return "I have received your document. To protect your clinical privacy, please present this ID card or prescription in person at the COSAM SOME desk.";
    }
    return "He recibido tu documento. Para proteger tu privacidad clínica, debes presentar este carnet o receta presencialmente en la ventanilla del SOME del COSAM.";
  }

  const cleanText = text.toLowerCase().trim();

  // Return to menu
  if (
    cleanText === "menú principal" || 
    cleanText === "menu principal" || 
    cleanText === "main menu" || 
    cleanText === "meni prensipal" ||
    cleanText === "volver al menú principal" ||
    cleanText === "retounen nan meni prensipal" ||
    cleanText === "back to main menu"
  ) {
    return null;
  }

  // 1. Justificar Inasistencia / WhatsApp SOME / Citas
  if (/(inasistencia|justificar|whatsapp|some|falto|faltar|ausencia|reagendar|perdí mi hora|perder hora|cita|jistifye|absans|excuse|absence)/.test(cleanText)) {
    if (language === 'ht') {
      return "⚠️ <b>Avètisman pou Absans (WhatsApp SOME):</b><br><br>• Sonje ou dwe avèti absans ou omwen <b>24 èdtan davans</b> pou w pa entewonp tretman w epi evite risk pou yo ba w egzeyat administratif (3 absans san jistifikasyon).<br><br>📱 <b>Jistifye dirèkteman sou WhatsApp:</b><br><a href='https://wa.me/56955118624?text=Bonjou%20SOME%20COSAM%20Rinconada,%20mwen%20bezwen%20jistifye%20absans%20mwen%2024%20%C3%A8dtan%20davans.' target='_blank' rel='noopener noreferrer' class='inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs mt-1 shadow-xs'>💬 Louvri WhatsApp SOME (+569 5511 8624)</a><br><br>📞 Oswa rele nan liy SOME: <b>225769844</b>.";
    }
    if (language === 'en') {
      return "⚠️ <b>Absence Justification (SOME WhatsApp):</b><br><br>• Please remember to give at least <b>24 hours advance notice</b> if you cannot attend your appointment to avoid treatment interruption and administrative discharge (3 unjustified absences).<br><br>📱 <b>Direct WhatsApp Notification:</b><br><a href='https://wa.me/56955118624?text=Hello%20SOME%20COSAM%20Rinconada,%20I%20need%20to%20excuse%20my%20absence%20with%2024%20hours%20advance%20notice.' target='_blank' rel='noopener noreferrer' class='inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs mt-1 shadow-xs'>💬 Open SOME WhatsApp (+569 5511 8624)</a><br><br>📞 Or call the SOME helpline: <b>225769844</b>.";
    }
    return "⚠️ <b>Aviso de Inasistencia (WhatsApp SOME):</b><br><br>• Recuerda que debes avisar tu inasistencia con al menos <b>24 horas de anticipación</b> para no interrumpir tu tratamiento y evitar el riesgo de alta administrativa (3 inasistencias injustificadas son causal de alta).<br><br>📱 <b>Justificación Directa por WhatsApp:</b><br>Puedes escribir directamente a nuestro SOME haciendo clic en el enlace oficial:<br><br><a href='https://wa.me/56955118624?text=Hola%20SOME%20COSAM%20Rinconada,%20necesito%20justificar%20mi%20inasistencia%20con%2024%20horas%20de%20anticipaci%C3%B3n.' target='_blank' rel='noopener noreferrer' class='inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs mt-1 shadow-xs'>💬 Abrir WhatsApp SOME (+569 5511 8624)</a><br><br>📞 O llama directo al SOME Central: <b>225769844</b>.";
  }

  // 2. Retiro de Recetas y Farmacia
  if (/(receta|farmacia|retiro|medicamento|fármaco|farmaco|clonazepam|diazepam|benzodiacepina|resèt|famasi|prescription|pharmacy)/.test(cleanText)) {
    if (language === 'ht') {
      return "💊 <b>Kote pou pran Medikaman ak Resèt:</b><br><br>• <b>Medikaman Jeneral:</b> Yo pran yo nan <b>CESFAM Salvador Allende</b> oswa <b>CECOSF Modelo</b>.<br><br>⚠️ <b>Benzodyazepin (Diazepam, Clonazepam):</b> Yo pran yo <b>SÈLMAN nan CESFAM La Bandera</b>.<br><br>⏳ <b>Validite Resèt:</b> Resèt medikal yo valab pou yon maksimòm <b>30 jou</b>. Nou konseye w mande renouvèlman 7 a 10 jou anvan medikaman an fini.";
    }
    if (language === 'en') {
      return "💊 <b>Prescription Pick-up & Pharmacy:</b><br><br>• <b>General Medications:</b> Dispensed at <b>CESFAM Salvador Allende</b> or <b>CECOSF Modelo</b>.<br><br>⚠️ <b>Benzodiazepines (Diazepam, Clonazepam, etc.):</b> Dispensed <b>EXCLUSIVELY at CESFAM La Bandera</b>.<br><br>⏳ <b>Prescription Validity:</b> Medical prescriptions have a maximum validity of <b>30 days</b>. We recommend requesting renewals 7 to 10 days before your medication runs out.";
    }
    return "💊 <b>Retiro de Recetas y Farmacia:</b><br><br>• <b>Fármacos Generales:</b> Se retiran en <b>CESFAM Salvador Allende</b> o <b>CECOSF Modelo</b>.<br><br>⚠️ <b>Benzodiacepinas (Diazepam, Clonazepam, etc.):</b> Se retiran <b>ÚNICAMENTE en el CESFAM La Bandera</b>.<br><br>⏳ <b>Vigencia de Recetas:</b> Las recetas médicas tienen una vigencia máxima de <b>30 días</b>. Te recomendamos solicitar tu renovación en SOME con 7 a 10 días de anticipación antes de que se agote tu stock.";
  }

  // 3. Horarios y Talleres del Centro
  if (/(horario|taller|talleres|abren|cierra|hora atiende|atencion|orè|atelye|hours|workshops|facilitador|estrategias)/.test(cleanText)) {
    if (language === 'ht') {
      return "🕒 <b>Orè Sant COSAM Rinconada:</b><br>• <b>Lendi pou Jedi:</b> 08:00 pou 19:00 hrs.<br>• <b>Vandredi:</b> 08:00 pou 16:00 hrs.<br><i>(Toujou rive 10 minit anvan lè randevou w la).</i><br><br>👥 <b>Atelye an Gwoup (Espas Terapi):</b><br>• <b>Psiko-edikasyon:</b> Mèkredi 17:00 pou 19:00 hrs (Doktè Andrés Ruiz Miranda ak Katherine Astudillo).<br>• <b>Psikoterapi ak Règleman Emosyonèl:</b> Mèkredi 17:00 pou 19:00 hrs (Ps. Romina Lucero Donoso ak Benjamín Rebolledo).<br>• <b>Aktivite Fizik ak Sante:</b> Lendi ak Vandredi 10:00 pou 12:00 hrs (T.S. Pablo Díaz).<br>• <b>Manejo del Tiempo Libre:</b> Vandredi 10:00 pou 16:00 hrs (T.R. Fernando Carrasco).<br><br>💡 <i>Ou ka klike sou bouton 'Estrateji ou ka aplike' pou wè tout gid pratik yo ak telechaje orè a an PDF.</i>";
    }
    if (language === 'en') {
      return "🕒 <b>COSAM Rinconada Center Hours:</b><br>• <b>Monday to Thursday:</b> 08:00 to 19:00 hrs.<br>• <b>Friday:</b> 08:00 to 16:00 hrs.<br><i>(Please arrive 10 minutes prior to scheduled appointments).</i><br><br>👥 <b>Group Workshops (Therapeutic Spaces):</b><br>• <b>Psychoeducation:</b> Wednesdays 17:00 to 19:00 (Dr. Andrés Ruiz Miranda & Katherine Astudillo).<br>• <b>Psychotherapy & Emotional Regulation:</b> Wednesdays 17:00 to 19:00 (Ps. Romina Lucero Donoso & Benjamín Rebolledo).<br>• <b>Physical Activity & Health:</b> Mon & Fri 10:00 to 12:00 (Pablo Díaz, Social Worker).<br>• <b>Manejo del Tiempo Libre:</b> Fridays 10:00 to 16:00 (Fernando Carrasco, Occupational Therapist).<br><br>💡 <i>Click 'Strategies you can apply' in the portal to explore all practical self-care tools or download the printable schedule.</i>";
    }
    return "🕒 <b>Horarios de Atención COSAM Rinconada:</b><br>• <b>Lunes a Jueves:</b> 08:00 a 19:00 hrs.<br>• <b>Viernes:</b> 08:00 a 16:00 hrs.<br><i>(Llegar siempre 10 minutos antes a tus citas).</i><br><br>👥 <b>Talleres Grupales Terapéuticos:</b><br>• <b>Psicoeducación:</b> Miércoles 17:00 a 19:00 hrs (Dr. Andrés Ruiz Miranda y Katherine Astudillo).<br>• <b>Psicoterapia y Regulación Emocional:</b> Miércoles 17:00 a 19:00 hrs (Ps. Romina Lucero Donoso y Benjamín Rebolledo).<br>• <b>Actividad Física y Salud:</b> Lunes y Viernes 10:00 a 12:00 hrs (T.S. Pablo Díaz).<br>• <b>Manejo del Tiempo Libre:</b> Viernes 10:00 a 16:00 hrs (T.R. Fernando Carrasco).<br><br>💡 <i>Puedes pulsar el botón 'Estrategias que puedes aplicar' para revisar todas las herramientas prácticas y descargar el cronograma en PDF.</i>";
  }

  // 4. Emergencias de Salud Mental
  if (/(urgencia|emergencia|suicidio|crisis|matar|morir|descompensacion|ijans|emergency|mental health)/.test(cleanText)) {
    if (language === 'ht') {
      return "🚨 <b>Rezo Ijans Sante Mantal (24/7):</b><br><br>⚠️ <b>Atansyon:</b> COSAM pa yon sèvis ijans 24/7. Si w gen yon kriz grav oswa risk vital, ou ka rele liy èd gratis sa yo imedyatman:<br><br><div class='flex flex-col gap-1.5 my-2'><a href='tel:*4141' class='inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>📞 *4141 - Prevansyon Swisid (24/7 Gratis)</a><a href='tel:1412' class='inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>📞 1412 - Liy Èd Dwòg SENDA (24/7)</a><a href='tel:131' class='inline-flex items-center gap-1.5 bg-red-800 hover:bg-red-900 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>🚑 131 - SAMU Ijans Medikal</a></div><br>🏥 <b>Ospital ak SAPU:</b> Hospital Padre Hurtado, SAPU Salvador Allende, SAPU Gabriela Mistral.";
    }
    if (language === 'en') {
      return "🚨 <b>Mental Health Emergency Network (24/7):</b><br><br>⚠️ <b>Notice:</b> COSAM is an outpatient center and does not treat acute vital emergencies. In case of acute crisis or vital distress, free 24/7 help is available:<br><br><div class='flex flex-col gap-1.5 my-2'><a href='tel:*4141' class='inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>📞 *4141 - Suicide Prevention Helpline (24/7 Free)</a><a href='tel:1412' class='inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>📞 1412 - SENDA Drug & Alcohol Helpline</a><a href='tel:131' class='inline-flex items-center gap-1.5 bg-red-800 hover:bg-red-900 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>🚑 131 - SAMU Emergency Medical (131)</a></div><br>🏥 <b>Urgent Care Centers:</b> Hospital Padre Hurtado, SAPU Salvador Allende, SAPU Gabriela Mistral.";
    }
    return "🚨 <b>Emergencias de Salud Mental (24/7):</b><br><br>⚠️ <b>Importante:</b> El COSAM es un centro ambulatorio y no cuenta con servicio de urgencias 24 horas. Si estás en una crisis aguda o riesgo vital, dispones de atención gratuita e inmediata:<br><br><div class='flex flex-col gap-1.5 my-2'><a href='tel:*4141' class='inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>📞 *4141 - Prevención Suicidio (24/7 Gratis)</a><a href='tel:1412' class='inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>📞 1412 - Fono Drogas y Alcohol SENDA</a><a href='tel:131' class='inline-flex items-center gap-1.5 bg-red-800 hover:bg-red-900 text-white font-bold px-3 py-2 rounded-xl text-xs shadow-xs'>🚑 131 - SAMU Urgencias Médicas</a></div><br>🏥 <b>Urgencias Presenciales:</b> Hospital Padre Hurtado, SAPU Salvador Allende y SAPU Gabriela Mistral.";
  }

  // 5. Ubicación y Cómo Llegar (San Ramón)
  if (/(ubicacion|direccion|como llegar|llegar|metro|micro|transporte|donde queda|waze|maps|adrès|location|address|directions)/.test(cleanText)) {
    if (language === 'ht') {
      return "📍 <b>Kote COSAM Rinconada ye & Transpò (San Ramón):</b><br><br>• <b>Adrès:</b> Rinconada 8460, Komin San Ramón.<br>• <b>Metro ki pi pre:</b> Estasyon Santa Rosa oswa San Ramón (Liy 4A).<br>• <b>Otobis Red Movilidad:</b> 203, 206, 208, 209, 212, G01, G04, G11, G18, E02.<br>• <b>Repè:</b> Toupre CESFAM Salvador Allende (La Bandera) ak CECOSF Modelo.";
    }
    if (language === 'en') {
      return "📍 <b>COSAM Rinconada Location & Transit (San Ramón):</b><br><br>• <b>Address:</b> Rinconada 8460, San Ramón Commune.<br>• <b>Nearest Metro:</b> Santa Rosa or San Ramón Station (Line 4A).<br>• <b>Red Movilidad Buses:</b> 203, 206, 208, 209, 212, G01, G04, G11, G18, E02.<br>• <b>Landmarks:</b> Steps away from CESFAM Salvador Allende (La Bandera) & CECOSF Modelo.";
    }
    return "📍 <b>Ubicación y Conectividad COSAM Rinconada (San Ramón):</b><br><br>• <b>Dirección Oficial:</b> Rinconada 8460, Comuna de San Ramón.<br>• <b>Metro más cercano:</b> Estación Santa Rosa o San Ramón (Línea 4A) con conexión a micros.<br>• <b>Micros Red Movilidad:</b> Recorridos 203, 206, 208, 209, 212, G01, G04, G11, G18 y E02.<br>• <b>Puntos de Referencia:</b> A pasos de CESFAM Salvador Allende (La Bandera) y CECOSF Modelo.";
  }

  // 6. Exámenes de Laboratorio
  if (/(examen|laboratorio|sangre|ordenes|laboratwa|lab)/.test(cleanText)) {
    if (language === 'ht') {
      return "Pou kowòdone lòd pou egzamen laboratwa ou yo, ou dwe ale an pèsòn nan SOME Santral konsiltwa w la soti Lendi pou Jedi (jiska 17:00 hrs) oswa Vandredi (jiska 16:00 hrs).";
    }
    if (language === 'en') {
      return "To coordinate your lab test orders, please visit the Central SOME desk at your designated clinic Monday through Thursday (until 17:00 hrs) or Friday (until 16:00 hrs).";
    }
    return "Para coordinar tus órdenes de exámenes de laboratorio, debes acudir presencialmente al SOME Central de tu consultorio de Lunes a Jueves (hasta las 17:00 hrs) o los Viernes (hasta las 16:00 hrs).";
  }

  // 6. Certificados e Informes
  if (/(certificado|informe|constancia|documento|sètifika|certificate)/.test(cleanText)) {
    if (language === 'ht') {
      return "<b>Sètifika Asistans</b> yo mande yo nan SOME epi yo bay yo imedyatman. <b>Rapò Medikal</b> yo mande nan SOME oswa ak doktè w epi yo pran <b>7 jou ouvrab</b>.";
    }
    if (language === 'en') {
      return "<b>Attendance Certificates</b> are requested at SOME and provided immediately. <b>Medical Reports</b> are requested from SOME or your attending physician and take <b>7 business days</b> to issue.";
    }
    return "Los <b>Certificados de Asistencia</b> se solicitan en el SOME y se entregan de manera inmediata. Los <b>Informes Médicos</b> se solicitan al SOME o a tu profesional tratante y tienen un tiempo de entrega de <b>7 días hábiles</b>.";
  }

  // Default response
  if (language === 'ht') {
    return "Mwen konprann kesyon w lan. Pou ede w pi vit, chwazi youn nan bouton ki anba yo oswa rele SOME nan 225769844.";
  }
  if (language === 'en') {
    return "I understand your inquiry. For the fastest assistance, please choose one of the quick options below or contact SOME at 225769844.";
  }
  return "Comprendo tu consulta. Para orientarte con precisión, selecciona una de las 4 opciones de respuesta rápida del menú o comunícate con el SOME al 225769844.";
}
