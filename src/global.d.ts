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
  