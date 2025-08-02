import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PriceBoxComponent from "../components/PriceBoxComponent";

const ProductPage = () => {
  const [productData, setProductData] = useState("");
  const [activeTab, setActiveTab] = useState("specs");
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/product/jersey/${id}`
        );
        setProductData(res.data.product);
      } catch (err) {
        setError("Failed to fetch product.");
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <section className="min-h-screen bg-white flex flex-row justify-center items-center overflow-y-hidden">
      <div className=" w-[60%]  flex flex-col">
        <div className="bg-white h-[50vh]">
          <img
            src={productData.ProductImgUrl}
            alt={productData.productName}
            className="object-contain w-full h-full box-border"
            sizes="23"
          />
        </div>
        <div className="bg-white text-black h-[40vh] gap-y-6">
          <h2 className="text-3xl mt-[30px] ml-[30px]">
            {productData.productName}
          </h2>
          <p className="text-xl ml-[30px]">{productData.description}</p>
          <div className="mt-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-3 text-lg poppins-extralight border-b-2 ${
                  activeTab === "specs"
                    ? "border-black text-black"
                    : "border-transparent text-black"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`px-4 py-3 text-lg poppins-extralight border-b-2 ${
                  activeTab === "delivery"
                    ? "border-black text-black"
                    : "border-transparent text-black"
                }`}
              >
                Delivery Info
              </button>
            </div>

            <div className="mt-4 p-4 min-h-[120px]">
              {activeTab === "specs" && (
                <div className="text-black poppins-extralight">
                  <p>
                    Our jerseys are made from breathable fabrics, ensuring
                    comfort during wear. Each design pays homage to football
                    history while providing a contemporary twist. Enjoy wearing
                    a piece of the game!
                  </p>
                </div>
              )}

              {activeTab === "delivery" && (
                <div className="text-black poppins-extralight">
                  <p>
                    Fast and secure delivery within 3-5 business days. Free
                    shipping on orders over $50. Track your order with our
                    real-time tracking system for complete peace of mind.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-[200px] w-[40%] h-[90vh]">
        <PriceBoxComponent price={productData.price} />
      </div>
    </section>
  );
};

export default ProductPage;
