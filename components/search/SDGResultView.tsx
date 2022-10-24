import { useRouter } from 'next/router';
import { truncateUrl } from '../../lib/truncateUrl'
import { ArrowUpRightIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'

const localeText = {
  isScientific: {
    en: 'Scientific',
    no: "Vitenskapelig"
  }
}

const CustomResultView = ({
  result,
  onClickLink
}: {
  result;
  onClickLink: () => void;
}) => {

  const { locale } = useRouter()

  /* return <pre>{JSON.stringify(result, null, 2)}</pre>s */

  return (
    <li key={result.id} className='border rounded dark:border-slate-700 mt-5 pt-3'>
      <div>
        <div className='flex items-start flex-wrap md:flex-nowrap justify-between px-5 gap-5 md:divide-x'>
          <div className='w-3/4'>
            <div className={`text-sm leading-sm text-gray-600 dark:text-gray-400`}>
              {result.category?.raw} / {result.nvi_publication_form?.raw}
            </div>
            <h3 className='text-xl font-bold'>
              <a onClick={onClickLink} href={result.fulltextlink && result.fulltextlink?.raw !== 'No open link found' ? result.fulltextlink.raw : result.fulldoi?.raw ? result.fulldoi.raw : '#'}>
                {result.result_title.raw}
              </a>
            </h3>

            {result.journal && (
              <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
                {result.journal.raw} ({result.year?.raw})
              </div>
            )}
            {result.result_title_anthology && (
              <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
                {result.result_title_anthology.raw} ({result.year?.raw})
              </div>
            )}

            {result.result_id.raw && (
              <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
                <a href={`https://app.cristin.no/results/show.jsf?id=${result.result_id.raw}`} target="_blank">
                  Authors and institutions in CRISTIN <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                </a>
              </div>
            )}

            <ul className='mt-5'>
              {result.fulltextlink?.raw && result.fulltextlink?.raw !== 'No open link found' && (
                <li>Fulltext:{' '}
                  <a href={result.fulltextlink.raw} target="_blank">
                    {truncateUrl(result.fulltextlink.raw, 80)} <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                  </a>
                  {result.fulldoi?.raw && (result.fulltextlink?.raw !== result.fulldoi?.raw) && (
                    <span className='ml-5 text-xs text-gray-600 dark:text-gray-400'>{' '}
                      <a href={result.fulldoi.raw}>
                        {result.fulldoi.raw}
                      </a>
                    </span>
                  )}
                </li>
              )}

              {(
                result.fulltextlink?.raw && result.fulltextlink?.raw === 'No open link found')
                && result.fulldoi?.raw && (
                  <li>DOI:{' '}
                    <a href={result.fulldoi.raw}>
                      {result.fulldoi.raw} <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                    </a>
                    {result.fulltextlink?.raw && result.fulltextlink?.raw == 'No open link found' && (
                      <span className='ml-5 text-xs text-gray-600 dark:text-gray-400'>{' '}
                        {result.fulltextlink.raw}
                      </span>
                    )}
                  </li>
                )}
            </ul>
          </div>

          <div className='flex flex-1 md:flex-col gap-2 w-1/4 md:pl-5'>
            <div>Topics:</div>
            <div className='flex gap-2'>
              {result.SDG_topic?.raw && result.SDG_topic.raw.map(goal => (
                <div
                  className={`text-md text-white inline-flex items-center font-bold leading-sm uppercase px-2 py-1 ${goal} dark:text-white rounded`}
                >
                  {goal}
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              {result.SDG_target_topic?.raw && result.SDG_target_topic.raw.map(goal => (
                <div
                  className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-2 py-1 ${goal.split('_')[0]} dark:text-white rounded`}
                >
                  {goal.split('_')[1]}
                </div>
              ))}
            </div>

            <div>Actions:</div>
            <div className='flex gap-2'>
              {result.SDG_action?.raw && result.SDG_action.raw.map(goal => (
                <div
                  className={`text-md text-white inline-flex items-center font-bold leading-sm uppercase px-2 py-1 ${goal} dark:text-white rounded`}
                >
                  {goal}
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              {result.SDG_target_action?.raw && result.SDG_target_action.raw.map(goal => (
                <div
                  className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-2 py-1 ${goal.split('_')[0]} dark:text-white rounded`}
                >
                  {goal.split('_')[1]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex gap-3 mx-5'>
          {/* {result.scientific_field_npi?.raw && (
            <div
              className={`mt-3 text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
            >
              {result.scientific_field_npi.raw}
            </div>
          )} */}

          {result.mentionsNorway?.raw && (
            <div
              className={`mt-3 text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
            >
              {result.mentionsNorway.raw ? 'Mentions Norway' : null}
            </div>
          )}

          {result.mentionsSDG?.raw && (
            <div
              className={`mt-3 text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
            >
              {result.mentionsSDG.raw ? 'Mentions SDG' : null}
            </div>
          )}
        </div>

        <div
          className={`mt-5 px-5 w-full rounded-b-sm text-xs inline-flex content-center justify-start font-bold leading-sm py-2 ${result.scientific_result.raw ? 'bg-green-200 dark:bg-green-400' : 'bg-gray-100'} dark:text-slate-800 gap-3`}
        >
          <div>{result.OA_status_calc.raw === "NotOA" ? <LockClosedIcon className='w-4 h-4' /> : <LockOpenIcon className='w-4 h-4' />}</div>

          <div>{result.scientific_result.raw === true ? `${localeText.isScientific[locale]} (NVI ${result.nvi_level_historical?.raw})` : ''}</div>

          {result.scientific_field_npi?.raw && (
            <div>
              {result.scientific_field_npi.raw}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default CustomResultView