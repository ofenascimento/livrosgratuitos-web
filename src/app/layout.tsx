import type { Metadata } from "next";
import { Poppins, Inter, Raleway } from "next/font/google"; // Importe a fonte Raleway
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

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

export const metadata: Metadata = {
  title: "Livros Gratuitos",
  description: "Leia livros 100% grátis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${raleway.variable} font-inter`}>
        <div className="min-h-screen flex items-center justify-center bg-dark-background">
          <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
