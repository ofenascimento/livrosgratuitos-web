"use client";
import type { Metadata } from "next";
import { Poppins, Inter, Raleway, Merriweather, Lora } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import { BookProvider } from "@/context/BookContext";
import { ReaderConfigProvider } from "@/context/ReaderConfiContext";


const poppins = Poppins({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const raleway = Raleway({
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-raleway",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const lora = Lora({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content={metadata.description ?? "Livros Gratuitos"}
        />
        <meta name="google-site-verification" content="KOaKjo4TUKs2O2SdRxRs61dwmfSAe-f-4RvutfYlBnY" />
        <meta name="google-adsense-account" content="ca-pub-2529229033686497"></meta>
        <title>{String(metadata.title)}</title>
      </head>

      <body
        className={`${poppins.variable} ${inter.variable} ${raleway.variable} ${lora.variable} ${merriweather.variable}  font-raleway bg-black bg-blured `}
      >
        <ReaderConfigProvider>
          <BookProvider>
            <div className="min-h-screen flex items-center justify-center lg:bg-blured text-white">
              <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg ">
                {children}
              </div>
            </div>
          </BookProvider>
        </ReaderConfigProvider>
      </body>
    </html>
  );
}
