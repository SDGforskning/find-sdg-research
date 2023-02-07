import { useRouter } from 'next/router'
import { goals } from '../../lib/goals'

function Goal({ image, link, label }) {
  return (
    <div className='w-1/4 md:w-1/6'>
      {link && (
        <a href={link}><img src={image} alt={label} /></a>
      )}
      {!link && (
        <img src={image} />
      )}
      {/* <p className='text-sm text-center'>{label}</p> */}
    </div>
  )
}

export function Goals() {
  const { locale } = useRouter()
  return (
    <div className='xl:-mx-42'>
      <h2 className='text-center mt-5 text-3xl font-bold'>
        {locale === 'en' ? 'Browse by SDGs' : 'Finn forskning per bærekraftsmål'}
      </h2>
      <div className='flex flex-wrap justify-center py-6 gap-3'>
        {goals
          .filter(goal => goal.disabled != true)
          .map((goal, i) => (
            <Goal key={i} label={goal.label} image={goal.image[locale]} link={goal.link[locale]} />
          ))
        }
      </div>
    </div>
  )
}
