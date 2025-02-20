"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import blogPosts from "../../public/blog-posts.json";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
  const allCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || post?.tags?.includes(selectedTag);
    const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
    return matchesSearch && matchesTag && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
        <p className="text-xl text-center mb-12 text-gray-600">Stay informed with the latest in chiropractic care and holistic wellness</p>

        {/* RSS Feed Link */}
        <div className="text-center mb-8">
          <Link href="/rss.xml" className="text-blue-600 hover:text-blue-800">
            Subscribe to RSS Feed
          </Link>
        </div>

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
                onClick={() => setSelectedTag(tag || "")}
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
                onClick={() => setSelectedCategory(category || "")}
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
                <div className="relative w-full h-[400px]">
                  <Image 
                    src={post.image || "/placeholder.svg"} 
                    alt={post.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post?.tags?.map((tag) => (
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
