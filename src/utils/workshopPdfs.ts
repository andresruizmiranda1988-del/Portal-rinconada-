import { jsPDF } from 'jspdf';
import { Language } from '../types/clinical';
import { cosamInfo } from '../data/cosamData';

// Helper to draw clean institutional header
function drawPdfHeader(doc: jsPDF, title: string, subtitle: string, categoryTag: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Header Banner
  doc.setFillColor(126, 34, 206); // Purple (#7e22ce)
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Institution text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('COSAM RINCONADA - SAN RAMÓN', margin, 11);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Programa de Tratamiento en Adicciones • Inclusión SENDA & Red Sur Oriente', margin, 17);
  doc.text(`${title.toUpperCase()} • ${categoryTag}`, margin, 23);

  // Subtitle bar
  doc.setFillColor(243, 232, 255);
  doc.rect(0, 28, pageWidth, 8, 'F');
  doc.setTextColor(107, 33, 168);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(subtitle, margin, 33.5);
}

// Helper to draw institutional footer
function drawPdfFooter(doc: jsPDF, docCode: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(
    `SOME COSAM: ${cosamInfo.phoneSome} • WhatsApp: ${cosamInfo.whatsappFormatted} • Urgencias: *4141 | 1412 (SENDA) | 131`,
    margin,
    pageHeight - 9
  );
  doc.text(
    `Código: ${docCode} • ${new Date().toLocaleDateString('es-CL')}`,
    pageWidth - margin - 45,
    pageHeight - 9
  );
}

/**
 * 1. PDF DEL CRONOGRAMA OFICIAL DE TALLERES (TABLA COMPLETA IMPRIMIBLE)
 */
export function downloadWorkshopSchedulePdf(language: Language = 'es') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  drawPdfHeader(
    doc,
    'Cronograma Oficial de Talleres Terapéuticos',
    'Ciclo 2026 • Espacios Grupales de Rehabilitación y Psicoeducación',
    'DOCUMENTO OFICIAL'
  );

  let y = 42;

  // Intro paragraph
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ESTRUCTURA DE TALLERES GRUPALES TERAPÉUTICOS', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const intro = "La participación en talleres constituye un pilar esencial en el proceso terapéutico de rehabilitación e integración comunitaria. A continuación se detallan los 4 cuadrantes psicoeducativos con sus respectivos facilitadores y horarios.";
  const splitIntro = doc.splitTextToSize(intro, contentWidth);
  doc.text(splitIntro, margin, y);
  y += splitIntro.length * 4.5 + 4;

  // Workshop Cards / Table Rows
  const items = [
    {
      q: 'CUADRANTE 1',
      title: 'Psicoeducación Médica y Craving',
      schedule: 'Miércoles de 17:00 a 19:00 hrs',
      team: 'Dr. Andrés Ruiz Miranda (Médico) & T.R. Katherine Astudillo (Coordinadora)',
      focus: 'Neurobiología de la adicción, manejo del craving, técnica Urge Surfing, farmacoterapia y prevención de recaídas.',
      bg: [250, 245, 255],
      border: [192, 132, 252],
      color: [107, 33, 168]
    },
    {
      q: 'CUADRANTE 2',
      title: 'Psicoterapia y Regulación Emocional',
      schedule: 'Miércoles de 17:00 a 19:00 hrs',
      team: 'Ps. Romina Lucero Donoso & Ps. Benjamín Rebolledo (Psicólogos Clínicos)',
      focus: 'Reestructuración cognitiva, modulación del afecto, tolerancia al malestar, estilos de apego y vínculos saludables.',
      bg: [238, 242, 255],
      border: [165, 180, 252],
      color: [67, 56, 202]
    },
    {
      q: 'CUADRANTE 3',
      title: 'Actividad Física y Salud Motora',
      schedule: 'Lunes y Viernes de 10:00 a 12:00 hrs',
      team: 'T.S. Pablo Díaz (Trabajador Social)',
      focus: 'Activación neuromuscular, reducción de cortisol y ansiedad, respiración consciente y hábitos de vida activa.',
      bg: [240, 253, 244],
      border: [134, 239, 172],
      color: [22, 101, 52]
    },
    {
      q: 'CUADRANTE 4',
      title: 'Tiempo Libre, Ocio y Huerto Terapéutico',
      schedule: 'Viernes de 10:00 a 16:00 hrs',
      team: 'T.R. Fernando Carrasco (Terapeuta en Rehabilitación)',
      focus: 'Estructuración de fines de semana seguros, conexión con la naturaleza, huerto agroecológico y resignificación del ocio.',
      bg: [254, 243, 199],
      border: [252, 211, 77],
      color: [146, 64, 14]
    }
  ];

  items.forEach((item) => {
    doc.setFillColor(item.bg[0], item.bg[1], item.bg[2]);
    doc.setDrawColor(item.border[0], item.border[1], item.border[2]);
    doc.roundedRect(margin, y, contentWidth, 31, 2, 2, 'FD');

    // Quadrant label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(item.color[0], item.color[1], item.color[2]);
    doc.text(`${item.q} • ${item.schedule}`, margin + 3.5, y + 5.5);

    // Title
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(item.title, margin + 3.5, y + 11);

    // Facilitators
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('Facilitadores:', margin + 3.5, y + 16.5);
    doc.setFont('helvetica', 'normal');
    doc.text(item.team, margin + 25, y + 16.5);

    // Objective
    doc.setFont('helvetica', 'bold');
    doc.text('Objetivo:', margin + 3.5, y + 22);
    doc.setFont('helvetica', 'normal');
    const splitFocus = doc.splitTextToSize(item.focus, contentWidth - 28);
    doc.text(splitFocus, margin + 18, y + 22);

    y += 35;
  });

  // Important Rules for Attendance
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('NORMAS IMPORTANTES DE ASISTENCIA A TALLERES:', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('• Llegar 10 minutos antes del inicio para registro de asistencia en SOME.', margin + 4, y + 11);
  doc.text('• Mantener confidencialidad de lo compartido por los compañeros en cada sesión.', margin + 4, y + 15.5);
  doc.text('• Si no puedes asistir, avisa con 24 hrs al 225769844 para justificar tu inasistencia.', margin + 4, y + 20);

  drawPdfFooter(doc, 'CRONO-COSAM-2026');
  doc.save(`Cronograma-Talleres-COSAM-Rinconada-${language.toUpperCase()}.pdf`);
}

