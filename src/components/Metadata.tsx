interface Props {
    seoTitle: string;
    seoDescription: string;
  }
  
  export default function Metadata({ seoTitle, seoDescription }: Props) {
    return (
      <>
        <title>{`${seoTitle} | Livros Gratuitos`}</title>
        <meta name="description" content={seoDescription} />
      </>
    );
  }
  