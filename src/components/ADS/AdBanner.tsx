"use client";

import React, { useEffect, useRef, useState } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  fixed?: boolean;
  customClassName?: string;
  responsive?: boolean;
};

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  fixed,
  customClassName,
  responsive
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
        className="adsbygoogle rounded-lg bg-slate-700 "
        style={{
          display: "inline-block",
          width: responsive ? "auto" : 728,
          height: responsive ? "auto" : 90,
        }}
        data-ad-client="ca-pub-2529229033686497"
        data-ad-slot={dataAdSlot}
      ></ins>
    </div>
  );
};

export default AdBanner;
