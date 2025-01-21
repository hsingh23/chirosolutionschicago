"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const blogPosts = [
  {
    title: "See What New Year's Specials Work For You…",
    excerpt:
      "Discover our exciting New Year's specials designed to kickstart your wellness journey. From package deals to free sessions, find the perfect offer to meet your health goals.",
    slug: "new-years-specials",
    date: "December 28, 2024",
    tags: ["promotions", "wellness", "new year"],
    category: "Offers",
    image: "/images/blog-new-years-specials.jpg",
  },
  {
    title: "Summer is Coming: Get Ready with Our Detox/Weight Loss Program!",
    excerpt: "Prepare for summer with our comprehensive Detox/Weight Loss Program. Learn how Dr. Dziekan's expertise can help you achieve your health and fitness goals.",
    slug: "summer-detox-weight-loss-program",
    date: "May 1, 2025",
    tags: ["detox", "weight loss", "summer", "wellness"],
    category: "Wellness Programs",
    image: "/images/blog-summer-detox.jpg",
  },
  {
    title: "The Benefits of Chiropractic Care for Athletes",
    excerpt: "Discover how chiropractic care can enhance athletic performance, prevent injuries, and speed up recovery times for athletes of all levels.",
    slug: "chiropractic-care-for-athletes",
    date: "June 15, 2025",
    tags: ["chiropractic", "sports medicine", "athletic performance"],
    category: "Chiropractic Care",
    image: "/images/blog-chiropractic-athletes.jpg",
  },
  {
    title: "Understanding the Science Behind Acupuncture",
    excerpt: "Delve into the scientific principles that make acupuncture an effective treatment for various conditions, from pain management to stress relief.",
    slug: "science-of-acupuncture",
    date: "July 3, 2025",
    tags: ["acupuncture", "traditional chinese medicine", "pain management"],
    category: "Alternative Medicine",
    image: "/images/blog-acupuncture-science.jpg",
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
  const allCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

  useEffect(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
      const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
      return matchesSearch && matchesTag && matchesCategory;
    });
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, selectedCategory]);

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
        <p className="text-xl text-center mb-12 text-gray-600">Stay informed with the latest in chiropractic care and holistic wellness</p>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <input type="text" placeholder="Search blog posts..." className="w-full p-2 border rounded mb-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="flex flex-wrap gap-2 mb-4">
            <button className={`px-3 py-1 rounded ${selectedTag === "" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`} onClick={() => setSelectedTag("")}>
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded ${selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded ${selectedCategory === "" ? "bg-green-500 text-white" : "bg-blue-200 hover:bg-blue-300"}`}
              onClick={() => setSelectedCategory("")}
            >
              All Categories
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded ${selectedCategory === category ? "bg-green-500 text-white" : "bg-blue-200 hover:bg-blue-300"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <Image src={post.image || "/placeholder.svg"} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-sm bg-gray-200 rounded px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-blue-600 hover:text-blue-800 font-semibold">Read More</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
