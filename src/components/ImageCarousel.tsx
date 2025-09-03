"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
];

export default function ImageCarousel() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div className="flex justify-center items-center relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="flex"
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                }),
                center: { x: 0, opacity: 1 },
                exit: (direction: number) => ({
                  x: direction < 0 ? 300 : -300,
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -1000) {
                  paginate(1);
                } else if (swipe > 1000) {
                  paginate(-1);
                }
              }}
            >
              {/* Previous image (peek) */}
              <img
                src={images[(imageIndex - 1 + images.length) % images.length]}
                className="w-[200px] h-[200px] object-cover opacity-50 scale-90 mx-2"
              />

              {/* Current main image */}
              <img
                src={images[imageIndex]}
                className="w-[300px] h-[300px] object-cover mx-2"
              />

              {/* Next image (peek) */}
              <img
                src={images[(imageIndex + 1) % images.length]}
                className="w-[200px] h-[200px] object-cover opacity-50 scale-90 mx-2"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination buttons under carousel */}
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={() => paginate(-1)}
          className="bg-white shadow px-4 py-2 rounded"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="bg-white shadow px-4 py-2 rounded"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
