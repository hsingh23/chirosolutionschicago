"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FaRss } from "react-icons/fa";
import blogPosts from "../../public/blog-posts.json";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  category?: string;
  author?: string;
  readingTime?: number;
}

type FilteredBlogPost = Required<Pick<BlogPost, 'slug' | 'title' | 'date'>> & Partial<BlogPost>;

function BlogPostCard({ post, index, onTagClick }: { 
  post: FilteredBlogPost; 
  index: number; 
  onTagClick: (tag: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative w-full h-48">
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
          <div className="flex flex-wrap gap-1 mb-4">
            {post?.tags?.map((tag: string) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(tag);
                  window.scrollTo(0, 0);
                }}
                className="text-xs bg-slate-50/80 hover:bg-slate-100/80 rounded-full px-2 py-0.5 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="text-blue-600 hover:text-blue-800 font-semibold">Read More</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState<FilteredBlogPost[]>([]);

  useEffect(() => {
    setPosts(blogPosts as FilteredBlogPost[]);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const category = params.get('category');
    const search = params.get('q');
    if (tag) setSelectedTag(tag);
    if (category) setSelectedCategory(category);
    if (search) setSearchTerm(search);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tag = params.get('tag');
      const category = params.get('category');
      const search = params.get('q');
      setSelectedTag(tag || "");
      setSelectedCategory(category || "");
      setSearchTerm(search || "");
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateUrlParams = (tag: string, category: string, search: string) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (category) params.set('category', category);
    if (search) params.set('q', search);
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);
    window.history.scrollRestoration = 'manual';
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    updateUrlParams(tag, selectedCategory, searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrlParams(selectedTag, category, searchTerm);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateUrlParams(selectedTag, selectedCategory, value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
    setSelectedCategory("");
    updateUrlParams("", "", "");
  };

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags || [])));
  const allCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = (post.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || 
                      post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()) || false;
    const matchesCategory = selectedCategory === "" || 
                          (post.category || "").toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesTag && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
            <p className="text-xl text-gray-600">
              Stay informed with the latest in chiropractic care and holistic wellness
            </p>
          </div>
          <Link 
            href="/rss.xml" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 px-3 py-1 rounded-full hover:bg-slate-100/80 transition-colors"
          >
            <FaRss size={14} />
            Subscribe to RSS Feed
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Search blog posts..." 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/80" 
              value={searchTerm} 
              onChange={(e) => handleSearch(e.target.value)} 
            />
            {(searchTerm || selectedTag || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="shrink-0 px-3 py-2 rounded-lg text-sm bg-slate-50/80 hover:bg-slate-100/80 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4 pb-2 mb-2">
            <div className="flex flex-nowrap min-w-full gap-2">
              <button 
                className={`shrink-0 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTag === "" ? "bg-blue-500 text-white" : "bg-slate-50/80 hover:bg-slate-100/80"
                }`} 
                onClick={() => handleTagChange("")}
              >
                All Tags
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`shrink-0 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedTag === tag ? "bg-blue-500 text-white" : "bg-slate-50/80 hover:bg-slate-100/80"
                  }`}
                  onClick={() => handleTagChange(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex flex-nowrap min-w-full gap-2">
              <button
                className={`shrink-0 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === "" ? "bg-blue-500 text-white" : "bg-slate-50/80 hover:bg-slate-100/80"
                }`}
                onClick={() => handleCategoryChange("")}
              >
                All Categories
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  className={`shrink-0 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedCategory === category ? "bg-blue-500 text-white" : "bg-slate-50/80 hover:bg-slate-100/80"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {(searchTerm || selectedTag || selectedCategory) && (
            <p className="text-sm text-gray-600 mt-2 mb-4">
              Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              {selectedCategory && ` in ${selectedCategory}`}
              {selectedTag && ` tagged with "${selectedTag}"`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogPostCard 
                key={post.slug} 
                post={post} 
                index={index} 
                onTagClick={handleTagChange} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
