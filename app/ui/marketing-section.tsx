import type { CSSProperties, ReactNode } from "react";
import colorBar from "./color-bar.svg";

interface Props {
  children: ReactNode;
  align?: "left" | "center";
  color: "primary" | "secondary" | "tertiary";
  eyebrow?: string;
  colorBar?: boolean;
  backgroundStyle?: CSSProperties;
  containerClassName?: string;
}

export function MarketingSection({
  children,
  align,
  eyebrow,
  colorBar: showColorBar,
  backgroundStyle,
  containerClassName,
}: Props) {
  const padding = containerClassName ?? "py-20";

  return (
    <div style={backgroundStyle}>
      <div
        className={`container relative z-10 mx-auto px-6 sm:px-12 ${padding}`}
      >
        <div
          className={`mx-auto flex flex-col gap-6 ${
            align === "center" ? "lg:max-w-4xl" : ""
          }`}
        >
          {eyebrow !== undefined && (
            <div
              className={`flex flex-col items-center gap-4 pb-5 ${
                align === "left" ? "items-start" : ""
              }`}
            >
              {showColorBar === true && (
                <img src={colorBar} alt="" className="h-2 w-auto" />
              )}
              <p
                className={`font-semibold uppercase tracking-[4px] text-[#122134] sm:text-base ${
                  align === "left" ? "text-left" : "text-center"
                }`}
              >
                {eyebrow}
              </p>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
