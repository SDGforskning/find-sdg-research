"use client";

import { Results, useSearch } from "@elastic/react-search-ui";
import { Loader2 } from "lucide-react";
import SDGResultView from "./SDGResultView";

function SkeletonRow() {
  return (
    <div className="mt-5 animate-pulse rounded border border-neutral-200 py-3 px-4 dark:border-slate-700">
      <div className="flex flex-wrap gap-5 md:flex-nowrap">
        <div className="w-full space-y-3 md:w-7/12">
          <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-6 w-4/5 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-4 w-[90%] rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="w-full space-y-2 md:w-5/12">
          <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-3 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-3 w-3/5 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPanel({ locale }) {
  const { isLoading, wasSearched } = useSearch((state) => ({
    isLoading: state.isLoading,
    wasSearched: state.wasSearched,
  }));

  const initialLoadingMessage =
    locale === "en" ? "Loading search results." : "Laster søkeresultater.";
  const updatingMessage =
    locale === "en" ? "Updating search results." : "Oppdaterer søkeresultater.";

  const showInitialSkeleton = isLoading && !wasSearched;
  const showResults = wasSearched || !isLoading;
  const showRefinementOverlay = isLoading && wasSearched;

  return (
    <div className="relative min-h-[12rem]">
      {showInitialSkeleton && (
        <div
          aria-busy="true"
          aria-live="polite"
          className="space-y-0"
          role="status"
        >
          <span className="sr-only">{initialLoadingMessage}</span>
          {["a", "b", "c", "d", "e", "f"].map((id) => (
            <SkeletonRow key={id} />
          ))}
        </div>
      )}

      {showResults && (
        <div
          className={
            showRefinementOverlay
              ? "pointer-events-none opacity-50 transition-opacity duration-200"
              : undefined
          }
        >
          <Results resultView={SDGResultView} />
        </div>
      )}

      {showRefinementOverlay && (
        <div
          aria-busy="true"
          aria-live="polite"
          className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-white/30 pt-20 dark:bg-neutral-950/40"
          role="status"
        >
          <span className="sr-only">{updatingMessage}</span>
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-4 py-2 text-sm font-medium text-neutral-800 shadow-md dark:border-neutral-600 dark:bg-neutral-900/95 dark:text-neutral-100">
            <Loader2 aria-hidden className="h-4 w-4 shrink-0 animate-spin" />
            {locale === "en" ? "Updating results" : "Oppdaterer resultater"}
          </div>
        </div>
      )}
    </div>
  );
}
