import { Reminder, ReminderType, ReminderAnticipation, NotificationPermissionState } from '../types/reminder';

const STORAGE_KEY = 'cosam_reminders_v1';

// Gentle chime using Web Audio API
export function playNotificationSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // First bell tone (D5 - 587.33Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Second chime tone (A5 - 880Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15);
    gain2.gain.setValueAtTime(0, now + 0.15);
    gain2.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.8);
  } catch (e) {
    console.warn('Audio chime non-fatal error:', e);
  }
}

export const playGentleNotificationSound = playNotificationSound;

// Get current browser notification permission
export function getNotificationPermission(): NotificationPermissionState {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission as NotificationPermissionState;
}

// Request permission
export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const perm = await Notification.requestPermission();
    return perm as NotificationPermissionState;
  } catch (error) {
    console.warn('Error requesting notification permission:', error);
    return Notification.permission as NotificationPermissionState;
  }
}

// Send a web browser notification (Web Push / Service Worker or desktop Notification API)
export async function sendBrowserNotification(
  title: string,
  options?: {
    body?: string;
    icon?: string;
    badge?: string;
    tag?: string;
    data?: unknown;
  }
): Promise<boolean> {
  playNotificationSound();

  const defaultOptions: NotificationOptions = {
    body: options?.body || 'Recordatorio de salud COSAM Rinconada',
    icon: options?.icon || '/icon.svg',
    badge: options?.badge || '/icon.svg',
    tag: options?.tag || 'cosam-reminder',
    data: options?.data || '/',
  };

  // Check permission
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  // 1. Try Service Worker showNotification (Web Push standard)
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration && registration.showNotification) {
        await registration.showNotification(title, defaultOptions);
        return true;
      }
    } catch (swErr) {
      console.warn('SW showNotification failed, falling back to Notification API:', swErr);
    }
  }

  // 2. Direct Notification API fallback
  try {
    const notification = new Notification(title, defaultOptions);
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    return true;
  } catch (err) {
    console.warn('Direct Notification API failed:', err);
    return false;
  }
}

// Stored Reminders in LocalStorage
export function getStoredReminders(): Reminder[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Reminder[];
  } catch (err) {
    console.error('Error reading stored reminders:', err);
    return [];
  }
}

export function saveStoredReminders(reminders: Reminder[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch (err) {
    console.error('Error saving reminders:', err);
  }
}

export function addReminder(
  item: Omit<Reminder, 'id' | 'createdAt' | 'notified' | 'active'>
): Reminder {
  const current = getStoredReminders();
  const newReminder: Reminder = {
    ...item,
    id: `rem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    notified: false,
    active: true,
  };
  const updated = [newReminder, ...current];
  saveStoredReminders(updated);
  return newReminder;
}

export function deleteReminder(id: string): Reminder[] {
  const current = getStoredReminders();
  const updated = current.filter((r) => r.id !== id);
  saveStoredReminders(updated);
  return updated;
}

export function toggleReminderActive(id: string): Reminder[] {
  const current = getStoredReminders();
  const updated = current.map((r) => {
    if (r.id === id) {
      return { ...r, active: !r.active };
    }
    return r;
  });
  saveStoredReminders(updated);
  return updated;
}

export function markReminderNotified(id: string): Reminder[] {
  const current = getStoredReminders();
  const updated = current.map((r) => {
    if (r.id === id) {
      return { ...r, notified: true };
    }
    return r;
  });
  saveStoredReminders(updated);
  return updated;
}

export function snoozeReminder(id: string, minutes: number = 15): Reminder[] {
  const current = getStoredReminders();
  const updated = current.map((r) => {
    if (r.id === id) {
      const newDate = new Date(Date.now() + minutes * 60 * 1000).toISOString().slice(0, 16);
      return { ...r, dateTime: newDate, notified: false, active: true, remindMinutesBefore: 0 as ReminderAnticipation };
    }
    return r;
  });
  saveStoredReminders(updated);
  return updated;
}

// Calculate when a reminder should fire
export function getReminderTriggerTimestamp(reminder: Reminder): number {
  const targetTime = new Date(reminder.dateTime).getTime();
  const anticipationMs = (reminder.remindMinutesBefore || 0) * 60 * 1000;
  return targetTime - anticipationMs;
}

// Format date time helper
export function formatReminderDateTime(isoString: string, lang: string = 'es'): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString(lang === 'ht' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'es-CL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

// Check for due reminders and trigger browser notification & sound
export async function checkDueReminders(lang: string = 'es'): Promise<Reminder | null> {
  if (typeof window === 'undefined') return null;
  const reminders = getStoredReminders();
  const now = Date.now();

  for (const r of reminders) {
    if (r.active && !r.notified) {
      const triggerTime = getReminderTriggerTimestamp(r);
      // Trigger if current time is past the scheduled anticipation threshold (within 6 hours)
      if (now >= triggerTime && now - triggerTime < 6 * 60 * 60 * 1000) {
        // Play notification sound
        playGentleNotificationSound();

        // Send native browser notification
        const notificationTitle = `🔔 COSAM: ${r.title}`;
        const notificationBody = `${r.centerName ? `${r.centerName} • ` : ''}${r.notes || (lang === 'ht' ? 'Rapèl sante COSAM' : lang === 'en' ? 'Scheduled health reminder' : 'Recordatorio de salud programado')}`;
        await sendBrowserNotification(notificationTitle, { body: notificationBody });

        // Mark as notified in storage
        markReminderNotified(r.id);
        return r;
      }
    }
  }

  return null;
}

