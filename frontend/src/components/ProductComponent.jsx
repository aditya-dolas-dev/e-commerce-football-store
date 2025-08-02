import React from "react";
import { useNavigate } from "react-router-dom";

const ProductComponent = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-[#2d2d2d] border border-yellow-500 rounded-xl shadow-lg p-4 hover:scale-105 transform transition duration-300"
      onClick={() => {
        navigate(`/shop/product/${product._id}`);
      }}
    >
      <img
        src={product.ProductImgUrl}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold text-yellow-300">
        {product.productName}
      </h2>
      <p className="text-sm text-gray-300 mt-1 mb-3">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-400">
          ₹{product.price}
        </span>
        <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full uppercase tracking-wide">
          {product.category}
        </span>
      </div>
    </div>
  );
};

export default ProductComponent;
