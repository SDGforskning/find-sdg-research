import { useRouter } from 'next/router';

const randomGoals = [
  'sdg1',
  'sdg3',
  'sdg14',
]
const randomActions = [
  'sdg7',
  'sdg11',
  'sdg14',
]

const CustomResultView = ({
  result,
  onClickLink
}: {
  result;
  onClickLink: () => void;
}) => {

  const { locale } = useRouter()

  return (
    <li className='border rounded dark:border-slate-700 mt-5 pt-3'>
      <div>
        <div className='flex items-end justify-between px-5'>
          <div>
            <h3 className='text-3xl font-bold'>
              {/* Maintain onClickLink to correct track click throughs for analytics*/}
              <a onClick={onClickLink} href={result.nps_link.raw}>
                {result.title.raw}
              </a>
            </h3>
            <div className={`text-sm leading-sm dark:text-slate-500`}>
              Article
            </div>
            <div className={`text-md leading-sm`}>
              Journal of ...
            </div>

            <ul className='mt-5'>
              <li><a href='https://cristin.no'>Se forfattere og inst. i CRISTIN</a></li>
              <li><a href='https://doi.org/10.3352/jeehp.2013.10.3'>doi.org/10.3352/jeehp.2013.10.3</a></li>
              <li>open link: <a href='https://example.org'>link to?</a></li>
            </ul>
          </div>

          <div>
            <div>Goals:</div>
            {randomGoals.map(goal => (
              <div
                className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${goal} dark:text-white rounded-full`}
              >
                {goal}
              </div>
            ))}
            <div>Actions:</div>
            {randomActions.map(goal => (
              <div
                className={`text-xs text-white inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${goal} dark:text-white rounded-full`}
              >
                {goal}
              </div>
            ))}
            <div>
              Mentions Norway
            </div>
            <div>
              Mentions SDGs
            </div>
          </div>
        </div>

        <div
          className={`mt-5 w-full rounded-b-sm text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-500 dark:text-white`}
        >
          {locale === 'en' ? 'Scientific' : 'Vitenskapelig'}
        </div>
      </div>
    </li>
  )
}

export default CustomResultView