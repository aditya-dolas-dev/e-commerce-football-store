import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PriceBoxComponent = ({ price }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [count, setCount] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <div className="max-w-sm mx-auto p-6 bg-white">
      {/* Price */}
      <div className="mb-4">
        <span className="text-2xl font-semibold text-black">₹{price}</span>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-black">Size</label>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-sm text-gray-600 underline hover:text-black transition-colors"
          >
            Size Guide
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 text-sm font-medium border transition-colors ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Size Guide Modal/Dropdown */}
        {showSizeGuide && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-black mb-3">Size Guide</h3>
            <div className="text-xs text-gray-700">
              <div className="grid grid-cols-4 gap-2 mb-2 font-medium">
                <span>Size</span>
                <span>Chest</span>
                <span>Length</span>
                <span>Shoulder</span>
              </div>
              <div className="space-y-1">
                <div className="grid grid-cols-4 gap-2">
                  <span>XS</span>
                  <span>34-36"</span>
                  <span>26"</span>
                  <span>16"</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>S</span>
                  <span>36-38"</span>
                  <span>27"</span>
                  <span>17"</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>M</span>
                  <span>38-40"</span>
                  <span>28"</span>
                  <span>18"</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>L</span>
                  <span>40-42"</span>
                  <span>29"</span>
                  <span>19"</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>XL</span>
                  <span>42-44"</span>
                  <span>30"</span>
                  <span>20"</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>XXL</span>
                  <span>44-46"</span>
                  <span>31"</span>
                  <span>21"</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              All measurements are in inches. For best fit, measure your chest
              circumference.
            </div>
          </div>
        )}
      </div>

      {/* Count */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-black mb-2">
          Count
        </label>
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full px-3 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() =>
            toast.success(
              `Added ${count} size ${selectedSize} item(s) to cart!`
            )
          }
          className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={() =>
            toast.success(`Buying ${count} size ${selectedSize} item(s) now!`)
          }
          className="w-full bg-white text-black py-3 px-6 rounded-full font-medium border border-black hover:bg-gray-50 transition-colors"
        >
          Buy Now
        </button>
      </div>

      {/* Free Shipping */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500">
          Free shipping on orders above 2000
        </span>
      </div>
    </div>
  );
};

export default PriceBoxComponent;
