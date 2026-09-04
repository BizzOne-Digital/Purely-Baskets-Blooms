interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  retryAfterMs?: number;
}

const store = new Map<string, RateLimitEntry>();

function cleanupExpired(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function rateLimit(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  if (store.size > 10000) {
    cleanupExpired();
  }

  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      remaining: options.limit - 1,
      resetAt,
    };
  }

  if (existing.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterMs: existing.resetAt - now,
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    success: true,
    remaining: options.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}

export function getClientIdentifier(
  headers: Headers,
  fallback = "anonymous"
): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? fallback;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  return fallback;
}

export function createRateLimitResponse(retryAfterMs: number): Response {
  const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
  return new Response(
    JSON.stringify({
      error: "Too many requests. Please try again later.",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSeconds),
      },
    }
  );
}
