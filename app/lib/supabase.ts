// ─────────────────────────────────────────────────────────────
// Supabase — the studio's shared database (orders, projects, comments)
// and Storage (moodboard images). Talks to the REST/Storage API directly
// with fetch, so it works from the static site with no SDK.
//
// The publishable key is PUBLIC (safe in the browser). Security is enforced
// by Row Level Security policies on the database side.
// ─────────────────────────────────────────────────────────────
export const SUPABASE_URL = "https://ixorodujgnzscwgartki.supabase.co";
export const SUPABASE_KEY = "sb_publishable_BjW05D0rS7EM9r8C-8JZvA_UROm2l_j";
export const MOODBOARD_BUCKET = "moodboards";

const REST = `${SUPABASE_URL}/rest/v1`;

function headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra,
  };
}

/** GET one row (or null) by column filter, e.g. sbGetOne("projects", "code", "OAK-1234"). */
export async function sbGetOne<T>(table: string, col: string, val: string): Promise<T | null> {
  const res = await fetch(`${REST}/${table}?${col}=eq.${encodeURIComponent(val)}&select=*`, {
    headers: headers(),
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as T[];
  return rows[0] ?? null;
}

/** GET all rows from a table (ordered). */
export async function sbList<T>(table: string, order = "created_at.desc"): Promise<T[]> {
  const res = await fetch(`${REST}/${table}?select=*&order=${order}`, { headers: headers() });
  if (!res.ok) return [];
  return (await res.json()) as T[];
}

/** INSERT a row and return the created record. */
export async function sbInsert<T>(table: string, row: Record<string, unknown>): Promise<T | null> {
  const res = await fetch(`${REST}/${table}`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify(row),
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as T[];
  return rows[0] ?? null;
}

/** PATCH a row matched by column filter, return the updated record. */
export async function sbUpdate<T>(
  table: string,
  col: string,
  val: string,
  patch: Record<string, unknown>
): Promise<T | null> {
  const res = await fetch(`${REST}/${table}?${col}=eq.${encodeURIComponent(val)}`, {
    method: "PATCH",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as T[];
  return rows[0] ?? null;
}

/** Upload a moodboard image to Storage and return its public URL. */
export async function uploadMoodboardImage(file: File, code: string): Promise<string | null> {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${code}/${Date.now()}-${safe}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${MOODBOARD_BUCKET}/${path}`, {
    method: "POST",
    headers: headers({ "Content-Type": file.type || "application/octet-stream" }),
    body: file,
  });
  if (!res.ok) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/${MOODBOARD_BUCKET}/${path}`;
}
