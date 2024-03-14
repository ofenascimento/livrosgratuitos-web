import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "700"], 
  style: ["normal", "italic"], 
  display: "swap", 
  subsets: ["latin"] 
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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}


