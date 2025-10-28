import React, { useEffect, useMemo, useState } from "react";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import { IAutorInfo } from "./types";

const AutorInfo: React.FC<IAutorInfo> = ({
  title,
  autor,
  modified,
  font,
  fontLink,
  license,
  licenseLink,
}) => {
  const { background } = useReaderConfig();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { containerClass, textClass, linkColor, linkDecoColor } = useMemo(() => {
    // Antes de montar no cliente, não aplique classes baseadas no tema
    if (!mounted) {
      return {
        containerClass: "",
        textClass: "",
        linkColor: "#7a4d2a",
        linkDecoColor: "rgba(122,77,42,0.4)",
      };
    }

    const isDark = background === "dark";
    const isSepia = background === "sepia";

    let containerBg = "bg-white";
    let textClr = "text-zinc-900";
    let linkClr = "#7a4d2a"; // padrão light/sepia
    let linkDecoClr = "rgba(122,77,42,0.4)";

    if (isDark) {
      containerBg = "bg-black";
      textClr = "text-white";
      linkClr = "#8cb4ff";
      linkDecoClr = "rgba(140,180,255,0.4)";
    } else if (isSepia) {
      containerBg = "bg-sepia";
      textClr = "text-zinc-900";
    }

    return {
      containerClass: containerBg,
      textClass: textClr,
      linkColor: linkClr,
      linkDecoColor: linkDecoClr,
    };
  }, [background, mounted]);

  return (
    <>
      <div
        className={`p-6 pb-20 ${containerClass} ${textClass}`}
        role="contentinfo"
        suppressHydrationWarning
      >
        <p>
          “<em>{title}</em>”, de <strong>{autor}</strong>.
          {font && (
            <>
              {" "}
              Fonte:{" "}
              <a
                href={fontLink ?? ""}
                rel="noopener"
                className="underline underline-offset-2 hover:[text-decoration-color:currentColor]"
                style={{ color: linkColor, textDecorationColor: linkDecoColor }}
              >
                {font}
              </a>
            </>
          )}
          {license && (
            <>
              . Licença:{" "}
              <a
                href={licenseLink ?? ""}
                rel="license noopener"
                className="underline underline-offset-2 hover:[text-decoration-color:currentColor]"
                style={{ color: linkColor, textDecorationColor: linkDecoColor }}
              >
                {license}
              </a>
            </>
          )}
          .
          {modified ? (
            <span className="opacity-80 ml-2 block mt-2 text-sm">
              Alterações: {modified}
            </span>
          ) : (
            <></>
          )}
        </p>

        <p className="mt-4">
          Solicitações de remoção: se você é autor(a), herdeiro(a),
          representante legal ou proprietário(a) do arquivo/EPUB e deseja a
          retirada desta obra, escreva para{" "}
          <a
            href="mailto:felipematheusdev@gmail.com"
            className="underline underline-offset-2 hover:[text-decoration-color:currentColor]"
            style={{ color: linkColor, textDecorationColor: linkDecoColor }}
          >
            felipematheusdev@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default AutorInfo;
