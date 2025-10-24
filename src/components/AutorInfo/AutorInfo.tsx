import React, { useMemo } from "react";
import { useReaderConfig } from "@/hooks/useReaderConfig";
import { IAutorInfo } from "./types";

const AutorInfo:React.FC<IAutorInfo> = ({ title, autor } ) => {
    const { background } = useReaderConfig();

    const { containerClass, textClass, linkColor, linkDecoColor } = useMemo(() => {
        const isDark = background === "dark";
        const isLight = background === "light";
        const isSepia = background === "sepia";

        return {
            containerClass: isSepia
                ? "bg-sepia"
                : isDark
                    ? "bg-black"
                    : "bg-white",
            textClass: isDark ? "text-white" : "text-zinc-900",
            linkColor: isDark ? "#8cb4ff" : "#7a4d2a",

            linkDecoColor: isDark ? "rgba(140,180,255,0.4)" : "rgba(122,77,42,0.4)",
        };
    }, [background]);

    return (
        <>
            <div
                className={`p-6 pb-20 ${containerClass} ${textClass}`}
                role="contentinfo"
            >
                “<em>{title}</em>”, de <strong>{autor}</strong>.
                {" "}
                Fonte:{" "}
                <a
                    href="https://www.projeto-adamastor.org/obra/exemplo"
                    rel="noopener"
                    className="underline underline-offset-2 hover:[text-decoration-color:currentColor]"
                    style={{ color: linkColor, textDecorationColor: linkDecoColor }}
                >
                    Projeto Adamastor
                </a>
                .
                {" "}
                Licença:{" "}
                <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt_BR"
                    rel="license noopener"
                    className="underline underline-offset-2 hover:[text-decoration-color:currentColor]"
                    style={{ color: linkColor, textDecorationColor: linkDecoColor }}
                >
                    CC BY-SA 4.0
                </a>
                .
                <span className="opacity-80 ml-2">
                    Sem alterações. Mantidos os avisos editoriais originais.
                </span>
                <span>
                    {" "}
                    Alterações: nova capa criada pela equipe Livros Gratuitos; ajustes de
                    formatação; revisões menores no texto.
                </span>
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
