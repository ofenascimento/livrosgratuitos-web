import React, { createContext, useState, useContext } from "react";

interface BookContextType {
  urlBook: string;
  setUrlBook: (content: string) => void;
  urlPdfBook: string;
  setPdfUrlBook: (content: string) => void;
  toParagraph: number;
  setToParagraph: (paragraph: number) => void;
  title: string;
  setTitle: (title: string) => void;
  bookId: string;
  setBookId: (bookId: string) => void;
}

interface IBookProvider {
  children: React.ReactNode;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: IBookProvider) => {
  const [urlBook, setUrlBook] = useState<string>("nobook");
  const [urlPdfBook, setPdfUrlBook] = useState<string>("nobook");
  const [title, setTitle] = useState<string>("notitle");
  const [bookId, setBookId] = useState<string>("");
  const [toParagraph, setToParagraph] = useState<number>(1);

  return (
    <BookContext.Provider
      value={{
        urlBook,
        setUrlBook,
        urlPdfBook,
        setPdfUrlBook,
        toParagraph,
        setToParagraph,
        title,
        setTitle,
        bookId,
        setBookId,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
