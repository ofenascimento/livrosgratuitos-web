import { SEO } from "../components/SEO";
import StorySlider from "@/components/StorySlider/StorySlider";
import SearchInput from "@/components/SearchInput/SearchInput";
import BookList from "@/components/BookList/BookList";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import FeaturedBooks from "@/components/FeaturedBooks/FeaturedBooks";

export default function Home() {
  return (
    <>
      <SEO shouldExcludeTitleSuffix title="Livros Gratuitos" />
      <Navbar />
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
      <ImageSlider auto />
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
            novas histórias 😍
          </>
        }
      />
      <FeaturedBooks />
      <Footer />
    </>
  );
}
