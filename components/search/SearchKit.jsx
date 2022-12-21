import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import createClient from "@searchkit/instantsearch-client";

const searchClient = createClient({
  url: "/api/searchkit",
});

export default function SearchKit() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="sdg"
    >
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}