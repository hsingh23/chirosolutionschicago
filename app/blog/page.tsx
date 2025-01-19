'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    title: '5 Benefits of Infrared Sauna Therapy You Didn\'t Know',
    excerpt: 'Discover the hidden advantages of infrared sauna sessions and how they can improve your overall health and wellness.',
    image: '/blog/infrared-sauna.jpg',
    date: 'May 15, 2023',
    slug: 'benefits-of-infrared-sauna-therapy',
  },
  {
    title: 'Why Cupping is More Than Just a Trend',
    excerpt: 'Learn about the ancient practice of cupping and its modern applications in pain relief and muscle recovery.',
    image: '/blog/cupping.jpg',
    date: 'April 28, 2023',
    slug: 'cupping-more-than-a-trend',
  },
  {
    title: 'Top Exercises to Pair with Chiropractic Care',
    excerpt: 'Enhance your chiropractic treatments with these complementary exercises for better spinal health and overall fitness.',
    image: '/blog/chiropractic-exercises.jpg',
    date: 'April 10, 2023',
    slug: 'exercises-for-chiropractic-care',
  },
  {
    title: 'The Science Behind Cosmetic Acupuncture',
    excerpt: 'Explore the scientific principles that make Mei Zen Cosmetic Acupuncture an effective alternative to invasive cosmetic procedures.',
    image: '/blog/cosmetic-acupuncture.jpg',
    date: 'March 22, 2023',
    slug: 'science-of-cosmetic-acupuncture',
  },
]

export default function Blog() {
  return (
    <div className="min-h-screen py-12 pt-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Stay informed with the latest in chiropractic care and holistic wellness
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Book Your Session Today
          </Link>
        </div>
      </div>
    </div>
  )
}

