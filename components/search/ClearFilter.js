import { withSearch } from "@elastic/react-search-ui";

function ClearFilters({ filters, clearFilters }) {
  return (
    <div className='mb-3'>
      <button onClick={() => clearFilters()}>
        Clear {filters.length} Filters
      </button>
    </div>
  );
}

export default withSearch(({ filters, clearFilters }) => ({
  filters,
  clearFilters
}))(ClearFilters);