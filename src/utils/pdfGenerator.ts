import { jsPDF } from 'jspdf';
import { cosamInfo } from '../data/cosamData';
import { Language } from '../types/clinical';

interface RightsCharterContent {
  headerOrg: string;
  headerSub: string;
  headerDoc: string;
  legalTitle: string;
  intro: string;
  law1Title: string;
  law1Points: string[];
  law2Title: string;
  law2Points: string[];
  rulesTitle: string;
  rulesPoints: string[];
  contactTitle: string;
  contactLine1: string;
  contactLine2: string;
  contactLine3: string;
  sigPatient: string;
  sigStaff: string;
  footerText: (dateStr: string) => string;
  filename: string;
}

const charterTranslations: Record<Language, RightsCharterContent> = {
  es: {
    headerOrg: 'COSAM RINCONADA - SAN RAMÓN',
    headerSub: 'Programa de Tratamiento en Adicciones • Red de Salud Mental',
    headerDoc: 'CARTA OFICIAL DE DERECHOS Y DEBERES DEL PACIENTE',
    legalTitle: 'MARCO LEGAL: LEYES DE LA REPÚBLICA N° 20.584 Y N° 21.331',
    intro: 'El presente documento formaliza los derechos fundamentales, garantías y deberes de las personas usuarias en el marco de la atención en salud mental y adicciones en el COSAM Rinconada.',
    law1Title: '1. LEY N° 20.584: Derechos y Deberes en la Atención de Salud',
    law1Points: [
      '• Trato digno, respetuoso y con lenguaje claro y accesible en todo momento.',
      '• Estricta reserva y confidencialidad de la Ficha Clínica y diagnóstico.',
      '• Derecho al consentimiento informado y autonomía en decisiones de salud.',
      '• Deber de tratar con respeto al equipo de salud y cuidar las instalaciones.',
      '• Deber de puntualidad y aviso previo de 24 horas ante inasistencias a citas.'
    ],
    law2Title: '2. LEY N° 21.331: Reconocimiento y Protección en Salud Mental',
    law2Points: [
      '• Prohibición absoluta de estigmatización o discriminación por motivo de salud mental.',
      '• Modelo comunitario e interdisciplinario centrado en la persona y su familia.',
      '• Resguardo irrestricto de la privacidad en procesos de rehabilitación e inserción.',
      '• Apoyo a la continuidad de cuidados e integración social y laboral comunitaria.'
    ],
    rulesTitle: '3. NORMAS CLÍNICAS Y ASISTENCIA COSAM RINCONADA',
    rulesPoints: [
      '• Presentarse 10 minutos antes de cada cita médica, psicológica o de taller.',
      '• Solicitud de renovación de recetas con 7 a 10 días de anticipación en SOME.',
      '• Retiro de Benzodiacepinas (Diazepam/Clonazepam) EXCLUSIVO en CESFAM La Bandera.',
      '• 3 inasistencias consecutivas sin justificar constituyen causal de alta administrativa.'
    ],
    contactTitle: 'CONTACTO SOME & RED DE URGENCIAS 24/7',
    contactLine1: `SOME COSAM: ${cosamInfo.phoneSome} | WhatsApp: ${cosamInfo.whatsappFormatted} | Dirección: ${cosamInfo.address}`,
    contactLine2: 'Urgencias 24/7: SAMU (131) • Salud Responde (600 360 7777) • Prevención Suicidio (*4141) • Fono SENDA (1412)',
    contactLine3: 'Red Hospitalaria: Hospital Padre Hurtado • SAPU Gabriela Mistral • SAPU Salvador Allende',
    sigPatient: 'Firma Paciente o Representante Legal',
    sigStaff: 'Equipo de Recepción y SOME COSAM',
    footerText: (dateStr) => `Documento emitido electrónicamente el ${dateStr} • Portal del Paciente COSAM Rinconada`,
    filename: 'Carta-Derechos-Deberes-COSAM-Rinconada-ES.pdf'
  },
  ht: {
    headerOrg: 'COSAM RINCONADA - SAN RAMÓN',
    headerSub: 'Pwogram Tretman pou Adiksyon • Rezo Sante Mantal',
    headerDoc: 'LÈT OFISYÈL DWA AK DEVWA PASYAN AN',
    legalTitle: 'KAD LEGAL: LWA REPILIK CHILI N° 20.584 AK N° 21.331',
    intro: 'Dokiman ofisyèl sa a etabli dwa fondamantal, garanti ak devwa moun k ap resevwa swen nan sante mantal ak adiksyon nan COSAM Rinconada.',
    law1Title: '1. LWA N° 20.584: Dwa ak Devwa nan Swen Sante',
    law1Points: [
      '• Tretman diy, respè ak kominikasyon nan langaj klè e aksesib nan tout moman.',
      '• Konfidansyalite total ak sekrè sou Dosye Medikal ak dyagnostik klinik ou.',
      '• Dwa a konsantman lib e eklere ak otonomi nan desizyon sante w.',
      '• Devwa pou respekte tout anplwaye sante yo epi pran swen lokal ak enstalasyon yo.',
      '• Devwa ponktyalite ak avize 24 èdtan davans si w ap manke yon randevou.'
    ],
    law2Title: '2. LWA N° 21.331: Rekonesans ak Pwoteksyon nan Sante Mantal',
    law2Points: [
      '• Entèdiksyon total sou nenpòt diskriminasyon oswa estigma poutèt sante mantal.',
      '• Modèl kominotè ak entèdisiplinè ki santre sou byennèt moun nan ak fanmi li.',
      '• Pwoteksyon vi prive nan tout pwosesis reyabilitasyon ak re-entegrasyon.',
      '• Sipò pou kontinwite swen ak entegrasyon sosyal ak travay nan kominote a.'
    ],
    rulesTitle: '3. RÈGLEMAN KLINIK AK PREZANS COSAM RINCONADA',
    rulesPoints: [
      '• Rive 10 minit anvan chak randevou medikal, sikolojik oswa atelye gwoup.',
      '• Mande renouvèlman resèt medikaman 7 a 10 jou anvan nan biwo SOME.',
      '• Medikaman Benzodyazepin (Diazepam/Clonazepam) retire SÈLMAN nan CESFAM La Bandera.',
      '• 3 absans konsekitif san jistifikasyon se koz pou sòti administratif nan pwogram nan.'
    ],
    contactTitle: 'KONTAK SOME AK REZO DIJANS 24/7',
    contactLine1: `SOME COSAM: ${cosamInfo.phoneSome} | WhatsApp: ${cosamInfo.whatsappFormatted} | Adrès: ${cosamInfo.address}`,
    contactLine2: 'Dijans 24/7: SAMU (131) • Salud Responde (600 360 7777) • Prevansyon Swisid (*4141) • Fono SENDA (1412)',
    contactLine3: 'Lopital ak Sant Dijans: Hospital Padre Hurtado • SAPU Gabriela Mistral • SAPU Salvador Allende',
    sigPatient: 'Siyati Pasyan oswa Reprezantan Legal',
    sigStaff: 'Ekip Resepsyon ak SOME COSAM',
    footerText: (dateStr) => `Dokiman emèt elektwonikman nan dat ${dateStr} • Pòtal Pasyan COSAM Rinconada`,
    filename: 'Let-Dwa-Devwa-COSAM-Rinconada-HT.pdf'
  },
  en: {
    headerOrg: 'COSAM RINCONADA - SAN RAMÓN',
    headerSub: 'Addiction Treatment Program • Mental Health Network',
    headerDoc: 'OFFICIAL CHARTER OF PATIENT RIGHTS AND DUTIES',
    legalTitle: 'LEGAL FRAMEWORK: REPUBLIC OF CHILE LAWS NO. 20,584 & NO. 21,331',
    intro: 'This official document formalizes the fundamental rights, legal guarantees, and duties of patients receiving mental health and addiction recovery services at COSAM Rinconada.',
    law1Title: '1. LAW NO. 20,584: Rights and Duties in Healthcare Attention',
    law1Points: [
      '• Dignified, respectful treatment and communication in clear, accessible language at all times.',
      '• Strict confidentiality and privacy regarding clinical records and medical diagnoses.',
      '• Right to informed consent and autonomy in healthcare decision-making processes.',
      '• Duty to treat healthcare staff with dignity and care for clinical facilities.',
      '• Duty of punctuality and providing at least 24 hours advance notice for cancellations.'
    ],
    law2Title: '2. LAW NO. 21,331: Recognition and Protection in Mental Health',
    law2Points: [
      '• Absolute prohibition of stigma or discrimination based on mental health condition.',
      '• Community-based, interdisciplinary model centered on the person and family unit.',
      '• Unrestricted privacy protection throughout rehabilitation and social inclusion.',
      '• Support for continuity of care, social inclusion, and vocational reintegration.'
    ],
    rulesTitle: '3. CLINICAL GUIDELINES & ATTENDANCE AT COSAM RINCONADA',
    rulesPoints: [
      '• Arrive 10 minutes prior to every scheduled medical, psychological, or workshop session.',
      '• Request prescription renewals 7 to 10 business days in advance at the SOME desk.',
      '• Benzodiazepines (Diazepam/Clonazepam) dispensed EXCLUSIVELY at CESFAM La Bandera.',
      '• 3 consecutive unexcused absences constitute grounds for administrative discharge.'
    ],
    contactTitle: 'SOME DESK CONTACT & 24/7 EMERGENCY NETWORK',
    contactLine1: `SOME Desk: ${cosamInfo.phoneSome} | WhatsApp: ${cosamInfo.whatsappFormatted} | Address: ${cosamInfo.address}`,
    contactLine2: '24/7 Urgencies: SAMU (131) • Salud Responde (600 360 7777) • Suicide Helpline (*4141) • SENDA (1412)',
    contactLine3: 'Hospital Network: Padre Hurtado Hospital • SAPU Gabriela Mistral • SAPU Salvador Allende',
    sigPatient: 'Patient or Legal Representative Signature',
    sigStaff: 'Reception & SOME Front Desk Staff',
    footerText: (dateStr) => `Document electronically generated on ${dateStr} • COSAM Rinconada Patient Portal`,
    filename: 'Patient-Rights-Duties-Charter-COSAM-EN.pdf'
  }
};

