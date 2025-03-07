import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Title from "../widgets/Title/Title";
import { Metadata } from "next";
import Description from "../widgets/Description/Description";
import Content from "../widgets/Content/Content";
import H3 from "../widgets/H3/H3";
import Paragraph from "../widgets/Paragraph/Paragraph";
import Book from "../widgets/Book/Book";
import CustomLayout from "@/components/CustomLayout/CustomLayout";

export const metadata: Metadata = {
    title: "5 Livros de Machado de Assis que Você Deve Ler",
    description: "Confira 5 livros incríveis de Machado de Assis que marcam a literatura brasileira com histórias envolventes e reflexões profundas",
};

const PostPage = () => {
    return (
        <>
            <CustomLayout>
                <Navbar />
                <div className="w-full mx-auto px-4 lg:px-0">
                    <Title title="5 Livros de Machado de Assis que Você Deve Ler" />
                    <Description description="Confira 5 livros incríveis de Machado de Assis que marcam a literatura brasileira com histórias envolventes e reflexões profundas" />
                    <Content>
                        <Paragraph text="Machado de Assis é um dos maiores escritores da literatura brasileira, cujas obras continuam encantando leitores com suas narrativas perspicazes, estilo refinado e profundidade psicológica. Se você deseja mergulhar no universo desse gênio da literatura, confira nossa seleção dos cinco melhores livros que você deve ler." />
                        <H3 text="Dom Casmurro" />
                        <Paragraph text="Considerado por muitos o marco da literatura brasileira, Dom Casmurro explora os temas do ciúme, da dúvida e da complexidade das relações humanas. Através da narrativa em primeira pessoa de Bento Santiago, Machado cria uma atmosfera ambígua que desafia o leitor a interpretar se Capitu realmente traiu ou não seu marido. A riqueza psicológica dos personagens e o estilo sofisticado fazem deste romance uma leitura essencial para entender a mestria do autor." />
                        <Book
                            imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fdom-casmurro-capa.png?alt=media&token=1bde4922-dd60-46f5-a937-0626c49b4e04"
                            urlBook="https://livrosgratuitos.com/livro?bookId=65f42c3a032f702921e340ab"
                            pdfBook="https://pdf.livrosgratuitos.com/livro?id=65f42c3a032f702921e340ab"
                        />
                        <H3 text="Memórias Póstumas de Brás Cubas" />
                        <Paragraph text="Essa obra inovadora, narrada pelo defunto Brás Cubas, rompe com as convenções literárias da época. Machado utiliza uma perspectiva única para criticar a sociedade brasileira do século XIX, com humor ácido e ironia. O olhar desencantado de Brás Cubas sobre a vida, a ambição e as relações humanas proporciona reflexões profundas e ainda atuais, transformando o leitor em um crítico da própria existência." />
                        <Book
                            imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fmemorias-postumas-de-bras-cubas-capa.png?alt=media&token=29d6da15-f3da-41eb-9f41-a2c1891c51d1"
                            urlBook="https://livrosgratuitos.com/livro?bookId=65eeabf7822f5ccbb5d70831"
                            pdfBook="https://pdf.livrosgratuitos.com/livro?id=65eeabf7822f5ccbb5d70831"
                        />
                        <H3 text="Quincas Borba" />
                        <Paragraph text="Em Quincas Borba, Machado de Assis mergulha em temas filosóficos e morais, explorando a teoria do Humanitismo através do lema “ao vencedor, as batatas”. A narrativa acompanha a ascensão e queda de Rubião, um homem ambicioso e ingênuo, que herda a fortuna de Quincas Borba sob estranhas condições. Com ironia e sutileza, o autor expõe as contradições da natureza humana e da sociedade, tornando a leitura provocativa e enriquecedora." />
                        <Book
                            imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fquincas-borba-capa.png?alt=media&token=2fa8a7ed-8ac8-41ca-8218-3ad3cd82c2f0"
                            urlBook="https://livrosgratuitos.com/livro?bookId=65f423de032f702921e33d86"
                            pdfBook="https://pdf.livrosgratuitos.com/livro?id=65f423de032f702921e33d86"
                        />
                        <H3 text="Esaú e Jacó" />
                        <Paragraph text="Esaú e Jacó narra a história de gêmeos e suas rivalidades ao longo de um período que abrange grandes transformações históricas no Brasil. A trama familiar, impregnada de críticas sociais e políticas, revela o talento de Machado em criar personagens complexos e diálogos marcantes. A obra não é apenas um drama pessoal, mas também um retrato fiel e crítico da sociedade brasileira, oferecendo lições que permanecem relevantes até hoje." />
                        <Book
                            imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fesau-e-jaco-capa.png?alt=media&token=12e63ef1-dd56-43b6-8c3b-88052b4d7f1f"
                            urlBook="https://livrosgratuitos.com/livro?bookId=67906c16dd3d3c0fe7089781"
                            pdfBook="https://pdf.livrosgratuitos.com/livro?id=67906c16dd3d3c0fe7089781"
                        />
                        <H3 text="Helena" />
                        <Paragraph text="Helena conta a história de um amor complicado em meio a conflitos familiares, abordando questões de moralidade, preconceito e os desafios da condição feminina na sociedade da época. A profundidade emocional dos personagens e a abordagem sutil, mas incisiva, de Machado destacam a importância da obra como estudo das relações humanas. A narrativa delicada e envolvente faz de Helena uma leitura inspiradora para quem busca compreender as sutilezas do comportamento humano." />
                        <Book
                            imageSrc="https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/capas%2Fhelena-capa.png?alt=media&token=06f83b12-778a-4af3-a8bc-ca2b6ee4edbf"
                            urlBook="https://livrosgratuitos.com/livro?bookId=65f4183b032f702921e3395c"
                            pdfBook="https://pdf.livrosgratuitos.com/livro?id=65f4183b032f702921e3395c"
                        />

                    </Content>
                </div>
                <Footer />
            </CustomLayout>
        </>
    );
};

export default PostPage;
