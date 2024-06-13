"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <form>
            <h2 className="text-xl font-semibold mb-4">Deletar Conta</h2>
            <div className="mb-4">
              <label
                htmlFor="deleteEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="deleteEmail"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Deletar Conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
