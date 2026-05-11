import cn from 'clsx'
import Link from 'next/link'

import styles from './style.module.css'

export function Card({ children, title, icon, image, arrow, href, ...props }: { children: React.ReactNode, title: string, icon: React.ReactNode, image: string, arrow: boolean, href: string, props: React.HTMLAttributes<HTMLAnchorElement> }) {
  const animatedArrow = arrow ? (
    <span
      className={cn(
        'transition-transform duration-75',
        'group-hover:translate-x-[2px]'
      )}
    >
      →
    </span>
  ) : null

  if (image) {
    return (
      <Link href={href}>
        <a
          className={cn(
            styles.card,
            'group flex flex-col justify-start text-current rounded-lg overflow-hidden shadow shadow-gray-200 border border-transparent no-underline transition-all duration-200'
          )}
          {...props}
        >
          <span
            className={cn(
              styles.title,
              'p-4 gap-1'
            )}
          >
            {icon}
            {title}
            {animatedArrow}
          </span>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <Link href={href}>
      <a
        className={cn(
          styles.card,
          'group flex flex-col justify-start text-current rounded-lg overflow-hidden shadow shadow-transparent border border-transparent no-underline transition-all duration-200'
        )}
        {...props}
      >
        <span
          className={cn(
            styles.title,
            'p-4 gap-1'
          )}
        >
          {icon}
          {title}
          {animatedArrow}
        </span>
      </a>
    </Link>
  )
}

export function Cards({ children, ...props }: { children: React.ReactNode, props: React.HTMLAttributes<HTMLDivElement> }) {
  return (
    <div className={cn(styles.cards, 'gap-4 mt-4')} {...props}>
      {children}
    </div>
  )
}
