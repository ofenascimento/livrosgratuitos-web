import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import styles from "./styles.module.scss";

import SpinnerLoader from "@/components/Loader/Spinner";
import { useLogin } from "@/hooks/useUsers";

interface IModalLogin {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogin: React.FC<IModalLogin> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const login = useLogin();

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

  const handleLogin = () => {
    login.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("userToken", data.token);
          document.cookie = `userToken=${data.token}; path=/; domain=.livrosgratuitos.com; Secure; SameSite=Strict`;
          window.location.reload();
        },
        onError: () => {
          setError(true);
        },
      }
    );
  };

  return (
    <div
      className={`${styles.modalWrapper} ${isOpen ? "flex" : styles.hidden}`}
    >
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div ref={modalRef} className={`${styles.modalContent} font-redRat`}>

        <div className="flex justify-end items-end">
          <MdClose className="cursor-pointer" size={20} onClick={onClose} />
        </div>

        <h2 className="text-3xl font-redRat font-bold text-center text-main-100">
          Bem vindo de volta
        </h2>
        <p className="mt-2 text-center mb-6 text-gray-300 font-redRat font-normal">
          Entre com o seu email
        </p>

        {error && (
          <div className="w-full pb-2 rounded-lg flex justify-center items-center">
            <span className="text-center w-full text-red-400 font-redRat font-normal text-sm">
              Usuário ou senha inválidos!
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1 mx-2 mb-1">
          <label className="text-xs font-redRat font-normal text-gray-400 pl-1">
            Email
          </label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            className="border-2 bg-dark-background border-gray-600 p-2 rounded-lg text-white font-redRat font-normal"
            placeholder="Digite seu email"
            autoCapitalize="off"
          />
        </div>

        <div className="flex flex-col gap-1 mx-2 mb-1">
          <label className="text-xs font-redRat font-normal text-gray-400 pl-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full border-2 bg-dark-background border-gray-600 p-2 pr-10 rounded-lg text-white font-redRat font-normal"
              placeholder="Digite sua senha"
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

        <button
          onClick={handleLogin}
          className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-redRat font-semibold text-base"
        >
          {login.isPending ? <SpinnerLoader /> : "Entrar"}
        </button>

        <div className="mt-6 px-4">
          <p className="text-xs text-center border-b-2 border-b-gray-600 pb-4 font-redRat font-normal">
            Ao continuar você concorda com nossos{" "}
            <span className="text-main-200">Termos de Serviço</span> e{" "}
            <span className="text-main-200">Política de Privacidade</span>
          </p>
        </div>

        <div className="text-sm mt-6 flex flex-col justify-center items-center gap-2 font-redRat font-normal">
          <h5>
            Esqueceu a senha?{" "}
            <Link href="/">
              <span className="text-main-200">Resetar</span>
            </Link>
          </h5>
          <h5>
            Não tem conta?{" "}
            <Link href="/">
              <span className="text-main-200">Criar conta</span>
            </Link>
          </h5>
        </div>

      </div>
    </div>
  );
};

export default ModalLogin;