declare global {
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
    }
  }
  
  export {};
  