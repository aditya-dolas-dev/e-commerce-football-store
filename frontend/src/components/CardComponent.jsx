import React from "react";
import { Link } from "react-router-dom";

const CardComponent = ({ productName, img, productId }) => {
  return (
    <Link to={`/shop/product/${productId}`}>
      <div className=" flex flex-col box-border  h-[450px] w-[270px]">
        <div>
          <img
            src={img}
            alt="jersey"
            className="border-[1px] border-gray-700 rounded-4xl"
          />
        </div>
        <div className="text-black box-border mt-5 h-[20%]">{productName}</div>
      </div>
    </Link>
  );
};

export default CardComponent;
