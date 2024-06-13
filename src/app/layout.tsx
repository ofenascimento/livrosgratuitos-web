"use client";
import type { Metadata } from "next";
import { Poppins, Inter, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { metadata } from "./metadata";
import { BookProvider } from "@/context/BookContext";

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
        <title>{String(metadata.title)}</title>{" "}
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${raleway.variable}  font-raleway dark:bg-black bg-white bg-blured `}
      >
        <ThemeProvider>
          <BookProvider>
            <div className="min-h-screen flex items-center justify-center lg:bg-blured">
              <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg ">
                {children}
              </div>
            </div>
          </BookProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