/**
 * 2. TALLER 1: GUÍA DE MANEJO DEL CRAVING Y URGE SURFING (PDF)
 */
export function downloadCravingGuidePdf(language: Language = 'es') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  drawPdfHeader(
    doc,
    'Guía de Manejo del Craving y Urge Surfing',
    'Cuadrante 1: Psicoeducación Médica • Dr. Andrés Ruiz & Katherine Astudillo',
    'PAUTA CLÍNICA'
  );

  let y = 42;

  // Section 1: Concept
  doc.setTextColor(107, 33, 168);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('¿QUÉ ES EL CRAVING Y CÓMO FUNCIONA LA OLA DEL DESEO?', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const p1 = "El craving o deseo compulsivo es una respuesta neurobiológica transitoria. Se comporta exactamente como una OLA en el mar: inicia suave, sube hasta un punto máximo (pico de intensidad entre 15 y 30 minutos) y luego desciende y desaparece por sí sola. Si no cedes, tu cerebro aprende a extinguir el impulso.";
  const sp1 = doc.splitTextToSize(p1, contentWidth);
  doc.text(sp1, margin, y);
  y += sp1.length * 4.5 + 4;

  // Section 2: 4 Steps of Urge Surfing
  doc.setFillColor(250, 245, 255);
  doc.setDrawColor(192, 132, 252);
  doc.roundedRect(margin, y, contentWidth, 75, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(88, 28, 135);
  doc.text('LOS 4 PASOS DEL "URGE SURFING" (SURFEAR LA OLA)', margin + 4, y + 6);

  const steps = [
    { num: 'Paso 1', title: 'Reconocer y Nombrar:', desc: 'Detente y di mentalmente: "Estoy sintiendo una ola de craving. Es solo una sensación física, no una orden para consumir."' },
    { num: 'Paso 2', title: 'Respiración 4-7-8:', desc: 'Inhala en 4 segundos por la nariz, mantén el aire 7 segundos y exhala lentamente por la boca en 8 segundos. Repite 5 ciclos.' },
    { num: 'Paso 3', title: 'Escanear el Cuerpo sin Juzgar:', desc: '¿Dónde se siente el deseo? ¿En el pecho, estómago, manos o mandíbula? Obsérvalo como un científico curioso: la sensación cambia momento a momento.' },
    { num: 'Paso 4', title: 'Cambio Inmediato de Escenario (Regla de los 20 min):', desc: 'Bebe un vaso de agua fría, lávate la cara, sal a caminar o llama a una persona de confianza de tu red de apoyo hasta que la ola rompa.' }
  ];

  let sy = y + 13;
  steps.forEach((s) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(126, 34, 206);
    doc.text(`${s.num}: ${s.title}`, margin + 4, sy);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const sp = doc.splitTextToSize(s.desc, contentWidth - 8);
    doc.text(sp, margin + 4, sy + 4.2);
    sy += 14.5;
  });

  y += 82;

  // Section 3: Visual Scale & Self-Check
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(153, 27, 27);
  doc.text('REGISTRO PERSONAL DE INTENSIDAD (ESCALA 1 A 10)', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('Gatillante identificado (lugar, emoción, persona): ________________________________________________', margin + 4, y + 13);
  doc.text('Intensidad inicial al aparecer la ola (1 al 10): [   ]   •   Intensidad a los 20 minutos: [   ]', margin + 4, y + 19);
  doc.text('Acción saludable realizada para surfear la ola: ________________________________________________', margin + 4, y + 25);
  doc.text('¿Pudiste mantenerte seguro?   [  ] SÍ, lo logré   [  ] Necesité apoyo de mi red / SOME', margin + 4, y + 31);

  y += 44;

  // Emergency Reminder
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(134, 239, 172);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 101, 52);
  doc.text('SI LA CRISIS ES SEVERA O DESBORDANTE:', margin + 4, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Llama inmediatamente al Fono Drogas y Alcohol SENDA 1412 (gratis 24/7) o al *4141.', margin + 4, y + 11.5);

  drawPdfFooter(doc, 'GUIA-CRAVING-W1');
  doc.save(`Guia-Manejo-Craving-UrgeSurfing-${language.toUpperCase()}.pdf`);
}

/**
 * 3. TALLER 2: FICHA DE REESTRUCTURACIÓN DE PENSAMIENTOS (PDF)
 */
export function downloadThoughtRestructuringPdf(language: Language = 'es') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  drawPdfHeader(
    doc,
    'Ficha de Reestructuración de Pensamientos',
    'Cuadrante 2: Psicoterapia y Regulación Emocional • Ps. Romina Lucero & Benjamín Rebolledo',
    'REGISTRO CLÍNICO'
  );

  let y = 42;

  doc.setTextColor(67, 56, 202);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('MODELO COGNITIVO: SITUACIÓN -> PENSAMIENTO -> EMOCIÓN -> CONDUCTA', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const p1 = "No son las situaciones las que nos hacen sufrir, sino la interpretación que hacemos de ellas. Cuando experimentes angustia, rabia o ganas de aislarte, utiliza esta tabla para someter tus pensamientos automáticos a debate.";
  const sp1 = doc.splitTextToSize(p1, contentWidth);
  doc.text(sp1, margin, y);
  y += sp1.length * 4.5 + 4;

  // 5-Column Printable Table
  const tableTop = y;
  const rowHeight = 40;
  const colWidth = contentWidth / 5;

  const cols = [
    { title: '1. SITUACIÓN', subtitle: '¿Qué pasó? ¿Dónde estabas?' },
    { title: '2. PENSAMIENTO', subtitle: '¿Qué te dijiste a ti mismo?' },
    { title: '3. EMOCIÓN', subtitle: '¿Qué sentiste? (Rabia, miedo, pena 0-100%)' },
    { title: '4. DEBATE RACIONAL', subtitle: '¿Es 100% real? ¿Qué le dirías a un amigo?' },
    { title: '5. NUEVO RESULTADO', subtitle: 'Pensamiento adaptativo y nueva conducta' }
  ];

  doc.setFillColor(238, 242, 255);
  doc.rect(margin, tableTop, contentWidth, 12, 'F');
  doc.setDrawColor(165, 180, 252);
  doc.rect(margin, tableTop, contentWidth, rowHeight + 12);

  cols.forEach((col, idx) => {
    const x = margin + idx * colWidth;
    if (idx > 0) doc.line(x, tableTop, x, tableTop + rowHeight + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(67, 56, 202);
    doc.text(col.title, x + 2, tableTop + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    const sub = doc.splitTextToSize(col.subtitle, colWidth - 4);
    doc.text(sub, x + 2, tableTop + 9);
  });

  // Example filled in subtle row
  y = tableTop + rowHeight + 16;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('EJEMPLO GUIADO DE APLICACIÓN:', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('• Situación: Tuve una discusión familiar y me sentí rechazado.', margin + 4, y + 11);
  doc.text('• Pensamiento Trampa: "Todo es mi culpa, nunca voy a cambiar, no tiene sentido seguir."', margin + 4, y + 16);
  doc.text('• Emoción: Frustración 90%, Culpa 85%, Impulso de aislamiento.', margin + 4, y + 21);
  doc.text('• Pensamiento Alternativo: "Las discusiones son difíciles, pero un desacuerdo no borra mis avances. Puedo respirar y calmarme."', margin + 4, y + 26);
  doc.text('• Nueva Conducta: Salí a caminar 15 minutos, me di una ducha y esperé a calmarme antes de hablar.', margin + 4, y + 31);

  y += 44;

  // Questions for Socratic questioning
  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(192, 132, 252);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(107, 33, 168);
  doc.text('3 PREGUNTAS CLAVE PARA FRENAR LA RUMIACIÓN:', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('1. ¿Tengo evidencia real y objetiva de que esto es 100% cierto o estoy adivinando el futuro?', margin + 4, y + 11);
  doc.text('2. ¿Qué es lo peor que podría pasar y cómo he salido adelante antes en situaciones similares?', margin + 4, y + 15.5);
  doc.text('3. ¿Pensar esto una y otra vez me acerca a mi bienestar o me desgasta innecesariamente?', margin + 4, y + 20);

  drawPdfFooter(doc, 'FICHA-PSICO-W2');
  doc.save(`Ficha-Reestructuracion-Pensamientos-${language.toUpperCase()}.pdf`);
}

/**
 * 4. TALLER 3: PAUTA DE ACTIVACIÓN MOTORA Y SALUD FÍSICA (PDF)
 */
export function downloadMotorActivationPdf(language: Language = 'es') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  drawPdfHeader(
    doc,
    'Pauta de Activación Motora y Salud Física',
    'Cuadrante 3: Actividad Física y Movimiento • T.S. Pablo Díaz',
    'PAUTA DE BIENESTAR'
  );

  let y = 42;

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('BENEFICIOS DEL MOVIMIENTO EN LA RECUPERACIÓN', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const p1 = "El ejercicio regular estimula la producción de dopamina y endorfinas naturales, promueve la neurogénesis en el hipocampo, reduce la ansiedad basal y mejora la calidad del sueño. No necesitas rutinas agotadoras: 20 a 30 minutos de movimiento diario transforman tu energía.";
  const sp1 = doc.splitTextToSize(p1, contentWidth);
  doc.text(sp1, margin, y);
  y += sp1.length * 4.5 + 4;

  // Daily Routine Boxes
  const routines = [
    {
      title: 'Bloque 1: Activación Matutina (10 min)',
      items: [
        '• Movilidad articular: giros suaves de cuello, hombros y tobillos (2 min).',
        '• Estiramiento de cadena posterior: tocar puntas de pies con respiración relajada (3 min).',
        '• 10 respiraciones diafragmáticas profundas con ventana abierta.'
      ]
    },
    {
      title: 'Bloque 2: Caminata o Ejercicio Aeróbico (20 a 30 min)',
      items: [
        '• Caminata a paso firme en parque o plaza cercana al menos 3 a 4 veces por semana.',
        '• Mantén postura erguida, mirada al frente y ritmo constante.',
        '• Hidrátate con al menos 1 vaso de agua antes y después de salir.'
      ]
    },
    {
      title: 'Bloque 3: Descarga y Relajación Nocturna (10 min)',
      items: [
        '• Estiramiento de espalda baja y flexores de cadera.',
        '• Cero pantallas 30 minutos antes de dormir para permitir el descanso cerebral.',
        '• Registro de gratitud física: agradecer al cuerpo por la energía del día.'
      ]
    }
  ];

  routines.forEach((r) => {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(134, 239, 172);
    doc.roundedRect(margin, y, contentWidth, 25, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(r.title, margin + 4, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    r.items.forEach((it, i) => {
      doc.text(it, margin + 4, y + 10.5 + i * 4.5);
    });

    y += 29;
  });

  // Weekly tracker
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('SEGUIMIENTO SEMANAL DE ACTIVACIÓN:', margin + 4, y + 5.5);

  const days = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
  const dayColW = (contentWidth - 8) / 7;

  days.forEach((d, idx) => {
    const dx = margin + 4 + idx * dayColW;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);
    doc.text(d, dx, y + 12);
    doc.setDrawColor(148, 163, 184);
    doc.rect(dx, y + 14, 12, 7);
  });

  drawPdfFooter(doc, 'PAUTA-MOTOR-W3');
  doc.save(`Pauta-Activacion-Motora-Salud-${language.toUpperCase()}.pdf`);
}

/**
 * 5. TALLER 4: PLANIFICADOR DE FIN DE SEMANA Y OCIO SALUDABLE (PDF)
 */
export function downloadWeekendPlannerPdf(language: Language = 'es') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  drawPdfHeader(
    doc,
    'Planificador de Fin de Semana Seguro y Ocio',
    'Cuadrante 4: Tiempo Libre y Huerto • T.R. Fernando Carrasco',
    'PLAN ESTRATÉGICO'
  );

  let y = 42;

  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ESTRUCTURAR EL TIEMPO LIBRE: EL MEJOR FACTOR PROTECTOR', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const p1 = "Los fines de semana concentran la mayor cantidad de horas desestructuradas y situaciones de riesgo. Tener un plan concreto de actividades gratificantes y una red de contacto activa disminuye el riesgo de recaída y te conecta con tu proyecto de vida.";
  const sp1 = doc.splitTextToSize(p1, contentWidth);
  doc.text(sp1, margin, y);
  y += sp1.length * 4.5 + 4;

  // Weekend Block Planner
  const blocks = [
    {
      day: 'VIERNES TARDE / NOCHE (HORA DE RIESGO: 18:00 A 23:00)',
      fields: [
        '• Actividad protegida planificada: ________________________________________________',
        '• ¿Con quién estaré acompañado?: ________________________________________________',
        '• Lugar seguro donde cenar o descansar: __________________________________________'
      ]
    },
    {
      day: 'SÁBADO MAÑANA & TARDE (PROPÓSITO Y FAMILIA)',
      fields: [
        '• Tareas del hogar / Huerto / Deporte: __________________________________________',
        '• Recreación saludable o paseo: _________________________________________________',
        '• Contacto con persona de confianza: ___________________________________________'
      ]
    },
    {
      day: 'DOMINGO (DESCANSO Y PREPARACIÓN DE SEMANA)',
      fields: [
        '• Horario de sueño y descanso: ___________________________________________________',
        '• Organización de medicamentos y citas de la semana: ___________________________',
        '• Reflexión de cierre de semana en sobriedad: ____________________________________'
      ]
    }
  ];

  blocks.forEach((b) => {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(252, 211, 77);
    doc.roundedRect(margin, y, contentWidth, 27, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(146, 64, 14);
    doc.text(b.day, margin + 4, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    b.fields.forEach((f, i) => {
      doc.text(f, margin + 4, y + 11 + i * 5);
    });

    y += 31;
  });

  // Emergency SOS Buddy Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(margin, y, contentWidth, 25, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(153, 27, 27);
  doc.text('RED DE SEGURIDAD SOS FIN DE SEMANA:', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('• Persona de apoyo 1: ____________________________ Teléfono: ___________________', margin + 4, y + 11);
  doc.text('• Persona de apoyo 2: ____________________________ Teléfono: ___________________', margin + 4, y + 16);
  doc.text('• Teléfonos 24/7 sin costo: Fono SENDA 1412 • Fono Prevención Suicidio *4141 • SAMU 131', margin + 4, y + 21);

  drawPdfFooter(doc, 'PLAN-FINDE-W4');
  doc.save(`Planificador-Fin-De-Semana-Ocio-${language.toUpperCase()}.pdf`);
}

// Aliases
export const downloadThoughtsGuidePdf = downloadThoughtRestructuringPdf;
export const downloadMotorGuidePdf = downloadMotorActivationPdf;
export const downloadSchedulePdf = downloadWorkshopSchedulePdf;
