import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import styles from "./styles.module.scss";

import { urlApi } from "@/utils/url";
import SpinnerLoader from "@/components/Loader/Spinner";

interface IModalCreateAccount {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateAccount: React.FC<IModalCreateAccount> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showWarnings, setShowWarnings] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        setTimeout(() => {
          modalRef.current!.classList.add(styles.translateY0);
        }, 10);
      } else {
        modalRef.current.classList.remove(styles.translateY0);
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setShowWarnings(false);
    setError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${urlApi}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();

      if (response.status === 201) {
        await localStorage.setItem("userToken", data.token);
        window.location.reload();
      } else {
        setError(data.message || "Erro ao criar a conta.");
      }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    if (!name.trim()) {
      setError("Por favor, insira seu nome");
      return;
    }
    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido");
      return;
    }
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    setError("");
    setShowWarnings(true);
  };

  return (
    <div
      className={`${styles.modalWrapper} ${isOpen ? "flex" : styles.hidden}`}
    >
      <div className={styles.modalOverlay} onClick={handleClose}></div>
      <div ref={modalRef} className={`${styles.modalContent} font-redRat`}>

        {/* Close */}
        <div className="flex justify-end items-end">
          <MdClose className="cursor-pointer" size={20} onClick={handleClose} />
        </div>

        {/* Header */}
        <h2 className="text-3xl font-redRat font-bold text-center text-main-100">
          Criar conta
        </h2>
        <p className="mt-2 text-center mb-4 text-gray-300 font-redRat font-normal">
          Crie sua conta para salvar seu progresso
        </p>

        {/* Error */}
        {error && (
          <div className="w-full pb-2 rounded-lg flex justify-center items-center">
            <span className="text-center w-full text-red-400 font-redRat font-normal text-sm">
              {error}
            </span>
          </div>
        )}

        {/* Form */}
        {!showWarnings && (
          <>
            {/* Input email */}
            <div className="flex flex-col gap-1 mx-2 mb-1">
              <label className="text-xs font-redRat font-normal text-gray-400 pl-1">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="border-2 bg-dark-background border-gray-600 p-2 rounded-lg text-white font-redRat font-normal"
                placeholder="Digite seu email"
                autoCapitalize="off"
              />
            </div>

            {/* Input nome */}
            <div className="flex flex-col gap-1 mx-2 mb-1">
              <label className="text-xs font-redRat font-normal text-gray-400 pl-1">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                className="border-2 bg-dark-background border-gray-600 p-2 rounded-lg text-white font-redRat font-normal"
                placeholder="Digite seu nome"
                autoCapitalize="off"
              />
            </div>

            {/* Input senha */}
            <div className="flex flex-col gap-1 mx-2 mb-1">
              <label className="text-xs font-redRat font-normal text-gray-400 pl-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full border-2 bg-dark-background border-gray-600 p-2 pr-10 rounded-lg text-white font-redRat font-normal"
                  placeholder="Mínimo 8 caracteres"
                  autoCapitalize="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <MdVisibilityOff size={18} />
                  ) : (
                    <MdVisibility size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleValidation}
              className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-redRat font-semibold text-base"
            >
              Criar conta
            </button>
          </>
        )}

        {/* Warnings */}
        {showWarnings && (
          <>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-start space-x-2">
              <AiOutlineWarning size={28} />
              <p className="font-redRat font-normal text-sm">
                O site está em desenvolvimento e algumas funcionalidades podem
                não funcionar como esperado.
              </p>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-start space-x-2 mt-2">
              <AiOutlineWarning size={28} />
              <p className="font-redRat font-normal text-sm">
                Algumas funcionalidades podem se tornar exclusivas para
                assinantes no futuro.
              </p>
            </div>
            <button
              onClick={handleCreateAccount}
              className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-redRat font-semibold text-base"
            >
              {isLoading ? <SpinnerLoader /> : "Continuar"}
            </button>
          </>
        )}

        {/* Terms */}
        <div className="mt-6 px-4">
          <p className="text-xs text-center pb-4 font-redRat font-normal">
            Ao continuar você concorda com nossos{" "}
            <span className="text-main-200">Termos de Serviço</span> e{" "}
            <span className="text-main-200">Política de Privacidade</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ModalCreateAccount;