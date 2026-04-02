"use client";
import { HiOutlineX } from "react-icons/hi";
import { MdInfoOutline } from "react-icons/md";
import Modal from "react-modal";

type ModalInfoProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
  autor?: string;
  license?: string;
  licenseLink?: string;
  modified?: string;
  font?: string;
  fontLink?: string;
};

const ModalInfo: React.FC<ModalInfoProps> = ({
  isOpen,
  onRequestClose,
  title,
  autor,
  license,
  licenseLink,
  modified,
  font,
  fontLink,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-black rounded-lg shadow-lg w-full max-w-md text-white border border-gray-600 font-dmSans">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <MdInfoOutline className="text-main-200 text-lg" />
            <h2 className="text-lg font-bold font-redRat text-white">Informações da obra</h2>
          </div>
          <button onClick={onRequestClose} className="text-gray-400 hover:text-white transition">
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5 flex flex-col gap-4 text-sm">
          {title && (
            <div>
              <span className="text-gray-400 text-xs font-normal">Título</span>
              <p className="mt-0.5 text-white font-normal">{title}</p>
            </div>
          )}
          {autor && (
            <div>
              <span className="text-gray-400 text-xs font-normal">Autor</span>
              <p className="mt-0.5 text-white font-normal">{autor}</p>
            </div>
          )}
          {modified && (
            <div>
              <span className="text-gray-400 text-xs font-normal">Modificado em</span>
              <p className="mt-0.5 text-white font-normal">{modified}</p>
            </div>
          )}
          {license && (
            <div>
              <span className="text-gray-400 text-xs font-normal">Licença</span>
              <p className="mt-0.5 font-normal">
                {licenseLink ? (
                  <a href={licenseLink} target="_blank" rel="noopener noreferrer" className="text-main-200 underline">
                    {license}
                  </a>
                ) : (
                  <span className="text-white">{license}</span>
                )}
              </p>
            </div>
          )}
          {font && (
            <div>
              <span className="text-gray-400 text-xs font-normal">Fonte tipográfica</span>
              <p className="mt-0.5 font-normal">
                {fontLink ? (
                  <a href={fontLink} target="_blank" rel="noopener noreferrer" className="text-main-200 underline">
                    {font}
                  </a>
                ) : (
                  <span className="text-white">{font}</span>
                )}
              </p>
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};

export default ModalInfo;