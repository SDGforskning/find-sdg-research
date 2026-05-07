import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-2xl font-bold">Page not found</h1>
      <p className="mb-6">Siden finnes ikke.</p>
      <Link href="/" className="underline">
        Go to front page
      </Link>
    </main>
  )
}
