import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const extensions = [".ts", ".tsx", ".js", ".mjs"];

export function resolve(specifier, context, nextResolve) {
  const isRelative = specifier.startsWith("./") || specifier.startsWith("../");
  if (isRelative && !path.extname(specifier) && context.parentURL) {
    const base = path.resolve(
      path.dirname(fileURLToPath(context.parentURL)),
      specifier,
    );
    const extension = extensions.find((ext) => existsSync(base + ext));
    if (extension) return nextResolve(`${specifier}${extension}`, context);
  }
  return nextResolve(specifier, context);
}
