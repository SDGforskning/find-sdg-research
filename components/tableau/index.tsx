'use client'
import dynamic from 'next/dynamic';

const TableauNoSSR = dynamic(() => import('@stoddabr/react-tableau-embed-live').then((module) => module.TableauEmbed), { ssr: false });
/**
 * Tableau component that takes in a hostUrl and renders a Tableau widget
 * @param {*} param0 
 * @returns 
 */
export const Tableau = (
  { hostUrl, height, width, toolbar }: { hostUrl: string, height?: number | string, width?: number | string, toolbar?: 'top' | 'bottom' | 'hidden' }) => {
  return (
    <div className={`w-full bg-slate-100 rounded p-1 my-3 overflow-scroll ${height ? `h-[${height}]` : ''}  ${width ? `h-[${width}]` : ''}`}>
      <TableauNoSSR
        sourceUrl={hostUrl}
        height={height}
        width={width}
        toolbar={toolbar}
        device='tablet'
      />
    </div>
  );
}
