import { Language } from '../types/clinical';

export interface TranslationsDict {
  header: {
    institutionName: string;
    programTitle: string;
    commune: string;
    publicBadge: string;
    accessibilityBtn: string;
    accessibilityTitle: string;
    fontSizeLabel: string;
    themeLabel: string;
    audioGuideLabel: string;
    audioGuideDesc: string;
    audioListenBtn: string;
    audioPauseBtn: string;
    audioResumeBtn: string;
    audioStopBtn: string;
    fontBtn: string;
    fontNormal: string;
    fontLarge: string;
    fontXLarge: string;
    qrBtn: string;
    themeDark: string;
    themeLight: string;
    languageLabel: string;
    simplifiedMode: string;
    simplifiedModeActive: string;
    simplifiedModeTooltip: string;
    simplifiedBannerText: string;
    exitSimplifiedMode: string;
    voiceReadingTitle: string;
    voiceReadingDesc: string;
    voiceReadingToggle: string;
    voiceReadingActive: string;
    voiceReadingInactive: string;
    voiceQuickRights: string;
    voiceQuickDuties: string;
    voiceQuickUrgency: string;
    voiceQuickPortal: string;
  };
  welcome: {
    badge: string;
    title: string;
    text: string;
    trustPill1: string;
    trustPill2: string;
    trustPill3: string;
    statusOpen: string;
    statusClosed: string;
    callSome: string;
    whatsapp: string;
    address: string;
    openMaps: string;
    openWaze: string;
    hoursWeekdays: string;
    hoursFriday: string;
    hoursNote: string;
  };
  location: {
    title: string;
    subtitle: string;
    badge: string;
    addressLabel: string;
    communeLabel: string;
    healthNetworkLabel: string;
    healthNetworkValue: string;
    openMapsBtn: string;
    openWazeBtn: string;
    publicTransportTitle: string;
    metroTitle: string;
    metroDesc: string;
    busTitle: string;
    busDesc: string;
    landmarksTitle: string;
    landmark1: string;
    landmark2: string;
    landmark3: string;
    tipsTitle: string;
    tipsDesc: string;
  };
  team: {
    title: string;
    subtitle: string;
    directionTitle: string;
    directionRole: string;
    directionDesc: string;
    coordinationTitle: string;
    coordinationRole: string;
    coordinationDesc: string;
    medicalTitle: string;
    medicalRole: string;
    medicalDesc: string;
    psychologyTitle: string;
    psychologyRole: string;
    psychologyDesc: string;
    rehabTitle: string;
    rehabRole: string;
    rehabDesc: string;
  };
  workshops: {
    title: string;
    subtitle: string;
    badge: string;
    downloadScheduleBtn: string;
    strategiesBtn: string;
    downloadGuideBtn: string;
    byLeader: string;
    ws1Title: string;
    ws1Time: string;
    ws1Leader: string;
    ws1Cat: string;
    ws1Desc: string;
    ws1Pdf: string;
    ws2Title: string;
    ws2Time: string;
    ws2Leader: string;
    ws2Cat: string;
    ws2Desc: string;
    ws2Pdf: string;
    ws3Title: string;
    ws3Time: string;
    ws3Leader: string;
    ws3Cat: string;
    ws3Desc: string;
    ws3Pdf: string;
    ws4Title: string;
    ws4Time: string;
    ws4Leader: string;
    ws4Cat: string;
    ws4Desc: string;
    ws4Pdf: string;
  };
  medication: {
    title: string;
    subtitle: string;
    generalTitle: string;
    generalCenter1: string;
    generalCenter1Sec: string;
    generalCenter2: string;
    generalCenter2Sec: string;
    benzoTitle: string;
    benzoDesc: string;
    benzoCenter: string;
    benzoCenterSec: string;
    wazeBtn: string;
    mapsBtn: string;
    callBtn: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    listenStepsBtn: string;
    stopListeningBtn: string;
    downloadGuideBtn: string;
    pointsTitle: string;
    pointsSubtitle: string;
    pickupNotice: string;
    generalBadge: string;
    benzoBadge: string;
    addressLabel: string;
    phoneLabel: string;
  };
  labExams: {
    title: string;
    subtitle: string;
    badge: string;
    intro: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    listenStepsBtn: string;
    stopListeningBtn: string;
    catalogTitle: string;
    catalogDesc: string;
    fastingTag: string;
    noFastingTag: string;
    clothesTag: string;
    resultsNotice: string;
    downloadGuideBtn: string;
    centersDirectoryTitle: string;
    centersDirectorySubtitle: string;
  };
  mobileNav: {
    tabHome: string;
    tabHomeShort: string;
    tabTeam: string;
    tabTeamShort: string;
    tabWorkshopsOnly: string;
    tabWorkshopsShort: string;
    tabExamsOnly: string;
    tabExamsShort: string;
    tabMedsOnly: string;
    tabMedsShort: string;
    tabServices: string;
    tabRights: string;
    tabUrgency: string;
    viewAllMode: string;
    tabbedMode: string;
    switchViewModeTooltip: string;
    quickAccessTitle: string;
    menuBtn: string;
    menuTitle: string;
    menuSubtitle: string;
    closeMenu: string;
    groupClinical: string;
    groupHealth: string;
    groupInfo: string;
    teamDesc: string;
    workshopsDesc: string;
    examsDesc: string;
    medsDesc: string;
    homeDesc: string;
    rightsDesc: string;
    urgencyDesc: string;
    teamTag: string;
    workshopsTag: string;
    examsTag: string;
    medsTag: string;
    rightsTag: string;
    urgencyTag: string;
    compactGridTitle: string;
    compactGridSubtitle: string;
  };
  rights: {
    title: string;
    subtitle: string;
    rightsTitle: string;
    rightsList: string[];
    dutiesTitle: string;
    dutiesList: string[];
    dutiesAlertItem: string;
    viewFullLawsBtn: string;
    downloadPdfBtn: string;
    confirmReceptionBtn: string;
    confirmedBadge: string;
    listenRightsBtn: string;
    listenDutiesBtn: string;
    listenAllBtn: string;
    voiceActiveReading: string;
    voiceBadge: string;
    pauseVoiceBtn: string;
    resumeVoiceBtn: string;
    stopVoiceBtn: string;
  };
  legalModal: {
    title: string;
    subtitle: string;
    law20584Tab: string;
    law21331Tab: string;
    promulgated: string;
    keyPointsTitle: string;
    articlesTitle: string;
    closeBtn: string;
    downloadPdf: string;
  };
  acknowledgmentModal: {
    title: string;
    subtitle: string;
    formIntro: string;
    rutLabel: string;
    rutPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    checkboxLabel: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    folioLabel: string;
    dateLabel: string;
    closeBtn: string;
    errorRequired: string;
    errorRut: string;
    errorCheckbox: string;
  };
  urgency: {
    title: string;
    badge: string;
    warningTitle: string;
    warningDesc: string;
    hosp1: string;
    hosp1Type: string;
    hosp2: string;
    hosp2Type: string;
    hosp3: string;
    hosp3Type: string;
    phonesTitle: string;
    phonesFree: string;
    suicidePrevLabel: string;
    sendaLabel: string;
    samuLabel: string;
    saludRespondeLabel: string;
    hospDirectoryTitle: string;
    hospDirectorySubtitle: string;
    wazeBtn: string;
    mapsBtn: string;
    callBtn: string;
    addressLabel: string;
    phoneLabel: string;
    scheduleLabel: string;
    crisisLinesTitle: string;
    crisisLinesSubtitle: string;
    listenUrgencyBtn: string;
    voiceActiveReading: string;
    voiceBadge: string;
    pauseVoiceBtn: string;
    resumeVoiceBtn: string;
    stopVoiceBtn: string;
  };
  chat: {
    title: string;
    subtitle: string;
    welcomeMsg: string;
    inputPlaceholder: string;
    listenAudio: string;
    stopAudio: string;
    mainMenuBtn: string;
    returnToMenu: string;
    attachTooltip: string;
    quickOpt1: string;
    quickOpt2: string;
    quickOpt3: string;
    quickOpt4: string;
  };
  footer: {
    rightsReserved: string;
    confidentialNotice: string;
  };
  offline: {
    offlineTitle: string;
    offlineDesc: string;
    offlineBadge: string;
    cachedReady: string;
    syncBtn: string;
    syncedToast: string;
  };
  progressBar: {
    progressLabel: string;
    readingPosition: string;
    backToTop: string;
    completed: string;
    sectionWelcome: string;
    sectionTeam: string;
    sectionWorkshops: string;
    sectionExams: string;
    sectionMeds: string;
    sectionRights: string;
    sectionDuties: string;
    sectionUrgency: string;
    legalReaderProgress: string;
    article: string;
  };
  reminders: {
    modalTitle: string;
    modalSubtitle: string;
    notificationPermissionTitle: string;
    permissionGranted: string;
    permissionDefault: string;
    permissionDenied: string;
    permissionUnsupported: string;
    permissionHelpDenied: string;
    enableBtn: string;
    testBtn: string;
    testSuccessToast: string;
    activeRemindersTab: string;
    newReminderTab: string;
    noReminders: string;
    noRemindersDesc: string;
    typeLabel: string;
    titleLabel: string;
    centerLabel: string;
    dateTimeLabel: string;
    anticipationLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    saveBtn: string;
    cancelBtn: string;
    deleteBtn: string;
    typeMedication: string;
    typeMedicalAppt: string;
    typeTherapyAppt: string;
    typeWorkshop: string;
    typeLabExam: string;
    anticipationAtTime: string;
    anticipation15Min: string;
    anticipation1Hour: string;
    anticipation2Hours: string;
    anticipation24Hours: string;
    quickPresetsTitle: string;
    medicationPickupPreset: string;
    medicalApptPreset: string;
    workshopPreset: string;
    labExamPreset: string;
    headerBtnTooltip: string;
    medicationPickupBannerTitle: string;
    medicationPickupBannerDesc: string;
    schedulePickupBtn: string;
    dueAlertTitle: string;
    dueAlertDismiss: string;
    dueAlertSnooze: string;
    privacyNote: string;
    statusActive: string;
    statusDone: string;
  };
}

