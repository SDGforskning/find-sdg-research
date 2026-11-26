import { existsSync } from "node:fs";

export async function registerNodeEnv() {
  // CI sets placeholder ES_HOST and ES_APIKEY. Decrypting here would replace
  // them, and overload is on. Skip when no private key is available.
  if (!process.env.DOTENV_PRIVATE_KEY && !existsSync(".env.keys")) {
    return;
  }

  const { config } = await import("@dotenvx/dotenvx");
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production") {
    config({ path: [".env.production", ".env"], overload: true });
  } else {
    config({ path: [".env"], overload: true });
  }
}
