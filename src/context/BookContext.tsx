import React, { createContext, useState } from "react";

interface BookContextType {
  urlBook: string;
  setUrlBook: (content: string) => void;
  toParagraph: number;
  setToParagraph: (paragraph: number) => void;
  title: string;
  setTitle: (title: string) => void;
}

interface IBookProvider {
  children: React.ReactNode;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: IBookProvider) => {
  const [urlBook, setUrlBook] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [toParagraph, setToParagraph] = useState<number>(1);

  return (
    <BookContext.Provider
      value={{
        urlBook,
        setUrlBook,
        toParagraph,
        setToParagraph,
        title,
        setTitle,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
