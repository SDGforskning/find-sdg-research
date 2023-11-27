import { useRouter } from 'next/router'
import { goals } from '../../lib/goals'

function Goal({ image, link, label }) {
  return (
    <div className='w-1/4 md:w-1/6'>
      {link && (
        <a href={link} className='inline-block'><img src={image} alt={label} title={label} /></a>
      )}
      {!link && (
        <img src={image} alt={label} title={label} />
      )}
    </div>
  )
}

export function Goals() {
  const { locale } = useRouter()
  return (
    <div className='xl:-mx-42'>
      <div className='flex flex-wrap justify-center py-6 gap-3'>
        {goals
          .filter(goal => goal.disabled !== true)
          .map((goal, i) => (
            <Goal key={i} label={goal.label[locale]} image={goal.image[locale]} link={goal.link[locale]} />
          ))
        }
      </div>
    </div>
  )
}
