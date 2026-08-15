declare global {
  interface IEpubInfo {
    font?: string;
    fontLink?: string;
    license?: string;
    licenseLink?: string;
    modified?: string;
  }

  interface IEpubProgress {
    progressPercentage?: number;
    currentCfi?: string;
    currentPage?: number;
    totalPages?: number;
  }

  interface IBook {
    cover: string;
    title: string;
    author: string;
    txt: string;
    pdf?: string;
    epub?: string;
    _id: string;
    categories: string[];
    description: string;
    currentParagraph?: number;
    isFavorite?: boolean;
    progressPercentage?: number;
    htmlUrl?: string;
    slug?: string;
    epubInfo?: IEpubInfo;
    epubProgress?: IEpubProgress;
  }

  interface IBooks {
    cover: string;
    title: string;
    author: string;
    txt: string;
    pdf?: string;
    epub?: string;
    _id: string;
    progressPercentage?: number;
    htmlUrl?: string;
    slug?: string;
    categories: string[];
    description: string;
  }
}

export {};