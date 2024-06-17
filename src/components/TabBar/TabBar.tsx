"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdSearch, MdFavorite } from "react-icons/md";

const TabBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full shadow-lg bg-black border-t-2 border-dark-background flex justify-around items-center py-2 md:hidden font-poppins">
      <Link href="/">
        <div
          className={`${
            pathname === "/" ? "text-main-400" : "text-white"
          } flex flex-col items-center font-medium`}
        >
          <MdHome className="text-2xl" />
          <span className="text-xs">Início</span>
        </div>
      </Link>
      <Link href="favoritos">
        <div
          className={`${
            pathname === "/pesquisar" ? "text-main-400" : "text-white"
          } flex flex-col items-center font-medium text-base`}
        >
          <MdSearch className="text-2xl" />
          <span className="text-xs">Procurar</span>
        </div>
      </Link>
      <Link href="favoritos">
        <div
          className={`${
            pathname === "/favoritos" ? "text-main-400" : "text-white"
          } flex flex-col items-center font-medium text-base`}
        >
          <MdFavorite className="text-2xl" />
          <span className="text-xs">Favoritos</span>
        </div>
      </Link>
    </div>
  );
};

export default TabBar;
