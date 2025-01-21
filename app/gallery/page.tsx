"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const beforeAfterImages = [
  {
    before: "/before-after/face-before-1.jpg",
    after: "/before-after/face-after-1.jpg",
    treatment: "Mei Zen Cosmetic Acupuncture",
  },
  {
    before: "/before-after/cupping-before-1.jpg",
    after: "/before-after/cupping-after-1.jpg",
    treatment: "Cupping Therapy",
  },
  {
    before: "/before-after/red-light-before-1.jpg",
    after: "/before-after/red-light-after-1.jpg",
    treatment: "Red Light Therapy",
  },
  // Add more before and after images as needed
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-12 pt-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Before & After Gallery</h1>
        <p className="text-xl text-center mb-12 text-gray-600">See the remarkable results of our treatments</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={image.before || "/placeholder.svg"}
                  alt={`Before ${image.treatment}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300"
                  onMouseEnter={() => setSelectedImage(index)}
                  onMouseLeave={() => setSelectedImage(null)}
                />
                <Image
                  src={image.after || "/placeholder.svg"}
                  alt={`After ${image.treatment}`}
                  layout="fill"
                  objectFit="cover"
                  className={`absolute inset-0 transition-opacity duration-300 ${selectedImage === index ? "opacity-100" : "opacity-0"}`}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">{selectedImage === index ? "After" : "Before"}</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{image.treatment}</h3>
                <p className="text-sm text-gray-600">Hover over the image to see the transformation</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">Results may vary depending on individual conditions. Consult with Dr. Dziekan for personalized treatment plans.</p>
        </div>
      </div>
    </div>
  );
}

