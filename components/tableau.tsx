'use client'

import dynamic from 'next/dynamic'

const TableauEmbed = dynamic(
  () => import('@stoddabr/react-tableau-embed-live').then(module => module.TableauEmbed),
  { ssr: false }
)

type TableauProps = {
  hostUrl: string
  height?: string | number
  toolbar?: 'top' | 'bottom' | 'hidden'
}

export function Tableau({ hostUrl, height = '580', toolbar = 'bottom' }: TableauProps) {
  const Embed = TableauEmbed as any
  return <Embed sourceUrl={hostUrl} height={height} toolbar={toolbar} />
}
