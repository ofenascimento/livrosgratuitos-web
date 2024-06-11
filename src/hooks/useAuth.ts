import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    checkToken();
  }, []);

  return isAuth;
};

export default useAuth;
