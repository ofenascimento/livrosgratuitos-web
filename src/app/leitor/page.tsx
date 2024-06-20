// pages/ler-livro.js
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import { useBook } from "@/hooks/useBook";
import ModalReaderConfig from "@/components/Modals/ModalReaderConfig";
import { useReaderConfig } from "@/hooks/useReaderConfig";

export default function Leitor() {
  const { fontSize, background, fontFamily } = useReaderConfig();
  const [content, setContent] = useState("");
  const [paragraphCount, setParagraphCount] = useState(0);
  const [modalConfigIsOpen, setModalConfigIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paragraphNumber, setParagraphNumber] = useState<number>(1);
  const [currentParagraph, setCurrentParagraph] = useState<number>(1);
  const searchParams = useSearchParams();
  const toParagraph = searchParams.get("p");
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { title, urlBook } = useBook();
  const router = useRouter();

  useEffect(() => {
    if (urlBook === "nobook") {
      router.push("/");
    }
    if (
      typeof window !== "undefined" &&
      urlBook &&
      typeof urlBook === "string"
    ) {
      const fetchBookContent = async (urlContent: string) => {
        try {
          const response = await fetch(urlContent);
          const textContent = await response.text();
          setContent(textContent);
          const paragraphs = textContent
            .split(/\n\n+/)
            .filter((p) => p.trim() !== "");
          setParagraphCount(paragraphs.length);

          if (toParagraph) {
            const paragraphNum = Number(toParagraph);
            setParagraphNumber(paragraphNum);

            setTimeout(() => {
              handleScrollToParagraph(paragraphNum);
            }, 100);
          }
        } catch (error) {
          console.error("Failed to fetch book content:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookContent(urlBook);
    }
  }, [urlBook, toParagraph]);

  const handleScrollToParagraph = (paragraphNum: number) => {
    const paragraphIndex = paragraphNum - 1;
    if (paragraphRefs.current[paragraphIndex]) {
      paragraphRefs.current[paragraphIndex]?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.warn(`Paragraph ${paragraphNum} not found.`);
    }
  };

  const handleScroll = useCallback(() => {
    let closestParagraphIndex = 0;
    let closestDistance = Infinity;

    paragraphRefs.current.forEach((paragraph, index) => {
      if (paragraph) {
        const rect = paragraph.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestParagraphIndex = index;
        }
      }
    });

    setCurrentParagraph(closestParagraphIndex + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (!urlBook || isLoading)
    return <FullScreenLoader label="Carregando conteúdo" />;

  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim() !== "");

  const readingPercentage = (currentParagraph / paragraphCount) * 100;

  if (urlBook === "nobook") return null;
  return (
    <div className={`relative min-h-screen font-${fontFamily}`}>
      <div
        className="fixed inset-0 min-h-screen"
        style={{
          zIndex: -1,
          backgroundColor:
            background === "dark"
              ? "#000000"
              : background === "sepia"
              ? "#faf2e7"
              : "#ffffff",
        }}
      ></div>
      <div
      className="relative min-h-screen"
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
          color: "#fff",
          backgroundColor:
            background === "dark"
              ? "#000000"
              : background === "sepia"
              ? "#faf2e7"
              : "#ffffff",
        }}
      >
        <div>
          {/* <div className="fixed bottom-0 right-0 bg-orange-400 p-8">
          <p>Número de parágrafos: {paragraphCount}</p>
          <p>Parágrafo atual: {currentParagraph}</p>
          <p>Porcentagem de leitura: {Math.round(readingPercentage)}%</p>
        </div> */}
          <div className=" mt-0  fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-gray-800 p-4 z-50">
            <div className="flex justify-between items-center flex-col gap-3">
              <div
                id="buttons"
                className="flex w-full justify-between items-center font-poppins"
              >
                <button
                  onClick={() => router.back()}
                  className="bg-gray-700 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center"
                >
                  <HiChevronLeft />
                  <p className=" hidden lg:block"> Voltar</p>
                </button>
                <div className=" font-poppins flex flex-col justify-center items-center">
                  <h1>{title}</h1>
                  <span className=" text-sm">{`Progresso: ${Math.round(
                    readingPercentage
                  )}%`}</span>
                </div>

                <button
                  onClick={() => setModalConfigIsOpen(true)}
                  className="bg-gray-700 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
                >
                  <p className=" hidden lg:block"> Configurações</p>
                  <HiDotsVertical />
                </button>
              </div>
              <div
                className="progress-bar-container w-full"
                style={{
                  backgroundColor: "#ddd",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="progress-bar bg-main-400"
                  style={{
                    width: `${readingPercentage}%`,
                    height: "10px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="h-24"></div>
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              id={`paragraph-${index + 1}`}
              ref={(el) => {
                paragraphRefs.current[index] = el;
              }}
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                marginBottom: "1em",
                fontSize: fontSize,
                backgroundColor:
                  background === "dark"
                    ? "#000000"
                    : background === "sepia"
                    ? "#faf2e7"
                    : "#ffffff",
                color: background === "dark" ? "#ffffff" : "#000000",
              }}
            >
              {paragraph}
            </div>
          ))}
          <div className=" h-[700px]"></div>
        </div>
        <ModalReaderConfig
          isOpen={modalConfigIsOpen}
          onRequestClose={() => setModalConfigIsOpen(false)}
        />
      </div>
    </div>
  );
}
