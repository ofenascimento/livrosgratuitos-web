"use client";
import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

type Props = {
  pId?: string;
};

const GoogleAdsense: React.FC<Props> = ({ pId = "2529229033686497" }) => {
  const { consent } = useCookieConsent();

  if (process.env.NODE_ENV !== "production") return null;
  if (consent !== "accepted") return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdsense;