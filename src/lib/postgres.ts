import { Pool } from "pg";

declare global {
  var registrationPool: Pool | undefined;
}

function normalizeConnectionString(connectionString: string): string {
  const trimmed = connectionString.trim();
  if (!trimmed) {
    throw new Error("SUPABASE_DB_URL is empty.");
  }

  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    // Continue with fallback parsing.
  }

  const bracketPasswordMatch =
    /^(postgres(?:ql)?):\/\/([^:]+):\[(.+)\]@([^/]+)\/(.+)$/.exec(trimmed);
  if (!bracketPasswordMatch) {
    throw new Error(
      "SUPABASE_DB_URL is invalid. Use a valid postgres URL or the bracket-password format.",
    );
  }

  const [, protocol, username, password, hostWithPort, database] =
    bracketPasswordMatch;

  return `${protocol}://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${hostWithPort}/${database}`;
}

export function getRegistrationPool(): Pool {
  if (globalThis.registrationPool) {
    return globalThis.registrationPool;
  }

  const connectionString = process.env.SUPABASE_DB_URL;
  if (!connectionString) {
    throw new Error("SUPABASE_DB_URL is not set.");
  }

  const normalizedConnectionString = normalizeConnectionString(connectionString);
  const hasLocalHost =
    normalizedConnectionString.includes("localhost") ||
    normalizedConnectionString.includes("127.0.0.1");

  const pool = new Pool({
    connectionString: normalizedConnectionString,
    ssl: hasLocalHost ? undefined : { rejectUnauthorized: false },
  });

  globalThis.registrationPool = pool;
  return pool;
}
