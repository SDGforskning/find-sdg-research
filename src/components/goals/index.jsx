'use client'

import { useParams } from 'next/navigation'
import { goals } from '../../lib/goals'

function Goal({ image, link, label }) {
  return (
    <div className=''>
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
  const params = useParams();
  const locale = params.lang || 'no'
  return (
    <div className='w-full py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5'>
      {goals
        .filter(goal => goal.disabled !== true)
        .map((goal, i) => (
          <Goal key={i} label={goal.label[locale]} image={goal.image[locale]} link={`/${locale}/${goal.link[locale]}`} />
        ))
      }
    </div>
  )
}
