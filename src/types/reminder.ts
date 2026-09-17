export type ReminderType = 
  | 'medication' 
  | 'medical_appointment' 
  | 'therapy_appointment' 
  | 'workshop' 
  | 'lab_exam' 
  | 'custom';

export type ReminderAnticipation = 0 | 15 | 60 | 120 | 1440; // in minutes

export interface Reminder {
  id: string;
  title: string;
  type: ReminderType;
  dateTime: string; // ISO string YYYY-MM-DDTHH:mm
  remindMinutesBefore: ReminderAnticipation;
  centerName?: string;
  notes?: string;
  createdAt: string;
  notified: boolean;
  active: boolean;
}

export type NotificationPermissionState = 'granted' | 'denied' | 'default' | 'unsupported';
