import React, { ButtonHTMLAttributes } from "react";

type ButtonAnimatedGradientProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonAnimatedGradient: React.FC<ButtonAnimatedGradientProps> = (
  props
) => {
  return (
    <div className="flex flex-row items-center justify-center w-full lg:w-auto ">
      <button
        className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-[0.12rem] w-full  lg:w-52"
        {...props}
      >
        <span className="block text-base rounded-md bg-slate-900 px-6 py-3 font-medium text-white">
          {props.label}
        </span>
      </button>
    </div>
  );
};

export default ButtonAnimatedGradient;
