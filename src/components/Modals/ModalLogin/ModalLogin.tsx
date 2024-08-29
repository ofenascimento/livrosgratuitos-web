import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./styles.module.scss";

import { urlApi } from "@/utils/url";
import { useRouter } from "next/navigation";

interface IModalLogin {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogin: React.FC<IModalLogin> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //     const checkToken = async () => {
  //         const token = await localStorage.getItem("userToken");
  //         if (token) {
  //             router.push("/");
  //         }
  //     };
  //     checkToken();
  // }, []);

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

  const handleLogin = async () => {
    try {
      const response = await fetch(`${urlApi}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        await localStorage.setItem("userToken", data.token);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${styles.modalWrapper} ${isOpen ? "flex" : styles.hidden}`}
    >
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div ref={modalRef} className={`${styles.modalContent} font-lexend`}>
        <div className="flex justify-end items-end">
          <MdClose className="cursor-pointer" size={20} onClick={onClose} />
        </div>
        <h2 className="text-3xl font-bold text-center text-main-100">Login</h2>
        <p className="mt-2 text-center mb-6 text-gray-300 font-lexend font-light">
          Entre com o seu email
        </p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-lexend font-light"
          placeholder="Digite seu email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 bg-dark-background border-gray-600 p-2 m-2 rounded-lg text-white font-lexend font-light"
          placeholder="Digite sua senha"
        />
        <button
          onClick={handleLogin}
          className="mt-4 bg-main-400 rounded-lg text-white px-4 py-2 mx-2 font-base font-semibold lg:font-medium font-poppins"
        >
          Entrar
        </button>
        <div className="mt-6 px-4">
          <p className="text-xs text-center border-b-2 border-b-gray-600 pb-4 font-poppins font-light">
            Ao continuar você concorda com nossos{" "}
            <span className="text-main-200">Termos de Servico</span> e{" "}
            <span className="text-main-200">Política de Privacidade</span>{" "}
          </p>
        </div>
        <div className="text-sm mt-6 flex flex-col justify-center items-center gap-2 font-lexend font-light">
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
