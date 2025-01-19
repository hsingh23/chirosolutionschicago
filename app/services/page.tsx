"use client"

import { motion } from "motion/react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    name: "Chiropractic Adjustments",
    description: "Restore proper alignment and function to your spine and joints.",
    image: "/chiropractic.jpg",
  },
  {
    name: "Cosmetic Acupuncture",
    description: "Rejuvenate your skin and reduce signs of aging with Mei Zen techniques.",
    image: "/acupuncture.jpg",
  },
  {
    name: "Infrared Sauna",
    description: "Detoxify, relax, and improve overall wellness with infrared therapy.",
    image: "/infrared-sauna.jpg",
  },
  {
    name: "Red Light Therapy",
    description: "Boost collagen production and accelerate healing with targeted light therapy.",
    image: "/red-light-therapy.jpg",
  },
  {
    name: "Cupping (Fire/Mobile)",
    description: "Relieve muscle tension and improve circulation with traditional cupping methods.",
    image: "/cupping.jpg",
  },
  {
    name: "TCM & Detox Programs",
    description: "Cleanse and balance your body with personalized Traditional Chinese Medicine programs.",
    image: "/tcm-detox.jpg",
  },
  {
    name: "Tempo Infrared Motion-Sensor Guided Training",
    description: "Enhance your workout with cutting-edge motion-sensor technology and infrared assistance.",
    image: "/tempo-training.jpg",
  },
]

export default function Services() {
  return (
    <div className="min-h-screen py-12 pt-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Experience our comprehensive range of luxury chiropractic and holistic wellness services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href="https://www.schedulicity.com/scheduling/NCST6P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Book This Service Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

