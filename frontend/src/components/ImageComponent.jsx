import React from "react";

const ImageComponent = ({ url, size }) => {
  return (
    <div className="w-full h-[100vh] mb-12 overflow-hidden  shadow-lg">
      <img src={url} alt="cover" className={size} />
    </div>
  );
};

export default ImageComponent;
