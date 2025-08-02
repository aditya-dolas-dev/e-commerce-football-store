import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import CardComponent from "../components/CardComponent";
import diego from "../assets/maldini.jpg";

import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/product/jersey"
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {" "}
      {/* Prevent horizontal scrolling */}
      <NavbarComponent />
      <section className="w-full px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Better padding management */}
        <div className="mt-[50px] ml-[50px] mb-[100px]">
          <h3 className="text-xl font-bold text-black bebas-neue">SHOP</h3>
          <h1 className="text-6xl font-bold text-black bebas-neue">JERSEYS</h1>
          <p className="text-base text-black poppins-extralight">
            Discover our curated collection of football jerseys
          </p>
        </div>
        <div className="mx-auto w-full ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 w-full gap-y-5">
            {products.map((product) => (
              <CardComponent
                key={product.id}
                img={product.ProductImgUrl}
                productName={product.productName}
                productId={product._id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
