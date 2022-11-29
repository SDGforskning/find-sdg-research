import {
  Facet,
  SearchProvider,
  Results,
  PagingInfo,
  Paging,
  SearchBox
} from "@elastic/react-search-ui"
import {
  Layout as SearchLayout,
  /* SingleLinksFacet, */
  BooleanFacet,
  /* SingleSelectFacet, */
  MultiCheckboxFacet,
  /* Sorting */
} from "@elastic/react-search-ui-views"
import SDGResultView from './SDGResultView'
import MappedLabelsFacet from './MappedLabelsFacet'
import ClearFilter from './ClearFilter'
import config from './config'
import { sdgActionLabelMapping, sdgActionTargetLabelMapping, sdgTopicLabelMapping, sdgTopicTargetLabelMapping } from 'lib/sdgMappings'
import { mentionsMapping } from 'lib/mentionsMapping'
import { npifagfeltMapping } from 'lib/npifagfeltMapping'
import { categoryMapping, subcategoryMapping } from 'lib/pubtypeMappings'


const Search = () => {
  return (
    <div className="w-full">
      <SearchProvider config={config}>
        <SearchLayout
          bodyHeader={
            <>
              <PagingInfo />
              <Paging />
            </>
          }
          sideContent={
            <div>
              <ClearFilter />
              <Facet
                field="openlinkfound.keyword"
                label="Fulltext found"
                view={BooleanFacet}
              />
              {/* <Facet
                field="OA_status_calc.keyword"
                label="Open Access Status"
              /> */}
              <Facet
                field="language.keyword"
                label="Language"
              />
              <Facet
                field="mentionssdgno.keyword"
                label="Mentions"
                view={MappedLabelsFacet}
                mapping={mentionsMapping}
              />
              {/* <Facet
                field="mentionsNorway.keyword"
                label="Mentions Norway"
                view={BooleanFacet}
              />
              <Facet
                field="mentionsSDG.keyword"
                label="Mentions SDG"
                view={BooleanFacet}
              /> */}
              <Facet
                field="SDG_topic.keyword"
                label="SDG Topic"
                show={20}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgTopicLabelMapping}
                filterType="any"
              //isFilterable={true}
              />
              <Facet
                field="SDG_target_topic.keyword"
                label="SDG Topic Target"
                show={5}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgTopicTargetLabelMapping}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="SDG_action.keyword"
                label="SDG Action"
                show={20}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgActionLabelMapping}
                filterType="any"
              //isFilterable={true}
              />
              <Facet
                field="SDG_target_action.keyword"
                label="SDG Action Target"
                show={5}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgActionTargetLabelMapping}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="scientific_result.keyword"
                label="Scientific (NVI)"
                view={BooleanFacet}
              />
              {<Facet
                field="category.keyword"
                label="Publication type"
                view={MappedLabelsFacet}
                mapping={categoryMapping}
              />}
              <Facet
                field="subcategory.keyword"
                label="Publication subtype"
                view={MappedLabelsFacet}
                mapping={subcategoryMapping}
                show={5}
              />
              <Facet
                field="year.keyword"
                label="Year"
              />
              <Facet
                field="nvi_level_historical.keyword"
                label="NVI level"
                view={MappedLabelsFacet}
                mapping={{
                  "1.0": {
                    en: "1",
                    no: "1",
                  },
                  "2.0": {
                    en: "2",
                    no: "2",
                  }
                }}
              />
              <Facet
                field="scientific_field_npi.keyword"
                label="Scientific field"
                show={10}
                view={MappedLabelsFacet}
                mapping={npifagfeltMapping}
                filterType="any"
                isFilterable={true}
              />
            </div>
          }
          header={
            <>
              <SearchBox
                /* autocompleteMinimumCharacters={3}
                autocompleteResults={{
                  linkTarget: "_blank",
                  sectionTitle: "Results",
                  titleField: "result_title",
                  urlField: "result_id",
                  shouldTrackClickThrough: true,
                  clickThroughTags: ["test"]
                }}
                autocompleteSuggestions={true}
                debounceLength={0} */
                // TODO heller ha eksempel
                inputProps={{
                  placeholder: "e.g. wind power"
                }}
              />
              {/* <Sorting /> */}
            </>
          }
          bodyContent={<Results resultView={SDGResultView} />}
          bodyFooter={
            <>
              <PagingInfo />
              <Paging />
            </>
          }
        />
      </SearchProvider>
    </div>
  );
};

export default Search;
