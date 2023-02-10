import { useRouter } from 'next/router';
import { ArrowUpRightIcon, LockClosedIcon, LockOpenIcon, UserGroupIcon } from '@heroicons/react/24/solid'

const isScientific = {
  en: 'Scientific',
  no: "Vitenskapelig"
}

const CustomResultView = ({
  result,
  onClickLink
}: {
  result;
  onClickLink: () => void;
}) => {

  const { locale } = useRouter()

  const {
    SDG_topic_en,
    SDG_target_topic_en,
    SDG_action_en,
    SDG_target_action_en,
    publication_type_en,
    scientific_field_NPI_en,
    publication_subtype_en,
    mentions_en,
    language_en,
    NVI_level_en,
    SDG_topic_no,
    SDG_target_topic_no,
    SDG_action_no,
    SDG_target_action_no,
    scientific_field_NPI_no,
    publication_type_no,
    publication_subtype_no,
    mentions_no,
    language_no,
    NVI_level_no,
    ...rest
  } = result

  let data = {
    en: {
      SDG_topic: SDG_topic_en,
      SDG_target_topic: SDG_target_topic_en,
      SDG_action: SDG_action_en,
      SDG_target_action: SDG_target_action_en,
      scientific_field_NPI: scientific_field_NPI_en,
      publication_type: publication_type_en,
      publication_subtype: publication_subtype_en,
      mentions: mentions_en,
      language: language_en,
      NVI_level: NVI_level_en,
      ...rest
    },
    no: {
      SDG_topic: SDG_topic_no,
      SDG_target_topic: SDG_target_topic_no,
      SDG_action: SDG_action_no,
      SDG_target_action: SDG_target_action_no,
      scientific_field_NPI: scientific_field_NPI_no,
      publication_type: publication_type_no,
      publication_subtype: publication_subtype_no,
      mentions: mentions_no,
      language: language_no,
      NVI_level: NVI_level_no,
      ...rest
    }
  }

  return (
    <li key={data[locale].id} className='border rounded dark:border-slate-700 mt-5 py-3 px-4'>
      <div className='flex flex-auto items-start flex-wrap md:flex-nowrap justify-between gap-5 md:divide-x'>
        <div className='w-full md:w-4/6'>
          <div className={`text-sm leading-sm text-gray-600 dark:text-gray-400`}>
            {data[locale].publication_type?.raw} / {data[locale].publication_subtype?.raw}
          </div>
          <h2 className='text-md md:text-lg font-bold'>
            <a
              onClick={onClickLink}
              href={data[locale].fulltextlink?.raw !== 'No open link found'
                ? data[locale].fulltextlink.raw
                : data[locale].fulldoi?.raw ? data[locale].fulldoi.raw : `https://app.cristin.no/results/show.jsf?id=${data[locale].result_id.raw}`}
              target="_blank"
              rel="nonreferrer"
            >
              {data[locale].result_title.raw}
            </a>
          </h2>

          {data[locale].journal && (
            <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
              {data[locale].journal.raw} ({data[locale].year?.raw})
            </div>
          )}
          {data[locale].result_title_anthology && (
            <div className={`text-md leading-sm text-gray-600 dark:text-gray-400`}>
              {data[locale].result_title_anthology.raw} ({data[locale].year?.raw})
            </div>
          )}



          <div className='flex gap-10 mt-3'>
            {data[locale].SDG_topic?.raw && (
              <div className='flex flex-col gap-1'>
                <div className='text-sm sm:text-gray-600 dark:text-gray-400'>Topics:</div>
                <div className='flex flex-wrap gap-2'>
                  {data[locale].SDG_topic?.raw && data[locale].SDG_topic.raw.map(goal => (
                    <div
                      key={goal}
                      className={`text-sm inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 ${goal.split(' ')[0]} rounded`}
                    >
                      {goal.split(' ')[0]}
                    </div>
                  ))}
                </div>
                <div className='flex flex-wrap gap-2'>
                  {data[locale].SDG_target_topic?.raw.map(goal => (
                    <div
                      key={goal}
                      className={`text-xs inline-flex  items-center font-bold leading-sm uppercase px-2 lg:py-1 border-2 border-neutral-400 ${goal.split(' ')[0]} rounded`}
                    >
                      {goal.split(' ')[0]}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* <div style={{ flexBasis: '100%', height: 0 }}></div> */}

            {data[locale].SDG_action?.raw && (
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-gray-600 dark:text-gray-400'>Actions:</div>
                <div className='flex flex-wrap gap-2'>
                  {data[locale].SDG_action.raw.map(goal => (
                    <div
                      key={goal}
                      className={`text-sm inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 ${goal.split(' ')[0]} rounded`}
                    >
                      {goal.split(' ')[0]}
                    </div>
                  ))}
                </div>
                <div className='flex flex-wrap gap-2'>
                  {data[locale].SDG_target_action?.raw && data[locale].SDG_target_action.raw.map(goal => (
                    <div
                      key={goal}
                      className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-2 lg:py-1 border-2 border-neutral-400 ${goal.split(' ')[0]} rounded`}
                    >
                      {goal.split(' ')[0]}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {data[locale].mentions?.raw && (
            <div className='flex gap-3'>
              {data[locale].mentions?.raw.map((m: string, i: number) => (
                <div
                  key={i}
                  className={`mt-3 text-xs inline-flex items-center  leading-sm  px-3 py-1 bg-gray-100 dark:text-white rounded`}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='flex md:flex-1 md:flex-col-reverse sm:gap-10 md:gap-2 md:pl-5 md:w-2/6 w-full flex-wrap'>
          <div className='md:flex md:flex-col-reverse'>
            {(data[locale].scientific_result?.raw || data[locale].scientific_field_NPI?.raw) && (
              <div className='px-3 py-2 rounded mb-4 sm:mb-0  sm:mt-3 text-sm bg-neutral-100'>
                <div className='font-bold'>
                  {`${isScientific[locale]} (NVI ${data[locale].NVI_level?.raw})`}
                </div>
                {data[locale].scientific_field_NPI?.raw && (
                  <div>
                    {data[locale].scientific_field_NPI.raw}
                  </div>
                )}
              </div>
            )}
          </div>
          <ul>
            {data[locale].result_id.raw && (
              <li className={`text-md leading-sm`}>
                <a href={`https://app.cristin.no/results/show.jsf?id=${data[locale].result_id.raw}`} target="_blank" rel="nonreferrer">
                  <UserGroupIcon className='inline w-4 h-4 -mt-1' /> {locale === 'en' ? 'Authors and more information' : 'Forfattere og mer informasjon'}<ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                </a>
              </li>
            )}

            {data[locale].fulltextlink?.raw !== 'No open link found' && (
              <li>
                <a href={data[locale].fulltextlink.raw} target="_blank" rel="nonreferrer">
                  {/* {truncateUrl(data[locale].fulltextlink.raw, 10)} */}
                  <LockOpenIcon className='inline w-4 h-4 -mt-1' /> Fulltext <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                </a>
                {/* {data[locale].fulldoi?.raw && (data[locale].fulltextlink?.raw !== data[locale].fulldoi?.raw) && (
                    <span className='ml-5 text-xs text-gray-600 dark:text-gray-400'>{' '}
                    <a href={data[locale].fulldoi.raw} target="_blank" rel="nonreferrer">
                    {data[locale].fulldoi.raw}
                    </a>
                    </span>
                  )} */}
              </li>
            )}

            {data[locale].fulldoi?.raw && (
              <li>
                <a href={data[locale].fulldoi.raw} target="_blank" rel="nonreferrer">
                  {/* {data[locale].fulldoi.raw} */}{data[locale].OA_status_calc.raw === "NotOA" ? <LockClosedIcon className='inline w-4 h-4 -mt-1' /> : <LockOpenIcon className='inline w-4 h-4 -mt-1' />}  DOI <ArrowUpRightIcon className="inline h-4 w-4 text-blue-500" />
                </a>
                {/* {data[locale].fulltextlink?.raw && data[locale].fulltextlink?.raw == 'No open link found' && (
                    <span className='ml-5 text-xs text-gray-600 dark:text-gray-400'>{' '}
                    {data[locale].fulltextlink.raw}
                    </span>
                  )} */}
              </li>
            )}
          </ul>


        </div>
      </div>
    </li>
  )
}

export default CustomResultView