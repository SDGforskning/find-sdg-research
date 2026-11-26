import { existsSync } from "node:fs";

function hasPrivateKey(...names: string[]) {
  if (existsSync(".env.keys")) return true;
  return names.some((name) => Boolean(process.env[name]));
}

export async function registerNodeEnv() {
  // CI sets placeholder ES_HOST and ES_APIKEY. Decrypting here would replace
  // them, and overload is on. Skip when no private key is available.
  // `.env.production` decrypts with DOTENV_PRIVATE_KEY_PRODUCTION.
  const { config } = await import("@dotenvx/dotenvx");
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production") {
    if (!hasPrivateKey("DOTENV_PRIVATE_KEY", "DOTENV_PRIVATE_KEY_PRODUCTION")) {
      return;
    }
    config({ path: [".env.production", ".env"], overload: true });
    return;
  }

  if (!hasPrivateKey("DOTENV_PRIVATE_KEY")) return;
  config({ path: [".env"], overload: true });
}
