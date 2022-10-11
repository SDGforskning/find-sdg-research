import { useRouter } from 'next/router'

const goalImagePaths = [
  {
    label: 'SDG-1',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-01.png',
    link: 'search?q=sdg1'
  },
  {
    label: 'SDG-2',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-02.png',
    link: ''
  },
  {
    label: 'SDG-3',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-03.png',
    link: ''
  },
  {
    label: 'SDG-4',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-04.png',
    link: ''
  },
  {
    label: 'SDG-5',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-05.png',
    link: ''
  },
  {
    label: 'SDG-6',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-06.png',
    link: ''
  },
  {
    label: 'SDG-7',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-07.png',
    link: ''
  },
  {
    label: 'SDG-8',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-08.png',
    link: ''
  },
  {
    label: 'SDG-9',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-09.png',
    link: ''
  },
  {
    label: 'SDG-10',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-10.png',
    link: ''
  },
  {
    label: 'SDG-11',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-11.png',
    link: ''
  },
  {
    label: 'SDG-12',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-12.png',
    link: ''
  },
  {
    label: 'SDG-13',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-13.png',
    link: ''
  },
  {
    label: 'SDG-14',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-14.png',
    link: ''
  },
  {
    label: 'SDG-15',
    disabled: false,
    image: 'images/sdg/E-WEB-Goal-15.png',
    link: ''
  },
  {
    label: 'SDG-16',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-16.png',
    link: ''
  },
  {
    label: 'SDG-17',
    disabled: true,
    image: 'images/sdg/E-WEB-Goal-17.png',
    link: ''
  }
]


function Goal({ image, link }) {
  return (
    <div className='w-1/6'>
      {link && (
        <a href={link}><img src={image} /></a>
      )}
      {!link && (
        <img src={image} />
      )}
    </div>
  )
}

export function Goals() {
  const { locale } = useRouter()
  return (
    <div>
      <h2 className='text-center mt-5 text-xl'>
        {locale === 'en' ? '... or browse by SDGs' : '... eller finn forskning per bærekraftsmål'}
      </h2>
      <div className='flex justify-center py-6 gap-3'>
        {goalImagePaths
          .filter(goal => goal.disabled != true)
          .map((goal, i) => (
            <Goal key={i} image={goal.image} link={goal.link} />
          ))
        }
      </div>
    </div>
  )
}
