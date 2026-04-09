import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { FaCheck, FaCheckDouble, FaWhatsapp } from "react-icons/fa";
import { RiFileCopyLine, RiShareBoxFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import useCopyToClipboard from "@/utils/useToClipboard";
import { useToast } from "@/components/Toast/ToastProvider";

interface IModalShare {
    isOpen: boolean;
    onClose: () => void;
    bookName: string;
    bookImage: string;
}

const ModalShare: React.FC<IModalShare> = ({ isOpen, onClose, bookName, bookImage }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const currentUrl = encodeURIComponent(window.location.href);
    const { isCopied, copyText } = useCopyToClipboard();

    const { showToast } = useToast();


    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? "flex" : "hidden"}`}>
            <div className="absolute inset-0" onClick={onClose} />
            <div ref={modalRef} className="relative border border-gray-600 bg-black p-5 rounded-xl shadow-lg w-full max-w-xs md:max-w-md font-redRat">

                {/* Close */}
                <div className="flex justify-end">
                    <MdClose className="cursor-pointer text-white" size={20} onClick={onClose} />
                </div>

                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-main-100">
                    Compartilhar
                </h2>
                <p className="mt-2 text-center mb-2 text-gray-400 font-normal">
                    {bookName}
                </p>

                {/* Imagem */}
                <div className="w-full flex justify-center items-center mb-4">
                    <img src={bookImage} alt="" className="w-36 h-auto" />
                </div>

                {/* Copiar link */}
                <button
                    className="flex justify-between border border-gray-600 w-full items-center bg-dark-background mb-2 p-3 rounded-md cursor-pointer text-white"
                    onClick={() => {
                        copyText(window.location.href);
                        showToast({
                            title: "Link copiado",
                            type: "success",
                        });
                    }
                    }
                >
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" style={{ width: "auto", height: "20px" }} alt="" />
                        <p className="font-normal">{isCopied ? "Link copiado" : "Copiar link"}</p>
                    </div>
                    {isCopied ? <FaCheck /> : <RiFileCopyLine size={20} />}
                </button>

                {/* WhatsApp */}
                <div
                    className="flex justify-between border border-gray-600 items-center bg-dark-background mb-2 p-3 rounded-md cursor-pointer text-white"
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${currentUrl}`, "_blank")}
                >
                    <div className="flex items-center gap-2">
                        <FaWhatsapp size={22} />
                        <p className="font-normal">Compartilhar no WhatsApp</p>
                    </div>
                    <RiShareBoxFill />
                </div>

                {/* Twitter/X */}
                <div
                    className="flex justify-between border border-gray-600 items-center bg-dark-background mb-2 p-3 rounded-md cursor-pointer text-white"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${currentUrl}`, "_blank")}
                >
                    <div className="flex items-center gap-2">
                        <BsTwitterX size={20} />
                        <p className="font-normal">Compartilhar no X</p>
                    </div>
                    <RiShareBoxFill />
                </div>

            </div>
        </div>
    );
};

export default ModalShare;