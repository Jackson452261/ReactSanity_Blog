import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = [
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756212844/IMG_1998_ew87eo.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756212384/IMG_1968_i6a4ey.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756212130/IMG_1599_yyivgm.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756211788/20241006_110101_uc5yu7.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756132612/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2_2025-08-25_224020_xk6h7m.png",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756132234/IMG_5755_rpxbgx.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1756130850/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2_2025-08-25_221055_nsqbpq.png",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1747273585/14_pkp6mg.png",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1736948223/2024%E6%97%A5%E6%9C%ACmotogp/IMG_1869_vqqryg.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1747273585/15_u0ggqc.png",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1736948223/2024%E6%97%A5%E6%9C%ACmotogp/IMG_1871_eklrni.jpg",
    "https://res.cloudinary.com/dtbj43yha/image/upload/v1736948223/2024%E6%97%A5%E6%9C%ACmotogp/IMG_1872_ex0rot.jpg"
   ]


const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const Carousel = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden bg-neutral-950 py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  );
};

const Images = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: '100vw',
              height: '80vh',
              userSelect: 'none',
              pointerEvents: 'auto'
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video shrink-0 rounded-xl bg-neutral-800 object-cover"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};