"use client";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Link from "next/link";

const CookieBanner = () => {
  const { consent, accept } = useCookieConsent();

  if (consent === undefined) return null;
  if (consent !== null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div style={{ backgroundColor: "#0a0a0a", borderColor: "#7650ED" }} className="w-full max-w-lg rounded-2xl px-8 py-8 flex flex-col items-center gap-5 border">

        <a href="/">
          <img src="/logo.png" style={{ width: "auto", height: "50px" }} alt="" />
        </a>

        <div className="text-center flex flex-col gap-1.5">
          <p style={{ color: "#ffffff" }} className="text-base font-semibold">
            Usamos cookies
          </p>
          <p style={{ color: "#9ca3af" }} className="text-sm leading-relaxed max-w-sm">
            Usamos cookies e tecnologias semelhantes para melhorar sua experiência,
            personalizar anúncios e recomendar conteúdo. Ao continuar navegando,
            você concorda com nossa{" "}
            <Link target="_blank" href="politica-de-privacidade" className="text-purple-400 cursor-pointer hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        <button
          onClick={accept}
          className="w-full max-w-xs py-3 bg-purple-500 hover:bg-purple-600 active:scale-95 transition-all text-white rounded-xl text-sm font-semibold"
        >
          Entendi e aceito
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;