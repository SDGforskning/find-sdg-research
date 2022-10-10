const randomGoals = [
  'sdg1',
  'sdg3',
  'sdg14',
]

const CustomResultView = ({
  result,
  onClickLink
}: {
  result;
  onClickLink: () => void;
}) => (
  <li className='border rounded border-slate-700 mt-5 p-5'>
    <div>
      <h3 className='text-3xl font-bold'>
        {/* Maintain onClickLink to correct track click throughs for analytics*/}
        <a onClick={onClickLink} href={result.nps_link.raw}>
          {result.title.raw}
        </a>
      </h3>
      <div
        className={`ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-500 dark:text-white rounded-full`}
      >
        Journal
      </div>
      <div
        className={`ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-500 dark:text-white rounded-full`}
      >
        Scientific
      </div>
    </div>

    <ul>
      <li><a href='https://cristin.no'>Se forfattere og inst. i CRISTIN</a></li>
      <li>doi: <a href='https://doi.org/10.3352/jeehp.2013.10.3'>doi.org/10.3352/jeehp.2013.10.3</a></li>
      <li>open link: <a href='https://example.org'>link to?</a></li>
    </ul>
    {randomGoals.map(goal => (
      <div
        className={`ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${goal} dark:text-white rounded-full`}
      >
        {goal}
      </div>
    ))}
  </li>
);

export default CustomResultView