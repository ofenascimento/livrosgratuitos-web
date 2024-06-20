"use client";
import type { Metadata } from "next";
import { Poppins, Inter, Raleway, Merriweather, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { metadata } from "./metadata";
import { BookProvider } from "@/context/BookContext";
import { ReaderConfigProvider } from "@/context/ReaderConfiContext";
import { usePathname } from "next/navigation";
import { useReaderConfig } from "@/hooks/useReaderConfig";

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
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content={metadata.description ?? "Livros Gratuitos"}
        />
        <title>{String(metadata.title)}</title>{" "}
      </head>

      <body
        className={`${poppins.variable} ${inter.variable} ${raleway.variable} ${lora.variable} ${merriweather.variable}  font-raleway bg-black bg-blured `}
      >
        <ReaderConfigProvider>
          <BookProvider>
            <div className="min-h-screen flex items-center justify-center lg:bg-blured">
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
