"use client";

import { useRef, useState } from "react";

function joinClass(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Sidebar({ className, children, showLabel, hideLabel }) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef(null);

  function close() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        className="sui-layout-sidebar-toggle"
        aria-expanded={open}
        aria-controls="search-filters"
        onClick={() => setOpen(true)}
      >
        {showLabel}
      </button>
      <div
        id="search-filters"
        className={joinClass(className, open && `${className}--toggled`)}
      >
        <button
          type="button"
          className="sui-layout-sidebar-toggle"
          aria-expanded={open}
          aria-controls="search-filters"
          onClick={close}
        >
          {hideLabel}
        </button>
        {children}
      </div>
    </>
  );
}

export default function SearchLayout({
  className,
  children,
  header,
  bodyContent,
  bodyFooter,
  bodyHeader,
  sideContent,
  showFiltersLabel,
  hideFiltersLabel,
}) {
  return (
    <div className={joinClass("sui-layout", className)}>
      <div className="sui-layout-header">
        <div className="sui-layout-header__inner">{header}</div>
      </div>
      <div className="sui-layout-body">
        <div className="sui-layout-body__inner">
          <Sidebar
            className="sui-layout-sidebar"
            showLabel={showFiltersLabel}
            hideLabel={hideFiltersLabel}
          >
            {sideContent}
          </Sidebar>
          <div className="sui-layout-main">
            <div className="sui-layout-main-header">
              <div className="sui-layout-main-header__inner">{bodyHeader}</div>
            </div>
            <div className="sui-layout-main-body">
              {children || bodyContent}
            </div>
            <div className="sui-layout-main-footer">{bodyFooter}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
