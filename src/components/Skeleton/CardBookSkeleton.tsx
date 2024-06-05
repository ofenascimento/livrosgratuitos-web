import React from "react";

export default function CardBookSkeleton() {
  return (
    <div className="flex-shrink-0 w-40 bg-gray-800 shadow-lg flex flex-col justify-center items-center animate-pulse">
      <div className="w-32 h-48 bg-gray-600 mb-4"></div>
      <div className="w-24 h-4 bg-gray-600 mb-2"></div>
      <div className="w-16 h-4 bg-gray-600"></div>
    </div>
  );
}
