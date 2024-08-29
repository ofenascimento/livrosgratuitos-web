import React from "react";
import { HiOutlineX } from "react-icons/hi";
import Modal from "react-modal";
import { IModal } from "./types";
import { useReaderConfig } from "@/hooks/useReaderConfig";

const ModalReaderConfig: React.FC<IModal> = ({ isOpen, onRequestClose }) => {
  const {
    fontSize,
    background,
    fontFamily,
    setFontSize,
    setBackground,
    setFontFamily,
  } = useReaderConfig();


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className=" bg-gray-800 rounded-lg shadow-lg w-full max-w-md text-white border-2 border-[#4a5568] font-lexend font-light">
        <div className="flex justify-between items-center p-4 border-b-gray-500 border-b">
          <h2 className="text-lg font-semibold text-white">
            Configurações de leitura
          </h2>
          <button
            onClick={onRequestClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <HiOutlineX color="#ffffff" />
          </button>
        </div>
        <div className="p-4">
          <div id="configs" className=" flex flex-col gap-4">
            <div>
              <div className=" flex justify-between items-center">
                <h1>Fonte:</h1> <span className=" capitalize">{fontFamily}</span>
              </div>
              <div className=" flex gap-3 mt-2 flex-wrap">
                <button
                  className={`py-2 px-4 rounded-full border-2 font-lora  ${
                    fontFamily === "lora" ? " border-main-400" : " border-sepia"
                  }`}
                  onClick={() => setFontFamily("lora")}
                >
                  Lora
                </button>
                <button
                  className={`py-2 px-4 rounded-full border-2  ${
                    fontFamily === "raleway"
                      ? " border-main-400"
                      : " border-sepia"
                  }`}
                  onClick={() => setFontFamily("raleway")}
                >
                  Raleway
                </button>
                <button
                  className={`py-2 px-4 rounded-full border-2 font-merriweather  ${
                    fontFamily === "merriweather"
                      ? " border-main-400"
                      : " border-sepia"
                  }`}
                  onClick={() => setFontFamily("merriweather")}
                >
                  Merriweather
                </button>

                <button
                  className={`py-2 px-4 rounded-full border-2 font-poppins  ${
                    fontFamily === "poppins"
                      ? " border-main-400"
                      : " border-sepia"
                  }`}
                  onClick={() => setFontFamily("poppins")}
                >
                  Poppins
                </button>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center font-raleway">
                <h1>Tema:</h1>{" "}
                <span className=" capitalize">
                  {background}
                </span>
              </div>
              <div className=" flex gap-2 mt-2">
                <button
                  onClick={() => setBackground("sepia")}
                  className={`p-6 rounded-full border-2  ${
                    background === "sepia"
                      ? " border-main-400"
                      : " border-sepia"
                  }`}
                  style={{ backgroundColor: "#faf2e7" }}
                ></button>
                <button
                  onClick={() => setBackground("dark")}
                  className={`p-6 rounded-full  border-2 ${
                    background === "dark" ? " border-main-400" : " border-black"
                  }`}
                  style={{ backgroundColor: "#000000" }}
                ></button>
                <button
                  onClick={() => setBackground("light")}
                  className={`p-6 rounded-full border-2 ${
                    background === "light"
                      ? " border-main-400"
                      : " border-white"
                  }`}
                  style={{ backgroundColor: "#ffffff" }}
                ></button>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center">
                <h1>Tamanho da fonte:</h1> <span>{fontSize}</span>
              </div>

              <div className=" flex gap-4 mt-2">
                <button
                  className={`p-2 px-4 border-2 rounded-lg ${
                    fontSize === 16 ? "border-main-400" : "border-white"
                  }`}
                  style={{ fontSize: 16 }}
                  onClick={() => setFontSize(16)}
                >
                  Tt
                </button>
                <button
                  className={`p-2 px-4 border-2 rounded-lg ${
                    fontSize === 18 ? "border-main-400" : "border-white"
                  }`}
                  style={{ fontSize: 18 }}
                  onClick={() => setFontSize(18)}
                >
                  Tt
                </button>
                <button
                  className={`p-2 px-4 border-2 rounded-lg ${
                    fontSize === 20 ? "border-main-400" : "border-white"
                  }`}
                  style={{ fontSize: 20 }}
                  onClick={() => setFontSize(20)}
                >
                  Tt
                </button>
                <button
                  className={`p-2 px-4 border-2 rounded-lg ${
                    fontSize === 24 ? "border-main-400" : "border-white"
                  }`}
                  style={{ fontSize: 24 }}
                  onClick={() => setFontSize(24)}
                >
                  Tt
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onRequestClose}
            className="bg-main-400 w-full rounded-full text-center p-2 mt-6"
          >
            Voltar a leitura
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReaderConfig;
