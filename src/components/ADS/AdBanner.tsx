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
  const [isVisible, setIsVisible] = useState(false); // Começa invisível

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }

    const timeout = setTimeout(() => {
      if (insRef.current) {
        const adStatus = insRef.current.getAttribute("data-ad-status");
        const hasIframe = insRef.current.querySelector("iframe") !== null;

        if (adStatus === "filled" && hasIframe) {
          setIsVisible(true); // Torna visível somente se for preenchido
        }
      }
    }, 100); // Verificação rápida

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        ${customClassName || ""} 
        w-full justify-center items-center hidden md:flex 
        transition-opacity duration-500 ease-out overflow-hidden 
        ${fixed ? "fixed bottom-0 left-0 z-50 my-0" : ""}
      `}
      style={{
        height: isVisible ? "auto" : 0,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle rounded-lg"
        style={{
          display: "inline-block",
          width: responsive ? "auto" : 728,
          height: responsive ? "auto" : 90
        }}
        data-ad-client="ca-pub-2529229033686497"
        data-ad-slot={dataAdSlot}
        // data-ad-format={dataAdFormat}
        // data-full-width-responsive={dataFullWidthResponsive?.toString()}
      ></ins>
    </div>
  );
};

export default AdBanner;
