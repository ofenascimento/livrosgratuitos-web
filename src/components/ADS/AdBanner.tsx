"use client";

import React, { useEffect, useRef, useState } from "react";

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
  dataAdFormat,
  dataFullWidthResponsive,
  fixed,
  customClassName,
  responsive,
  vertical,
  square
}: AdBannerTypes) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [adUnfilled, setAdUnfilled] = useState(false);

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }

    const observer = new MutationObserver(() => {
      const adsbygoogleStatus = insRef.current?.getAttribute("data-adsbygoogle-status");
      if (adsbygoogleStatus === "done") {
        const adStatus = insRef.current?.getAttribute("data-ad-status");
        if (adStatus === "unfilled") {
          setAdUnfilled(true);
        } else {
          setAdUnfilled(false);
        }
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, {
        attributes: true,
        attributeFilter: ["data-adsbygoogle-status", "data-ad-status"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    !adUnfilled &&
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
        className="adsbygoogle rounded-lg animate-pulse bg-slate-700 relative "
        style={{
          display: "inline-block",
          width: responsive ? "auto" : vertical ? 120 : square ? 250 : 728,
          height: responsive ? "auto" : vertical ? 728 : square ? 250 : 90,
        }}
        data-ad-client="ca-pub-2529229033686497"
        data-ad-slot={dataAdSlot}
      >
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
          Anúncio
        </p>
      </ins>

    </div>
  );
};

export default AdBanner;
