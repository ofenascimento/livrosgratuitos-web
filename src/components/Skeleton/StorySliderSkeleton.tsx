import React from "react";

const StorySliderSkeleton = () => {

  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-hide lg:flex lg:justify-center lg:items-center">
      <div className="flex gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-24">
            <div className="flex flex-col justify-center items-center">
              <div className="h-24 w-24 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySliderSkeleton;
