import { SearchBox, SearchProvider } from '@elastic/react-search-ui';
import config from './config';

const SEARCH_PAGE = '/search'

const HomeSearchBox = () => {
  return (
    <SearchProvider
      config={{
        ...config,
        trackUrlState: false
      }}
    >
      <SearchBox
        onSubmit={(searchTerm) => {
          window.location.href = `/search?q=${searchTerm}`;
        }}
      /* autocompleteMinimumCharacters={3}
      autocompleteResults={{
        linkTarget: "_blank",
        sectionTitle: "Results",
        titleField: "result_title",
        urlField: "nps_link",
        shouldTrackClickThrough: true,
        clickThroughTags: ["test"]
      }}
      autocompleteSuggestions={true}
      debounceLength={3} */
      />
    </SearchProvider>
  )
}

export default HomeSearchBox