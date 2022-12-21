import createClient from "@searchkit/instantsearch-client";

export const searchkitClient = createClient({
  url: "/api/searchkit",
});