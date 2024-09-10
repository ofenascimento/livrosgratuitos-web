import { createContext, useState } from "react";

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
  const [fontFamily, setFontFamily] = useState<string>("merriweather");
  const [background, setBackground] = useState<string>("sepia");
  const [fontSize, setFontSize] = useState<number>(20);
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
