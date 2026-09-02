import { SEO } from "../components/SEO";
import StorySlider from "@/components/StorySlider/StorySlider";
import SearchInput from "@/components/SearchInput/SearchInput";
import BookList from "@/components/BookList/BookList";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import FeaturedBooks from "@/components/FeaturedBooks/FeaturedBooks";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import CustomLayout from "@/components/CustomLayout/CustomLayout";
import AdResponsive from "@/components/ADS/AdResponsive";

export default function Home() {
  return (
    <>
      <CustomLayout>
        <SEO
          shouldExcludeTitleSuffix
          title="Livros Gratuitos - Leia livros 100% de graça"
        />
        <Navbar />
        <AdBanner
          dataAdFormat="auto"
          dataAdSlot="2423907456"
          customClassName="mb-2 mt-4"
        />
        <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-3" />
        <div className="mt-4 block md:hidden">
          <SearchInput />
        </div>
        <StorySlider />
        <BookList
          options={{ featured: "true" }}
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
        <AdResponsive dataAdSlot="1435361044" />
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
        <AdBanner
          dataAdFormat="auto"
          dataAdSlot="2423907456"
          customClassName="mb-4"
        />
        <FeaturedBooks />
        <Footer />
      </CustomLayout>
    </>
  );
}