export const translations: Record<Language, TranslationsDict> = {
  es: {
    header: {
      institutionName: "COSAM RINCONADA",
      programTitle: "Programa de Tratamiento en Adicciones",
      commune: "San Ramón",
      publicBadge: "Público",
      accessibilityBtn: "Accesibilidad",
      accessibilityTitle: "Opciones de Accesibilidad",
      fontSizeLabel: "Tamaño de texto",
      themeLabel: "Tema visual",
      audioGuideLabel: "Lector de voz institucional",
      audioGuideDesc: "Escuchar en voz alta el resumen del programa y bienvenida",
      audioListenBtn: "Escuchar portal",
      audioPauseBtn: "Pausar",
      audioResumeBtn: "Reanudar",
      audioStopBtn: "Detener",
      fontBtn: "Ajustar texto",
      fontNormal: "Texto normal",
      fontLarge: "Texto grande",
      fontXLarge: "Texto extra",
      qrBtn: "Código QR",
      themeDark: "Modo noche",
      themeLight: "Modo día",
      languageLabel: "Idioma",
      simplifiedMode: "Modo Lectura",
      simplifiedModeActive: "Lectura Fácil",
      simplifiedModeTooltip: "Activar Modo Lectura Simplificado (alto contraste y sin distractores)",
      simplifiedBannerText: "Modo de Lectura Simplificado activo: máximo contraste, sin animaciones ni fondos complejos para facilitar la lectura.",
      exitSimplifiedMode: "Volver a vista estándar",
      voiceReadingTitle: "Lectura por Voz Institucional",
      voiceReadingDesc: "Permite escuchar en voz alta los textos institucionales, derechos, deberes y la red de urgencias.",
      voiceReadingToggle: "Habilitar lectura por voz",
      voiceReadingActive: "Voz activa",
      voiceReadingInactive: "Voz pausada",
      voiceQuickRights: "Escuchar Derechos del Paciente",
      voiceQuickDuties: "Escuchar Deberes del Paciente",
      voiceQuickUrgency: "Escuchar Red de Urgencias",
      voiceQuickPortal: "Escuchar Bienvenida COSAM"
    },
    welcome: {
      badge: "Atención Confidencial & Gratuita",
      title: "Bienvenido a tu espacio seguro",
      text: "En COSAM Rinconada (San Ramón) estamos aquí para acompañarte. Este es un espacio de cuidado y respeto, diseñado para orientarte y apoyarte en tu proceso.",
      trustPill1: "Atención Gratuita & Confidencial",
      trustPill2: "Comuna de San Ramón",
      trustPill3: "Espacio Seguro & Respetuoso",
      statusOpen: "Abierto ahora (Atención presencial)",
      statusClosed: "Cerrado ahora • Red de Urgencias 24/7 disponible",
      callSome: "Llamar a SOME (225769844)",
      whatsapp: "WhatsApp Central (+569 5511 8624)",
      address: "Rinconada 8460, San Ramón",
      openMaps: "Google Maps",
      openWaze: "Waze",
      hoursWeekdays: "Lunes a Jueves: 08:00 a 19:00 hrs",
      hoursFriday: "Viernes: 08:00 a 16:00 hrs",
      hoursNote: "Por favor, recuerda llegar siempre 10 minutos antes a tus citas."
    },
    location: {
      title: "Ubicación y Conectividad",
      subtitle: "Cómo llegar a COSAM Rinconada en San Ramón",
      badge: "Red de Salud San Ramón",
      addressLabel: "Dirección Oficial:",
      communeLabel: "Comuna:",
      healthNetworkLabel: "Servicio de Salud:",
      healthNetworkValue: "Servicio de Salud Metropolitano Sur (SSMS)",
      openMapsBtn: "Abrir en Google Maps",
      openWazeBtn: "Abrir en Waze",
      publicTransportTitle: "Cómo llegar en Transporte Público",
      metroTitle: "Metro de Santiago",
      metroDesc: "Estación Santa Rosa o San Ramón (Línea 4A) • Combinación con buses hacia Rinconada / La Bandera (aprox. 8-10 min).",
      busTitle: "Micros Red Movilidad",
      busDesc: "Recorridos 203, 206, 208, 209, 212, G01, G04, G11, G18 y E02 con paradas en Eje Rinconada y Av. Santa Rosa.",
      landmarksTitle: "Puntos de Referencia Comunales",
      landmark1: "A pasos de CESFAM Salvador Allende (La Bandera)",
      landmark2: "Cercano a CECOSF Modelo y CESFAM La Bandera",
      landmark3: "Frente a eje cívico y locomoción vecinal de San Ramón",
      tipsTitle: "Recomendación para tu llegada:",
      tipsDesc: "Te sugerimos llegar 10 minutos antes de tu cita programada. Contamos con acceso universal para personas con movilidad reducida."
    },
    team: {
      title: "Conoce a tu Equipo",
      subtitle: "Equipo Interdisciplinario",
      directionTitle: "Dirección del Centro",
      directionRole: "Dirección",
      directionDesc: "Vela por que encuentres un espacio de acogida y trato humano durante todo tu proceso.",
      coordinationTitle: "Coordinación del Programa",
      coordinationRole: "Coordinación",
      coordinationDesc: "Gestiona tu plan de atención y facilita el acceso a todas nuestras prestaciones.",
      medicalTitle: "Área Médica",
      medicalRole: "Médicos Tratantes",
      medicalDesc: "Responsables de tu evaluación clínica y ajuste de tratamiento según tus avances.",
      psychologyTitle: "Área de Psicología",
      psychologyRole: "Psicólogos Clínicos",
      psychologyDesc: "Te ofrecen un entorno de escucha segura para fortalecer tus cambios personales.",
      rehabTitle: "Rehabilitación y Social",
      rehabRole: "Trabajo Social y Terapia",
      rehabDesc: "Trabajan para robustecer tus vínculos con la comunidad y red de apoyo familiar."
    },
    workshops: {
      title: "Talleres Grupales",
      subtitle: "Espacios que complementan tu proceso en COSAM",
      badge: "Inclusión SENDA & COSAM",
      downloadScheduleBtn: "Descargar Cronograma (PDF)",
      strategiesBtn: "Estrategias que puedes aplicar",
      downloadGuideBtn: "Descargar Guía (PDF)",
      byLeader: "Facilitadores",
      ws1Title: "Psicoeducación",
      ws1Time: "Miércoles: 17:00 a 19:00 hrs",
      ws1Leader: "Dr. Andrés Ruiz Miranda y Katherine Astudillo",
      ws1Cat: "Neurobiología & Craving",
      ws1Desc: "Aprendiendo el funcionamiento de tu cerebro y de tu sistema nervioso, y manejo del deseo compulsivo: técnicas de afrontamiento del craving.",
      ws1Pdf: "Guía de Manejo del Craving (PDF)",
      ws2Title: "Psicoterapia y Regulación Emocional",
      ws2Time: "Miércoles: 17:00 a 19:00 hrs",
      ws2Leader: "Ps. Romina Lucero Donoso y Benjamín Rebolledo",
      ws2Cat: "Regulación Emocional",
      ws2Desc: "Identificación de pensamientos automáticos, modulación afectiva, tolerancia al malestar y vínculos saludables.",
      ws2Pdf: "Ficha de Reestructuración de Pensamientos (PDF)",
      ws3Title: "Actividad Física y Salud",
      ws3Time: "Lun y Vie: 10:00 a 12:00 hrs",
      ws3Leader: "T.S. Pablo Díaz",
      ws3Cat: "Salud & Movimiento",
      ws3Desc: "Ejercicios suaves y movimiento corporal para liberar tensiones, reducir el estrés, mejorar el ánimo y fortalecer hábitos de bienestar físico.",
      ws3Pdf: "Pauta de Activación Motora y Salud (PDF)",
      ws4Title: "Manejo del Tiempo Libre",
      ws4Time: "Viernes: 10:00 a 16:00 hrs",
      ws4Leader: "T.R. Fernando Carrasco",
      ws4Cat: "Ocio & Huerto Terapéutico",
      ws4Desc: "Planificación de fines de semana protegidos, resignificación del ocio y redes de apoyo.",
      ws4Pdf: "Planificador de Fin de Semana Seguro (PDF)"
    },
    medication: {
      title: "Pasos para tus medicamentos",
      subtitle: "Puntos de entrega y requisitos en tu red de salud",
      generalTitle: "Entrega de Medicamentos",
      generalCenter1: "CESFAM Salvador Allende",
      generalCenter1Sec: "Población La Bandera, San Ramón",
      generalCenter2: "CECOSF Modelo",
      generalCenter2Sec: "Sector Modelo, San Ramón",
      benzoTitle: "Solo Benzodiacepinas",
      benzoDesc: "Fármacos como Diazepam o Clonazepam se retiran EXCLUSIVAMENTE en CESFAM La Bandera.",
      benzoCenter: "CESFAM La Bandera",
      benzoCenterSec: "San Ramón (Retiro Exclusivo de Benzodiacepinas)",
      wazeBtn: "Waze",
      mapsBtn: "Maps",
      callBtn: "Llamar",
      step1Title: "1. Receta Médica",
      step2Title: "2. Acude a Farmacia",
      step3Title: "3. Cédula Vigente",
      listenStepsBtn: "Escuchar pasos en voz alta",
      stopListeningBtn: "Detener audio",
      downloadGuideBtn: "Descargar guía en PDF",
      pointsTitle: "Puntos de Farmacia según Medicamento",
      pointsSubtitle: "Consulta dónde acudir según el tipo de prescripción",
      pickupNotice: "Para retirar, presenta Cédula de Identidad física y Receta Médica vigente. Si retira un familiar, debe portar cédula del titular.",
      generalBadge: "Fármacos Generales",
      benzoBadge: "Solo Benzodiacepinas",
      addressLabel: "Dirección:",
      phoneLabel: "Fono:"
    },
    labExams: {
      title: "Exámenes Médicos",
      subtitle: "Guía fácil de 3 pasos y preparación",
      badge: "Salud Pública",
      intro: "Sigue estos 3 pasos sencillos para realizar tus exámenes sin complicaciones:",
      step1Title: "Orden médica",
      step1Desc: "Emitida en box por tu médico tratante.",
      step2Title: "Coordina en tu CESFAM",
      step2Desc: "Acude a tu consultorio de base para agendar y tomar la muestra.",
      step3Title: "Resultados con código",
      step3Desc: "Guarda el comprobante/voucher con código que te entregan para ver tus resultados.",
      listenStepsBtn: "Escuchar pasos",
      stopListeningBtn: "Detener lectura",
      catalogTitle: "Catálogo de exámenes frecuentes",
      catalogDesc: "Preparación requerida para cada examen",
      fastingTag: "Requiere ayuno 8 hrs",
      noFastingTag: "Sin ayuno",
      clothesTag: "Ropa cómoda",
      resultsNotice: "Guarda tu comprobante; tu médico en COSAM también revisa el informe digital.",
      downloadGuideBtn: "Descargar Guía (PDF)",
      centersDirectoryTitle: "Directorio de Centros para Toma de Muestras",
      centersDirectorySubtitle: "Centros de Salud Familiar (CESFAM) de San Ramón donde coordinar y realizar tus exámenes"
    },
    mobileNav: {
      tabHome: "Inicio",
      tabHomeShort: "Inicio",
      tabTeam: "Equipo Profesional",
      tabTeamShort: "Equipo",
      tabWorkshopsOnly: "Talleres y Grupos",
      tabWorkshopsShort: "Talleres",
      tabExamsOnly: "Toma de Exámenes",
      tabExamsShort: "Exámenes",
      tabMedsOnly: "Farmacia y Recetas",
      tabMedsShort: "Farmacia",
      tabServices: "Exámenes y Farmacia",
      tabRights: "Tus Derechos",
      tabUrgency: "Red Urgencias",
      viewAllMode: "Vista Completa",
      tabbedMode: "Modo por Secciones",
      switchViewModeTooltip: "Cambiar entre vista segmentada y portal continuo",
      quickAccessTitle: "Accesos Rápidos Clínicos",
      menuBtn: "Menú",
      menuTitle: "Menú de Navegación",
      menuSubtitle: "Opciones clínicas y servicios COSAM",
      closeMenu: "Cerrar menú",
      groupClinical: "Área Clínica y Talleres",
      groupHealth: "Laboratorio y Farmacia",
      groupInfo: "Atención y Urgencias",
      teamDesc: "Médicos, psicólogos y terapeutas",
      workshopsDesc: "Espacios de apoyo y rehabilitación",
      examsDesc: "Órdenes médicas y preparación",
      medsDesc: "Puntos y horarios de retiro",
      homeDesc: "Bienvenida, SOME y acreditación",
      rightsDesc: "Leyes 20.584 y 21.331",
      urgencyDesc: "Contención telefónica 24/7 y red SAMU",
      teamTag: "4 Cuadrantes",
      workshopsTag: "Semanal",
      examsTag: "Paso a Paso",
      medsTag: "Cesfam / HBLT",
      rightsTag: "Resguardo",
      urgencyTag: "Línea 106",
      compactGridTitle: "Módulos de Atención Clínica",
      compactGridSubtitle: "Acceso directo a las áreas principales del tratamiento"
    },
    rights: {
      title: "Derechos y Deberes",
      subtitle: "Compromiso Mutuo y Marco Legal",
      rightsTitle: "Tus Derechos",
      rightsList: [
        "Recibir un trato digno y respetuoso en todo momento.",
        "Privacidad y estricta confidencialidad de tu diagnóstico.",
        "Recibir información clara y oportuna sobre tu tratamiento."
      ],
      dutiesTitle: "Tus Deberes",
      dutiesList: [
        "Tratar con respeto a todo el equipo de salud y usuarios.",
        "Asistir puntualmente a tus citas (llegar 10 min antes).",
        "Avisar con 24h de anticipación si no puedes asistir."
      ],
      dutiesAlertItem: "3 inasistencias sin justificar son causal de alta administrativa.",
      viewFullLawsBtn: "Ver Leyes Completas (20.584 y 21.331)",
      downloadPdfBtn: "Descargar Carta Oficial (PDF)",
      confirmReceptionBtn: "Confirmar Recepción y Lectura",
      confirmedBadge: "Recepción confirmada en auditoría",
      listenRightsBtn: "Escuchar Derechos",
      listenDutiesBtn: "Escuchar Deberes",
      listenAllBtn: "Escuchar Todo (Derechos y Deberes)",
      voiceActiveReading: "Leyendo en voz alta...",
      voiceBadge: "Lectura por Voz",
      pauseVoiceBtn: "Pausar",
      resumeVoiceBtn: "Reanudar",
      stopVoiceBtn: "Detener"
    },
    legalModal: {
      title: "Marco Legal Completo de Salud",
      subtitle: "Leyes de la República de Chile N° 20.584 y N° 21.331",
      law20584Tab: "Ley N° 20.584 (Derechos y Deberes en Salud)",
      law21331Tab: "Ley N° 21.331 (Salud Mental y Adicciones)",
      promulgated: "Promulgación oficial",
      keyPointsTitle: "Garantías y Principios Rectores",
      articlesTitle: "Articulado Oficial Completo",
      closeBtn: "Cerrar documento",
      downloadPdf: "Descargar copia en PDF"
    },
    acknowledgmentModal: {
      title: "Confirmación de Lectura y Acogida",
      subtitle: "Registro de Recepción de Derechos y Deberes del Paciente",
      formIntro: "Este registro acredita que has recibido información clara sobre tus derechos, deberes y normas de atención en el COSAM Rinconada.",
      rutLabel: "RUT o N° Ficha Clínica del Paciente",
      rutPlaceholder: "Ej: 12.345.678-9 o Ficha 4580",
      nameLabel: "Nombre Completo (Opcional)",
      namePlaceholder: "Nombre y Apellidos",
      checkboxLabel: "Declaro haber leído, comprendido y recibido formalmente la información sobre mis derechos, deberes y canales de atención.",
      submitBtn: "Registrar Conformidad y Firmar Digitalmente",
      successTitle: "¡Registro de Acogida Guardado!",
      successDesc: "Tu confirmación ha quedado registrada correctamente con folio de auditoría.",
      folioLabel: "Folio de Auditoría Digital",
      dateLabel: "Fecha y Hora de Firma",
      closeBtn: "Aceptar y Cerrar",
      errorRequired: "Por favor completa el campo de RUT o Ficha.",
      errorRut: "Por favor ingresa un RUT o N° de Ficha válido.",
      errorCheckbox: "Debes marcar la casilla para confirmar la recepción."
    },
    urgency: {
      title: "Red de Urgencias",
      badge: "Atención 24/7",
      warningTitle: "⚠️ COSAM no atiende urgencias.",
      warningDesc: "En caso de descompensación o riesgo vital, dirígete de inmediato a:",
      hosp1: "Hospital Padre Hurtado",
      hosp1Type: "Hospital Base de Urgencias",
      hosp2: "SAPU Gabriela Mistral",
      hosp2Type: "Servicio de Urgencia Primaria",
      hosp3: "SAPU Salvador Allende",
      hosp3Type: "Servicio de Urgencia Primaria",
      phonesTitle: "Asistencia Telefónica (24/7):",
      phonesFree: "Llamadas 100% gratuitas",
      suicidePrevLabel: "Fono Prevención Suicidio (*4141)",
      sendaLabel: "Fono Drogas SENDA (1412)",
      samuLabel: "SAMU Urgencias (131)",
      saludRespondeLabel: "Salud Responde (600 360 7777)",
      hospDirectoryTitle: "Directorio de Hospitales y SAPU de Urgencia",
      hospDirectorySubtitle: "Centros asistenciales para atención médica y de urgencia en San Ramón",
      wazeBtn: "Waze",
      mapsBtn: "Maps",
      callBtn: "Llamar",
      addressLabel: "Dirección:",
      phoneLabel: "Fono:",
      scheduleLabel: "Horario:",
      crisisLinesTitle: "Líneas Telefónicas de Crisis y Emergencia (24/7)",
      crisisLinesSubtitle: "Orientación gratuita, confidencial e inmediata desde cualquier teléfono",
      listenUrgencyBtn: "Escuchar Red de Urgencias y Fonos 24/7",
      voiceActiveReading: "Leyendo red de urgencias...",
      voiceBadge: "Lectura por Voz",
      pauseVoiceBtn: "Pausar",
      resumeVoiceBtn: "Reanudar",
      stopVoiceBtn: "Detener"
    },
    chat: {
      title: "Orientador Virtual COSAM",
      subtitle: "Orientación administrativa y servicios",
      welcomeMsg: "Hola, soy el orientador virtual de COSAM Rinconada. No almaceno datos clínicos confidenciales. ¿En qué te puedo orientar hoy?",
      inputPlaceholder: "Escribe tu consulta...",
      listenAudio: "Escuchar en voz alta",
      stopAudio: "Detener voz",
      mainMenuBtn: "Menú Principal",
      returnToMenu: "Volver al Menú Principal",
      attachTooltip: "Adjuntar carnet o receta",
      quickOpt1: "Justificar Inasistencia (WhatsApp SOME)",
      quickOpt2: "Retiro de Recetas y Farmacia",
      quickOpt3: "Horarios y Talleres del Centro",
      quickOpt4: "Emergencias de Salud Mental"
    },
    footer: {
      rightsReserved: "Portal Oficial del Paciente • Red de Salud San Ramón",
      confidentialNotice: "Atención regida por las Leyes N° 20.584 y N° 21.331 de la República de Chile."
    },
    offline: {
      offlineTitle: "Modo Sin Conexión (Offline)",
      offlineDesc: "No tienes conexión a internet activa. Los documentos de Derechos y Deberes, Leyes 20.584/21.331 y Pautas de Talleres siguen 100% disponibles y listos para descargar en PDF.",
      offlineBadge: "Sin Conexión",
      cachedReady: "Documentos legales y educativos guardados en tu dispositivo",
      syncBtn: "Verificar descargas offline",
      syncedToast: "Documentos legales y educativos sincronizados correctamente en tu dispositivo."
    },
    progressBar: {
      progressLabel: "Progreso de lectura del contenido",
      readingPosition: "Leyendo",
      backToTop: "Volver arriba",
      completed: "Completado",
      sectionWelcome: "Bienvenida y Presentación",
      sectionTeam: "Equipo Interdisciplinario",
      sectionWorkshops: "Talleres Grupales",
      sectionExams: "Órdenes de Exámenes",
      sectionMeds: "Retiro de Medicamentos",
      sectionRights: "Derechos del Paciente (Leyes 20.584 / 21.331)",
      sectionDuties: "Deberes del Paciente",
      sectionUrgency: "Red de Urgencia y Crisis 24/7",
      legalReaderProgress: "Progreso de lectura de la ley",
      article: "Artículo"
    },
    reminders: {
      modalTitle: "Recordatorios y Notificaciones",
      modalSubtitle: "Configura alertas en tu navegador para no olvidar tus horas médicas ni retiro de fármacos",
      notificationPermissionTitle: "Notificaciones de Navegador (Web Push)",
      permissionGranted: "Notificaciones activadas en este dispositivo",
      permissionDefault: "Permiso pendiente para recibir alertas",
      permissionDenied: "Notificaciones bloqueadas en el navegador",
      permissionUnsupported: "Navegador sin soporte de notificaciones del sistema",
      permissionHelpDenied: "Para activarlas, haz clic en el candado o configuración del sitio en tu navegador y autoriza las Notificaciones.",
      enableBtn: "Activar Notificaciones",
      testBtn: "Probar Alerta",
      testSuccessToast: "¡Notificación de prueba enviada con éxito!",
      activeRemindersTab: "Mis Recordatorios",
      newReminderTab: "+ Programar Recordatorio",
      noReminders: "No tienes recordatorios activos",
      noRemindersDesc: "Puedes programar avisos para tus citas de salud mental, talleres de adicciones o el retiro mensual de recetas.",
      typeLabel: "Tipo de evento o cita",
      titleLabel: "Título o descripción",
      centerLabel: "Lugar / Centro de Salud",
      dateTimeLabel: "Fecha y hora del evento",
      anticipationLabel: "Avisarme con anticipación",
      notesLabel: "Notas o requisitos (opcional)",
      notesPlaceholder: "Ej: Llevar cédula de identidad física y receta médica vigente...",
      saveBtn: "Guardar Recordatorio",
      cancelBtn: "Cancelar",
      deleteBtn: "Eliminar",
      typeMedication: "Retiro de Medicamentos (Farmacia)",
      typeMedicalAppt: "Cita con Médico / Psiquiatra",
      typeTherapyAppt: "Consulta Psicológica / Social",
      typeWorkshop: "Taller Grupal Terapéutico",
      typeLabExam: "Toma de Exámenes de Laboratorio",
      anticipationAtTime: "A la hora exacta del evento",
      anticipation15Min: "15 minutos antes",
      anticipation1Hour: "1 hora antes",
      anticipation2Hours: "2 horas antes",
      anticipation24Hours: "1 día antes (24 horas)",
      quickPresetsTitle: "Accesos rápidos para programar en 1 clic:",
      medicationPickupPreset: "Retiro de Fármacos (Mañana 09:00)",
      medicalApptPreset: "Control Médico / Psiquiatría",
      workshopPreset: "Taller Grupal de Adicciones",
      labExamPreset: "Exámenes de Laboratorio (Ayuno)",
      headerBtnTooltip: "Recordatorios de Citas y Fármacos",
      medicationPickupBannerTitle: "¿Deseas que te recordemos tu retiro de fármacos?",
      medicationPickupBannerDesc: "Programa una notificación en tu navegador para acudir a la farmacia en los horarios oficiales sin filas innecesarias.",
      schedulePickupBtn: "Programar Recordatorio de Retiro",
      dueAlertTitle: "¡Recordatorio Clínico Pendiente!",
      dueAlertDismiss: "Entendido",
      dueAlertSnooze: "Recordarme en 15 min",
      privacyNote: "Tus recordatorios se procesan de forma privada y local en tu navegador.",
      statusActive: "Activo",
      statusDone: "Notificado"
    }
  },

  ht: {
    header: {
      institutionName: "COSAM RINCONADA",
      programTitle: "Pwogram Tretman pou Moun ki Gen Depandans",
      commune: "San Ramón",
      publicBadge: "Piblik",
      accessibilityBtn: "Aksè & Fasilite",
      accessibilityTitle: "Opsyon Aksesibilite",
      fontSizeLabel: "Gwosè lèt yo",
      themeLabel: "Mòd vizyèl",
      audioGuideLabel: "Lektè vwa enstitisyonèl",
      audioGuideDesc: "Koute rezime pwogram nan ak byenvini COSAM byen fò",
      audioListenBtn: "Koute pòtal la",
      audioPauseBtn: "Poz",
      audioResumeBtn: "Kontinye",
      audioStopBtn: "Sispann",
      fontBtn: "Ajiste tèks",
      fontNormal: "Tèks nòmal",
      fontLarge: "Gwo tèks",
      fontXLarge: "Tèks trè gwo",
      qrBtn: "Kòd QR",
      themeDark: "Mòd nwit",
      themeLight: "Mòd lajounen",
      languageLabel: "Lang",
      simplifiedMode: "Mòd Lekti",
      simplifiedModeActive: "Lekti Fasil",
      simplifiedModeTooltip: "Aktive Mòd Lekti Senplifye (gwo kontras san distraksyon)",
      simplifiedBannerText: "Mòd Lekti Senplifye aktive: tèks ak gwo kontras, san animasyon oswa fons konplèks pou lekti pi fasil.",
      exitSimplifiedMode: "Retounen nan vizyon nòmal",
      voiceReadingTitle: "Lekti pa Vwa Enstitisyonèl",
      voiceReadingDesc: "Pèmèt ou koute byen fò dwa, devwa ak tout enfòmasyon sou rezo ijans lan.",
      voiceReadingToggle: "Aktive lekti pa vwa",
      voiceReadingActive: "Vwa aktif",
      voiceReadingInactive: "Vwa an poz",
      voiceQuickRights: "Koute Dwa Pasyan yo",
      voiceQuickDuties: "Koute Devwa Pasyan yo",
      voiceQuickUrgency: "Koute Rezo Ijans lan",
      voiceQuickPortal: "Koute Byenvini COSAM"
    },
    welcome: {
      badge: "Sèvis Konfidansyèl & Gratis",
      title: "Byenvini nan espas sekirize ou",
      text: "Nan COSAM Rinconada (San Ramón) nou la pou nou akonpaye w. Sa a se yon espas swen ak respè, ki fèt pou gide w ak soutni w nan pwosesis gerizon w.",
      trustPill1: "Sèvis Gratis & Konfidansyèl",
      trustPill2: "Komin San Ramón",
      trustPill3: "Espas Sekirize & Respektè",
      statusOpen: "Louvri kounye a (Sèvis an pèsòn)",
      statusClosed: "Fèmen kounye a • Rezo Ijans 24/7 disponib",
      callSome: "Rele SOME (225769844)",
      whatsapp: "WhatsApp Santral (+569 5511 8624)",
      address: "Rinconada 8460, San Ramón",
      openMaps: "Google Maps",
      openWaze: "Waze",
      hoursWeekdays: "Lendi rive Jedi: 08:00 pou 19:00",
      hoursFriday: "Vandredi: 08:00 pou 16:00",
      hoursNote: "Tanpri, toujou sonje rive 10 minit anvan randevou w la."
    },
    location: {
      title: "Kote Sant lan Ye & Transpò",
      subtitle: "Kijan pou rive nan COSAM Rinconada nan San Ramón",
      badge: "Rezo Sante San Ramón",
      addressLabel: "Adrès Ofisyèl:",
      communeLabel: "Komin:",
      healthNetworkLabel: "Sèvis Sante:",
      healthNetworkValue: "Servicio de Salud Metropolitano Sur (SSMS)",
      openMapsBtn: "Ouvri nan Google Maps",
      openWazeBtn: "Ouvri nan Waze",
      publicTransportTitle: "Kijan pou vini nan Transpò Piblik",
      metroTitle: "Metro Santiago",
      metroDesc: "Estasyon Santa Rosa oswa San Ramón (Liy 4A) • Konbinezon ak otobis pou Rinconada / La Bandera (8-10 min).",
      busTitle: "Otobis Red Movilidad",
      busDesc: "Liy 203, 206, 208, 209, 212, G01, G04, G11, G18 ak E02 sou Eje Rinconada ak Av. Santa Rosa.",
      landmarksTitle: "Kote Repè nan San Ramón",
      landmark1: "Toupre CESFAM Salvador Allende (La Bandera)",
      landmark2: "Toupre CECOSF Modelo ak CESFAM La Bandera",
      landmark3: "Fas ak zòn kominal ak transpò San Ramón",
      tipsTitle: "Konsèy pou rive w:",
      tipsDesc: "Nou konseye w rive 10 minit anvan lè randevou w la. Nou gen aksè inivèsèl pou moun ki gen difikilte pou mache."
    },
    team: {
      title: "Rankontre Ekip Ou a",
      subtitle: "Ekip Pwofesyonèl Sante",
      directionTitle: "Direksyon Sant lan",
      directionRole: "Direksyon",
      directionDesc: "Asire w jwenn yon espas akeyan ak tretman imen pandan tout pwosesis ou a.",
      coordinationTitle: "Kowòdinasyon Pwogram nan",
      coordinationRole: "Kowòdinatè",
      coordinationDesc: "Jere plan swen ou epi fasilite aksè a tout sèvis nou yo.",
      medicalTitle: "Sektè Medikal",
      medicalRole: "Doktè k ap trete w",
      medicalDesc: "Responsab evalyasyon klinik ou ak ajisteman medikaman yo dapre pwogrè w.",
      psychologyTitle: "Sektè Sikoloji",
      psychologyRole: "Sikològ Klinik",
      psychologyDesc: "Ofri w yon espas koute an sekirite pou ranfòse chanjman pèsonèl ou yo.",
      rehabTitle: "Reyabilitasyon ak Sosyal",
      rehabRole: "Travay Sosyal ak Terapi",
      rehabDesc: "Travay pou ranfòse lyen w ak kominote a ak rezo sipò fanmi w.",
    },
    workshops: {
      title: "Atelye an Gwoup",
      subtitle: "Espas ki konplete pwosesis ou nan COSAM",
      badge: "Enklizyon SENDA & COSAM",
      downloadScheduleBtn: "Telechaje Orè Atelye yo (PDF)",
      strategiesBtn: "Estrateji ou ka aplike",
      downloadGuideBtn: "Telechaje Gid la (PDF)",
      byLeader: "Pwofesyonèl Responsab",
      ws1Title: "Psiko-edikasyon",
      ws1Time: "Mèkredi: 17:00 pou 19:00",
      ws1Leader: "Doktè Andrés Ruiz Miranda ak Katherine Astudillo",
      ws1Cat: "Newobiyoloji & Craving",
      ws1Desc: "Aprann konprann kijan sèvo w ak sistèm nève w fonksyone, epi jesyon gwo anvi a: teknik pou fè fas ak craving.",
      ws1Pdf: "Gid pou Jesyon Craving (PDF)",
      ws2Title: "Psikoterapi ak Règleman Emosyonèl",
      ws2Time: "Mèkredi: 17:00 pou 19:00",
      ws2Leader: "Ps. Romina Lucero Donoso ak Benjamín Rebolledo",
      ws2Cat: "Règleman Emosyonèl",
      ws2Desc: "Idantifye panse otomatik, jere santiman difisil, kontwole strès ak konstwi relasyon ki an sante.",
      ws2Pdf: "Fich pou Chanje Estrikti Panse yo (PDF)",
      ws3Title: "Aktivite Fizik ak Sante",
      ws3Time: "Lendi ak Vandredi: 10:00 pou 12:00",
      ws3Leader: "T.S. Pablo Díaz",
      ws3Cat: "Sante & Mouvman",
      ws3Desc: "Egzèsis senp ak mouvman kò pou retire tansyon, diminye strès, amelyore atitid epi bati bon abitid sante.",
      ws3Pdf: "Gid pou Egzèsis ak Sante Fizik (PDF)",
      ws4Title: "Manejo del Tiempo Libre",
      ws4Time: "Vandredi: 10:00 pou 16:00",
      ws4Leader: "T.R. Fernando Carrasco",
      ws4Cat: "Detant & Jaden Kominotè",
      ws4Desc: "Planifikasyon wikenn an sekirite, jwenn bon sans nan tan lib ak rezo sipò kominotè.",
      ws4Pdf: "Planifikatè Wikenn an Sekirite (PDF)"
    },
    medication: {
      title: "Etap pou medikaman ou yo",
      subtitle: "Pwen distribisyon ak kondisyon nan rezo sante w",
      generalTitle: "Distribisyon Medikaman",
      generalCenter1: "CESFAM Salvador Allende",
      generalCenter1Sec: "Población La Bandera, San Ramón",
      generalCenter2: "CECOSF Modelo",
      generalCenter2Sec: "Sektè Modelo, San Ramón",
      benzoTitle: "Medikaman Benzodyazepin Sèlman",
      benzoDesc: "Medikaman tankou Diazepam oswa Clonazepam pran SÈLMAN nan CESFAM La Bandera.",
      benzoCenter: "CESFAM La Bandera",
      benzoCenterSec: "San Ramón (Distribisyon Eksklizif Benzodyazepin)",
      wazeBtn: "Waze",
      mapsBtn: "Maps",
      callBtn: "Rele",
      step1Title: "1. Resèt Medikal",
      step2Title: "2. Ale nan Famasi",
      step3Title: "3. Kat Idantite (RUT)",
      listenStepsBtn: "Koute etap yo a vwa wo",
      stopListeningBtn: "Sispann koute",
      downloadGuideBtn: "Telechaje Gid la (PDF)",
      pointsTitle: "Pwen Famasi selon Medikaman",
      pointsSubtitle: "Gade ki kote pou w ale selon kalite medikaman an",
      pickupNotice: "Pou retire, toujou prezante Kat Idantite fizik ak Resèt Medikal valab. Si se yon lòt moun ki vin chèche l, li dwe pote kat idantite pasyan an.",
      generalBadge: "Medikaman Jeneral",
      benzoBadge: "Benzodyazepin Sèlman",
      addressLabel: "Adrès:",
      phoneLabel: "Telefòn:"
    },
    labExams: {
      title: "Egzamen Medikal",
      subtitle: "Gid fasil 3 etap ak preparasyon",
      badge: "Sante Piblik",
      intro: "Swiv 3 etap senp sa yo pou fè egzamen ou yo san difikilte:",
      step1Title: "Lòd medikal",
      step1Desc: "Doktè k ap trete w la ba w li dirèkteman nan bwat konsiltasyon an.",
      step2Title: "Kowòdone nan CESFAM ou",
      step2Desc: "Ale nan sant sante baz ou pou pran randevou ak bay echantiyon an.",
      step3Title: "Rezilta ak kòd",
      step3Desc: "Kenbe resi/bon ak kòd yo ba w la pou w wè rezilta w yo.",
      listenStepsBtn: "Koute etap yo",
      stopListeningBtn: "Sispann lekti",
      catalogTitle: "Katalòg egzamen abityèl yo",
      catalogDesc: "Preparasyon ki nesesè pou chak egzamen",
      fastingTag: "Mande jèn 8 èdtan",
      noFastingTag: "San jèn",
      clothesTag: "Mete rad konfòtab",
      resultsNotice: "Kenbe resi w la; doktè w nan COSAM ap resevwa rapò nimerik la tou.",
      downloadGuideBtn: "Telechaje Gid (PDF)",
      centersDirectoryTitle: "Repertwa Sant pou Fè Egzamen yo",
      centersDirectorySubtitle: "Sant Sante Fanmi (CESFAM) nan San Ramón pou kowòdone ak pran echantiyon yo"
    },
    mobileNav: {
      tabHome: "Akèy",
      tabHomeShort: "Akèy",
      tabTeam: "Ekip Pwofesyonèl",
      tabTeamShort: "Ekip",
      tabWorkshopsOnly: "Atelye ak Gwoup",
      tabWorkshopsShort: "Atelye",
      tabExamsOnly: "Prèv Egzamen",
      tabExamsShort: "Egzamen",
      tabMedsOnly: "Famasi ak Medikaman",
      tabMedsShort: "Famasi",
      tabServices: "Egzamen ak Famasi",
      tabRights: "Dwa Ou yo",
      tabUrgency: "Rezo Ijans",
      viewAllMode: "Gade Tout",
      tabbedMode: "Mòd pa Seksyon",
      switchViewModeTooltip: "Chanje ant vi divize ak paj kontinyèl",
      quickAccessTitle: "Aksè Rapid Klinik",
      menuBtn: "Meni",
      menuTitle: "Meni Navigasyon",
      menuSubtitle: "Opsyon klinik ak sèvis COSAM",
      closeMenu: "Fèmen meni",
      groupClinical: "Zòn Klinik ak Atelye",
      groupHealth: "Laboratwa ak Famasi",
      groupInfo: "Sèvis ak Ijans",
      teamDesc: "Doktè, sikològ ak terapis",
      workshopsDesc: "Espas sipò ak reyabilitasyon",
      examsDesc: "Lòd medikal ak preparasyon",
      medsDesc: "Kote ak orè pou retire remèd",
      homeDesc: "Byenvini, SOME ak orè sant lan",
      rightsDesc: "Lwa 20.584 ak 21.331",
      urgencyDesc: "Liy kriz 24/7 ak SAPU",
      teamTag: "4 Kadran",
      workshopsTag: "Chak Semèn",
      examsTag: "Etap pa Etap",
      medsTag: "Cesfam / HBLT",
      rightsTag: "Pwoteksyon",
      urgencyTag: "Liy 106",
      compactGridTitle: "Modil Swen Klinik",
      compactGridSubtitle: "Aksè dirèk nan pati prensipal tretman an"
    },
    rights: {
      title: "Dwa ak Devwa Ou yo",
      subtitle: "Angajman Mityèl ak Kad Legal",
      rightsTitle: "Dwa Ou yo",
      rightsList: [
        "Resevwa yon tretman ki diy e ki gen respè tout tan.",
        "Konfidansyalite ak vi prive total sou dyagnostik ou.",
        "Resevwa enfòmasyon klè ak rapid sou tretman w lan."
      ],
      dutiesTitle: "Devwa Ou yo",
      dutiesList: [
        "Trete tout ekip sante a ak lòt pasyan yo avèk respè.",
        "Rive alè nan randevou w yo (10 minit anvan).",
        "Bay avi 24 èdtan davans si w p ap ka vini."
      ],
      dutiesAlertItem: "3 absans san jistifikasyon ap lakòz yo retire w nan pwogram nan.",
      viewFullLawsBtn: "Gade Tèks Lalwa (20.584 ak 21.331)",
      downloadPdfBtn: "Telechaje Dokiman Dwa yo (PDF)",
      confirmReceptionBtn: "Konfime Lekti ak Resepsyon",
      confirmedBadge: "Konfimasyon anrejistre nan odit",
      listenRightsBtn: "Koute Dwa yo",
      listenDutiesBtn: "Koute Devwa yo",
      listenAllBtn: "Koute Tout (Dwa ak Devwa)",
      voiceActiveReading: "Ap li ak vwa...",
      voiceBadge: "Lekti pa Vwa",
      pauseVoiceBtn: "Poz",
      resumeVoiceBtn: "Kontinye",
      stopVoiceBtn: "Sispann"
    },
    legalModal: {
      title: "Kad Legal Konplè Sante nan Chili",
      subtitle: "Lwa Repiblik Chili N° 20.584 ak N° 21.331",
      law20584Tab: "Lwa N° 20.584 (Dwa ak Devwa nan Sante)",
      law21331Tab: "Lwa N° 21.331 (Sante Mantal ak Depandans)",
      promulgated: "Dat Ofisyèl",
      keyPointsTitle: "Garanti ak Prensip Prensipal",
      articlesTitle: "Atik Ofisyèl Lalwa yo",
      closeBtn: "Fèmen dokiman an",
      downloadPdf: "Telechaje kopi an PDF"
    },
    acknowledgmentModal: {
      title: "Konfimasyon Lekti ak Resepsyon",
      subtitle: "Enskripsyon Odit Dwa ak Devwa Pasyan an",
      formIntro: "Fòm sa a sètifye ke ou resevwa enfòmasyon klè sou dwa w, devwa w ak règ fonksyònman nan COSAM Rinconada.",
      rutLabel: "RUT oswa Nimewo Fich Klinik Pasyan an",
      rutPlaceholder: "Egzanp: 12.345.678-9 oswa Fich 4580",
      nameLabel: "Non ak Siyati (Opsyonèl)",
      namePlaceholder: "Non konplè w",
      checkboxLabel: "Mwen deklare mwen li, mwen konprann e mwen resevwa enfòmasyon sou dwa ak devwa mwen yo.",
      submitBtn: "Anrejistre epi Siyen Fòm nan",
      successTitle: "Enskripsyon Konfime!",
      successDesc: "Konfimasyon w lan anrejistre avèk siksè nan sistèm odit dijital la.",
      folioLabel: "Nimewo Folio Odit",
      dateLabel: "Dat ak Lè Siyati a",
      closeBtn: "Fèmen",
      errorRequired: "Tanpri mete RUT oswa Nimewo Fich ou.",
      errorRut: "Tanpri mete yon RUT oswa Nimewo Fich ki valid.",
      errorCheckbox: "Ou dwe koche bwat la pou w konfime resepsyon an."
    },
    urgency: {
      title: "Rezo Ijans",
      badge: "Sèvis 24/7",
      warningTitle: "⚠️ COSAM pa resevwa ijans.",
      warningDesc: "Si gen yon kriz grav oswa danje pou lavi, ale touswit nan:",
      hosp1: "Hospital Padre Hurtado",
      hosp1Type: "Lopital Prensipal pou Ijans",
      hosp2: "SAPU Gabriela Mistral",
      hosp2Type: "Sèvis Ijans Prensipal",
      hosp3: "SAPU Salvador Allende",
      hosp3Type: "Sèvis Ijans Prensipal",
      phonesTitle: "Asistans nan Telefòn (24/7):",
      phonesFree: "Apèl 100% gratis",
      suicidePrevLabel: "Liy Prevansyon Swisid (*4141)",
      sendaLabel: "Liy Èd Dwòg SENDA (1412)",
      samuLabel: "SAMU Ijans Medikal (131)",
      saludRespondeLabel: "Salud Responde (600 360 7777)",
      hospDirectoryTitle: "Repertwa Lopital ak SAPU pou Ijans",
      hospDirectorySubtitle: "Sant lasante pou swen medikal ak ijans nan San Ramón",
      wazeBtn: "Waze",
      mapsBtn: "Maps",
      callBtn: "Rele",
      addressLabel: "Adrès:",
      phoneLabel: "Telefòn:",
      scheduleLabel: "Orè:",
      crisisLinesTitle: "Liy Telefòn Ijans ak Kriz (24 Sou 24)",
      crisisLinesSubtitle: "Oryantasyon gratis, konfidansyèl e imedyat nan nenpòt telefòn",
      listenUrgencyBtn: "Koute Rezo Ijans ak Liy 24/7",
      voiceActiveReading: "Ap li rezo ijans lan...",
      voiceBadge: "Lekti pa Vwa",
      pauseVoiceBtn: "Poz",
      resumeVoiceBtn: "Kontinye",
      stopVoiceBtn: "Sispann"
    },
    chat: {
      title: "Konseye Virtwèl COSAM",
      subtitle: "Oryantasyon administratif ak sèvis",
      welcomeMsg: "Bonjou, mwen se konseye virtwèl COSAM Rinconada. Mwen pa stoke okenn done klinik konfidansyèl. Nan kisa m ka oryante w jodi a?",
      inputPlaceholder: "Ekri kesyon w lan la a...",
      listenAudio: "Koute avèk vwa",
      stopAudio: "Kanpe vwa a",
      mainMenuBtn: "Meni Prensipal",
      returnToMenu: "Retounen nan Meni Prensipal",
      attachTooltip: "Mete foto kanè oswa resèt",
      quickOpt1: "Jistifye Absans (WhatsApp SOME)",
      quickOpt2: "Pran Resèt ak Famasi",
      quickOpt3: "Orè ak Atelye Sant lan",
      quickOpt4: "Ijans Sante Mantal"
    },
    footer: {
      rightsReserved: "Pòtay Ofisyèl Pasyan an • Rezo Sante San Ramón",
      confidentialNotice: "Sèvis sa a respekte Lwa N° 20.584 ak N° 21.331 Repiblik Chili."
    },
    offline: {
      offlineTitle: "Mòd San Entènèt (Offline)",
      offlineDesc: "Ou pa gen koneksyon entènèt aktif kounye a. Dokiman Dwa ak Devwa, Lwa 20.584/21.331 ak Gid Atelye yo toujou 100% disponib epi pare pou telechaje an PDF.",
      offlineBadge: "San Entènèt",
      cachedReady: "Dokiman legal ak atelye yo anrejistre nan aparèy ou an",
      syncBtn: "Tcheke dokiman san entènèt",
      syncedToast: "Tout dokiman legal ak atelye yo anrejistre byen nan aparèy ou an."
    },
    progressBar: {
      progressLabel: "Pwogrè lekti kontni an",
      readingPosition: "W ap li",
      backToTop: "Retounen anwo",
      completed: "Fini nèt",
      sectionWelcome: "Byenvini ak Prezantasyon",
      sectionTeam: "Ekip Swen Medikal",
      sectionWorkshops: "Atelye Gwoup Terapetik",
      sectionExams: "Lòd pou Egzamen Medikal",
      sectionMeds: "Kote pou Pran Medikaman",
      sectionRights: "Dwa Pasyan an (Lwa 20.584 / 21.331)",
      sectionDuties: "Devwa Pasyan an",
      sectionUrgency: "Rezo Dijans ak Kriz 24/7",
      legalReaderProgress: "Pwogrè lekti lwa a",
      article: "Atik"
    },
    reminders: {
      modalTitle: "Rapèl ak Notifikasyon",
      modalSubtitle: "Mete alèt sou navigatè w la pou w pa bliye randevou medikal ou ni lè pou pran medikaman yo",
      notificationPermissionTitle: "Notifikasyon Navigatè (Web Push)",
      permissionGranted: "Notifikasyon aktive sou aparèy sa a",
      permissionDefault: "Otorizasyon ap tann pou resevwa alèt",
      permissionDenied: "Notifikasyon bloke nan navigatè w la",
      permissionUnsupported: "Navigatè w la pa sipòte notifikasyon sa yo",
      permissionHelpDenied: "Pou aktive yo, klike sou kadna oswa paramèt sit la nan navigatè a epi pèmèt Notifikasyon yo.",
      enableBtn: "Aktive Notifikasyon",
      testBtn: "Voye Notifikasyon Tès",
      testSuccessToast: "Notifikasyon tès la te voye avèk siksè!",
      activeRemindersTab: "Rapèl Mwen Yo",
      newReminderTab: "+ Pwograme yon Rapèl",
      noReminders: "Ou pa gen okenn rapèl aktif",
      noRemindersDesc: "Ou ka pwograme alèt pou randevou sante mantal, atelye adiksyon oswa pou w ale chèche medikaman.",
      typeLabel: "Kalite randevou oswa evènman",
      titleLabel: "Tit oswa deskripsyon",
      centerLabel: "Sant Sante a",
      dateTimeLabel: "Dat ak lè evènman an",
      anticipationLabel: "Avèti m anvan lè a rive",
      notesLabel: "Nòt oswa sa pou w pote (opsyonèl)",
      notesPlaceholder: "Egzanp: Pote kat idantite fizik ak resèt medikal valab...",
      saveBtn: "Anrejistre Rapèl la",
      cancelBtn: "Anile",
      deleteBtn: "Efase",
      typeMedication: "Pran Medikaman (Famasi)",
      typeMedicalAppt: "Randevou ak Doktè / Sikyat",
      typeTherapyAppt: "Konsiltasyon Sikològ / Travayè Sosyal",
      typeWorkshop: "Atelye Gwoup Terapetik",
      typeLabExam: "Egzamen Medikal nan Laboratwa",
      anticipationAtTime: "Nan menm lè evènman an",
      anticipation15Min: "15 minit anvan",
      anticipation1Hour: "1 èdtan anvan",
      anticipation2Hours: "2 èdtan anvan",
      anticipation24Hours: "1 jou anvan (24 èdtan)",
      quickPresetsTitle: "Aksè rapid pou pwograme nan 1 klik:",
      medicationPickupPreset: "Retire Medikaman (Demen 09:00)",
      medicalApptPreset: "Kontwòl Doktè / Sikyat",
      workshopPreset: "Atelye Gwoup Adiksyon",
      labExamPreset: "Egzamen Laboratwa (Ajen)",
      headerBtnTooltip: "Rapèl pou Randevou ak Medikaman",
      medicationPickupBannerTitle: "Èske w ta renmen nou fè w sonje lè pou w pran medikaman yo?",
      medicationPickupBannerDesc: "Mete yon notifikasyon sou navigatè w pou w ka ale nan famasi a nan lè ofisyèl san w pa fè liy initil.",
      schedulePickupBtn: "Pwograme Rapèl pou Medikaman",
      dueAlertTitle: "Ou Gen yon Rapèl Medikal Kounye a!",
      dueAlertDismiss: "Mwen konprann",
      dueAlertSnooze: "Fè m sonje ankò nan 15 min",
      privacyNote: "Rapèl ou yo rete prive sou aparèy ou an san okenn enfòmasyon pa pataje deyò.",
      statusActive: "Aktif",
      statusDone: "Notifye deja"
    }
  },

  en: {
    header: {
      institutionName: "COSAM RINCONADA",
      programTitle: "Addiction Treatment & Recovery Program",
      commune: "San Ramón",
      publicBadge: "Public",
      accessibilityBtn: "Accessibility",
      accessibilityTitle: "Accessibility Options",
      fontSizeLabel: "Text size",
      themeLabel: "Visual theme",
      audioGuideLabel: "Institutional Voice Reader",
      audioGuideDesc: "Listen aloud to the COSAM welcome and program overview",
      audioListenBtn: "Listen to portal",
      audioPauseBtn: "Pause",
      audioResumeBtn: "Resume",
      audioStopBtn: "Stop",
      fontBtn: "Adjust text",
      fontNormal: "Normal text",
      fontLarge: "Large text",
      fontXLarge: "Extra large",
      qrBtn: "QR Code",
      themeDark: "Night mode",
      themeLight: "Day mode",
      languageLabel: "Language",
      simplifiedMode: "Reading Mode",
      simplifiedModeActive: "Easy Read",
      simplifiedModeTooltip: "Enable Simplified Reading Mode (high contrast, no visual clutter)",
      simplifiedBannerText: "Simplified Reading Mode active: maximized contrast, no complex backgrounds or animations to facilitate reading.",
      exitSimplifiedMode: "Return to standard view",
      voiceReadingTitle: "Institutional Voice Reader",
      voiceReadingDesc: "Allows you to listen aloud to institutional information, patient rights, duties, and the emergency network.",
      voiceReadingToggle: "Enable voice reading",
      voiceReadingActive: "Voice active",
      voiceReadingInactive: "Voice paused",
      voiceQuickRights: "Listen to Patient Rights",
      voiceQuickDuties: "Listen to Patient Duties",
      voiceQuickUrgency: "Listen to Emergency Network",
      voiceQuickPortal: "Listen to COSAM Welcome"
    },
    welcome: {
      badge: "Confidential & Free Care",
      title: "Welcome to your safe space",
      text: "At COSAM Rinconada (San Ramón) we are here to support you. This is a space of care and respect, designed to guide and assist you throughout your journey.",
      trustPill1: "100% Free & Confidential Care",
      trustPill2: "San Ramón Municipality",
      trustPill3: "Safe & Respectful Space",
      statusOpen: "Open Now (In-person care)",
      statusClosed: "Closed Now • 24/7 Urgency Network available",
      callSome: "Call SOME (225769844)",
      whatsapp: "Central WhatsApp (+569 5511 8624)",
      address: "Rinconada 8460, San Ramón",
      openMaps: "Google Maps",
      openWaze: "Waze",
      hoursWeekdays: "Monday to Thursday: 08:00 to 19:00",
      hoursFriday: "Friday: 08:00 to 16:00",
      hoursNote: "Please always remember to arrive 10 minutes prior to your appointments."
    },
    location: {
      title: "Location & Connectivity",
      subtitle: "How to reach COSAM Rinconada in San Ramón",
      badge: "San Ramón Healthcare Network",
      addressLabel: "Official Address:",
      communeLabel: "Commune:",
      healthNetworkLabel: "Healthcare Service:",
      healthNetworkValue: "Servicio de Salud Metropolitano Sur (SSMS)",
      openMapsBtn: "Open in Google Maps",
      openWazeBtn: "Open in Waze",
      publicTransportTitle: "How to get here via Public Transit",
      metroTitle: "Santiago Metro",
      metroDesc: "Santa Rosa or San Ramón Station (Line 4A) • Feeder bus connection towards Rinconada / La Bandera (8-10 mins).",
      busTitle: "Red Movilidad Bus Network",
      busDesc: "Bus routes 203, 206, 208, 209, 212, G01, G04, G11, G18 and E02 along Rinconada and Av. Santa Rosa.",
      landmarksTitle: "Local San Ramón Landmarks",
      landmark1: "Steps away from CESFAM Salvador Allende (La Bandera)",
      landmark2: "Near CECOSF Modelo & CESFAM La Bandera",
      landmark3: "Fronting local civic corridor and municipal transit in San Ramón",
      tipsTitle: "Visitor Recommendation:",
      tipsDesc: "We advise arriving 10 minutes before your appointment. Universal accessibility ramps are available."
    },
    team: {
      title: "Meet Your Team",
      subtitle: "Interdisciplinary Clinical Staff",
      directionTitle: "Center Directorate",
      directionRole: "Director",
      directionDesc: "Ensures you find a welcoming, humane, and dignified environment throughout your care.",
      coordinationTitle: "Program Coordination",
      coordinationRole: "Coordinator",
      coordinationDesc: "Manages your personalized care plan and facilitates access to all healthcare services.",
      medicalTitle: "Medical Department",
      medicalRole: "Attending Physicians",
      medicalDesc: "Responsible for your clinical evaluation and treatment adjustments based on your progress.",
      psychologyTitle: "Psychology Department",
      psychologyRole: "Clinical Psychologists",
      psychologyDesc: "Provides a safe, confidential space to strengthen your personal transformation.",
      rehabTitle: "Rehabilitation & Social Work",
      rehabRole: "Social Work & Occupational Therapy",
      rehabDesc: "Strengthens your community ties and family support network during recovery."
    },
    workshops: {
      title: "Group Workshops",
      subtitle: "Spaces that complement your journey at COSAM",
      badge: "SENDA & COSAM Inclusion",
      downloadScheduleBtn: "Download Schedule (PDF)",
      strategiesBtn: "Strategies you can apply",
      downloadGuideBtn: "Download Guideline (PDF)",
      byLeader: "Facilitators",
      ws1Title: "Psychoeducation",
      ws1Time: "Wednesdays: 17:00 to 19:00",
      ws1Leader: "Dr. Andrés Ruiz Miranda & Katherine Astudillo",
      ws1Cat: "Neurobiology & Craving",
      ws1Desc: "Understanding the neurobiology of your brain and nervous system, and compulsive desire management: coping strategies for cravings.",
      ws1Pdf: "Craving Management Guide (PDF)",
      ws2Title: "Psychotherapy & Emotional Regulation",
      ws2Time: "Wednesdays: 17:00 to 19:00",
      ws2Leader: "Ps. Romina Lucero Donoso & Benjamín Rebolledo",
      ws2Cat: "Emotional Regulation",
      ws2Desc: "Identifying automatic thoughts, affective modulation, distress tolerance, and building healthy attachment.",
      ws2Pdf: "Thought Restructuring Worksheet (PDF)",
      ws3Title: "Physical Activity & Health",
      ws3Time: "Mon & Fri: 10:00 to 12:00",
      ws3Leader: "Pablo Díaz (Social Worker)",
      ws3Cat: "Health & Movement",
      ws3Desc: "Gentle exercises and bodily movement to release tension, reduce stress, improve mood, and strengthen healthy habits.",
      ws3Pdf: "Motor Activation & Physical Health Guideline (PDF)",
      ws4Title: "Manejo del Tiempo Libre",
      ws4Time: "Fridays: 10:00 to 16:00",
      ws4Leader: "Fernando Carrasco (Occupational Therapist)",
      ws4Cat: "Leisure & Community Garden",
      ws4Desc: "Structuring protected weekends, reframing leisure time, and building support networks.",
      ws4Pdf: "Safe Weekend Planner (PDF)"
    },
    medication: {
      title: "Steps for your medication",
      subtitle: "Pickup locations and requirements in your health network",
      generalTitle: "Medication Dispensation",
      generalCenter1: "CESFAM Salvador Allende",
      generalCenter1Sec: "Población La Bandera, San Ramón",
      generalCenter2: "CECOSF Modelo",
      generalCenter2Sec: "Modelo Sector, San Ramón",
      benzoTitle: "Benzodiazepines Only",
      benzoDesc: "Medications such as Diazepam or Clonazepam must be picked up EXCLUSIVELY at CESFAM La Bandera.",
      benzoCenter: "CESFAM La Bandera",
      benzoCenterSec: "San Ramón (Exclusive Benzodiazepine Dispensing)",
      wazeBtn: "Waze",
      mapsBtn: "Maps",
      callBtn: "Call",
      step1Title: "1. Medical Prescription",
      step2Title: "2. Visit Pharmacy",
      step3Title: "3. Valid ID Card",
      listenStepsBtn: "Listen to steps aloud",
      stopListeningBtn: "Stop audio",
      downloadGuideBtn: "Download Guide (PDF)",
      pointsTitle: "Pharmacy Points by Medication",
      pointsSubtitle: "Check where to go based on your prescription type",
      pickupNotice: "To pick up, present a physical National ID Card and active Medical Prescription. If a family member collects, they must present the patient's ID card.",
      generalBadge: "General Medication",
      benzoBadge: "Benzodiazepines Only",
      addressLabel: "Address:",
      phoneLabel: "Phone:"
    },
    labExams: {
      title: "Medical Laboratory Tests",
      subtitle: "Easy 3-step guide & preparations",
      badge: "Public Health",
      intro: "Follow these 3 simple steps to complete your laboratory tests effortlessly:",
      step1Title: "Medical order",
      step1Desc: "Issued directly in clinical consultation by your treating doctor.",
      step2Title: "Coordinate at your CESFAM",
      step2Desc: "Visit your local health center to schedule and take your sample.",
      step3Title: "Results with code",
      step3Desc: "Keep the receipt or voucher with code given to you to access your results.",
      listenStepsBtn: "Listen to steps",
      stopListeningBtn: "Stop audio",
      catalogTitle: "Frequent tests catalog",
      catalogDesc: "Preparation required before your sample collection",
      fastingTag: "Requires 8h fasting",
      noFastingTag: "No fasting",
      clothesTag: "Comfortable clothes",
      resultsNotice: "Keep your receipt voucher; your COSAM doctor also reviews the digital report.",
      downloadGuideBtn: "Download Guide (PDF)",
      centersDirectoryTitle: "Sample Collection Centers Directory",
      centersDirectorySubtitle: "Family Health Centers (CESFAM) in San Ramón to schedule and collect your lab tests"
    },
    mobileNav: {
      tabHome: "Home",
      tabHomeShort: "Home",
      tabTeam: "Professional Team",
      tabTeamShort: "Team",
      tabWorkshopsOnly: "Workshops & Groups",
      tabWorkshopsShort: "Workshops",
      tabExamsOnly: "Lab Testing",
      tabExamsShort: "Exams",
      tabMedsOnly: "Pharmacy & Prescriptions",
      tabMedsShort: "Pharmacy",
      tabServices: "Exams & Pharmacy",
      tabRights: "Your Rights",
      tabUrgency: "Emergency Network",
      viewAllMode: "Full View",
      tabbedMode: "Section Mode",
      switchViewModeTooltip: "Switch between tabbed view and continuous scrolling",
      quickAccessTitle: "Clinical Quick Actions",
      menuBtn: "Menu",
      menuTitle: "Navigation Menu",
      menuSubtitle: "Clinical options & COSAM services",
      closeMenu: "Close menu",
      groupClinical: "Clinical Care & Workshops",
      groupHealth: "Laboratory & Pharmacy",
      groupInfo: "Information & Emergency",
      teamDesc: "Doctors, psychologists & therapists",
      workshopsDesc: "Support & rehabilitation spaces",
      examsDesc: "Medical orders & preparation",
      medsDesc: "Dispensing locations & hours",
      homeDesc: "Welcome, SOME & reception hours",
      rightsDesc: "Laws 20,584 and 21,331",
      urgencyDesc: "24/7 Crisis lines & emergency network",
      teamTag: "4 Quadrants",
      workshopsTag: "Weekly",
      examsTag: "Step-by-Step",
      medsTag: "Cesfam / HBLT",
      rightsTag: "Protection",
      urgencyTag: "Line 106",
      compactGridTitle: "Clinical Care Modules",
      compactGridSubtitle: "Direct access to key treatment areas"
    },
    rights: {
      title: "Rights and Responsibilities",
      subtitle: "Mutual Commitment & Legal Framework",
      rightsTitle: "Your Rights",
      rightsList: [
        "Receive dignified and respectful treatment at all times.",
        "Absolute privacy and strict confidentiality regarding your diagnosis.",
        "Receive clear, timely information regarding your treatment plan."
      ],
      dutiesTitle: "Your Responsibilities",
      dutiesList: [
        "Treat all healthcare staff and fellow patients with respect.",
        "Arrive punctually for your scheduled appointments (10 min early).",
        "Notify at least 24 hours in advance if unable to attend."
      ],
      dutiesAlertItem: "3 unjustified absences are grounds for administrative discharge.",
      viewFullLawsBtn: "View Full Legal Articles (20.584 & 21.331)",
      downloadPdfBtn: "Download Official Charter (PDF)",
      confirmReceptionBtn: "Confirm Reading & Receipt",
      confirmedBadge: "Receipt confirmed in digital audit",
      listenRightsBtn: "Listen to Rights",
      listenDutiesBtn: "Listen to Duties",
      listenAllBtn: "Listen to All (Rights & Duties)",
      voiceActiveReading: "Reading aloud...",
      voiceBadge: "Voice Reading",
      pauseVoiceBtn: "Pause",
      resumeVoiceBtn: "Resume",
      stopVoiceBtn: "Stop"
    },
    legalModal: {
      title: "Complete Healthcare Legal Framework",
      subtitle: "Chilean Republic Laws No. 20,584 and No. 21,331",
      law20584Tab: "Law No. 20.584 (Patient Rights & Duties)",
      law21331Tab: "Law No. 21.331 (Mental Health & Addictions)",
      promulgated: "Official Enactment",
      keyPointsTitle: "Guarantees & Guiding Principles",
      articlesTitle: "Full Official Articles",
      closeBtn: "Close Document",
      downloadPdf: "Download PDF Copy"
    },
    acknowledgmentModal: {
      title: "Confirmation of Reading & Onboarding",
      subtitle: "Patient Rights and Responsibilities Audit Log",
      formIntro: "This digital record confirms that you have received clear information about your rights, duties, and healthcare guidelines at COSAM Rinconada.",
      rutLabel: "Patient National ID (RUT) or Clinical Record No.",
      rutPlaceholder: "E.g.: 12.345.678-9 or Record 4580",
      nameLabel: "Full Name (Optional)",
      namePlaceholder: "Full Name and Surnames",
      checkboxLabel: "I declare that I have read, understood, and formally received information on my rights, duties, and care guidelines.",
      submitBtn: "Register Compliance & Digital Signature",
      successTitle: "Onboarding Record Saved!",
      successDesc: "Your confirmation has been successfully recorded in the digital audit log.",
      folioLabel: "Digital Audit Folio",
      dateLabel: "Date & Time of Signature",
      closeBtn: "Accept & Close",
      errorRequired: "Please enter your RUT or Clinical Record No.",
      errorRut: "Please enter a valid RUT or Record Number.",
      errorCheckbox: "You must check the box to confirm receipt."
    },
    urgency: {
      title: "Emergency Network",
      badge: "24/7 Emergency Care",
      warningTitle: "⚠️ COSAM does not treat emergency cases.",
      warningDesc: "In the event of acute crisis or vital risk, go immediately to:",
      hosp1: "Hospital Padre Hurtado",
      hosp1Type: "Primary Referral Emergency Hospital",
      hosp2: "SAPU Gabriela Mistral",
      hosp2Type: "Primary Urgent Care Center",
      hosp3: "SAPU Salvador Allende",
      hosp3Type: "Primary Urgent Care Center",
      phonesTitle: "24/7 Telephone Helplines:",
      phonesFree: "100% Toll-free calls",
      suicidePrevLabel: "Suicide Prevention Helpline (*4141)",
      sendaLabel: "SENDA Drug & Alcohol Helpline (1412)",
      samuLabel: "SAMU Emergency Medical (131)",
      saludRespondeLabel: "Salud Responde Minsal (600 360 7777)",
      hospDirectoryTitle: "Hospitals & Emergency SAPU Directory",
      hospDirectorySubtitle: "Healthcare facilities for medical emergency care in San Ramón",
      wazeBtn: "Waze",
      mapsBtn: "Maps",
      callBtn: "Call",
      addressLabel: "Address:",
      phoneLabel: "Phone:",
      scheduleLabel: "Hours:",
      crisisLinesTitle: "24/7 Crisis Support & Emergency Helplines",
      crisisLinesSubtitle: "Free, confidential, and immediate guidance from any phone",
      listenUrgencyBtn: "Listen to Emergency Network & 24/7 Helplines",
      voiceActiveReading: "Reading emergency network...",
      voiceBadge: "Voice Reading",
      pauseVoiceBtn: "Pause",
      resumeVoiceBtn: "Resume",
      stopVoiceBtn: "Stop"
    },
    chat: {
      title: "COSAM Virtual Counselor",
      subtitle: "Administrative guidance and services",
      welcomeMsg: "Hello, I am the virtual counselor for COSAM Rinconada. I do not store confidential clinical data. How can I guide you today?",
      inputPlaceholder: "Type your question here...",
      listenAudio: "Listen aloud",
      stopAudio: "Stop audio",
      mainMenuBtn: "Main Menu",
      returnToMenu: "Back to Main Menu",
      attachTooltip: "Attach document or prescription photo",
      quickOpt1: "Excuse Absence (SOME WhatsApp)",
      quickOpt2: "Prescription Pick-up & Pharmacy",
      quickOpt3: "Center Hours & Workshops",
      quickOpt4: "Mental Health Emergencies"
    },
    footer: {
      rightsReserved: "Official Patient Portal • San Ramón Health Network",
      confidentialNotice: "Healthcare governed by Laws No. 20,584 and No. 21,331 of the Republic of Chile."
    },
    offline: {
      offlineTitle: "Offline Mode Active",
      offlineDesc: "You are currently offline. Rights & Duties documents, Laws 20,584/21,331, and Workshop Guidelines remain 100% accessible and ready for PDF generation without internet.",
      offlineBadge: "Offline Mode",
      cachedReady: "Legal documents and workshop guidelines cached on device",
      syncBtn: "Verify offline storage",
      syncedToast: "All legal and workshop educational documents are cached on your device."
    },
    progressBar: {
      progressLabel: "Content reading progress",
      readingPosition: "Reading",
      backToTop: "Back to top",
      completed: "Completed",
      sectionWelcome: "Welcome & Overview",
      sectionTeam: "Interdisciplinary Team",
      sectionWorkshops: "Group Workshops",
      sectionExams: "Medical Lab Orders",
      sectionMeds: "Prescription Pickup",
      sectionRights: "Patient Rights (Laws 20,584 / 21,331)",
      sectionDuties: "Patient Responsibilities",
      sectionUrgency: "24/7 Urgency & Crisis Network",
      legalReaderProgress: "Legal text reading progress",
      article: "Article"
    },
    reminders: {
      modalTitle: "Reminders & Notifications",
      modalSubtitle: "Set browser alerts on your device so you never miss medical appointments or medication pickup schedules",
      notificationPermissionTitle: "Browser Notifications (Web Push)",
      permissionGranted: "Notifications enabled on this device",
      permissionDefault: "Permission pending to receive alerts",
      permissionDenied: "Notifications blocked in your browser",
      permissionUnsupported: "Browser does not support system notifications",
      permissionHelpDenied: "To enable them, click the padlock or site settings icon in your browser address bar and allow Notifications.",
      enableBtn: "Enable Notifications",
      testBtn: "Test Alert",
      testSuccessToast: "Test notification sent successfully!",
      activeRemindersTab: "My Reminders",
      newReminderTab: "+ Schedule Reminder",
      noReminders: "No active reminders",
      noRemindersDesc: "You can schedule alerts for mental health appointments, addiction group workshops, or monthly prescription pickups.",
      typeLabel: "Event or appointment type",
      titleLabel: "Title or description",
      centerLabel: "Health Center / Pharmacy",
      dateTimeLabel: "Date and time of event",
      anticipationLabel: "Remind me in advance",
      notesLabel: "Notes or requirements (optional)",
      notesPlaceholder: "E.g.: Bring physical ID card and valid medical prescription...",
      saveBtn: "Save Reminder",
      cancelBtn: "Cancel",
      deleteBtn: "Delete",
      typeMedication: "Medication Pickup (Pharmacy)",
      typeMedicalAppt: "Doctor / Psychiatrist Appointment",
      typeTherapyAppt: "Psychologist / Social Work Consultation",
      typeWorkshop: "Addiction Therapy Group Workshop",
      typeLabExam: "Medical Lab Tests",
      anticipationAtTime: "At exact time of event",
      anticipation15Min: "15 minutes before",
      anticipation1Hour: "1 hour before",
      anticipation2Hours: "2 hours before",
      anticipation24Hours: "1 day before (24 hours)",
      quickPresetsTitle: "Quick 1-click presets to schedule:",
      medicationPickupPreset: "Medication Pickup (Tomorrow 09:00)",
      medicalApptPreset: "Doctor / Psychiatry Checkup",
      workshopPreset: "Addiction Recovery Workshop",
      labExamPreset: "Fasting Lab Tests",
      headerBtnTooltip: "Appointment & Medication Reminders",
      medicationPickupBannerTitle: "Would you like a reminder to pick up your medication?",
      medicationPickupBannerDesc: "Schedule a browser notification so you can visit the pharmacy on time without unnecessary delays.",
      schedulePickupBtn: "Schedule Pickup Reminder",
      dueAlertTitle: "Pending Clinical Reminder!",
      dueAlertDismiss: "Got it",
      dueAlertSnooze: "Remind me in 15 min",
      privacyNote: "Your reminders are handled locally and privately inside your browser.",
      statusActive: "Active",
      statusDone: "Notified"
    }
  }
};
