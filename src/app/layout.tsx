// app/layout.tsx
import type { Metadata } from "next";
import {
  Poppins,
  Inter,
  Raleway,
  Merriweather,
  Lora,
  Lexend,
  Darker_Grotesque,
  Nunito,
  Red_Hat_Display,
  DM_Sans,

} from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";

import GoogleAdsense from "@/components/Ads";
import Providers from "./providers";
import { ToastProvider } from "@/components/Toast/ToastProvider";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-poppins",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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

const lexend = Lexend({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-lexend",
});

const darkerGrotesque = Darker_Grotesque({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-darker-grotesque",
});

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-nunito",
});

const redHat = Red_Hat_Display({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-redhat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Consent Mode ANTES de qualquer script do Google */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                personalization_storage: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
        <meta
          name="description"
          content={metadata.description ?? "Livros Gratuitos"}
        />
        <meta
          name="google-site-verification"
          content="KOaKjo4TUKs2O2SdRxRs61dwmfSAe-f-4RvutfYlBnY"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-2529229033686497"
        />
        <title>{String(metadata.title)}</title>
      </head>

      <body
        className={`
          ${poppins.variable}
          ${inter.variable}
          ${raleway.variable}
          ${lora.variable}
          ${merriweather.variable}
          ${lexend.variable}
          ${darkerGrotesque.variable}
          ${nunito.variable}
          ${redHat.variable}
          ${dmSans.variable}
          font-raleway
          bg-black
          bg-blured
        `}
      >
        <ToastProvider>
          <Providers>
            {children}
          </Providers>
        </ToastProvider>

        {/* ✅ AdSense dentro do body */}
        <GoogleAdsense />
      </body>
    </html>
  );
}