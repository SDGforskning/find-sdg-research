import cn from 'clsx'

import styles from './style.module.css'

export function Feature({
  large,
  centered,
  children,
  lightOnly,
  className,
  ...props
}: { large: boolean, centered: boolean, children: React.ReactNode, lightOnly: boolean, className: string, props: React.HTMLAttributes<HTMLDivElement> }) {
  return (
    <div
      className={cn(
        styles.feature,
        large && styles.large,
        centered && styles.centered,
        lightOnly && styles['light-only'],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Features({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.features} gap-5 py-6 center`}>{children}</div>
}
