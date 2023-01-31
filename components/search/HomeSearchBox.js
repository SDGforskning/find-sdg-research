import { SearchBox, SearchProvider } from '@elastic/react-search-ui';
import { useRouter } from 'next/router';
import config from './config';

const HomeSearchBox = () => {
  const { locale } = useRouter();

  return (
    <SearchProvider
      config={{
        ...config,
        trackUrlState: false
      }}
    >
      <SearchBox
        onSubmit={(searchTerm) => {
          window.location.href = `/sok?q=${searchTerm}`;
        }}
        inputProps={{
          placeholder: locale === 'en'
            ? "Search within publication title, e.g. wind power"
            : "Søk i publikasjonstittel, f.eks. vindkraft"
        }}
      />
    </SearchProvider>
  )
}

export default HomeSearchBox
