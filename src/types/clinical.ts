export type Language = 'es' | 'ht' | 'en';

export interface TeamSection {
  id: string;
  title: string;
  role: string;
  names: string;
  description: string;
  iconName: 'award' | 'clipboard-list' | 'stethoscope' | 'brain' | 'network';
}

export interface Workshop {
  id: string;
  workshopNumber?: number;
  quadrant?: number;
  title: string;
  schedule: string;
  facilitator: string;
  category: string;
  description: string;
  pdfTitle: string;
  pdfType: 'craving' | 'thoughts' | 'motor' | 'weekend';
  audioScript?: string;
}

export interface MedicationCenter {
  id: string;
  name: string;
  sector: string;
  address: string;
  type: 'general' | 'benzos';
  badge?: string;
  schedule?: string;
  phone: string;
  phoneFormatted?: string;
  wazeUrl: string;
  mapsUrl: string;
}

export interface CosamInfo {
  name: string;
  subtitle: string;
  program: string;
  welcomeMessage: string;
  phoneSome: string;
  phoneFormatted?: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  address: string;
  mapsUrl: string;
  wazeUrl?: string;
  hours: {
    weekdays: string;
    friday: string;
    note: string;
  };
}

export interface UrgencyContact {
  label: string;
  number: string;
  telUri: string;
  description?: string;
  isPrimary?: boolean;
}

export interface UrgencyHospital {
  id: string;
  name: string;
  type: string;
  badge?: string;
  address: string;
  phone: string;
  phoneFormatted: string;
  schedule: string;
  wazeUrl: string;
  mapsUrl: string;
  isHospital?: boolean;
}

export interface HealthCenterInfo {
  id: string;
  name: string;
  role: string;
  badge: string;
  address: string;
  phone: string;
  phoneFormatted: string;
  labHours: string;
  someHours: string;
  wazeUrl: string;
  mapsUrl: string;
}

export interface LegalArticle {
  number: string;
  title: string;
  text: string;
}

export interface LegalLawDoc {
  lawNumber: string;
  officialTitle: string;
  summary: string;
  promulgationDate: string;
  keyPoints: string[];
  articles: LegalArticle[];
}

export interface RightsAcknowledgment {
  id: string;
  rutOrRecord: string;
  patientName?: string;
  acceptedAt: string;
  timestamp: number;
  ipMock?: string;
  language: Language;
}

export interface LabExamInfo {
  id: string;
  title: string;
  category: 'sangre' | 'orina' | 'cardiaco' | 'especial';
  fastingHours: number;
  preparationBadge?: string;
  instructions: string;
  coordinationPlace: string;
  estimatedDays: string;
}

export type ActiveTab = 
  | 'home' 
  | 'team' 
  | 'workshops' 
  | 'exams' 
  | 'meds' 
  | 'rights' 
  | 'urgency' 
  | 'team_workshops' 
  | 'services';
