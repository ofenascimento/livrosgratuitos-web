import Image from "next/image";
import React from "react";
import { MdAllInclusive, MdSearch, MdSettings } from "react-icons/md";

const CardInfo = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10 px-4 md:px-0 lg:px-0 ">
      <div className="container flex flex-wrap  justify-between items-center gap-4 lg:gap-0 w-full text-white">
        <div className="p-4 rounded-md w-full lg:w-auto border-2 border-gray-600">
          <MdAllInclusive size={24} className="mb-4" />

          <h1 className=" font-inter text-xl font-semibold">
            Totalmente gratuito
          </h1>
          <p className=" w-full lg:w-64 mt-4 font-poppins text-sm font-extralight">
            Desfrute de acesso ilimitado a uma vasta biblioteca de livros sem
            gastar nada{" "}
          </p>
        </div>
        <div className="p-4 rounded-md w-full lg:w-auto border-2 border-gray-600">
          <MdSearch size={24} className="mb-4" />
          <h1 className=" font-inter text-xl font-semibold">
            Favorite seus livros
          </h1>
          <p className=" w-full lg:w-64 mt-4 font-poppins text-sm font-extralight">
            Crie uma lista de livros favoritos para voltar à leitura de forma
            rápida e descomplicada!
          </p>
        </div>
        <div className="p-4 rounded-md w-full lg:w-auto border-2 border-gray-600">
          <MdSettings size={24} className="mb-4" />
          <h1 className=" font-inter text-xl font-semibold">
            Salve seu progresso
          </h1>
          <p className=" w-full lg:w-64 mt-4 font-poppins text-sm font-extralight">
            Salvamos o seu progresso de leitura para que você possa retomar exatamente de onde parou!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
