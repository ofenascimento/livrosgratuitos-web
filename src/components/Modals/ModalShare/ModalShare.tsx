import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { FaCheckDouble, FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import { RiFileCopyLine, RiShareBoxFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import useCopyToClipboard from "@/utils/useToClipboard";

interface IModalShare {
    isOpen: boolean;
    onClose: () => void;
    bookName: string;
    bookImage: string;
}

const ModalShare: React.FC<IModalShare> = ({
    isOpen,
    onClose,
    bookName,
    bookImage,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const currentUrl = encodeURIComponent(window.location.href);
    const { isCopied, copyText } = useCopyToClipboard()

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? "flex" : "hidden"}`}
        >
            <div className="absolute inset-0" onClick={onClose}></div>
            <div ref={modalRef} className="relative  bg-[#1a202c] p-5 rounded-lg shadow-lg w-full max-w-xs md:max-w-md font-lexend">
                <div className="flex justify-end">
                    <MdClose className="cursor-pointer" size={20} onClick={onClose} />
                </div>
                <h2 className="text-3xl font-bold text-center text-main-100">
                    Compartilhar
                </h2>
                <p className="mt-2 text-center mb-2 text-gray-300 font-light">
                    {bookName}
                </p>
                <div className="w-full flex justify-center items-center mb-3">
                    <img
                        src={bookImage}
                        alt=""
                        className="w-36 h-auto"
                    />
                </div>
                <button
                    className="flex justify-between w-full items-center bg-gray-800 mb-2 p-3 rounded-md cursor-pointer"
                    onClick={() => copyText(window.location.href)}
                >
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            style={{ width: "auto", height: "20px" }}
                            alt=""
                        />

                        <p>{isCopied ? 'Link copiado' : 'Copiar link'}</p>
                    </div>
                    {isCopied ? <FaCheckDouble /> : <RiFileCopyLine size={20} />}

                </button>
                <div
                    className="flex justify-between items-center bg-gray-800 mb-2 p-3 rounded-md cursor-pointer"
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${currentUrl}`, '_blank')}
                >
                    <div className="flex items-center gap-2">
                        <FaWhatsapp size={22} />
                        <p>Compartilhar no WhatsApp</p>
                    </div>
                    <RiShareBoxFill />
                </div>
                <div
                    className="flex justify-between items-center bg-gray-800 mb-2 p-3 rounded-md cursor-pointer"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${currentUrl}`, '_blank')}
                >
                    <div className="flex items-center gap-2">
                        <BsTwitterX size={20} />
                        <p>Compartilhar no X</p>
                    </div>
                    <RiShareBoxFill />
                </div>
            </div>
        </div>
    );
};

export default ModalShare;
