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
          window.location.href = locale === 'en' ? `/sok?q=${searchTerm}&size=n_20_n&filters%5B0%5D%5Bfield%5D=fulltext_found.keyword&filters%5B0%5D%5Bvalues%5D%5B0%5D=true&filters%5B0%5D%5Btype%5D=all` : `/sok?q=${searchTerm}&size=n_20_n&filters%5B0%5D%5Bfield%5D=fulltext_found.keyword&filters%5B0%5D%5Bvalues%5D%5B0%5D=true&filters%5B0%5D%5Btype%5D=all`;
        }}
        view={({ value, onChange, onSubmit }) => (
          <div >
            <form className='w-full flex gap-2' onSubmit={onSubmit}>
              <input
                className='flex-grow border border-neutral-400 dark:border-white rounded p-3'
                type="text"
                value={value}
                placeholder={locale === 'en'
                  ? "Search within publication title, e.g. fiskeri fishery fisheries"
                  : "Søk i publikasjonstittel, f.eks. fiskeri fishery fisheries"}
                onChange={(e) => onChange(e.target.value)}
              />
              <button
                className='!bg-blue-700 text-white font-bold border-white rounded py-3 px-5'
                type="submit"
              >
                {locale === 'en'
                  ? "Search"
                  : "Søk"}
              </button>
            </form>
          </div>
        )}
      />
    </SearchProvider>
  )
}

export default HomeSearchBox
