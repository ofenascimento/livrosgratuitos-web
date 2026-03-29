import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Title from "../blog/widgets/Title/Title";
import { Metadata } from "next";
import Description from "../blog/widgets/Description/Description";
import Content from "../blog/widgets/Content/Content";
import H3 from "../blog/widgets/H3/H3";
import Paragraph from "../blog/widgets/Paragraph/Paragraph";
import Book from "../blog/widgets/Book/Book";
import CustomLayout from "@/components/CustomLayout/CustomLayout";

export const metadata: Metadata = {
  title: "Todos os Romances de Machado de Assis (Lista Completa das Obras)",
  description:
    "Confira todos os romances de Machado de Assis em ordem de publicação. Veja a lista completa das obras do maior autor da literatura brasileira e leia clássicos em domínio público.",
};

const PostPage = () => {
  return (
    <>
      <CustomLayout>
        <Navbar />
        <div className="w-full mx-auto px-4 lg:px-0">
          <Title title="Todos os Romances de Machado de Assis" />
          <Description description="Veja a lista completa dos romances de Machado de Assis em ordem de publicação e conheça todas as obras que marcaram a literatura brasileira." />
          <Content>
            <Paragraph text="Machado de Assis é considerado o maior escritor da literatura brasileira. Seus romances atravessam duas fases marcantes — a romântica e a realista — e continuam atuais por sua ironia, crítica social e profundidade psicológica. Abaixo você encontra todos os romances do autor em ordem de publicação." />

            <H3 text="Ressurreição (1872)" />
            <Paragraph text="Romance de estreia de Machado de Assis, 'Ressurreição' explora insegurança, ciúme e a dificuldade de confiar no amor, revelando desde cedo o interesse do autor pela psicologia dos sentimentos." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fressureicao.png?alt=media&token=17a6463e-d4cc-49eb-aa53-6e143b5509f8"
              pdfBook="https://livrosgratuitos.com/pdf?id=69987762127863342fdd7bdf"
            />

            <H3 text="A Mão e a Luva (1874)" />
            <Paragraph text="Em 'A Mão e a Luva', Machado constrói um romance sobre escolhas, ambição e estratégia afetiva. A protagonista Guiomar precisa equilibrar interesses e sentimentos em uma sociedade guiada por aparências." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fa-mao-e-a-luva-capa.png?alt=media&token=8975cbbc-98f9-42e6-969d-ca3f9534be4c"
              pdfBook="https://livrosgratuitos.com/pdf?id=699872d8127863342fdd7bdd"
              urlEpub="https://livrosgratuitos.com/epub?bookId=699872d8127863342fdd7bdd"
            />

            <H3 text="Helena (1876)" />
            <Paragraph text="Helena conta a história de um amor complicado em meio a conflitos familiares, abordando questões de moralidade, preconceito e os desafios da condição feminina na sociedade da época. A profundidade emocional dos personagens e a abordagem sutil, mas incisiva, de Machado destacam a importância da obra como estudo das relações humanas. A narrativa delicada e envolvente faz de Helena uma leitura inspiradora para quem busca compreender as sutilezas do comportamento humano." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fhelena-capa.png?alt=media&token=06f83b12-778a-4af3-a8bc-ca2b6ee4edbf"
              pdfBook="https://livrosgratuitos.com/pdf?id=65f4183b032f702921e3395c"
              urlBook="https://livrosgratuitos.com/livro?bookId=65f4183b032f702921e3395c"
              urlEpub="https://livrosgratuitos.com/epub?bookId=65f4183b032f702921e3395c"
            />

            <H3 text="Iaiá Garcia (1878)" />
            <Paragraph text="'Iaiá Garcia' acompanha o amadurecimento de Iaiá e as tensões afetivas ao seu redor, em um romance de sentimentos contidos, orgulho e escolhas difíceis. É uma ponte entre a fase romântica e o olhar psicológico mais afiado que marcaria a maturidade do autor." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fiaia.png?alt=media&token=35a8da8e-1e5c-44c0-969f-e0e3d9c9eb02"
              pdfBook="https://livrosgratuitos.com/pdf?id=69987cee127863342fdd7be1"
              urlEpub="https://livrosgratuitos.com/epub?bookId=69987cee127863342fdd7be1"
            />

            <H3 text="Memórias Póstumas de Brás Cubas (1881)" />
            <Paragraph text="Essa obra inovadora, narrada pelo defunto Brás Cubas, rompe com as convenções literárias da época. Machado utiliza uma perspectiva única para criticar a sociedade brasileira do século XIX, com humor ácido e ironia. O olhar desencantado de Brás Cubas sobre a vida, a ambição e as relações humanas proporciona reflexões profundas e ainda atuais, transformando o leitor em um crítico da própria existência." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fmemorias-postumas-de-bras-cubas-capa.png?alt=media&token=29d6da15-f3da-41eb-9f41-a2c1891c51d1"
              pdfBook="https://livrosgratuitos.com/pdf?id=65eeabf7822f5ccbb5d70831"
              urlBook="https://livrosgratuitos.com/livro?bookId=65eeabf7822f5ccbb5d70831"
              urlEpub="https://livrosgratuitos.com/epub?bookId=65eeabf7822f5ccbb5d70831"
            />

            <H3 text="Quincas Borba (1891)" />
            <Paragraph text='Em Quincas Borba, Machado de Assis mergulha em temas filosóficos e morais, explorando a teoria do Humanitismo através do lema "ao vencedor, as batatas". A narrativa acompanha a ascensão e queda de Rubião, um homem ambicioso e ingênuo, que herda a fortuna de Quincas Borba sob estranhas condições. Com ironia e sutileza, o autor expõe as contradições da natureza humana e da sociedade, tornando a leitura provocativa e enriquecedora.' />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fquincas-borba-capa.png?alt=media&token=2fa8a7ed-8ac8-41ca-8218-3ad3cd82c2f0"
              pdfBook="https://livrosgratuitos.com/pdf?id=65f423de032f702921e33d86"
              urlBook="https://livrosgratuitos.com/livro?bookId=65f423de032f702921e33d86"
              urlEpub="https://livrosgratuitos.com/epub?bookId=65f423de032f702921e33d86"
            />

            <H3 text="Dom Casmurro (1899)" />
            <Paragraph text="Considerado por muitos o marco da literatura brasileira, Dom Casmurro explora os temas do ciúme, da dúvida e da complexidade das relações humanas. Através da narrativa em primeira pessoa de Bento Santiago, Machado cria uma atmosfera ambígua que desafia o leitor a interpretar se Capitu realmente traiu ou não seu marido. A riqueza psicológica dos personagens e o estilo sofisticado fazem deste romance uma leitura essencial para entender a mestria do autor." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fdom-casmurro-capa.png?alt=media&token=1bde4922-dd60-46f5-a937-0626c49b4e04"
              pdfBook="https://livrosgratuitos.com/pdf?id=65f42c3a032f702921e340ab"
              urlBook="https://livrosgratuitos.com/livro?bookId=65f42c3a032f702921e340ab"
              urlEpub="https://livrosgratuitos.com/epub?bookId=65f42c3a032f702921e340ab"
            />

            <H3 text="Esaú e Jacó (1904)" />
            <Paragraph text="Esaú e Jacó narra a história de gêmeos e suas rivalidades ao longo de um período que abrange grandes transformações históricas no Brasil. A trama familiar, impregnada de críticas sociais e políticas, revela o talento de Machado em criar personagens complexos e diálogos marcantes. A obra não é apenas um drama pessoal, mas também um retrato fiel e crítico da sociedade brasileira, oferecendo lições que permanecem relevantes até hoje." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fesau-e-jaco-capa.png?alt=media&token=12e63ef1-dd56-43b6-8c3b-88052b4d7f1f"
              pdfBook="https://livrosgratuitos.com/pdf?id=67906c16dd3d3c0fe7089781"
              urlBook="https://livrosgratuitos.com/livro?bookId=67906c16dd3d3c0fe7089781"
              urlEpub="https://livrosgratuitos.com/epub?bookId=67906c16dd3d3c0fe7089781"
            />

            <H3 text="Memorial de Aires (1908)" />
            <Paragraph text="Último romance de Machado de Assis, 'Memorial de Aires' tem tom mais íntimo e melancólico, registrando observações sobre a sociedade, o tempo e os afetos. Uma obra madura, sutil e profundamente humana." />
            <Book
              imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fmemorial-de-aires.png?alt=media&token=390094b0-9203-4be7-a5ca-c0796437d1fb"
              pdfBook="https://livrosgratuitos.com/pdf?id=699881ce127863342fdd7be3"
              urlEpub="https://livrosgratuitos.com/epub?bookId=699881ce127863342fdd7be3"
            />
          </Content>
        </div>
        <Footer />
      </CustomLayout>
    </>
  );
};

export default PostPage;