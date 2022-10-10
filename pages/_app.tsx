import type { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "../style.css"

export default function Nextra({
  Component,
  pageProps
}: AppProps): ReactElement {
  return <Component {...pageProps} />
}