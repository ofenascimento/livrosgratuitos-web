import Image from "next/image";
import React from "react";
import { MdAllInclusive, MdSearch, MdSettings } from "react-icons/md";

const CardInfo = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10 px-4 md:px-0 lg:px-0 ">
      <div className="container flex flex-wrap  justify-between items-center gap-4 lg:gap-0 w-full text-white">
        <div className="p-4 rounded-md w-full lg:w-auto border-2 border-main">
          <MdAllInclusive size={24} className="mb-4" />

          <h1 className=" font-inter text-xl font-semibold">
            Acesso Ilimitado
          </h1>
          <p className=" w-full lg:w-64 mt-4 font-poppins text-sm font-extralight">
            Desfrute de acesso ilimitado a uma vasta biblioteca de ebooks sem
            gastar nada{" "}
          </p>
        </div>
        <div className="p-4 rounded-md w-full lg:w-auto border-2 border-main">
          <MdSearch size={24} className="mb-4" />
          <h1 className=" font-inter text-xl font-semibold">
            Descubra Tesouros Literários
          </h1>
          <p className=" w-full lg:w-64 mt-4 font-poppins text-sm font-extralight">
            Explore uma coleção rica de obras clássicas que moldaram a
            literatura mundial{" "}
          </p>
        </div>
        <div className="p-4 rounded-md w-full lg:w-auto border-2 border-main">
          <MdSettings size={24} className="mb-4" />
          <h1 className=" font-inter text-xl font-semibold">
            Personalize Sua Leitura
          </h1>
          <p className=" w-full lg:w-64 mt-4 font-poppins text-sm font-extralight">
            Ajuste o tamanho da fonte, o plano de fundo e mais para uma leitura
            confortável.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
