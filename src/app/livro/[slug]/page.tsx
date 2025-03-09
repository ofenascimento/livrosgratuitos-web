"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import ModalReaderConfig from "@/components/Modals/ModalReaderConfig";
import { HiChevronLeft, HiDotsVertical } from "react-icons/hi";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import { useFetchBookBySlug } from "@/hooks/useFetchBookBySlug";
import { useParams, useRouter } from "next/navigation";
import { addProgressBook } from "@/hooks/addProgressBook";
import useAuth from "@/hooks/useAuth";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";

export default function TesteLeitor() {
    const isAuth = useAuth();

    const [htmlContent, setHtmlContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPreview, setIsLoadingPreview] = useState(true);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentParagraph, setCurrentParagraph] = useState(1);
    const [targetParagraph, setTargetParagraph] = useState<number | null>(null);
    const contentRef = useRef(null);
    const [modalConfigIsOpen, setModalConfigIsOpen] = useState<boolean>(false);

    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const { book } = useFetchBookBySlug(slug);

    const {
        fontSize,
        background,
        fontFamily,
        setFontSize,
        setBackground,
        setFontFamily,
    } = useReaderConfig();

    useEffect(() => {
        if (!book?.urlHtml) {
            console.log("Erro: `book.urlHtml` ainda não está carregado.");
            return;
        }

        console.log("Chamando fetch para:", book.urlHtml);

        fetch(book.urlHtml)
            .then((res) => res.text())
            .then((html) => {
                console.log("Fetch realizado com sucesso!");

                const paragraphs = html
                    .split("</p>")
                    .map(
                        (p, index) =>
                            `<p id="paragraph-${index + 1}" class="paragraph">${p}</p>`
                    )
                    .join("");

                setHtmlContent(paragraphs);
                setIsLoading(false);
                setTimeout(() => {
                    setIsLoadingPreview(false);
                }, 4000);
            })
            .catch((err) => {
                router.push("/");
                console.error("Erro ao carregar HTML:", err);
            });
    }, [book?.urlHtml]);

    useEffect(() => {
        if (book?.currentParagraph !== undefined) {
            setTargetParagraph(book.currentParagraph);
        }
    }, [book?.currentParagraph]);

    const scrollToParagraph = (paragraphNumber: number) => {
        const paragraph = document.getElementById(`paragraph-${paragraphNumber}`);
        if (paragraph) {
            paragraph.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        if (!isLoading && targetParagraph !== null) {
            setTimeout(() => {
                scrollToParagraph(targetParagraph);
            }, 500);
        }
    }, [isLoading, targetParagraph]);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(percent);

        const paragraphs = document.querySelectorAll(".paragraph");
        let closestParagraphIndex = 0;
        let closestDistance = Infinity;

        paragraphs.forEach((paragraph, index) => {
            const rect = paragraph.getBoundingClientRect();
            const distance = Math.abs(rect.top - 60);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestParagraphIndex = index;
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

    useEffect(() => {
        if (!isAuth) return;
        if (!book?._id) return;

        const handleBeforeUnload = (event: any) => {
            addProgressBook(
                book?._id,
                0,
                Math.round(scrollProgress) ?? 0,
                currentParagraph - 2
            );

            event.preventDefault();
            event.returnValue = "";
        };

        const handlePopState = () => {
            addProgressBook(
                book?._id,
                0,
                Math.round(scrollProgress) ?? 0,
                currentParagraph - 2
            );
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isAuth, book?._id, currentParagraph]);

    const styledHtml = `
    <style>
     @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Lora:wght@100;200;300;400;500;600;700;800;900&display=swap');

      .reader {
        background-color: ${background === "dark"
            ? "#000000"
            : background === "sepia"
                ? "#faf2e7"
                : "#ffffff"
        };
        color: ${background === "dark"
            ? "#ffffff"
            : background === "sepia"
                ? "#000000"
                : "#000000"
        };
      }
      .paragraph {
        background-color: ${background === "dark"
            ? "#000000"
            : background === "sepia"
                ? "#faf2e7"
                : "#ffffff"
        };
        color: ${background === "dark"
            ? "#ffffff"
            : background === "sepia"
                ? "#000000"
                : "#000000"
        };
        margin-block: 20px;
        font-family: ${fontFamily};
        font-size: ${fontSize}px;
      }
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        z-index: 100;
      }
      .progress-bar-container {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100vw;
        height: 10px;
        background-color: #d3d3d3;
        overflow: hidden;
        border-radius: 0;
      }
      .progress-bar {
        width: ${scrollProgress}%;
        height: 10px;
        background-color: #7650ed;
        transition: width 0.2s ease-in-out;
      }
    </style>
    <div class="reader">
      ${htmlContent}
    </div>
  `;

    return (
        <>
            {isLoadingPreview && <FullScreenLoader label="Carregando livro..." />}
            <div
                className={`relative reader min-h-screen min-w-screen p-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"
                    }`}
            >
                <div className="navbar bg-gray-800">
                    <div className="w-full flex justify-between items-center">
                        <a href={`/${slug}`} className="bg-gray-700 cursor-pointer rounded-full text-white lg:px-4 p-2 flex gap-2 justify-center items-center">
                            <HiChevronLeft />
                            <p className="hidden lg:block font-lexend text-sm font-normal">
                                Voltar
                            </p>
                        </a>
                        {!isLoadingPreview && <div className="flex flex-col gap-1 justify-center items-center">
                            <h1 className="text-white">{book?.titulo ?? "oi"}</h1>
                            <p className="text-sm text-white">
                                Progresso: {Math.round(scrollProgress)}%
                            </p>
                        </div>}



                        <button
                            onClick={() => setModalConfigIsOpen(true)}
                            className="bg-gray-700 text-white lg:px-4 p-2 rounded-full flex gap-2 justify-center items-center"
                        >
                            <p className="hidden lg:block font-lexend text-sm font-normal">
                                Configurações
                            </p>
                            <HiDotsVertical />
                        </button>
                    </div>
                </div>

                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                <div className="h-16"></div>

                <div ref={contentRef} className="max-w-2xl mx-auto pt-6">
                    <div dangerouslySetInnerHTML={{ __html: styledHtml }} />
                </div>
                <ModalReaderConfig
                    isOpen={modalConfigIsOpen}
                    onRequestClose={() => setModalConfigIsOpen(false)}
                />
            </div>
            <AdBanner dataAdSlot="2423907456" fixed />
            <AdBannerMobile dataAdSlot="6603126932" fixed />
        </>
    );
}
