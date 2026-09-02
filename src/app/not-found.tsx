import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark-background text-center px-4">
            <span className="font-redRat font-bold text-main-400 text-7xl">404</span>
            <h1 className="font-redRat font-semibold text-white text-2xl mt-4">
                Esse livro não está na estante
            </h1>
            <p className="font-lexend font-light text-main-200 mt-2">
                A página que você procurou não existe.
            </p>
            <Link
                href="/"
                className="mt-6 bg-main-400 hover:bg-main-500 text-white font-redRat font-bold px-6 py-3 rounded-full"
            >
                Voltar para o início
            </Link>
        </div>
    );
}