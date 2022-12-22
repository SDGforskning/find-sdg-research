
import { InstantSearch, CurrentRefinements, Stats, Panel, RefinementList, SearchBox, Hits, Pagination, ToggleRefinement, ClearRefinements } from "react-instantsearch-dom";
import { searchkitClient } from './searchkitConfig'
import { SearchKitHitView } from './SearchKitHitView'
import { sdgActionLabelMapping, sdgActionTargetLabelMapping, sdgTopicLabelMapping, sdgTopicTargetLabelMapping } from '../../lib/sdgMappings'
import { mentionsMapping } from '../../lib/mentionsMapping'
import { npifagfeltMapping } from '../../lib/npifagfeltMapping'
import { categoryMapping, subcategoryMapping } from '../../lib/pubtypeMappings'
import { languageMapping } from '../../lib/languageMapping'
import { uniqBy } from 'lodash';
import { useRouter } from 'next/router';

function deduplicate(items) {
  return uniqBy(items, item => item.attribute);
}

export default function SearchKit() {
  const { locale } = useRouter()

  return (
    <InstantSearch
      searchClient={searchkitClient}
      indexName="sdg"
    >
      <SearchBox />
      <div className="flex gap-5">
        <div className="w-1/4">
          <ClearRefinements />

          <Panel header="Openlink found">

            <ToggleRefinement
              attribute="openlinkfound"
              label="Openlink found"
              value={true}
            />
          </Panel>
          <Panel header="Language">
            <RefinementList
              attribute="language"
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: languageMapping[item.label][locale]
                }
              })}
            />
          </Panel>
          <Panel header="Mentions">
            <RefinementList
              attribute="mentionssdgno"
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: mentionsMapping[item.label][locale]
                }
              })}
            />
          </Panel>
          <Panel header="SDG Topics">
            <RefinementList
              attribute="SDG_topic"
              sear
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: sdgTopicLabelMapping[item.label]?.[locale] ? sdgTopicLabelMapping[item.label][locale] : item.label
                }
              })}
            />
          </Panel>
          <Panel header="SDG Topics, Targets">
            <RefinementList
              attribute="SDG_target_topic"
              searchable
              showMore={true}
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: sdgTopicTargetLabelMapping[item.label]?.[locale] ? sdgTopicTargetLabelMapping[item.label][locale] : item.label
                }
              })}
            />
          </Panel>
          <Panel header="SDG Actions">
            <RefinementList
              attribute="SDG_action"
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: sdgActionLabelMapping[item.label]?.[locale] ? sdgActionLabelMapping[item.label][locale] : item.label
                }
              })}
            />
          </Panel>
          <Panel header="SDG Actions, targets">
            <RefinementList
              attribute="SDG_target_action"
              searchable
              showMore={true}
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: sdgActionTargetLabelMapping[item.label]?.[locale] ? sdgActionTargetLabelMapping[item.label][locale] : item.label
                }
              })}
            />
          </Panel>
          <Panel header="Scientific">
            <ToggleRefinement
              attribute="scientific_result"
              label="Scientific"
              value={true}
            />
          </Panel>
          <Panel header="Category">
            <RefinementList
              attribute="category"
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: categoryMapping[item.label][locale]
                }
              })}
            />
          </Panel>
          <Panel header="Sub-category">
            <RefinementList
              attribute="subcategory"
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: subcategoryMapping[item.label][locale]
                }
              })}
            />
          </Panel>
          <Panel header="Year">
            <RefinementList attribute="year" />
          </Panel>
          <Panel header="NVI">
            <RefinementList attribute="nvi_level_historical" />
          </Panel>
          <Panel header="Scientific field">
            <RefinementList
              attribute="scientific_field_npi"
              transformItems={items => items.map(item => {
                return {
                  ...item,
                  label: npifagfeltMapping[item.label]?.[locale] ? npifagfeltMapping[item.label][locale] : item.label
                }
              })}
            />
          </Panel>

        </div>
        <div className="w-3/4">
          <Stats />
          <CurrentRefinements
            transformItems={items => deduplicate(items)}
          />
          <Pagination />
          <Hits hitComponent={SearchKitHitView} />
          <Pagination />
        </div>
      </div>
    </InstantSearch>



  )
}