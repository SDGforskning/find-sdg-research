import { useRef, type ReactElement, useEffect } from 'react'
import type { AppProps } from 'next/app'
import "../style.css"
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = 'https://stats.uib.no/';
const MATOMO_SITE_ID = '82';

export default function Nextra({
  Component,
  pageProps
}: AppProps): ReactElement {
  const matomoInitialized = useRef(false)

  useEffect(() => {
    if (MATOMO_URL && MATOMO_SITE_ID && matomoInitialized.current === false) {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
    }
    return () => {
      matomoInitialized.current = true
    }
  }, [])
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}