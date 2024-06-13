import { MdHome, MdSearch, MdFavorite } from "react-icons/md";

const TabBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full shadow-lg bg-black border-t-2 border-dark-background flex justify-around items-center py-2 md:hidden">
      <button className="flex flex-col items-centertext-white">
        <MdHome className="text-2xl" />
        <span className="text-xs">Início</span>
      </button>
      <button className="flex flex-col items-center text-white">
        <MdSearch className="text-2xl" />
        <span className="text-xs">Procurar</span>
      </button>
      <button className="flex flex-col items-center text-white">
        <MdFavorite className="text-2xl" />
        <span className="text-xs">Favoritos</span>
      </button>
    </div>
  );
};

export default TabBar;
