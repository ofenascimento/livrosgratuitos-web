"use client";

import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error.message);
    }

    const timeout = setTimeout(() => {
      if (insRef.current && containerRef.current) {
        // Verifica se há um <iframe> dentro do <ins>
        const hasIframe = insRef.current.querySelector("iframe") !== null;
        // Se houver um <iframe>, exibe o container
        if (hasIframe) {
          containerRef.current.style.display = "flex"; 
          // ou remova o estilo para restaurar o padrão: containerRef.current.style.display = "";
        }
        // Se não houver <iframe>, mantém o container oculto
      }
    }, 3000); // tempo de espera ajustável

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: "none" }}
      className={`${customClassName} w-full justify-center items-center md:flex ${
        fixed ? "fixed bottom-0 left-0 z-50 my-0" : ""
      }`}
    >
      <ins
        ref={insRef}
        className={`adsbygoogle ${!responsive && "bg-gray-600"} rounded-lg`}
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
