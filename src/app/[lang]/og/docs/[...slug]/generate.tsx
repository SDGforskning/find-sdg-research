import type { ReactNode } from "react";
import { SDGEng } from "@/components/logos/SDGEng";
import { SDGNor } from "@/components/logos/SDGNor";

/** Props passed from the OG route — extend this as you customize the image. */
export interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
  lang: string;
}

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

const accent = "rgb(38, 189, 226)";
const muted = "black";
const backgroundColor = "rgb(255, 255, 255)";

const ogLogoHeight = 184;

function OgSdgLogo({ lang }: { lang: string }) {
  const Logo = lang === "no" ? SDGNor : SDGEng;
  const aspect = lang === "no" ? 686.65 / 155.45 : 622.57 / 122.63;
  const width = Math.round(aspect * ogLogoHeight);

  return (
    <Logo
      width={width}
      height={ogLogoHeight}
      style={{ color: "white", display: "block" }}
    />
  );
}

function siteLabel(lang: string) {
  return lang === "no" ? "Finn bærekraftsforskning" : "Find SDG research";
}

/** Custom OG card (no fumadocs-ui template). Uses the default font bundled with `next/og`. */
export function generate(props: GenerateProps) {
  const { title, description, lang } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
        color: "#f4f4f5",
        padding: "52px 56px",
        borderLeft: `14px solid ${accent}`,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <p
          style={{
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.12,
            margin: 0,
            color: muted,
          }}
        >
          {title}
        </p>
        {description ? (
          <p
            style={{
              fontSize: 26,
              lineHeight: 1.38,
              margin: 0,
              marginTop: 22,
              color: muted,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 22,
          paddingTop: 28,
          borderTop: `3px solid ${accent}`,
        }}
      >
        <OgSdgLogo lang={lang} />
      </div>
    </div>
  );
}

export function getImageResponseOptions() {
  return {
    ...ogImageSize,
  };
}
