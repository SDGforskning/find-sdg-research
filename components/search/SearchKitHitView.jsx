import { Highlight } from "react-instantsearch-dom";
import { useRouter } from 'next/router';
import { truncateUrl } from '../../lib/truncateUrl'
import { ArrowUpRightIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'

const localeText = {
  isScientific: {
    en: 'Scientific',
    no: "Vitenskapelig"
  }
}

export const SearchKitHitView = (props) => {
  const { locale } = useRouter()

  /* return <pre>{JSON.stringify(result, null, 2)}</pre> */
  return (
    <li key={props.hit.result_id} className='border rounded dark:border-slate-700 mt-5 pt-3'>
      <div>
        <div className='flex items-start flex-wrap md:flex-nowrap justify-between px-5 gap-5 md:divide-x'>
          <div className='w-3/4'>
            <div className={`text-sm leading-sm text-gray-600 dark:text-gray-400`}>
              {props.hit.category} / {props.hit.nvi_publication_form}
            </div>
            <h3 className='text-md md:text-lg font-bold'>
              <a href={props.hit.fulltextlink && props.hit.fulltextlink !== 'No open link found' ? props.hit.fulltextlink : props.hit.fulldoi ? props.hit.fulldoi : '#'} target='_blank' rel="noopener noreferrer">
                {props.hit.result_title}
              </a>
            </h3>

            {props.hit.journal && (
              <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
                {props.hit.journal} ({props.hit.year})
              </div>
            )}
            {props.hit.result_title_anthology && (
              <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
                {props.hit.result_title_anthology} ({props.hit.year})
              </div>
            )}

            {props.hit.result_id && (
              <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
                <a href={`https://app.cristin.no/results/show.jsf?id=${props.hit.result_id}`} target="_blank">
                  Authors and institutions in CRISTIN <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                </a>
              </div>
            )}

            <ul className='mt-5'>
              {props.hit.fulltextlink && props.hit.fulltextlink !== 'No open link found' && (
                <li>Fulltext:{' '}
                  <a href={props.hit.fulltextlink} target="_blank">
                    {truncateUrl(props.hit.fulltextlink, 80)} <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                  </a>
                  {props.hit.fulldoi && (props.hit.fulltextlink !== props.hit.fulldoi) && (
                    <span className='ml-5 text-xs text-gray-600 dark:text-gray-400'>{' '}
                      <a href={props.hit.fulldoi}>
                        {props.hit.fulldoi}
                      </a>
                    </span>
                  )}
                </li>
              )}

              {(
                props.hit.fulltextlink && props.hit.fulltextlink === 'No open link found')
                && props.hit.fulldoi && (
                  <li>DOI:{' '}
                    <a href={props.hit.fulldoi}>
                      {props.hit.fulldoi} <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                    </a>
                    {props.hit.fulltextlink && props.hit.fulltextlink == 'No open link found' && (
                      <span className='ml-5 text-xs text-gray-600 dark:text-gray-400'>{' '}
                        {props.hit.fulltextlink}
                      </span>
                    )}
                  </li>
                )}
            </ul>
          </div>

          <div className='flex md:flex-1 flex-wrap md:flex-col gap-2 md:pl-5 w-full'>
            {props.hit.SDG_target_topic && (
              <>
                <div className='text-sm sm:text-gray-600 dark:text-gray-400'>Topics:</div>
                <div className='flex gap-2'>
                  {props.hit.SDG_topic && props.hit.SDG_topic.map(goal => (
                    <div
                      className={`text-md text-white inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 ${goal} dark:text-white rounded`}
                    >
                      {goal}
                    </div>
                  ))}
                </div>
                <div className='flex gap-2'>
                  {props.hit.SDG_target_topic.map(goal => (
                    <div
                      className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 ${goal.split('_')[0]} dark:text-white rounded`}
                    >
                      {goal.split('_')[1]}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ flexBasis: '100%', height: 0 }}></div>

            {props.hit.SDG_action && (
              <>
                <div className='text-sm text-gray-600 dark:text-gray-400'>Actions:</div>
                <div className='flex gap-2'>
                  {props.hit.SDG_action.map(goal => (
                    <div
                      className={`text-md text-white inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 ${goal} dark:text-white rounded`}
                    >
                      {goal}
                    </div>
                  ))}
                </div>
                <div className='flex gap-2'>
                  {props.hit.SDG_target_action && props.hit.SDG_target_action.map(goal => (
                    <div
                      className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 ${goal.split('_')[0]} dark:text-white rounded`}
                    >
                      {goal.split('_')[1]}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className='flex gap-3 mx-5'>
          {/* {props.hit.scientific_field_npi && (
              <div
                className={`mt-3 text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
              >
                {props.hit.scientific_field_npi}
              </div>
            )} */}

          {props.hit.mentionsNorway && (
            <div
              className={`mt-3 text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
            >
              {props.hit.mentionsNorway ? 'Mentions Norway' : null}
            </div>
          )}

          {props.hit.mentionsSDG && (
            <div
              className={`mt-3 text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
            >
              {props.hit.mentionsSDG ? 'Mentions SDG' : null}
            </div>
          )}
        </div>

        <div
          className={`mt-5 px-5 w-full rounded-b-sm text-xs inline-flex content-center justify-start font-bold leading-sm py-2 ${props.hit.scientific_result === true ? 'bg-green-200 dark:bg-green-400' : 'bg-gray-100'} dark:text-slate-800 gap-3`}
        >
          <div>{props.hit.OA_status_calc === "NotOA" ? <LockClosedIcon className='w-4 h-4' /> : <LockOpenIcon className='w-4 h-4' />}</div>

          <div>{props.hit.scientific_result === true ? `${localeText.isScientific[locale]} (NVI ${props.hit.nvi_level_historical})` : ''}</div>

          {props.hit.scientific_field_npi && (
            <div>
              {props.hit.scientific_field_npi}
            </div>
          )}
        </div>
      </div>
    </li>
  )
};

