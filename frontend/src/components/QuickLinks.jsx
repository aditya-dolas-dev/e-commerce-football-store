import React from "react";

const QuickLinks = ({ label, url }) => {
  return (
    <div>
      <a
        href={url}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {label}
      </a>
    </div>
  );
};

export default QuickLinks;
