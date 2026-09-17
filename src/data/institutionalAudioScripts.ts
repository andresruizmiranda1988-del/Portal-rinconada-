import { Language } from '../types/clinical';

export interface InstitutionalAudioScript {
  id: string;
  title: string;
  section: 'portal' | 'rights' | 'duties' | 'rights_all' | 'urgency';
  text: string;
  durationEstimateSecs: number;
}

export const getInstitutionalAudioScripts = (lang: Language): Record<'portal' | 'rights' | 'duties' | 'rights_all' | 'urgency', InstitutionalAudioScript> => {
  if (lang === 'ht') {
    return {
      portal: {
        id: 'portal',
        title: 'Byenvini Enstitisyonèl COSAM Rinconada',
        section: 'portal',
        text: 'Byenvini nan pòtal enstitisyonèl Pwogram Tretman pou Moun ki Gen Depandans nan COSAM Rinconada, nan komin San Ramón. Sa a se yon espas sante piblik, gratis epi konfidansyèl. Isit la ou ka jwenn enfòmasyon sou ekip medikal nou an, atelye gwoup yo, kote pou pran medikaman, dwa ak devwa ou selon lwa yo, ak rezo ijans 24 sou 24.',
        durationEstimateSecs: 20
      },
      rights: {
        id: 'rights',
        title: 'Dwa Pasyan yo (Lwa 20.584 ak 21.331)',
        section: 'rights',
        text: 'Dwa moun k ap resevwa swen nan COSAM Rinconada, dapre Lwa 20.584 sou dwa pasyan yo ak Lwa 21.331 sou Sante Mantal: Premyèman, ou gen dwa pou resevwa yon tretman ki diy, ki gen respè epi san okenn diskriminasyon. Dezyèmman, ou gen dwa a sekrè total ak konfidansyalite nan dosye medikal ou ak dyagnostik ou. Twazyèmman, ou gen dwa resevwa enfòmasyon ki klè, veridik e alè sou eta sante w ak tout opsyon tretman yo. Katriyèmman, ou gen dwa pou patisipe libman nan plan swen w lan. Senkyèmman, ou gen dwa pou pèsonn pa fè okenn entèvansyon medikal san konsantman libre ou. Epi sizyèmman, ou gen dwa a swen lasante ki rapid, kontinyèl e san obstak.',
        durationEstimateSecs: 35
      },
      duties: {
        id: 'duties',
        title: 'Devwa Pasyan yo nan COSAM Rinconada',
        section: 'duties',
        text: 'Devwa moun k ap resevwa swen nan COSAM Rinconada: Premyèman, bay ekip sante a enfòmasyon ki egzat e konplè sou eta sante w ak istwa medikal ou. Dezyèmman, pran swen epi respekte enstalasyon yo, materyèl ak anviwònman sant lan. Twazyèmman, kenbe yon konpòtman ki kalm, ki gen respè e san okenn vyolans anvè travayè sante yo ak lòt pasyan yo. Katriyèmman, swiv konsèy medikal yo epi rive alè nan randevou w yo, li rekòmande pou rive 10 minit anvan. Senkyèmman, si w pa ka vini nan yon randevou, tanpri fè SOME konnen omwen 24 èdtan davans nan telefòn oswa WhatsApp pou nou ka ba w yon lòt dat. Sonje byen ke 3 absans san jistifikasyon ka lakòz yo retire w nan pwogram nan.',
        durationEstimateSecs: 40
      },
      rights_all: {
        id: 'rights_all',
        title: 'Dwa ak Devwa Konplè Pasyan an',
        section: 'rights_all',
        text: 'Enfòmasyon konplè sou Dwa ak Devwa nan COSAM Rinconada. Ou gen dwa a yon tretman diy, konfidansyalite dosye medikal ou, enfòmasyon klè sou tretman ou, epi patisipe nan plan swen sante w la. Kòm devwa, ou dwe bay enfòmasyon egzat sou sante w, respekte anplwaye yo ak lòt pasyan yo, rive alè nan randevou w yo, epi avèti omwen 24 èdtan davans si w p ap ka vini. Sa ede nou kenbe yon sèvis ki efikas pou tout kominote a.',
        durationEstimateSecs: 35
      },
      urgency: {
        id: 'urgency',
        title: 'Rezo Ijans ak Liy Èd 24 Sou 24 nan San Ramón',
        section: 'urgency',
        text: 'Rezo Ijans ak Asistans nan Kriz 24 sou 24 pou komin San Ramón. Remak enpòtan: COSAM Rinconada pa yon sant ijans. Si w gen yon kriz grav oswa yon danje pou lavi w: Rele touswit nan Liy Prevansyon Swisid asteris 4141, ki gratis 24 sou 24 epi ki gen sikològ Ministè Sante a. Pou èd ak depandans dwòg oswa alkòl, rele SENDA nan 1412, gratis e konfidansyèl 24 sou 24. Pou anbilans ak ijans medikal vital, rele SAMU nan 131. Ou ka rele tou Salud Responde nan 600 360 7777, oswa Liy Fanmi Carabineros nan 149. Pou atansyon medikal ijans sou plas, ale nan Lopital Padre Hurtado nan ri Esperanza 2150, ki louvri 24 èdtan chak jou. Ou genyen tou sèvis SAPU Salvador Allende nan Pedro Aguirre Cerda 0190, ak SAPU Gabriela Mistral nan San Francisco 8540.',
        durationEstimateSecs: 45
      }
    };
  }

  if (lang === 'en') {
    return {
      portal: {
        id: 'portal',
        title: 'Institutional Welcome to COSAM Rinconada',
        section: 'portal',
        text: 'Welcome to the institutional portal of the Addiction Treatment Program at COSAM Rinconada, in the municipality of San Ramón. This is a free, confidential, and safe public healthcare space. Here you will find information about our clinical team, group therapy workshops, pharmacy pickup locations, patient rights and responsibilities under Chilean laws, and 24/7 emergency support.',
        durationEstimateSecs: 20
      },
      rights: {
        id: 'rights',
        title: 'Patient Rights (Laws 20,584 and 21,331)',
        section: 'rights',
        text: 'Patient rights at COSAM Rinconada, under Healthcare Rights Law 20,584 and Mental Health Law 21,331: First, you have the right to receive dignified, respectful, and non-discriminatory care at all times. Second, you have the right to strict confidentiality and privacy regarding your clinical record and personal health information. Third, you have the right to clear, honest, and timely information about your diagnosis, prognosis, and treatment options. Fourth, you have the right to freely make informed decisions and actively participate in designing your individualized care plan. Fifth, you have the right not to undergo any medical procedure or intervention without your prior free and informed consent. And sixth, you have the right to timely, continuous, and accessible care without bureaucratic barriers.',
        durationEstimateSecs: 35
      },
      duties: {
        id: 'duties',
        title: 'Patient Duties and Responsibilities',
        section: 'duties',
        text: 'Patient duties at COSAM Rinconada: First, provide accurate and complete information regarding your health condition, medications, and medical history. Second, take care of and respect the facilities, clinical equipment, and public surroundings. Third, maintain courteous, respectful behavior free of aggression or violence toward healthcare workers and fellow patients. Fourth, adhere to agreed treatment plans and arrive on time for clinical appointments, ideally ten minutes early. Fifth, notify staff at least twenty-four hours in advance through SOME phone or WhatsApp if you cannot attend an appointment, so your slot can be rescheduled. Please remember that three unexcused absences may lead to administrative discharge from the program.',
        durationEstimateSecs: 40
      },
      rights_all: {
        id: 'rights_all',
        title: 'Complete Patient Rights and Duties',
        section: 'rights_all',
        text: 'Full charter of Patient Rights and Duties at COSAM Rinconada. You are entitled to compassionate, confidential care, clear information about your therapy, and active participation in your recovery plan. In return, you commit to providing honest health information, treating healthcare staff and peers with mutual respect, attending scheduled sessions punctually, and giving at least twenty-four hours prior notice if rescheduling is needed.',
        durationEstimateSecs: 30
      },
      urgency: {
        id: 'urgency',
        title: 'Emergency Care Network and 24/7 Crisis Helplines',
        section: 'urgency',
        text: 'Emergency Network and 24/7 Crisis Support for the San Ramón community. Vital notice: COSAM does not treat acute medical emergencies. If you or someone you know is experiencing severe decompensation or vital risk: Call the National Suicide Prevention Helpline immediately at star 4141, free of charge 24/7, staffed by specialized psychologists. For confidential drug and alcohol crisis support, call SENDA at 1412, toll-free 24/7. For medical emergencies and ambulance dispatch, call SAMU at 131. You can also call Salud Responde at 600 360 7777, or Carabineros Family Helpline at 149. For in-person emergency hospital care, go to Hospital Padre Hurtado at Esperanza 2150, open 24 hours a day 365 days a year. Urgent primary care is also available at SAPU Salvador Allende and SAPU Gabriela Mistral in San Ramón.',
        durationEstimateSecs: 45
      }
    };
  }

  // Default Spanish (es-CL)
  return {
    portal: {
      id: 'portal',
      title: 'Bienvenida Institucional COSAM Rinconada',
      section: 'portal',
      text: 'Bienvenido al portal institucional del Programa de Tratamiento en Adicciones de COSAM Rinconada, en la comuna de San Ramón. Este es un espacio de salud pública, gratuito, confidencial y respetuoso. Aquí encontrarás información sobre nuestro equipo interdisciplinario, los talleres grupales, los puntos de retiro de fármacos, tus derechos y deberes según las leyes 20.584 y 21.331, y la red de urgencias disponible las 24 horas.',
      durationEstimateSecs: 20
    },
    rights: {
      id: 'rights',
      title: 'Derechos del Paciente (Leyes 20.584 y 21.331)',
      section: 'rights',
      text: 'Derechos de las personas atendidas en COSAM Rinconada, amparados por la Ley 20.584 de Derechos y Deberes en Salud y la Ley 21.331 de Salud Mental: Primero, tienes derecho a recibir un trato digno, respetuoso y sin discriminación en todo momento. Segundo, tienes derecho a la privacidad y estricta confidencialidad de tu diagnóstico y de tu ficha clínica. Tercero, tienes derecho a recibir información clara, veraz y oportuna sobre tu tratamiento y alternativas terapéuticas. Cuarto, tienes derecho a participar activamente en la formulación de tu plan individual de cuidados y rehabilitación. Quinto, tienes derecho a no ser sometido a intervenciones sin tu consentimiento previo, libre e informado. Y sexto, tienes derecho a una atención oportuna, segura y continua en la red de salud pública.',
      durationEstimateSecs: 35
    },
    duties: {
      id: 'duties',
      title: 'Deberes del Paciente en COSAM Rinconada',
      section: 'duties',
      text: 'Deberes de las personas atendidas en COSAM Rinconada: Primero, entregar información fidedigna y oportuna sobre tu estado de salud y antecedentes médicos. Segundo, cuidar y respetar las instalaciones, equipamiento y entorno del centro de salud. Tercero, mantener un trato cordial, respetuoso y libre de toda violencia hacia el equipo de salud y los demás usuarios. Cuarto, cumplir con las indicaciones clínicas y asistir puntualmente a todas tus citas y talleres, llegando 10 minutos antes. Quinto, avisar al SOME o vía WhatsApp con al menos 24 horas de anticipación si no puedes asistir, permitiendo reprogramar tu atención. Recuerda que tres inasistencias consecutivas sin justificar son causal de alta administrativa del programa.',
      durationEstimateSecs: 40
    },
    rights_all: {
      id: 'rights_all',
      title: 'Carta Completa de Derechos y Deberes',
      section: 'rights_all',
      text: 'Carta de Derechos y Deberes del Paciente en COSAM Rinconada. Cuentas con derecho a atención digna, confidencialidad médica, información clara sobre tu proceso y participación activa en tu plan de salud. Como compromiso recíproco, tus deberes son entregar información veraz, cuidar las instalaciones, tratar con respeto al personal y a otros pacientes, asistir con puntualidad y avisar inasistencias con 24 horas de anticipación para cuidar tu cupo de atención.',
      durationEstimateSecs: 30
    },
    urgency: {
      id: 'urgency',
      title: 'Red de Urgencias y Fonos de Crisis 24 Horas',
      section: 'urgency',
      text: 'Red de Urgencias y Asistencia en Crisis 24 horas para la comuna de San Ramón. Advertencia vital: COSAM Rinconada no atiende emergencias médicas ni descompensaciones agudas. Si te encuentras en una crisis vital o emocional severa: Comunícate de inmediato al Fono Prevención del Suicidio, asterisco 4141, gratuito las 24 horas los 365 días del año, atendido por psicólogos del Ministerio de Salud. Para orientación confidencial y apoyo en consumo de sustancias, llama al Fono Drogas SENDA 1412, gratuito las 24 horas. Para ambulancias y emergencias vitales, marca el 131 del SAMU. También cuentas con Salud Responde al 600 360 7777 y Fono Familia Carabineros 149. Para atención presencial de urgencia, acude al Hospital Padre Hurtado en Esperanza 2150, con urgencia abierta las 24 horas. En atención primaria, cuentas con el SAPU Salvador Allende en Pedro Aguirre Cerda 0190 y el SAPU Gabriela Mistral en San Francisco 8540.',
      durationEstimateSecs: 45
    }
  };
};
