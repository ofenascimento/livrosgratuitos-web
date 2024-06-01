import Image from "next/image";
import React from "react";
import GooglePlayButton from "../GooglePlayButton/GooglePlayButton";
import ButtonAnimatedGradient from "../ButtonGradientAnimated/ButtonGradientAnimated";
import Title from "../Title/Title";

const Hero = () => {
  return (
    <div className="  w-full flex justify-center items-center mt-10 flex-wrap">
      <div className="container  flex flex-wrap justify-center items-center">
        <div className="w-full md:w-2/4 flex flex-col flex-wrap justify-center md:justify-start items-center md:items-start">
          <Title
            title={
              <>
                Vamos explorar {"  "}
                <span
                  className="font-semibold font-inter"
                  style={{
                    background:
                      "linear-gradient(90deg,#6e48ff 0,#cf40ff 48%,#ffa22c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Histórias Incríveis?
                </span>
              </>
            }
          />

          <p className=" mt-2 text-center md:text-start px-4 md:px-0 text-white mb-4 font-poppins">
            Junte-se à nossa comunidade de amantes de livros e desfrute de uma
            experiência de leitura sem fronteiras
          </p>
          <div className="flex gap-2 flex-wrap">
            <GooglePlayButton />
            <ButtonAnimatedGradient label="Ler online" />
          </div>
        </div>
        <div className=" w-full md:w-2/4 flex flex-wrap justify-center items-center mt-6 md:mt-0">
          <Image src="/preview.png?v=7o" width={650} height={300} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
