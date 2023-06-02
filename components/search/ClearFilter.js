import { withSearch } from "@elastic/react-search-ui";
import { useRouter } from 'next/router';

function ClearFilters({ filters, clearFilters }) {
  const locale = useRouter();
  return (
    <div className='my-3'>
      <button
        onClick={() => clearFilters()}
        className='text-sm inline-flex items-center leading-sm bg-slate-200 dark:bg-slate-800 px-2 lg:py-1 rounded'
      >
        {locale === 'en'
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