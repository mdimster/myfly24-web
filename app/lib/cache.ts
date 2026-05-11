/**
 * In-Memory Cache für Reise-Empfehlungen
 * Beta-Version: Für Production → Redis umstellen
 *
 * Cached die finale Sonnet-Empfehlung basierend auf
 * den gehashten User-Antworten (Ziel + Prioritäten + Bedenken)
 */

import { createHash } from "crypto";

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const TTL_MS = 12 * 60 * 60 * 1000; // 12 Stunden

// Cleanup alle 10 Minuten
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (entry.expiresAt < now) cache.delete(key);
  }
}, 10 * 60 * 1000);

export function cacheKey(answers: string[]): string {
  const normalized = answers
    .map((a) => a.toLowerCase().trim())
    .join("|");
  return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

export function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCache(key: string, value: string): void {
  cache.set(key, { value, expiresAt: Date.now() + TTL_MS });
}

export function cacheStats(): { size: number; keys: string[] } {
  return { size: cache.size, keys: [...cache.keys()] };
}
