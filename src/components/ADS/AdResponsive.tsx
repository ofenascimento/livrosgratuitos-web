"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

type AdResponsiveProps = {
  dataAdSlot: string;
  customClassName?: string;
};

const AdResponsive = ({ dataAdSlot, customClassName }: AdResponsiveProps) => {
  const { consent } = useCookieConsent();
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
      const status = insRef.current?.getAttribute("data-adsbygoogle-status");
      if (status === "done") {
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
  if (adUnfilled) return null;

  return (
    <div
      className={`
        w-full flex justify-center items-center
        transition-all duration-500 overflow-hidden
        ${isLoading ? "min-h-[90px]" : ""}
        ${customClassName || ""}
      `}
    >
      <ins
        ref={insRef}
        className={`
          adsbygoogle block w-full rounded-md bg-slate-700 relative overflow-hidden
          ${isLoading ? "animate-pulse min-h-[90px]" : ""}
        `}
        style={{ display: "block" }}
        data-ad-client="ca-pub-2529229033686497"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
        {isLoading && (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 text-sm font-medium select-none">
            Anúncio
          </p>
        )}
      </ins>
    </div>
  );
};

export default AdResponsive;