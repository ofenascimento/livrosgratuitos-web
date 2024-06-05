import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import CardInfo from "../components/CardInfo/CardInfo";
import Accordion from "../components/Accordion/Accordion";
import Footer from "../components/Footer/Footer";
import { SEO } from "../components/SEO";
import BookCatalog from "@/components/BookCatalog/BookCatalog";
import Title from "@/components/Title/Title";
import StorySlider from "@/components/StorySlider/StorySlider";
import SearchInput from "@/components/SearchInput/SearchInput";
import BookList from "@/components/BookList/BookList";
import TitleWithEmoji from "@/components/TitleWithEmoji/TitleWithEmoji";
import Discover from "@/components/DiscoverList/DiscoverList";
import TabBar from "@/components/TabBar/TabBar";

export default function Home() {
  return (
    <>
      <SEO shouldExcludeTitleSuffix title="Livros Gratuitos" />
      <StorySlider />
      {/* <TitleWithEmoji />
      <SearchInput /> */}
      <Title customClassName="items-start" title="Favoritos do site" />
      <BookList />

      <Title customClassName="items-start" title="Descruba uma nova história" />
      <Discover />

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="container px-4 md:px-0">
          <Title
            customClassName=" items-start"
            title={
              <>
                Ficou com alguma {"  "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  dúvida?
                </span>
              </>
            }
          />
          <Accordion
            title="O aplicativo é realmente 100% gratuito?"
            content="Sim, nosso aplicativo é 100% gratuito. Comprometemo-nos a fornecer acesso irrestrito a uma rica coleção de livros sem qualquer custo para nossos usuários. Acreditamos que o conhecimento e a cultura devem ser acessíveis a todos."
          />
          <Accordion
            title="Posso marcar livros como favoritos no aplicativo?"
            content="Com certeza! Entendemos que encontrar um livro que você ama é uma experiência especial. Por isso, nosso aplicativo permite que você marque livros como favoritos para facilitar o acesso posterior."
          />
          <Accordion
            title="O aplicativo salva automaticamente o meu progresso de leitura?"
            content="Sim, nosso aplicativo salva automaticamente o seu progresso de leitura para que você possa retomar exatamente de onde parou, mesmo que feche o livro ou o aplicativo. Quando você retorna a um livro previamente iniciado, o aplicativo o abre na página em que você parou, garantindo uma experiência de leitura contínua e conveniente. "
          />
          <Accordion
            title="Como posso buscar por livros no aplicativo?"
            content="Utilize a barra de pesquisa na parte superior da tela para digitar o título do livro, o nome do título ou palavras-chave relacionadas."
          />
        </div>
      </div>
      <TabBar />
    </>
  );
}
