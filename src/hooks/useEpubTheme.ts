import { useCallback, useMemo } from "react";
import type { IReactReaderStyle } from "react-reader";
import { ReactReaderStyle } from "react-reader";

export function useEpubTheme(background: string, fontSizeEpub: number, mounted: boolean) {
  const isDark = background === "dark";
  const isSepia = background === "sepia";

  const backgroundClass = useMemo(() => {
    if (!mounted) return "";
    switch (background) {
      case "dark":
        return "bg-black text-white";
      case "light":
        return "bg-white text-zinc-900";
      case "sepia":
        return "bg-sepia text-zinc-900";
      default:
        return "";
    }
  }, [background, mounted]);

  const READER_STYLES: IReactReaderStyle = useMemo(
    () => ({
      ...ReactReaderStyle,
      container: {
        ...ReactReaderStyle.container,
        backgroundColor: isSepia ? "#faf2e7" : isDark ? "#000000" : "#ffffff",
      },
      readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: isSepia ? "#faf2e7" : isDark ? "#000000" : "#ffffff",
      },
      titleArea: { ...ReactReaderStyle.titleArea, display: "none" },
      tocArea: { ...ReactReaderStyle.tocArea, display: "none" },
      tocBackground: { ...ReactReaderStyle.tocBackground, display: "none" },
      arrow: {
        ...ReactReaderStyle.arrow,
        color: isDark ? "#ffffff" : "#000000",
        opacity: 1,
      },
    }),
    [isDark, isSepia]
  );

  const applyThemeToRendition = useCallback((r: any, b: string, f: number) => {
    const isDarkTheme = b === "dark";
    const isLightTheme = b === "light";

    const bgColor = isDarkTheme ? "#000000" : isLightTheme ? "#ffffff" : "#faf2e7";
    const textColor = isDarkTheme ? "#ffffff" : "#2b2117";
    const linkColor = isDarkTheme ? "#8cb4ff" : "#7a4d2a";

    try {
      r.themes.default({
        body: {
          background: bgColor,
          color: textColor,
          lineHeight: "1.8",
          fontWeight: "400",
        },
        a: { color: linkColor },
        "h1,h2,h3": { color: textColor },
        "a:hover": {
          color: textColor,
          textDecoration: "none",
        },
        "a:focus": {
          outline: "none",
        },
        "a:active": {
          color: textColor,
        },
      });

      r.themes.fontSize(`${f}%`);
      r.views().forEach((view: any) => view.pane && view.pane.render());
    } catch (e) {
      console.warn("Erro ao aplicar tema:", e);
    }
  }, []);

  return { backgroundClass, READER_STYLES, applyThemeToRendition };
}