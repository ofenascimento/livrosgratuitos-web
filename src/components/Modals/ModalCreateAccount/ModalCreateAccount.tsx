import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./styles.module.scss";

import { urlApi } from "@/utils/url";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import SpinnerLoader from "@/components/Loader/Spinner";
import { AiOutlineWarning } from "react-icons/ai";

interface IModalLogin {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateAccount: React.FC<IModalLogin> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showWarnings, setShowWarnings] = useState<boolean>(false);
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    

    try {
      setIsLoading(true);
      const response = await fetch(`${urlApi}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
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
    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido");
      return;
    }
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    setError('');
    setShowWarnings(true);
  }

  return (
    <div
      className={`${styles.modalWrapper} ${isOpen ? "flex" : styles.hidden}`}
    >
      <div
        className={styles.modalOverlay}
        onClick={() => {
          onClose();
          setShowWarnings(false);
          setError("");
        }}
      ></div>
      <div ref={modalRef} className={`${styles.modalContent} font-lexend`}>
        <div className="flex justify-end items-end">
          <MdClose
            className="cursor-pointer"
            size={20}
            onClick={() => {
              onClose();
              setShowWarnings(false);
              setError("");
            }}
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-main-100">
          Criar conta
        </h2>
        <p className="mt-2 text-center mb-4 text-gray-300 font-lexend font-light">
          Crie sua conta para salvar seu progresso
        </p>
        {error && (
          <div className="w-full pb-2 rounded-lg flex justify-center items-center">
            <span className="text-center w-full text-red-400">{error}</span>
          </div>
        )}
        {!showWarnings && (
          <>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-lexend font-light"
              placeholder="Digite seu email"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-lexend font-light"
              placeholder="Digite seu nome"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-lexend font-light"
              placeholder="Digite sua senha"
            />
            <button
              onClick={handleValidation}
              className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-base font-semibold lg:font-medium font-poppins"
            >
              Criar conta
            </button>
          </>
        )}
        {showWarnings && (
          <>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-start space-x-2">
              <AiOutlineWarning size={28} />
              <div>
                <p>
                  O site está em desenvolvimento e algumas funcionalidades podem
                  não funcionar como esperado.
                </p>
              </div>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-start space-x-2 mt-2">
              <AiOutlineWarning size={28} />
              <div>
                <p>
                  Algumas funcionalidades podem se tornar exclusivas para
                  assinantes no futuro.
                </p>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-base font-semibold lg:font-medium font-poppins"
            >
              {isLoading ? <SpinnerLoader /> : "Continuar"}
            </button>
          </>
        )}
        <div className="mt-6 px-4">
          <p className="text-xs text-center pb-4 font-poppins font-light">
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
