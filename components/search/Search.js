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
import { languageMapping } from 'lib/languageMapping'
import { useRouter } from 'next/router'


const Search = () => {
  const { locale } = useRouter()
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
                label={locale === 'en' ? "Fulltext found" : "Fulltekst funnet"}
                view={BooleanFacet}
              />
              {/* <Facet
                field="OA_status_calc.keyword"
                label="Open Access Status"
              /> */}
              <Facet
                field="language.keyword"
                label={locale === 'en' ? "Language" : "Språk"}
                view={MappedLabelsFacet}
                mapping={languageMapping}
              />
              <Facet
                field="mentionssdgno.keyword"
                label={locale === 'en' ? "Mentions" : "Nevner"}
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
                label={locale === 'en' ? "SDG Topic" : "SDG tema"}
                show={20}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgTopicLabelMapping}
                filterType="any"
              //isFilterable={true}
              />
              <Facet
                field="SDG_target_topic.keyword"
                label={locale === 'en' ? "SDG Topic, targets" : "SDG tema, delmål"}
                show={5}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgTopicTargetLabelMapping}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="SDG_action.keyword"
                label={locale === 'en' ? "SDG Action" : "SDG handling"}
                show={20}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgActionLabelMapping}
                filterType="any"
              //isFilterable={true}
              />
              <Facet
                field="SDG_target_action.keyword"
                label={locale === 'en' ? "SDG Action, targets" : "SDG handling, delmål"}
                show={5}
                /* view={MultiCheckboxFacet} */
                view={MappedLabelsFacet}
                mapping={sdgActionTargetLabelMapping}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="scientific_result.keyword"
                label={locale === 'en' ? "Scientific (NVI)" : "Vitenskapelig (NVI)"}
                view={BooleanFacet}
              />
              {<Facet
                field="category.keyword"
                label={locale === 'en' ? "Publication type" : "Publikasjonstype"}
                view={MappedLabelsFacet}
                mapping={categoryMapping}
              />}
              <Facet
                field="subcategory.keyword"
                label={locale === 'en' ? "Publication subtype" : "Underkategori"}
                view={MappedLabelsFacet}
                mapping={subcategoryMapping}
                show={5}
              />
              <Facet
                field="year.keyword"
                label={locale === 'en' ? "Year" : "År"}
              />
              <Facet
                field="nvi_level_historical.keyword"
                label={locale === 'en' ? "NVI level" : "NVI nivå"}
                view={MappedLabelsFacet}
                mapping={{
                  "1.0": {
                    en: "Level 1",
                    no: "Nivå 1",
                  },
                  "2.0": {
                    en: "Level 2",
                    no: "Nivå 2",
                  }
                }}
              />
              <Facet
                field="scientific_field_npi.keyword"
                label={locale === 'en' ? "Scientific field" : "Fagfelt (NPI)"}
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
