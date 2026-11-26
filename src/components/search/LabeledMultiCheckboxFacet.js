"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "../../lib/locale";

function displayValue(value) {
  if (value == null) return "";
  if (Object.hasOwn(value, "name")) return value.name;
  return String(value);
}

export function LabeledMultiCheckboxFacet({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
}) {
  const locale = getLocaleFromPathname(usePathname());
  const isEnglish = locale === "en";
  const filterLabel = isEnglish ? `Filter ${label}` : `Filtrer ${label}`;
  const moreLabel = isEnglish ? "Show more" : "Vis flere";
  const emptyLabel = isEnglish ? "No matching options" : "Ingen treff";
  const inputId = `facet-search-${String(label).replaceAll(/\s+/g, "-")}`;

  return (
    <fieldset className={["sui-facet", className].filter(Boolean).join(" ")}>
      <legend className="sui-facet__title">{label}</legend>
      {showSearch ? (
        <div className="sui-facet-search">
          <label className="mb-1 block text-xs" htmlFor={inputId}>
            {filterLabel}
          </label>
          <input
            id={inputId}
            className="sui-facet-search__text-input"
            type="search"
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>
      ) : null}
      <div className="sui-multi-checkbox-facet">
        {options.length < 1 ? <div>{emptyLabel}</div> : null}
        {options.map((option) => {
          const checked = option.selected;
          const value = option.value;
          const text = displayValue(value);
          const optionId = `facet-${label}-${text}`;

          return (
            <label
              key={text}
              htmlFor={optionId}
              className="sui-multi-checkbox-facet__option-label"
            >
              <div className="sui-multi-checkbox-facet__option-input-wrapper">
                <input
                  data-transaction-name={`facet - ${label}`}
                  id={optionId}
                  type="checkbox"
                  className="sui-multi-checkbox-facet__checkbox"
                  checked={checked}
                  onChange={() => (checked ? onRemove(value) : onSelect(value))}
                />
                <span className="sui-multi-checkbox-facet__input-text">
                  {text}
                </span>
              </div>
              <span className="sui-multi-checkbox-facet__option-count">
                {option.count.toLocaleString(isEnglish ? "en" : "no")}
              </span>
            </label>
          );
        })}
      </div>
      {showMore ? (
        <button
          type="button"
          className="sui-facet-view-more"
          onClick={onMoreClick}
        >
          {moreLabel}
        </button>
      ) : null}
    </fieldset>
  );
}
