// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { config } = await import('@dotenvx/dotenvx');

    const vercelEnv = process.env.VERCEL_ENV;

    if (vercelEnv === 'production') {
      config({ path: ['.env.production', '.env'], overload: true });
    } else {
      config({ path: ['.env'], overload: true });
    }
  }
}