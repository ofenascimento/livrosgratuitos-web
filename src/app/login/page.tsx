"use client";
import { useEffect, useState } from "react";
import { urlApi } from "@/utils/url";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await localStorage.getItem("userToken");
      if (token) {
        router.push("/");
      }
    };
    checkToken();
  }, []);

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
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-6">
        <div className="max-w-md w-full p-4 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Login
          </h2>
          <div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white px-3 py-3 border-2 border-gray-400 rounded-lg shadow-sm outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white px-3 py-3 border-2 border-gray-400 rounded-lg shadow-sm"
                required
              />
            </div>
            <div className=" w-full flex justify-end">
              <span className=" text-main-400 font-medium">
                Esqueceu a senha?
              </span>
            </div>
            <button
              onClick={() => handleLogin()}
              className="w-full mt-2 bg-main-400 font-medium text-white p-3 rounded-lg hover:bg-main-600"
            >
              Login
            </button>
            <div className=" text-white flex justify-center items-center gap-2 mt-4">
              Não tem conta?{" "}
              <p className=" text-main-400 font-medium">Cadastre-se</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
