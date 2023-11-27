import { withSearch } from "@elastic/react-search-ui";
import { useRouter } from 'next/router';

function ClearFilters({ filters, clearFilters }) {
  const { locale } = useRouter();

  if (filters?.length === 0) return (
    <div className='my-3'>
      <button
        onClick={() => clearFilters()}
        className={`disabled:opacity-50 text-sm inline-flex items-center leading-sm bg-red-200 dark:bg-red-800 px-2 lg:py-1 rounded`}
        disabled
      >
        {(locale === 'en' && filters.length === 0)
          ? `No filters chosen`
          : `Ingen filter valgt`
        }

      </button>
    </div>
  )

  return (
    <div className='my-3'>
      <button
        onClick={() => clearFilters()}
        className={`disabled:opacity-25 text-sm inline-flex items-center leading-sm bg-red-200 dark:bg-red-800 px-2 lg:py-1 rounded`}
        disabled={filters.length === 0}
      >
        {(locale === 'en' && filters.length != 0)
          ? `Clear ${filters.length} filter(s)`
          : `Fjern ${filters.length} filter`
        }

      </button>
    </div>
  );
}

export default withSearch(({ filters, clearFilters }) => ({
  filters,
  clearFilters
}))(ClearFilters);