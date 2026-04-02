import React from "react";
import { HiOutlineX } from "react-icons/hi";
import Modal from "react-modal";
import { IModal } from "../types";
import { useReaderConfig } from "@/hooks/useReaderConfig";

const ModalEpubConfig: React.FC<IModal> = ({ isOpen, onRequestClose }) => {
    const {
        fontSize,
        background,
        fontFamily,
        setFontSize,
        setBackground,
        setFontFamily,
        fontSizeEpub,
        setFontSizeEpub,
    } = useReaderConfig();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
            <div className="bg-black rounded-lg shadow-lg w-full max-w-md text-white border border-gray-600 font-dmSans">
                <div className="flex justify-between items-center p-4 border-b border-gray-600">
                    <h2 className="text-lg font-bold font-redRat text-white">
                        Configurações de leitura
                    </h2>
                    <button onClick={onRequestClose} className="text-gray-400 hover:text-white transition">
                        <HiOutlineX size={20} />
                    </button>
                </div>
                <div className="p-4">
                    <div id="configs" className="flex flex-col gap-4">
                        <div>
                            <div className="flex justify-between items-center">
                                <h1 className="text-white font-normal">Tema:</h1>
                                <span className="capitalize text-gray-400">{background}</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => setBackground("sepia")}
                                    className={`p-6 rounded-full border-2 ${background === "sepia" ? "border-main-400" : "border-gray-600"}`}
                                    style={{ backgroundColor: "#faf2e7" }}
                                />
                                <button
                                    onClick={() => setBackground("dark")}
                                    className={`p-6 rounded-full border-2 ${background === "dark" ? "border-main-400" : "border-gray-600"}`}
                                    style={{ backgroundColor: "#000000" }}
                                />
                                <button
                                    onClick={() => setBackground("light")}
                                    className={`p-6 rounded-full border-2 ${background === "light" ? "border-main-400" : "border-gray-600"}`}
                                    style={{ backgroundColor: "#ffffff" }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <h1 className="text-white font-normal">Tamanho da fonte:</h1>
                                <span className="text-gray-400">{`${fontSizeEpub}%`}</span>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <button
                                    className={`p-2 px-4 border-2 rounded-lg ${fontSizeEpub === 100 ? "border-main-400" : "border-gray-600"}`}
                                    style={{ fontSize: 16 }}
                                    onClick={() => setFontSizeEpub(100)}
                                >
                                    Tt
                                </button>
                                <button
                                    className={`p-2 px-4 border-2 rounded-lg ${fontSizeEpub === 120 ? "border-main-400" : "border-gray-600"}`}
                                    style={{ fontSize: 18 }}
                                    onClick={() => setFontSizeEpub(120)}
                                >
                                    Tt
                                </button>
                                <button
                                    className={`p-2 px-4 border-2 rounded-lg ${fontSizeEpub === 140 ? "border-main-400" : "border-gray-600"}`}
                                    style={{ fontSize: 20 }}
                                    onClick={() => setFontSizeEpub(140)}
                                >
                                    Tt
                                </button>
                                <button
                                    className={`p-2 px-4 border-2 rounded-lg ${fontSizeEpub === 160 ? "border-main-400" : "border-gray-600"}`}
                                    style={{ fontSize: 24 }}
                                    onClick={() => setFontSizeEpub(160)}
                                >
                                    Tt
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onRequestClose}
                        className="bg-main-400 w-full rounded-full text-center p-2 mt-6 font-redRat font-semibold"
                    >
                        Voltar a leitura
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalEpubConfig;