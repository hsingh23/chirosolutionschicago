'use client'

import { motion } from 'motion/react'
import { FaStar } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Dr. Dziekan's Mei Zen Cosmetic Acupuncture has completely transformed my skin. I look years younger and feel more confident than ever!',
    rating: 5,
  },
  {
    name: 'John D.',
    text: 'I've been struggling with chronic back pain for years. After just a few sessions with Dr. Dziekan, I'm feeling better than I have in a long time.',
    rating: 5,
  },
  {
    name: 'Emily R.',
    text: 'The infrared sauna sessions have been a game-changer for my overall wellness. I feel detoxified and energized after each visit.',
    rating: 5,
  },
  {
    name: 'Michael T.',
    text: 'As an athlete, I appreciate Dr. Dziekan's sports medicine expertise. His treatments have significantly improved my performance and recovery time.',
    rating: 5,
  },
  {
    name: 'Lisa K.',
    text: 'The combination of chiropractic care and red light therapy has done wonders for my joint pain. I highly recommend Dr. Dziekan's holistic approach.',
    rating: 5,
  },
  {
    name: 'David W.',
    text: 'I was skeptical about cupping at first, but the results speak for themselves. My muscle tension has decreased dramatically, and I feel more flexible.',
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <div className="min-h-screen py-12 pt-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Patient Testimonials</h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Hear what our satisfied patients have to say about their experiences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            These testimonials reflect the experiences of our patients. Individual results may vary.
          </p>
        </div>
      </div>
    </div>
  )
}

