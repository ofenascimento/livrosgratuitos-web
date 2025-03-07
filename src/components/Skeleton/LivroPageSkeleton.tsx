import React, { useEffect, useState } from "react";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import CustomLayout from "../CustomLayout/CustomLayout";

const LivroPageSkeleton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <FullScreenLoader label="Carregando livro" />;
  return (
    <CustomLayout>
      <div>
        <div className=" text-white flex-col md:flex-row flex mt-4 ">
          <div className="w-full md:w-[30%] flex justify-center items-center">
            <div
              style={{
                width: 200,
                height: "auto",
              }}
              className="bg-gray-700 animate-pulse h-60 w-40 rounded"
            ></div>
          </div>
          <div className="w-full md:w-[70%] lg:w-[80%] mt-4 md:mt-auto">
            <div className="bg-gray-700 animate-pulse h-8 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-700 animate-pulse h-6 w-1/2 rounded mb-2"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-700 animate-pulse h-6 w-20 rounded mb-2"
                ></div>
              ))}
            </div>
            <div className="bg-gray-700 animate-pulse h-24 w-full rounded mb-2 mt-2"></div>
            <div className="flex flex-col gap-2 mt-2 w-full justify-center items-center">
              <div className="bg-gray-700 animate-pulse h-10 w-full md:w-2/4 rounded-full mb-2"></div>
              <div className="bg-gray-700 animate-pulse h-10 w-full md:w-2/4 rounded-full mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default LivroPageSkeleton;
