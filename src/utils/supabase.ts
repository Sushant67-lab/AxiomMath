import { createClient } from '@supabase/supabase-js';

// Supabase project credentials provided by user
export const SUPABASE_PROJECT_ID = 'fqfunjlnvmidabjkeggx';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_AAxXc6MkBqyINLFEDsYYGw_fkt82e2f';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Standard RFC4122 UUID generator for UUID primary keys in PostgreSQL/Supabase
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const PENDING_SYNC_KEY = 'axiom_pending_supabase_sync_v1';

export interface SyncUserData {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  target_age?: string;
  last_sign_in_at?: string;
}

/**
 * Save pending sync record in localStorage so no user data is ever lost
 */
function queuePendingSync(user: SyncUserData) {
  try {
    const raw = localStorage.getItem(PENDING_SYNC_KEY);
    const list: SyncUserData[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
    filtered.push(user);
    localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }
}

/**
 * Remove confirmed synced record from queue
 */
function dequeuePendingSync(email: string) {
  try {
    const raw = localStorage.getItem(PENDING_SYNC_KEY);
    if (!raw) return;
    const list: SyncUserData[] = JSON.parse(raw);
    const filtered = list.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }
}

/**
 * Flush all pending sync records to Supabase profiles table
 */
export async function flushPendingSyncQueue() {
  try {
    const raw = localStorage.getItem(PENDING_SYNC_KEY);
    if (!raw) return;
    const list: SyncUserData[] = JSON.parse(raw);
    for (const item of list) {
      await syncUserToSupabaseTables(item);
    }
  } catch {
    // ignore
  }
}

// Background auto-retry flusher every 20 seconds
if (typeof window !== 'undefined') {
  setInterval(() => {
    flushPendingSyncQueue().catch(() => {});
  }, 20000);
}

/**
 * Helper to record or sync user details into Supabase backend database tables.
 * Safely writes to the existing `profiles` table matching the user's exact schema columns.
 */
export async function syncUserToSupabaseTables(userData: SyncUserData) {
  // Ensure ID is a valid UUID
  const validUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userData.id)
    ? userData.id
    : generateUUID();

  const payload = {
    id: validUUID,
    username: userData.username,
    email: userData.email,
    avatar: userData.avatar || 'euler',
    target_age: userData.target_age || '16-18',
    updated_at: new Date().toISOString(),
  };

  queuePendingSync({ ...userData, id: validUUID });

  try {
    const { data, error: profileErr } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' });

    if (profileErr) {
      console.warn('Supabase profiles sync note:', profileErr.message);
      return { success: false, error: profileErr.message, code: profileErr.code };
    }

    // Successfully saved to Supabase profiles table!
    dequeuePendingSync(userData.email);
    return { success: true, table: 'profiles', data };
  } catch (err: any) {
    console.warn('Supabase profiles sync exception:', err?.message);
    return { success: false, error: err?.message };
  }
}
