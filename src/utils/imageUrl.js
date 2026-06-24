const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || '';

/**
 * Resolve a question imageUrl to a fully qualified URL.
 * Handles three cases:
 *   1. Already a full URL (http/https) - return as-is
 *   2. Relative path starting with '/' - prepend API base
 *   3. Key-only string (no slash prefix, no protocol) - treat as R2 key
 *
 * Returns null for invalid/corrupt values like "[object Object]"
 */
export function resolveImageUrl(imageUrl) {
  if (!imageUrl) return null;

  if (typeof imageUrl !== 'string') return null;

  const trimmed = imageUrl.trim();

  if (!trimmed || trimmed === '[object Object]') return null;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return `${API_BASE}${trimmed}`;
  }

  return `${R2_PUBLIC_URL}/${trimmed}`;
}
