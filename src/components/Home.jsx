 
import FooterLogo from "./FooterLogo";
import Cards from "./HoverDev/Cards";
import { Carousel } from "./HoverDev/Carousel";
 
import { motion } from "framer-motion";
 


const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 背景圖片 */}
      <img
        src=""
        alt="travel"
        className="absolute object-cover w-full h-full top-0 left-0 "
      />
     <div className="relative flex flex-col items-center justify-center bg-emerald-950 px-4 py-24 text-yellow-50">
     <h1 className="max-w-2xl text-center text-3xl sm:text-4xl md:text-5xl leading-snug">
        <span className="relative">
          嗨~我是Jack歡迎
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-2 -right-20 -top-10 bottom-0 translate-y-1">
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#2B839E"
              strokeWidth="3"
            />
          </svg>
        </span>{" "}
        
      </h1>
    </div>
      {/* 內容區域 */}
 
     <Carousel />
     <Cards /> 
     <FooterLogo />
    </div>
  );
};

export default Home;
