"use client";
import { useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { MdMenuBook } from "react-icons/md";
import Modal from "react-modal";

type TocItem = {
  id: string;
  label: string;
  href: string;
};

type ModalTocProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  toc: TocItem[];
  onSelectItem: (href: string) => void;
};

const ModalToc: React.FC<ModalTocProps> = ({
  isOpen,
  onRequestClose,
  toc,
  onSelectItem,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md text-white border-2 border-[#4a5568] font-lexend font-light">
        <div className="flex justify-between items-center p-4 border-b border-b-gray-500">
          <div className="flex items-center gap-2">
            <MdMenuBook className="text-lg" />
            <h2 className="text-lg font-semibold text-white">Sumário</h2>
          </div>
          <button
            onClick={onRequestClose}
            className="text-gray-400 hover:text-white transition"
          >
            <HiOutlineX color="#ffffff" />
          </button>
        </div>

        {/* lista */}
        <ol className="overflow-y-auto max-h-[60vh] p-3 space-y-0.5">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onSelectItem(item.href);
                  onRequestClose();
                }}
                className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-lexend font-normal transition hover:bg-gray-700"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </Modal>
  );
};

export default ModalToc;