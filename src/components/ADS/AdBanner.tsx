"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  fixed?: boolean;
  customClassName?: string;
  responsive?: boolean;
  vertical?: boolean;
  square?: boolean;
};

const AdBanner = ({
  dataAdSlot,
  fixed,
  customClassName,
  responsive,
  vertical,
  square,
}: AdBannerTypes) => {
  const { consent } = useCookieConsent();
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [adUnfilled, setAdUnfilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (consent !== "accepted") return;

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }

    const observer = new MutationObserver(() => {
      const adsbygoogleStatus = insRef.current?.getAttribute("data-adsbygoogle-status");
      if (adsbygoogleStatus === "done") {
        const adStatus = insRef.current?.getAttribute("data-ad-status");
        setAdUnfilled(adStatus === "unfilled");
        setIsLoading(false);
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, {
        attributes: true,
        attributeFilter: ["data-adsbygoogle-status", "data-ad-status"],
      });
    }

    return () => observer.disconnect();
  }, [consent]);

  if (consent !== "accepted") return null;

  const width = responsive ? "auto" : vertical ? 120 : square ? 250 : 728;
  const height = responsive ? "auto" : vertical ? 728 : square ? 250 : 90;

  return (
    (!adUnfilled || vertical) && (
      <div
        ref={containerRef}
        className={`
          ${customClassName || ""}
          w-full justify-center items-center hidden md:flex
          transition-all duration-500 ease-out overflow-hidden
          ${fixed ? "fixed bottom-0 left-0 z-50 my-0" : ""}
        `}
      >
        <ins
          ref={insRef}
          className={`adsbygoogle rounded-lg ${!vertical ? "bg-gray-900" : "bg-transparent"} relative ${isLoading && !vertical ? "animate-pulse" : ""}`}
          style={{ display: "inline-block", width, height }}
          data-ad-client="ca-pub-2529229033686497"
          data-ad-slot={dataAdSlot}
        >
          {(isLoading && !vertical) && (
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              Anúncio
            </p>
          )}
        </ins>
      </div>
    )
  );
};

export default AdBanner;