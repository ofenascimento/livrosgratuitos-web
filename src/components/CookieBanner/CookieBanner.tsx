"use client";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const CookieBanner = () => {
    const { consent, accept } = useCookieConsent();

    if (consent === undefined) return null;
    if (consent !== null) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-8 md:right-8 lg:left-16 lg:right-16">
            <div className="bg-dark-background border-2 border-gray-600 rounded-2xl px-6 py-4 flex items-center justify-between gap-6 flex-wrap shadow-lg">

                <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                    <img className="hidden md:block" src="/logo.png" style={{ height: "32px", width: "auto" }} alt="" />
                    <p className="text-white text-xs leading-relaxed m-0">
                        Usamos cookies e tecnologias semelhantes para melhorar sua experiência,
                        personalizar anúncios e recomendar conteúdo de seu interesse. Ao utilizar
                        nossos serviços, você concorda com nossa{" "}
                        <a href="/politica-de-privacidade" className="text-purple-400 underline">
                            Política de Privacidade
                        </a>
                        .
                    </p>
                </div>

                <button
                    onClick={accept}
                    className=" bg-main-400 hover:bg-main-500 active:scale-95 transition-all text-white rounded-lg px-7 py-2.5 text-sm font-semibold whitespace-nowrap flex-shrink-0 w-full md:w-auto"
                >
                    Entendi e aceito
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;