import React from "react";

function getFilterValueDisplay(filterValue) {
  if (filterValue === undefined || filterValue === null) return "";
  if (Object.prototype.hasOwnProperty.call(filterValue, "name"))
    return filterValue.name;
  return String(filterValue);
}

function getNewClassName(newClassName) {
  if (!Array.isArray(newClassName)) return newClassName;

  return newClassName.filter((name) => name).join(" ");
}

function appendClassName(
  baseClassName,
  newClassName
) {
  if (!newClassName)
    return (
      (Array.isArray(baseClassName)
        ? baseClassName.join(" ")
        : baseClassName) || ""
    );
  if (!baseClassName) return getNewClassName(newClassName) || "";
  return `${baseClassName} ${getNewClassName(newClassName)}`;
}

import type { FieldValue } from "@elastic/search-ui";
import { useRouter } from 'next/router';

function MappedLabelsFacet({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder,
  mapping
}) {
  const { locale } = useRouter()

  return (
    <fieldset className={appendClassName("sui-facet", className)}>
      <legend className="sui-facet__title">{label}</legend>

      {showSearch && (
        <div className="sui-facet-search">
          <input
            className="sui-facet-search__text-input"
            type="search"
            placeholder={searchPlaceholder || "Search"}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}

      <div className="sui-multi-checkbox-facet">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option) => {
          const checked = option.selected;
          const value = option.value as FieldValue;
          const hasMapping = mapping[getFilterValueDisplay(option.value)][locale] != '' ? true : false
          const label = mapping[getFilterValueDisplay(option.value)][hasMapping === true ? locale : 'en']

          return (
            <label
              key={`${getFilterValueDisplay(option.value)}`}
              htmlFor={`example_facet_${label}${getFilterValueDisplay(
                option.value
              )}`}
              className="sui-multi-checkbox-facet__option-label"
            >
              <div className="sui-multi-checkbox-facet__option-input-wrapper">
                <input
                  data-transaction-name={`facet - ${label}`}
                  id={`example_facet_${label}${getFilterValueDisplay(
                    option.value
                  )}`}
                  type="checkbox"
                  className="sui-multi-checkbox-facet__checkbox"
                  checked={checked}
                  onChange={() => (checked ? onRemove(value) : onSelect(value))}
                />
                <span className="sui-multi-checkbox-facet__input-text">
                  {label}
                  {/* {mapping[getFilterValueDisplay(option.value)][locale != null ? locale : 'en']} */}
                  {/* {getFilterValueDisplay(option.value)} */}
                </span>
              </div>
              <span className="sui-multi-checkbox-facet__option-count">
                {option.count.toLocaleString("en")}
              </span>
            </label>
          );
        })}
      </div>

      {showMore && (
        <button
          type="button"
          className="sui-facet-view-more"
          onClick={onMoreClick}
          aria-label="Show more options"
        >
          + More
        </button>
      )}
    </fieldset>
  );
}

export default MappedLabelsFacet;