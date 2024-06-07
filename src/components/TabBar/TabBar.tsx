import { MdHome, MdSearch, MdFavorite } from 'react-icons/md';

const TabBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full shadow-lg bg-white dark:bg-black border-t-2 dark:border-dark-background border-gray-300 flex justify-around items-center py-2 md:hidden">
      <button className="flex flex-col items-center dark:text-white">
        <MdHome className="text-2xl" />
        <span className="text-xs">Início</span>
      </button>
      <button className="flex flex-col items-center dark:text-white">
        <MdSearch className="text-2xl" />
        <span className="text-xs">Procurar</span>
      </button>
      <button className="flex flex-col items-center dark:text-white">
        <MdFavorite className="text-2xl" />
        <span className="text-xs">Favoritos</span>
      </button>
      
    </div>
  );
};

export default TabBar;
