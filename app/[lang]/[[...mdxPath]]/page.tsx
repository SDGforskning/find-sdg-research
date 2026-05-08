import { generateStaticParamsFor, importPage } from 'nextra/pages'
import type { FC, ReactNode } from 'react'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')
export const dynamic = 'force-dynamic'

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)
  return metadata
}

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>

const mdxComponents = getMDXComponents()
const Wrapper =
  mdxComponents.wrapper ??
  function DefaultWrapper({ children }: { children: ReactNode }) {
    return <>{children}</>
  }

const Page: FC<PageProps> = async props => {
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent params={params} />
    </Wrapper>
  )
}

export default Page