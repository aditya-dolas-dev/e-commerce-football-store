import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import imageUrl from "../assets/ruicosta.png";
import forlan from "../assets/diego.jpg";
import ImageComponent from "../components/ImageComponent";
import {
  AlignHorizontalDistributeCenter,
  Kanban,
  LayoutDashboard,
} from "lucide-react";
import { MdOutlineHighQuality } from "react-icons/md";
import { TbCards } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation Bar */}
      <NavbarComponent />

      {/* Page Content */}

      <section className="bg-black flex flex-col justify-center items-center w-full ">
        <div className="text-white flex flex-row gap-3 mt-[50px] mb-[50px]">
          <h2 className="text-white text-[32px]    w-[400px]">
            CELEBRATE YOUR PASSION FOR FOOTBALL IN STYLE
          </h2>
          <div className="text-[10px] w-[350px] poppins-extralight  flex flex-col justify-start">
            <p>
              {" "}
              Discover our unique collection of vintage and modern football
              jerseys that express your love for the game.Join us in celebrating
              the spirit of football with every stylish piece.
            </p>

            <button
              className={` px-1 py-[5px] mt-7 text-tavirs border-b-[5px] border-b-double border-t-[1px] border-l-[1px] border-r-[1px]  border-b-[#FF9E03] rounded-full text-[#FF9E03]  hover:bg-amber-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-md`}
              onClick={() => {
                navigate("/shop");
              }}
            >
              Shop
            </button>
          </div>
        </div>
        <div className=" w-[780px] mb-[0px]  ">
          <ImageComponent
            url={imageUrl}
            size=" rounded-2xl object-cover w-full h-[500px]"
          />
        </div>
      </section>

      {/*  section 2 */}

      <section className="flex  flex-col justify-center items-center h-[400px] bg-[#dbec75]">
        <div className="font-bold text-3xl">
          EXPLORE OUR PREMIUM SELECTION OF VINTAGE AND MODERN FOOTBALL JERSEYS
        </div>
        <div className="flex flex-row poppins-extralight gap-3 font-bold mt-[100px] text-center">
          <div className="w-[340px] text-center flex flex-col items-center">
            <div className="mb-4">
              <Kanban />
            </div>
            CELEBRATE YOUR STYLE WITH UNIQUE STYLES FOR EVERY FAN
          </div>

          <div className="w-[340px] text-center flex flex-col items-center">
            <div className="mb-4">
              <AlignHorizontalDistributeCenter />
            </div>
            UNCOVER TIMELESS CLASSICS THAT CAPTURE THE SPIRIT OF THE GAME
          </div>

          <div className="w-[340px] text-center flex flex-col items-center">
            <div className="mb-4">
              <LayoutDashboard />
            </div>
            FIND THE PERFECT JERSEY TO SHOWCASE
          </div>
        </div>
        <button
          className={`w-[200px] px-1 py-[5px] mt-7 text-tavirs border-b-[5px] border-b-double border-t-[1px] border-l-[1px] border-r-[1px]  border-b-[#ff0b03] rounded-full text-[black]  hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 shadow-md`}
          onClick={() => {
            navigate("/shop");
          }}
        >
          Discover
        </button>
      </section>

      {/*****Section 3 */}
      <section className="bg-[#ffffff] flex flex-col justify-center items-center w-full mb-[100px]">
        <div className="text-black flex flex-row gap-3 mt-[50px] ">
          <h2 className="text-black text-[32px] text-tavirs  font-bold  w-[500px]">
            <span className="text-[24px]">
              PASSION <br />
            </span>
            EXPERIENCE THE BEST IN FOOTBALL JERSEYS
          </h2>
          <div className="text-[14px] w-[600px] poppins-extralight flex flex-col justify-start mb-[70px]">
            <p>
              {" "}
              Our jerseys are crafted from high-quality materials,ensuring
              durability and comfort. Celebrate your love for the game with
              authentic designs that stand out.
            </p>
            <div className="flex flex-row justify-between w-[500px] mt-6 font-bold">
              <p>
                <MdOutlineHighQuality size={37} />
                <br />
                QUALITY ASSURANCE
              </p>
              <p>
                <TbCards size={37} />
                <br />
                AUTHENTIC DESIGNS
              </p>
            </div>

            <button
              className="mt-6 font-bold mr-[500px]"
              onClick={() => {
                navigate("/learn");
              }}
            >
              {" Learn More >"}
            </button>
          </div>
        </div>
        <div className="w-[80%] h-[600px] overflow-hidden rounded-2xl ">
          <ImageComponent
            url={forlan}
            size=" rounded-2xl object-cover  w-full h-full "
          />
        </div>
      </section>

      <section className="bg-black flex flex-col justify-center items-center py-12 text-white">
        <div className="flex justify-center items-center flex-col mb-[50px]">
          <p className="text-4xl">JERSEY SHOWCASE</p>
          <p className="text-xl poppins-extralight">
            Explore our vibrant collection of stylish football jerseys
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" flex flex-col gap-2">
            <img
              src={imageUrl}
              alt="Image 1"
              className="w-[300px] h-56 object-cover rounded-xl"
            />
            <img
              src={imageUrl}
              alt="Image 2"
              className="w-[300px] h-40 object-cover rounded-xl"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <img
              src={forlan}
              alt="Image 1"
              className="w-[300px] h-40 object-cover rounded-xl"
            />
            <img
              src={forlan}
              alt="Image 2"
              className="w-[300px] h-56 object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-8 p-6 text-sm md:text-base  text-black  bg-[#FFDBBB] py-[100px]">
        {/* Left Column - Header */}
        <div className="w-[600px] flex items-start  text-left  text-3xl ">
          DISCOVER FASCINATING FOOTBALL STATS THAT WILL
          <br className="hidden md:block" />
          IGNITE YOUR PASSION FOR THE GAME
        </div>

        {/* Right Column - Text and Stats */}
        <div className="flex flex-col gap-4 max-w-md">
          <p className="leading-relaxed poppins-extralight">
            Football is the world's most popular sport, captivating millions of
            fans globally. Our jerseys reflect this passion — 90% of our
            customers express satisfaction with their purchases.
          </p>

          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between text-center">
            <div className="bg-white text-black px-6 py-4 rounded-xl shadow-md">
              <p className="text-3xl font-serif font-bold text-green-600">
                90%
              </p>
              <p className="mt-2 text-sm font-serif">
                of fans prefer jerseys from their favorite teams
              </p>
            </div>

            <div className="bg-white text-black px-6 py-4 rounded-xl shadow-md">
              <p className="text-3xl font-serif font-bold text-blue-600">75%</p>
              <p className="mt-2 text-sm font-serif">
                of customers return for more unique designs
              </p>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </div>
  );
};

export default Home;
