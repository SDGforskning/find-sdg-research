'use client'
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

/**
 * Tableau component that takes in a hostUrl and renders a Tableau widget
 * @param {*} param0 
 * @returns 
 */
export const Tableau = (
  { hostUrl, height, width = '100%', toolbar = 'hidden', device = 'default' }
) => {
  return (
    <div className={`mx-auto w-full bg-slate-100 rounded p-1 my-3 overflow-auto`}>
      <TableauEmbed
        sourceUrl={hostUrl}
        height={height}
        width={width}
        toolbar={toolbar}
        device={device}
      />
    </div>
  );
}
