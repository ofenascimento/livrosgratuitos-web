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
    capa: string;
    titulo: string;
    autor: string;
    txt: string;
    pdf?: string;
    epub?: string;
    _id: string;
    categoria: string[];
    descricao: string;
    currentParagraph?: number;
    isFavorite?: boolean;
    progressPercentage?: number;
    urlHtml?: string;
    slug?: string;
    epubInfo?: IEpubInfo;
    epubProgress?: IEpubProgress;
  }

  interface IBooks {
    capa: string;
    titulo: string;
    autor: string;
    txt: string;
    pdf?: string;
    epub?: string;
    _id: string;
    progressPercentage?: number;
    urlHtml?: string;
    slug?: string;
    categoria: string[];
    descricao: string;
  }
}

export {};