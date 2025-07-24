import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-24 ">
      <span className="text-lg font-medium text-gray-700">Just a moment</span>
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full bg-black animate-bounce`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