export function generateRightsCharterPDF(language: Language = 'es') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const content = charterTranslations[language] || charterTranslations.es;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Header Banner
  doc.setFillColor(88, 28, 135); // Deep Purple (#581c87)
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Institution Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(content.headerOrg, margin, 11);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(content.headerSub, margin, 17);
  doc.setFont('helvetica', 'bold');
  doc.text(content.headerDoc, margin, 23);

  let y = 35;

  // Title: Marco Legal
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(content.legalTitle, margin, y);
  y += 5.5;

  // Introduction text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const splitIntro = doc.splitTextToSize(content.intro, contentWidth);
  doc.text(splitIntro, margin, y);
  y += (splitIntro.length * 4.2) + 3;

  // Box 1: Ley 20.584
  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(192, 132, 252);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(88, 28, 135);
  doc.text(content.law1Title, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  let law1Y = y + 11;
  content.law1Points.forEach((pt) => {
    doc.text(pt, margin + 4, law1Y);
    law1Y += 5;
  });

  y += 42;

  // Box 2: Ley 21.331
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(134, 239, 172);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(22, 101, 52);
  doc.text(content.law2Title, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  let law2Y = y + 11;
  content.law2Points.forEach((pt) => {
    doc.text(pt, margin + 4, law2Y);
    law2Y += 5;
  });

  y += 38;

  // Box 3: Reglas Operativas COSAM Rinconada
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(153, 27, 27);
  doc.text(content.rulesTitle, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  let rulesY = y + 11;
  content.rulesPoints.forEach((pt) => {
    doc.text(pt, margin + 4, rulesY);
    rulesY += 5;
  });

  y += 38;

  // Contact and Urgencies Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(content.contactTitle, margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(content.contactLine1, margin + 4, y + 10.5);
  doc.text(content.contactLine2, margin + 4, y + 15);
  doc.text(content.contactLine3, margin + 4, y + 19.5);

  y += 28;

  // Signature Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('_____________________________________', margin + 12, y + 14);
  doc.text(content.sigPatient, margin + 15, y + 19);

  doc.text('_____________________________________', pageWidth - margin - 68, y + 14);
  doc.text(content.sigStaff, pageWidth - margin - 65, y + 19);

  // Footer text
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  const locale = language === 'ht' ? 'fr-HT' : language === 'en' ? 'en-US' : 'es-CL';
  const nowStr = new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(content.footerText(nowStr), margin, pageHeight - 7);

  // Save PDF
  doc.save(content.filename);
}

export function generateLabExamsPdf(language: Language = 'es') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('COSAM RINCONADA • SAN RAMÓN', margin, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('PROGRAMA DE TRATAMIENTO EN ADICCIONES • GUÍA DE EXÁMENES DE LABORATORIO', margin, 17);
  doc.text(`SOME: ${cosamInfo.phoneSome} | WhatsApp: ${cosamInfo.whatsappFormatted}`, margin, 23);

  let y = 35;

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(
    language === 'ht' ? 'GID ENFÒMASYON AK PREPARASYON POU EGZAMEN LABORATWA' :
    language === 'en' ? 'LABORATORY EXAM PREPARATION AND COORDINATION GUIDE' :
    'PAUTA DE COORDINACIÓN Y PREPARACIÓN DE EXÁMENES DE LABORATORIO',
    margin,
    y
  );

  y += 7;

  // Intro paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const introText = language === 'ht'
    ? 'Dokiman sa a eksplike kijan pou w kowòdone epi prepare w pou egzamen doktè w mande yo nan COSAM Rinconada. Rezilta yo rive dirèkteman nan dosye elektwonik ou pou pwochen kontwòl ou.'
    : language === 'en'
    ? 'This document outlines how to coordinate and prepare for laboratory tests requested by your COSAM Rinconada medical team. Results are uploaded directly to your clinical chart for your follow-up appointment.'
    : 'Este documento detalla las indicaciones para coordinar y preparar los exámenes de laboratorio indicados por tu equipo médico en el COSAM Rinconada. Los resultados se integran automáticamente en tu ficha clínica digital para tu próximo control médico.';

  const splitIntro = doc.splitTextToSize(introText, contentWidth);
  doc.text(splitIntro, margin, y);
  y += splitIntro.length * 4.5 + 4;

  // 4 Steps Flow Box
  doc.setFillColor(243, 244, 246);
  doc.setDrawColor(209, 213, 219);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text(
    language === 'ht' ? 'ETAP POU W FE EGZAMEN YO:' :
    language === 'en' ? 'STEPS TO COMPLETE YOUR EXAMS:' :
    'PASO A PASO PARA REALIZAR TUS EXÁMENES:',
    margin + 4,
    y + 5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);

  const steps = language === 'ht' ? [
    '1. Resevwa Lòd Medikal la: Doktè w la ba w lòd la pandan kontwòl klinik ou.',
    '2. Kowòdinasyon nan SOME: Ale nan SOME Santral CESFAM ou (Lendi-Jedi jiska 17h, Vandredi jiska 16h).',
    '3. Preparasyon ak Jèn: 8 a 12 èdtan san manje pou san (dlo sèlman). Pou pipi, swiv enstriksyon yo.',
    '4. Rezilta nan COSAM: Rezilta yo disponib sou òdinatè a pou doktè w revize yo nan pwochen randevou.'
  ] : language === 'en' ? [
    '1. Medical Order: Your attending physician issues the order during your consultation.',
    '2. SOME Coordination: Visit the Central SOME at your clinic (Mon-Thu until 17:00, Fri until 16:00).',
    '3. Fasting & Preparation: 8 to 12 hours fasting for blood tests (water only). Follow specific urine guidelines.',
    '4. Results at COSAM: Results are digitally uploaded for your doctor to review at your next appointment.'
  ] : [
    '1. Emisión de Orden: Tu médico tratante emite la orden clínica durante tu control programado.',
    '2. Coordinación en SOME: Acude al SOME Central de tu CESFAM base (Lun-Jue hasta 17h, Vie hasta 16h).',
    '3. Preparación y Ayuno: 8 a 12 horas de ayuno estricto para sangre (solo agua). Para orina, sigue la pauta.',
    '4. Resultados en COSAM: Llegan de forma digital y confidencial a tu ficha para tu siguiente cita médica.'
  ];

  let stepY = y + 10.5;
  steps.forEach(st => {
    doc.text(st, margin + 4, stepY);
    stepY += 5;
  });

  y += 40;

  // Table of Main Exams
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text(
    language === 'ht' ? 'PREPARASYON POU CHAK TIP EGZAMEN:' :
    language === 'en' ? 'PREPARATION INSTRUCTIONS BY EXAM TYPE:' :
    'INDICACIONES DE PREPARACIÓN SEGÚN TIPO DE EXAMEN:',
    margin,
    y
  );

  y += 5;

  const examsList = [
    {
      name: '1. Perfil Bioquímico / Hemograma',
      fasting: 'Ayuno: 8 a 12 horas (solo agua).',
      notes: 'No fumar ni realizar ejercicio intenso antes de la toma de muestra.'
    },
    {
      name: '2. Pruebas Hepáticas (GOT / GPT / GGT)',
      fasting: 'Ayuno: 8 horas estrictas.',
      notes: 'Evitar alimentos grasos y no ingerir alcohol 48 horas antes. Vital para ajuste de fármacos.'
    },
    {
      name: '3. Tamizaje Toxicológico de Orina (Control)',
      fasting: 'Sin ayuno de alimentos.',
      notes: 'Muestra de orina en frasco estéril según protocolo del equipo de adicciones.'
    },
    {
      name: '4. Función Renal y Electrolitos Plasmáticos (ELP)',
      fasting: 'Ayuno: 8 horas.',
      notes: 'Hidratación habitual con agua pura. Evalúa creatinina y electrolitos.'
    },
    {
      name: '5. Electrocardiograma (ECG)',
      fasting: 'Sin ayuno.',
      notes: 'Ropa cómoda de dos piezas. Evitar bebidas energizantes o café 4 horas antes.'
    }
  ];

  examsList.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(item.name, margin + 3, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`${item.fasting} • ${item.notes}`, margin + 3, y + 9.5);

    y += 16.5;
  });

  y += 4;

  // Contact Footer Box
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(67, 56, 202);
  doc.text('¿DUDAS O CONSULTAS CON TUS ÓRDENES?', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(55, 48, 163);
  doc.text(`SOME Central COSAM: ${cosamInfo.phoneSome} • WhatsApp SOME: ${cosamInfo.whatsappFormatted}`, margin + 4, y + 10);
  doc.text(`Dirección: ${cosamInfo.address} • Horario: Lun a Jue 08:00-19:00, Vie 08:00-16:00`, margin + 4, y + 14);

  // Footer Date
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const nowStr = new Date().toLocaleDateString('es-CL');
  doc.text(`Documento informativo COSAM Rinconada • Generado el ${nowStr}`, margin, pageHeight - 7);

  doc.save(`COSAM_Guia_Examenes_Laboratorio_${language.toUpperCase()}.pdf`);
}

export function generateMedicationGuidePdf(language: Language): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(126, 34, 206); // purple-700
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('COSAM RINCONADA - MUNICIPALIDAD DE SAN RAMÓN', margin, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(233, 213, 255);
  doc.text(
    language === 'ht' ? 'Gid pou Retrè Medikaman ak Pwen Distribisyon' :
    language === 'en' ? 'Medication Pickup Guide & Dispensation Points' :
    'Guía de Retiro de Fármacos y Puntos de Dispensación',
    margin,
    18
  );

  let y = 32;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text(
    language === 'ht' ? 'ETAP AK KONDISYON POU RETIRE MEDIKAMAN OU YO' :
    language === 'en' ? 'STEPS AND REQUIREMENTS TO PICK UP YOUR MEDICATION' :
    'PASOS Y REQUISITOS PARA RETIRAR TUS MEDICAMENTOS',
    margin,
    y
  );

  y += 7;

  // 3 Steps Box
  doc.setFillColor(245, 243, 255); // purple-50
  doc.setDrawColor(221, 214, 254); // purple-200
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(107, 33, 168);
  doc.text(
    language === 'ht' ? 'PWOSESIS SENPLIFYE AN 3 ETAP:' :
    language === 'en' ? 'SIMPLIFIED 3-STEP PICKUP PROCESS:' :
    'PROCESO SIMPLIFICADO EN 3 PASOS:',
    margin + 4,
    y + 6
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const steps = language === 'ht' ? [
    '1. Resèt Medikal: Doktè w la ba w yon resèt klinik valab pandan konsiltasyon w nan COSAM.',
    '2. Ale nan Famasi: Ale nan CESFAM ki koresponn selon si se medikaman jeneral oswa kontwole.',
    '3. Kat Idantite (RUT): Prezante pyès idantite fizik pasyan an (oswa otorizasyon si se yon lòt moun).'
  ] : language === 'en' ? [
    '1. Medical Prescription: Your treating physician issues an active clinical prescription at COSAM.',
    '2. Go to Pharmacy: Visit the corresponding clinic depending on general or controlled medication.',
    '3. Valid ID Card: Always present the patient national ID card (or written authorization for third parties).'
  ] : [
    '1. Receta Médica: Tu médico tratante emite tu prescripción clínica vigente en tu control en COSAM.',
    '2. Acude a Farmacia: Dirígete al CESFAM correspondiente según si son fármacos generales o controlados.',
    '3. Cédula Vigente: Presenta cédula de identidad física del paciente (o carnet titular si retira un tercero).'
  ];

  let stepY = y + 13;
  steps.forEach(st => {
    doc.text(st, margin + 4, stepY);
    stepY += 6.5;
  });

  y += 42;

  // Table of Dispensation Centers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(
    language === 'ht' ? 'PWEN DISTRIBISYON SELON KALITE MEDIKAMAN:' :
    language === 'en' ? 'DISPENSATION CENTERS BY MEDICATION TYPE:' :
    'PUNTOS DE FARMACIA SEGÚN TIPO DE MEDICAMENTO:',
    margin,
    y
  );

  y += 6;

  const centersList = [
    {
      name: '1. CESFAM Salvador Allende (Población La Bandera)',
      type: 'Fármacos Generales (Antidepresivos, Estabilizadores, Antipsicóticos)',
      schedule: 'Horario: Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00',
      phone: 'Teléfono SOME: 225769800'
    },
    {
      name: '2. CECOSF Modelo (Sector Modelo, San Ramón)',
      type: 'Fármacos Generales del sector territorial',
      schedule: 'Horario: Lun a Jue 08:00 - 17:00 • Vie 08:00 - 16:00',
      phone: 'Teléfono SOME: 225769850'
    },
    {
      name: '3. CESFAM La Bandera (RETIRO EXCLUSIVO DE BENZODIACEPINAS)',
      type: 'Clonazepam, Diazepam, Lorazepam (Fármacos Controlados con Receta Retenida)',
      schedule: 'Horario: Lun a Vie 08:30 - 16:30',
      phone: 'Teléfono SOME: 225769820'
    }
  ];

  centersList.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(item.name, margin + 3, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(item.name.includes('BENZODIACEPINAS') ? 147 : 21, item.name.includes('BENZODIACEPINAS') ? 51 : 128, item.name.includes('BENZODIACEPINAS') ? 234 : 61);
    doc.text(item.type, margin + 3, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`${item.schedule} • ${item.phone}`, margin + 3, y + 15);

    y += 21;
  });

  y += 4;

  // Contact Footer Box
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(67, 56, 202);
  doc.text('¿DUDAS SOBRE TU RECETA O RENOVACIÓN DE FÁRMACOS?', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(55, 48, 163);
  doc.text(`SOME Central COSAM: ${cosamInfo.phoneSome} • WhatsApp SOME: ${cosamInfo.whatsappFormatted}`, margin + 4, y + 10);
  doc.text(`Dirección: ${cosamInfo.address} • Solicita renovación de recetas con 7 a 10 días de anticipación`, margin + 4, y + 14);

  // Footer Date
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const nowStr = new Date().toLocaleDateString('es-CL');
  doc.text(`Documento informativo COSAM Rinconada • Generado el ${nowStr}`, margin, pageHeight - 7);

  doc.save(`COSAM_Guia_Retiro_Medicamentos_${language.toUpperCase()}.pdf`);
}


