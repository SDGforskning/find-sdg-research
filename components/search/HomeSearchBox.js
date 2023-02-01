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
        view={({ value, onChange, onSubmit }) => (
          <div >
            <form className='w-full flex gap-2' onSubmit={onSubmit}>
              <input
                className='flex-grow border border-white rounded p-3'
                type="text"
                value={value}
                placeholder={locale === 'en'
                  ? "Search within publication title, e.g. wind power"
                  : "Søk i publikasjonstittel, f.eks. vindkraft"}
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
