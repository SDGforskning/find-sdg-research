import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  localeMap: {
    // [locale]: Orama options
    no: { language: "norsk" },
    en: { language: "english" },
  },
});
