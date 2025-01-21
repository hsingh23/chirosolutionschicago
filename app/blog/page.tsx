import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog - Dr. Daniel M. Dziekan",
  description: "Stay informed with the latest in chiropractic care, holistic wellness, and health tips from Dr. Daniel M. Dziekan in Chicago.",
  openGraph: {
    title: "Blog - Dr. Daniel M. Dziekan",
    description: "Stay informed with the latest in chiropractic care and holistic wellness.",
    url: "https://www.chirosolutionschicago.com/blog",
    siteName: "Dr. Daniel M. Dziekan",
    images: [
      {
        url: "https://www.chirosolutionschicago.com/images/blog-og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const blogPosts = [
  {
    title: "See What New Year's Specials Work For You…",
    excerpt:
      "Discover our exciting New Year's specials designed to kickstart your wellness journey. From package deals to free sessions, find the perfect offer to meet your health goals.",
    slug: "new-years-specials",
    date: "December 28, 2024",
    tags: ["promotions", "wellness", "new year"],
    category: "Offers",
  },
  {
    title: "Summer is Coming: Get Ready with Our Detox/Weight Loss Program!",
    excerpt: "Prepare for summer with our comprehensive Detox/Weight Loss Program. Learn how Dr. Dziekan's expertise can help you achieve your health and fitness goals.",
    slug: "summer-detox-weight-loss-program",
    date: "May 1, 2025",
    tags: ["detox", "weight loss", "summer", "wellness"],
    category: "Wellness Programs",
  },
  {
    title: "The Benefits of Chiropractic Care for Athletes",
    excerpt: "Discover how chiropractic care can enhance athletic performance, prevent injuries, and speed up recovery times for athletes of all levels.",
    slug: "chiropractic-care-for-athletes",
    date: "June 15, 2025",
    tags: ["chiropractic", "sports medicine", "athletic performance"],
    category: "Chiropractic Care",
  },
  {
    title: "Understanding the Science Behind Acupuncture",
    excerpt: "Delve into the scientific principles that make acupuncture an effective treatment for various conditions, from pain management to stress relief.",
    slug: "science-of-acupuncture",
    date: "July 3, 2025",
    tags: ["acupuncture", "traditional chinese medicine", "pain management"],
    category: "Alternative Medicine",
  },
];

export default function Blog() {
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
  const allCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
        <p className="text-xl text-center mb-12 text-gray-600">Stay informed with the latest in chiropractic care and holistic wellness</p>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <input type="text" placeholder="Search blog posts..." className="w-full p-2 border rounded mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            {allTags.map((tag) => (
              <button key={tag} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                {tag}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button key={category} className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300">
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={`/images/blog-${post.slug}.jpg`} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
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
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
