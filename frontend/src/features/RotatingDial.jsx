import React, { useEffect, useState, useRef } from "react";

const banners = [
  { id: 1, text: "Electronics Bonanza", color: ["from-red-400", "to-red-600"] },
  { id: 2, text: "Fashion Fiesta", color: ["from-blue-400", "to-blue-600"] },
  { id: 3, text: "Home Essentials", color: ["from-green-400", "to-green-600"] },
  {
    id: 4,
    text: "Back to School",
    color: ["from-yellow-400", "to-yellow-600"],
  },
  {
    id: 5,
    text: "Gadgets & More",
    color: ["from-purple-400", "to-purple-600"],
  },
];

export default function RotatingDialBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const intervalRef = useRef(null);
  const itemCount = banners.length;

  // Rotate every 3 seconds smoothly
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
      setAngle((prev) => prev - 360 / itemCount);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [itemCount]);

  // Click handler to rotate directly
  const handleClick = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    setAngle(-(360 / itemCount) * index);
    // Restart interval after click
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
      setAngle((prev) => prev - 360 / itemCount);
    }, 3000);
  };

  // Dynamic background gradient from active banner colors
  const bgFrom = banners[activeIndex].color[0];
  const bgTo = banners[activeIndex].color[1];

  return (
    <div
      className={`flex items-center justify-center h-[400px] w-full transition-colors duration-1000 bg-gradient-to-r ${bgFrom} ${bgTo}`}
    >
      <div className="relative w-[300px] h-[150px]">
        <div
          className="absolute top-0 left-0 w-full h-full transition-transform duration-[1000ms] ease-in-out"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          {banners.map((item, index) => {
            const rotate = (360 / itemCount) * index;
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => handleClick(index)}
                className={`absolute left-1/2 transform -translate-x-1/2 cursor-pointer
                  rounded-xl text-white text-center flex items-center justify-center font-semibold shadow-md
                  w-40 h-16 select-none
                  transition-transform duration-500
                  ${item.color[1]} 
                  ${
                    isActive
                      ? "scale-110 z-20 shadow-2xl"
                      : "scale-90 opacity-70"
                  }
                `}
                style={{
                  transform: `rotate(${rotate}deg) translateY(-120px) ${
                    isActive
                      ? "rotate(-" + rotate + "deg)"
                      : "rotate(-" + rotate + "deg)"
                  }`,
                  transformOrigin: "bottom center",
                }}
                title={item.text}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
