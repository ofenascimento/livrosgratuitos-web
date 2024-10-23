import { createContext, useState, useEffect } from "react";

interface ReaderConfigType {
  fontFamily: string;
  setFontFamily: (e: string) => void;
  background: string;
  setBackground: (e: string) => void;
  fontSize: number;
  setFontSize: (e: number) => void;
}

interface IReaderConfigProvider {
  children: React.ReactNode;
}

export const ReaderConfigContext = createContext<ReaderConfigType | undefined>(
  undefined
);

export function ReaderConfigProvider({ children }: IReaderConfigProvider) {
  const [fontFamily, setFontFamily] = useState<string>(
    localStorage.getItem("fontFamily") || "merriweather"
  );
  const [background, setBackground] = useState<string>(
    localStorage.getItem("background") || "sepia"
  );
  const [fontSize, setFontSize] = useState<number>(
    Number(localStorage.getItem("fontSize")) || 20
  );

  useEffect(() => {
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem("background", background);
  }, [background]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  return (
    <ReaderConfigContext.Provider
      value={{
        fontFamily,
        setFontFamily,
        background,
        setBackground,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ReaderConfigContext.Provider>
  );
}
