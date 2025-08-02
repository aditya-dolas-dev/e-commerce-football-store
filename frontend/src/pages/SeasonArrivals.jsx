import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductComponent from "../components/ProductComponent";

const SeasonArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/product/bycategory/SEASONARRIVALS")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center ">Season Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <ProductComponent product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SeasonArrivals;
