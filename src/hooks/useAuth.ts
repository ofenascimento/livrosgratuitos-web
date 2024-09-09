import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkToken = async () => {
      if (typeof window !== "undefined") {
        const token = await localStorage.getItem("userToken");
        setIsAuth(token !== null);
      }
    };
    checkToken();
  }, []);

  return isAuth;
};

export default useAuth;
