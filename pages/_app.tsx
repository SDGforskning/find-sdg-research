import type { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import "../style.css"
import Head from 'next/head'

export default function Nextra({
  Component,
  pageProps
}: AppProps): ReactElement {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}