import { urlApi } from "@/utils/url";

export const usersService = {
  async login(email: string, password: string) {
    const response = await fetch(`${urlApi}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Usuário ou senha inválidos!");
    }

    return data;
  },

  async register(email: string, password: string, name: string) {
    const response = await fetch(`${urlApi}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Erro ao criar a conta.");
    }

    return data;
  },
};