const ModalInstagram: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
          <h2 className="text-xl font-bold text-gray-800">Abra no navegador</h2>
          <p className="text-gray-600 mt-2">
            Para uma melhor experiência, abra este link no seu navegador.
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              window.open(window.location.href, "_blank");
              onClose();
            }}
          >
            Abrir no navegador
          </button>
          <button
            className="mt-2 text-gray-500 underline"
            onClick={onClose}
          >
            Continuar aqui
          </button>
        </div>
      </div>
    );
  };
  