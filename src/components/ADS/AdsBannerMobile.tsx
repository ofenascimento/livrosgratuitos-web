"use client";

import React, { useEffect, useRef, useState } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  fixed?: boolean;
  customClassName?: string;
};

const AdBannerMobile = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  fixed,
  customClassName
}: AdBannerTypes) => {
  const insRef = useRef<HTMLModElement>(null);
  const [adUnfilled, setAdUnfilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
    !adUnfilled && (
      <div
        className={`${customClassName || ""} w-full justify-center items-center flex md:hidden ${fixed ? "fixed bottom-0 left-0 z-50" : ""
          }`}
      >
        <ins
          ref={insRef}
          className={`adsbygoogle bg-slate-700 rounded-lg relative ${isLoading ? "animate-pulse" : ""}`}
          style={{ display: "inline-block", width: 350, height: 50 }}
          data-ad-client="ca-pub-2529229033686497"
          data-ad-slot={dataAdSlot}
        >
          {isLoading && (
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              Anúncio
            </p>
          )}
        </ins>
      </div>
    )
  );
};

export default AdBannerMobile;
