import { useRouter } from 'next/router';

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

  return (
    <li key={result.id} className='border rounded dark:border-slate-700 mt-5 pt-3'>
      <div>
        <div className='flex items-start flex-wrap md:flex-nowrap justify-between px-5 gap-5'>
          <div className='w-3/4'>
            <div className={`text-sm leading-sm dark:text-slate-400`}>
              {result.category?.raw} / {result.nvi_publication_form?.raw}
            </div>
            <h3 className='text-3xl font-bold'>
              <a onClick={onClickLink} href={result.fulltextlink.raw}>
                {result.result_title.raw}
              </a>
            </h3>
            <div className={`text-md leading-sm`}>
              {result.journal.raw}
            </div>

            <ul className='mt-5'>
              {result.fulldoi?.raw && (
                <li>DOI: <a href={result.fulldoi.raw}>{result.doi.raw}</a></li>
              )}
            </ul>

            <div className='flex gap-3'>
              <div>Category:</div>
              {result.scientific_field_npi.raw && (
                <div
                  className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-400 dark:text-white rounded-full`}
                >
                  {result.scientific_field_npi.raw}
                </div>
              )}
              {result.mentionsNorway.raw && (
                <div>
                  {result.mentionsNorway.raw ? 'Mentions Norway' : null}
                </div>
              )}
              {result.mentionsSDG.raw && (
                <div>
                  {result.mentionsSDG.raw ? 'Mentions SDG' : null}
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-2 w-1/4'>
            <div className='flex gap-2'>
              <div>{result.OA_status_calc.raw}</div>

              <div
                className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-2 py-1 bg-blue-400 dark:text-white rounded-full`}
              >
                NVI level: {result.nvi_level_historical?.raw}
              </div>
            </div>

            <div className='flex gap-2'>
              {result.SDG_topic?.raw && (
                <div>Topics:</div>
              )}
              {result.SDG_topic?.raw && result.SDG_topic.raw.map(goal => (
                <div
                  className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${goal} dark:text-white rounded-full`}
                >
                  {goal}
                </div>
              ))}
            </div>

            <div className='flex gap-2'>
              {result.SDG_action?.raw && (
                <div>Actions:</div>
              )}
              {result.SDG_action?.raw && (
                <div
                  className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-600 dark:text-white rounded-full`}
                >
                  {result.SDG_action.raw}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`mt-5 w-full rounded-b-sm text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${result.scientific_result.raw ? 'bg-green-100' : 'bg-red-100'} dark:text-slate-800`}
        >
          {result.scientific_result.raw === true ? localeText.isScientific[locale] : ''}
        </div>
        {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
      </div>
    </li>
  )
}

export default CustomResultView