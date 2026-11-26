import path from "node:path";
import { describe, expect, it } from "vitest";
import { toCodeQualityReport } from "./code-quality-report";

describe("toCodeQualityReport", () => {
  it("returns an empty array when there are no errors", () => {
    expect(toCodeQualityReport([])).toEqual([]);
    expect(
      toCodeQualityReport([{ file: "content/docs/no/index.mdx", errors: [] }]),
    ).toEqual([]);
  });

  it("maps each broken link to a code quality issue", () => {
    const [issue] = toCodeQualityReport([
      {
        file: "content/docs/no/om/om-tjenesten.md",
        errors: [
          { url: "/om/missing", line: 12, column: 4, reason: "not-found" },
        ],
      },
    ]);

    expect(issue).toMatchObject({
      description: "Broken internal link /om/missing (not-found)",
      check_name: "mdx-link/not-found",
      severity: "major",
      location: {
        path: "content/docs/no/om/om-tjenesten.md",
        lines: { begin: 12 },
      },
    });
    expect(issue.fingerprint).toMatch(/^[a-f0-9]{64}$/);
  });

  it("keeps fingerprints stable and unique per file, url, and location", () => {
    const first = toCodeQualityReport([
      {
        file: "content/docs/no/a.mdx",
        errors: [{ url: "/missing", line: 3, column: 1, reason: "not-found" }],
      },
    ]);
    const same = toCodeQualityReport([
      {
        file: "content/docs/no/a.mdx",
        errors: [{ url: "/missing", line: 3, column: 1, reason: "not-found" }],
      },
    ]);
    const otherLine = toCodeQualityReport([
      {
        file: "content/docs/no/a.mdx",
        errors: [{ url: "/missing", line: 4, column: 1, reason: "not-found" }],
      },
    ]);

    expect(first[0].fingerprint).toBe(same[0].fingerprint);
    expect(first[0].fingerprint).not.toBe(otherLine[0].fingerprint);
  });

  it("strips a leading ./ and converts absolute paths to repo-relative POSIX paths", () => {
    const cwd = path.join(path.sep, "repo");
    const [relative] = toCodeQualityReport(
      [
        {
          file: "./content/docs/no/index.mdx",
          errors: [{ url: "/x", line: 1, column: 1, reason: "not-found" }],
        },
      ],
      cwd,
    );
    const [absolute] = toCodeQualityReport(
      [
        {
          file: path.join(cwd, "content", "docs", "no", "index.mdx"),
          errors: [{ url: "/x", line: 1, column: 1, reason: "not-found" }],
        },
      ],
      cwd,
    );

    expect(relative.location.path).toBe("content/docs/no/index.mdx");
    expect(absolute.location.path).toBe("content/docs/no/index.mdx");
  });

  it("uses Error.message when next-validate-link returns an Error reason", () => {
    const [issue] = toCodeQualityReport([
      {
        file: "content/docs/no/index.mdx",
        errors: [
          {
            url: "https://example.com",
            line: 8,
            column: 2,
            reason: new Error("timeout"),
          },
        ],
      },
    ]);

    expect(issue.description).toBe(
      "Broken internal link https://example.com (timeout)",
    );
    expect(issue.check_name).toBe("mdx-link/timeout");
  });
});
