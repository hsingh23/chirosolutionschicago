'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  title: string;
  date: string;
  slug: string;
  image: string;
  excerpt?: string;
}

export default function BlogSidebar({ currentSlug }: { currentSlug: string }) {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch('/blog-posts.json');
      const allPosts = await response.json();
      setPosts(allPosts.filter((post: BlogPost) => post.slug !== currentSlug));
    };
    loadPosts();
  }, [currentSlug]);

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  return (
    <div className="bg-slate-50/80 p-6 rounded-lg sticky top-24">
      <h2 className="text-2xl font-semibold mb-4">Other Posts</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-6">
        {filteredPosts.slice(0, 5).map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="group flex flex-col gap-2 hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-medium line-clamp-2">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}