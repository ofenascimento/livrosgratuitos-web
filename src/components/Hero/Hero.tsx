import Image from "next/image";
import React from "react";
import GooglePlayButton from "../GooglePlayButton/GooglePlayButton";

const Hero = () => {
  return (
    <div className="  w-full flex justify-center items-center mt-10 flex-wrap">
      <div className="container  flex flex-wrap justify-center items-center">
        <div className="w-full md:w-2/4 flex flex-col flex-wrap justify-center md:justify-start items-center md:items-start">
          <h1 className="text-5xl  text-center md:text-start font-semibold text-white">
            Explore Histórias Incríveis {"  "}
            <span
              className=" text-5xl font-semibold"
              style={{
                background: "linear-gradient(80deg, #7B66FF,  #24ff8e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              100% grátis
            </span>
          </h1>

          <p className=" mt-2 text-center md:text-start px-4 md:px-0 text-white mb-4 font-poppins">
            Junte-se à nossa comunidade de amantes de livros e desfrute de uma
            experiência de leitura sem fronteiras
          </p>
          <GooglePlayButton />
        </div>
        <div className=" w-2/4 flex flex-wrap justify-center items-center mt-6 md:mt-0">
          <Image src="/preview.png?v=7" width={650} height={300} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
