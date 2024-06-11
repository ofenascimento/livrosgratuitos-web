import { SEO } from "../components/SEO";
import StorySlider from "@/components/StorySlider/StorySlider";
import SearchInput from "@/components/SearchInput/SearchInput";
import BookList from "@/components/BookList/BookList";
import TabBar from "@/components/TabBar/TabBar";
import FAQ from "@/components/FAQ/FAQ";
import BookCatalog from "@/components/BookCatalog/BookCatalog";

export default function Home() {
  return (
    <>
      <SEO shouldExcludeTitleSuffix title="Livros Gratuitos" />
      <div className="mt-4 block md:hidden">
        <SearchInput />
      </div>
      <StorySlider />
      <BookList
        options={{ destaque: "true" }}
        label={
          <>
            Dá uma 👀{"  "}
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
              olhadinha
            </span>{" "}
            nos{" "}
            <span
              style={{
                textDecorationColor: "#7B66FF",
                textDecorationThickness: "5px",
                textDecorationLine: "underline",
              }}
            >
              destaques
            </span>
            {"  "} da semana
          </>
        }
      />
      <BookList
        options={{ q: "9", sort: "true" }}
        label={
          <>
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
              Descubra
            </span>{" "}
            novas histórias
          </>
        }
      />
      <FAQ />
      <TabBar />
    </>
  );
}
