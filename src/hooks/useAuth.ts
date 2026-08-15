import { useState, useEffect } from "react";
import { isTokenExpired } from "@/utils/tokenExpiry";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkToken = () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("userToken");

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("userToken");
        setIsAuth(false);
        return;
      }

      setIsAuth(true);
    };

    checkToken();

    window.addEventListener("auth:logout", checkToken);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("auth:logout", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return isAuth;
};

export default useAuth;