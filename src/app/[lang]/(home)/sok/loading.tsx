export default function SokLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
      <div className="mb-4 h-9 w-48 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="mb-4 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
      <div className="mb-4 space-y-2 pl-6">
        <div className="h-4 w-[92%] animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-4 w-[88%] animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
      <div className="mb-8 h-4 w-3/4 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
      <div className="space-y-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
        <div className="h-12 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-40 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-900" />
      </div>
    </main>
  );
}
