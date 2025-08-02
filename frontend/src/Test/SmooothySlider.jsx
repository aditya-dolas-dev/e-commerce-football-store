import React from "react";
import { useRef, useEffect } from "react";
import Core from "smooothy";

const SmooothySlider = () => {
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Initialize the slider

    sliderRef.current = new Core(wrapperRef.current, {
      infinite: true,
      snap: true,
      onSlideChange: (current, prev) => {
        console.log(`Slide changed from ${prev} to ${current}`);
      },
    });

    // Animate the loop

    let animateFrame;
    const animate = () => {
      sliderRef.current?.update();
      animateFrame = requestAnimationFrame(animate);
    };
    animate();

    intervalRef.current = setInterval(() => {
      sliderRef.next();
    }, 2000);

    return () => {
      cancelAnimationFrame(animateFrame);

      clearInterval(intervalRef.current);
      sliderRef.current.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex overflow-hidden w-full" data-slider>
      <div className="flex-shrink-0 w-screen h-64 flex items-center justify-center bg-blue-500 text-2xl text-white">
        Slide1
      </div>
      <div className="flex-shrink-0 w-screen h-64 flex items-center justify-center bg-green-500 text-2xl text-white">
        Slide2
      </div>
      <div className="flex-shrink-0 w-screen h-64 flex items-center justify-center bg-red-500 text-2xl text-white">
        Slide3
      </div>
    </div>
  );
};

export default SmooothySlider;
