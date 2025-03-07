import React, { ReactNode } from "react";

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-blured text-white">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default CustomLayout;
