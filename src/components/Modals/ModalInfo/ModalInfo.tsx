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
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md text-white border-2 border-[#4a5568] font-lexend font-light">
        {/* header */}
        <div className="flex justify-between items-center p-4 border-b border-b-gray-500">
          <div className="flex items-center gap-2">
            <MdInfoOutline className="text-lg" />
            <h2 className="text-lg font-semibold text-white">Informações da obra</h2>
          </div>
          <button
            onClick={onRequestClose}
            className="text-gray-400 hover:text-white transition"
          >
            <HiOutlineX color="#ffffff" />
          </button>
        </div>

        {/* conteúdo */}
        <div className="p-5 flex flex-col gap-3 text-sm">
          {title && (
            <div>
              <span className="text-gray-400">Título</span>
              <p className="mt-0.5 font-normal">{title}</p>
            </div>
          )}
          {autor && (
            <div>
              <span className="text-gray-400">Autor</span>
              <p className="mt-0.5 font-normal">{autor}</p>
            </div>
          )}
          {modified && (
            <div>
              <span className="text-gray-400">Modificado em</span>
              <p className="mt-0.5 font-normal">{modified}</p>
            </div>
          )}
          {license && (
            <div>
              <span className="text-gray-400">Licença</span>
              <p className="mt-0.5 font-normal">
                {licenseLink ? (
                  <a href={licenseLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {license}
                  </a>
                ) : (
                  license
                )}
              </p>
            </div>
          )}
          {font && (
            <div>
              <span className="text-gray-400">Fonte tipográfica</span>
              <p className="mt-0.5 font-normal">
                {fontLink ? (
                  <a href={fontLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {font}
                  </a>
                ) : (
                  font
                )}
              </p>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="p-4 pt-0">
          <button
            onClick={onRequestClose}
            className="bg-main-400 w-full rounded-full text-center p-2"
          >
            Voltar a leitura
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfo;