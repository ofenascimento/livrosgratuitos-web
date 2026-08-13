"use client";

import AdBanner from "@/components/ADS/AdBanner";
import AdResponsive from "@/components/ADS/AdResponsive";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import Metadata from "@/components/Metadata";
import { useBooksPDF } from "@/hooks/useBooks";
import Link from "next/link";
import { useState } from "react";



const SkeletonCard = () => (
  <div className="flex flex-col gap-3 animate-pulse">
    <div className="w-full aspect-[2/3] rounded-2xl bg-stone-200" />
    <div className="h-3.5 w-3/4 rounded-full bg-stone-200" />
    <div className="h-3 w-1/2 rounded-full bg-stone-200" />
  </div>
);

const BookCard = ({ book }: { book: IBook }) => {
  const href = book.slug ? `/pdf/${book.slug}` : `/`;

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 cursor-pointer"
      aria-label={`Ler ${book.titulo} de ${book.autor} em PDF gratuitamente`}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[2/3] bg-stone-100 shadow-sm ring-1 ring-stone-200 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg group-hover:shadow-stone-300/60">
        {book.capa ? (
          <img
            src={book.capa}
            alt={`Capa do livro ${book.titulo} de ${book.autor}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
            <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}

      </div>

      <div className="flex flex-col gap-0.5 px-0.5">
        <h2 className="font-redHat text-sm font-semibold text-stone-800 leading-snug line-clamp-2 group-hover:text-stone-950 transition-colors">
          {book.titulo}
        </h2>
        <p className="font-dmSans text-xs text-stone-500 line-clamp-1">{book.autor}</p>

      </div>
    </Link>
  );
};

const categories = ["Todos", "Romance", "Filosofia", "Ciências", "História", "Poesia", "Crônicas"];

export default function LivrosPDFPage() {
  const { books, isLoading, error } = useBooksPDF();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");



  const filtered = books.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      b.titulo.toLowerCase().includes(q) ||
      b.autor.toLowerCase().includes(q) ||
      b.categoria?.some((c) => c.toLowerCase().includes(q));
    const matchesCategory =
      activeCategory === "Todos" ||
      b.categoria?.some((c) => c.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Metadata seoTitle={"Livros em PDF grátis"} seoDescription={"Nossa biblioteca reúne obras em formato PDF prontas para leitura online ou download. Sem cadastro, sem limite de downloads."} />

      <main className="min-h-screen bg-white text-stone-900">



        <section className="relative border-b border-stone-100 bg-gradient-to-b from-amber-50/60 to-white overflow-hidden">

          <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:px-8 flex flex-col justify-center items-center">


            <div className="flex flex-col items-center justify-center">
              <AdBanner
                dataAdFormat=""
                dataFullWidthResponsive={false}
                dataAdSlot="3946512730"
                customClassName="mt-4"
              />
              <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-4" />
              <div className="max-w-2xl w-full flex mt-4  flex-col justify-center items-center">
                <span className="items-center text-center gap-1.5 bg-main-50 text-main-500 text-xs font-semibold px-3 py-1 rounded-full font-dmSans mb-4">
                  livrosgratuitos.com
                </span>

                <h1 className="font-redHat text-center text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-stone-900 leading-[1.1]">
                  Livros em PDF grátis
                  <br />
                  <span className="text-main-500">baixe ou leia online  </span>
                </h1>

                <p className="font-dmSans mt-5 text-base text-center text-black leading-relaxed max-w-lg">
                  Leia no navegador ou baixe no seu dispositivo — sem cadastro, sem assinatura, sem custo.
                  {!isLoading && books.length > 0 && (
                    <> <strong className="text-stone-700 font-semibold">{books.length} títulos</strong> disponíveis agora.</>
                  )}
                </p>
              </div>

            </div>

            <div className="mt-8 justify-center items-center flex flex-col w-full sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1 justify-center items-center w-full">
                <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por título, autor ou categoria"
                  className="font-dmSans w-full rounded-xl bg-white py-3 pl-11 pr-4 text-sm text-stone-900 placeholder-stone-600 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-main-400/70 transition-shadow shadow-sm"
                  aria-label="Buscar livros em PDF"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={` font-redRat font-semibold text-xs px-3.5 py-1.5 rounded-full ring-1 transition-all ${activeCategory === cat
                    ? "bg-main-500 text-white ring-main-500"
                    : "bg-white text-black ring-black "
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {error && (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <span className="text-4xl">📚</span>
              <p className="font-redHat text-lg font-semibold text-stone-700">Não foi possível carregar os livros</p>
              <p className="font-dmSans text-sm text-stone-400">{error.message}</p>
            </div>
          )}

          {!isLoading && !error && filtered.length === 0 && (search || activeCategory !== "Todos") && (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <span className="text-4xl">🔍</span>
              <p className="font-redHat text-lg font-semibold text-stone-700">
                Nenhum resultado encontrado
              </p>
              <p className="font-dmSans text-sm text-stone-400">
                Tente outro termo ou selecione uma categoria diferente.
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("Todos"); }}
                className="font-dmSans mt-2 text-xs text-amber-600 hover:text-amber-700 underline underline-offset-2"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {!error && (
            <>
              {!isLoading && filtered.length > 0 && (
                <div className="flex items-center justify-between mb-6">
                  <p className=" font-redRat font-semibold text-sm text-stone-900">
                    {search || activeCategory !== "Todos"
                      ? `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`
                      : `${books.length} livro${books.length !== 1 ? "s" : ""} disponível${books.length !== 1 ? "s" : ""}`}
                  </p>
                  <p className=" font-redRat font-semibold text-sm text-stone-900">Domínio público · Gratuito</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {isLoading
                  ? Array.from({ length: 18 }).map((_, i) => <SkeletonCard key={i} />)
                  : filtered.map((book) => <BookCard key={book._id} book={book} />)}
              </div>
            </>
          )}
        </section>

        <AdBanner
          dataAdFormat=""
          dataFullWidthResponsive={false}
          dataAdSlot="2423907456"
          customClassName="mb-4"
        />
        <AdResponsive dataAdSlot="1435361044" />

        {!isLoading && !error && books.length > 0 && (
          <section className="bg-stone-50 border-t border-stone-100">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <h2 className="font-redHat text-base font-bold text-stone-800 mb-2">
                    Baixe livros em PDF grátis
                  </h2>
                  <p className="font-dmSans text-sm text-stone-800 leading-relaxed">
                    Nossa biblioteca reúne obras em formato PDF prontas para leitura online ou download. Sem cadastro, sem limite de downloads.
                  </p>
                </div>
                <div>
                  <h2 className="font-redHat text-base font-bold text-stone-800 mb-2">
                    Leia online no navegador
                  </h2>
                  <p className="font-dmSans text-sm text-stone-800 leading-relaxed">
                    Prefere não baixar? Leia diretamente pelo navegador com nosso leitor de PDF integrado, compatível com celular e computador.
                  </p>
                </div>
                <div>
                  <h2 className="font-redHat text-base font-bold text-stone-800 mb-2">
                    Domínio público e gratuito
                  </h2>
                  <p className="font-dmSans text-sm text-stone-800 leading-relaxed">
                    Todos os títulos estão em domínio público ou foram disponibilizados com autorização. Acervo 100% legal e gratuito para sempre.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}