import { createContext, useState, useEffect } from "react";

interface ReaderConfigType {
  // txt
  fontFamily: string;
  setFontFamily: (e: string) => void;
  background: string;
  setBackground: (e: string) => void;
  fontSize: number;
  setFontSize: (e: number) => void;
  //epub
  fontSizeEpub: number;
  setFontSizeEpub: (e: number) => void;
}

interface IReaderConfigProvider {
  children: React.ReactNode;
}

export const ReaderConfigContext = createContext<ReaderConfigType | undefined>(
  undefined
);

export function ReaderConfigProvider({ children }: IReaderConfigProvider) {
  const isBrowser = typeof window !== "undefined";

  const [fontFamily, setFontFamily] = useState<string>(
    isBrowser ? localStorage.getItem("fontFamily") || "merriweather" : "merriweather"
  );
  const [background, setBackground] = useState<string>(
    isBrowser ? localStorage.getItem("background") || "sepia" : "sepia"
  );
  const [fontSize, setFontSize] = useState<number>(
    isBrowser ? Number(localStorage.getItem("fontSize")) || 20 : 20
  );

  const [fontSizeEpub, setFontSizeEpub] = useState<number>(
    isBrowser ? Number(localStorage.getItem("fontSizeEpub")) || 100 : 100
  );

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("fontFamily", fontFamily);
    }
  }, [fontFamily, isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("background", background);
    }
  }, [background, isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("fontSize", fontSize.toString());
    }
  }, [fontSize, isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("fontSizeEpub", fontSizeEpub.toString());
    }
  }, [fontSizeEpub, isBrowser]);

  return (
    <ReaderConfigContext.Provider
      value={{
        fontFamily,
        setFontFamily,
        background,
        setBackground,
        fontSize,
        setFontSize,
        fontSizeEpub,
        setFontSizeEpub,
      }}
    >
      {children}
    </ReaderConfigContext.Provider>
  );
}
