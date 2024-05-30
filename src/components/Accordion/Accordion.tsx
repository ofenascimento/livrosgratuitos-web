"use client";
import { useState } from "react";
import { IAccordionProps } from "./types";

const Accordion = (props: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(props.open);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full font-medium">
      <button
        className="flex items-center justify-between w-full p-4 mt-2 border rounded-md shadow-sm bg-gray-800 border-gray-600 text-white"
        onClick={toggleAccordion}
      >
        <span>{props.title}</span>
        <svg
          className={`w-4 h-4 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
        >
          <path fill="currentColor" d="M6 6L10 10L14 6H6Z" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 text-white">
          {typeof props.content === "string" ? (
            <p>{props.content}</p>
          ) : (
            props.content
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
