import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";
import BlogSidebar from "@/components/BlogSidebar";
import Link from "next/link";

interface BlogPost {
  title: string;
  date: string;
  content: string;
  image?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  category?: string;
  readingTime?: number;
  wordCount?: number;
}

interface BlogPostData extends BlogPost {
  tags: string[];
  category: string;
  excerpt: string;
  author: string;
  wordCount: number;
  readingTime: number;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Get the first paragraph of content as a better description if excerpt isn't available
  const firstParagraph = post.content
    .split('\n')
    .find(p => p.trim().length > 0)
    ?.replace(/<[^>]*>/g, '')
    .trim();

  const description = post.excerpt || firstParagraph || post.content.substring(0, 160);
  
  const postTitle = `${post.title} - Chiropractic & Wellness Blog | Dr. Daniel M. Dziekan`;
  const categoryMeta = post.category ? `${post.category} - ` : '';
  const tagsMeta = post.tags?.length ? `${post.tags.join(', ')} | ` : '';

  return {
    title: postTitle,
    description: description,
    keywords: post.tags || [],
    authors: [{ name: post.author || "Dr. Daniel M. Dziekan" }],
    category: post.category || "Wellness",
    openGraph: {
      title: postTitle,
      description: description,
      url: `https://www.chirosolutionschicago.com/blog/${params.slug}`,
      siteName: "Dr. Daniel M. Dziekan - ChiroSolutions Chicago",
      images: [
        {
          url: post.image || `https://www.chirosolutionschicago.com/images/blog/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      tags: post.tags || [],
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      section: post.category || "Wellness",
      authors: [post.author || "Dr. Daniel M. Dziekan"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryMeta}${tagsMeta}${post.title}`,
      description: description,
      images: [post.image || `https://www.chirosolutionschicago.com/images/blog/${params.slug}.jpg`],
      creator: "@chirochicago",
      site: "@chirochicago",
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    other: {
      "article:published_time": new Date(post.date).toISOString(),
      "article:modified_time": new Date(post.date).toISOString(),
      "article:author": post.author || "Dr. Daniel M. Dziekan",
      "article:section": post.category || "Wellness",
      "article:tag": post.tags?.join(',') || "",
      "og:updated_time": new Date(post.date).toISOString(),
    },
    icons: {
      icon: "/images/icons/icon-192.png",
      shortcut: "/images/icons/icon-192.png",
      apple: "/images/icons/icon-192.png",
    },
    alternates: {
      canonical: `https://www.chirosolutionschicago.com/blog/${params.slug}`,
    },
  };
}

async function getPostData(slug: string): Promise<BlogPostData | null> {
  const postsDirectory = path.join(process.cwd(), "app/blog/posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // Default image based on category
    let defaultImage = '/images/blog/wellness-woman-wearing-black-sports-braunsplash-c12ag6gvd6b.jpeg';
    if (data.category) {
      switch (data.category.toLowerCase()) {
        case 'chiropractic':
          defaultImage = '/images/blog/chiropractic-person-massaging-the-back-of-a-womanunsplash-ju4ektrobqa.jpeg';
          break;
        case 'acupuncture':
          defaultImage = '/images/blog/acupuncture-person-holding-silver-and-white-penunsplash-fo8u9why7d.jpeg';
          break;
        case 'wellness programs':
          defaultImage = '/images/blog/wellness-woman-walking-on-pathway-during-daytimeunsplash-o5c0z1x6g9a.jpeg';
          break;
        case 'sports medicine':
          defaultImage = '/images/blog/sports chiropractic-a-person-standing-on-a-tennis-court-with-a-racketunsplash-dnz1nligju.jpeg';
          break;
      }
    }

    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    return {
      title: data.title,
      date: data.date,
      content: contentHtml,
      image: data.image || defaultImage,
      excerpt: data.excerpt || content.substring(0, 160).trim(),
      author: data.author || "Dr. Daniel M. Dziekan",
      tags: data.tags || [],
      category: data.category || "Wellness",
      wordCount,
      readingTime,
    };
  } catch (error) {
    return null;
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image || `https://www.chirosolutionschicago.com/images/blog/${params.slug}.jpg`,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "Dr. Daniel M. Dziekan",
      "url": "https://www.chirosolutionschicago.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChiroSolutions Chicago",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.chirosolutionschicago.com/images/icons/icon-192.png"
      }
    },
    "description": post.excerpt || post.content.substring(0, 160),
    "articleBody": post.content.replace(/<[^>]*>/g, ''),
    "keywords": post.tags?.join(", ") || "",
    "articleSection": post.category || "Wellness",
    "timeRequired": `PT${post.readingTime || 5}M`,
    "wordCount": post.wordCount || 0,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.chirosolutionschicago.com/blog/${params.slug}`
    }
  } as const;

  // Create breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.chirosolutionschicago.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.chirosolutionschicago.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category || "Wellness",
        "item": `https://www.chirosolutionschicago.com/blog?category=${encodeURIComponent(post.category || "Wellness")}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://www.chirosolutionschicago.com/blog/${params.slug}`
      }
    ]
  } as const;

  return (
    <div className="min-h-screen py-12 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">›</span>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <span className="mx-2">›</span>
            </li>
            {post.category && (
              <li>
                <Link 
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="hover:text-blue-600"
                >
                  {post.category}
                </Link>
                <span className="mx-2">›</span>
              </li>
            )}
            {post.tags && post.tags.length > 0 && (
              <li>
                <Link 
                  href={`/blog?tag=${encodeURIComponent(post.tags[0])}`}
                  className="hover:text-blue-600"
                >
                  {post.tags[0]}
                </Link>
                <span className="mx-2">›</span>
              </li>
            )}
            <li className="text-gray-900 font-medium">{post.title}</li>
          </ol>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-8">
              <p>Published on {post.date}</p>
              {post.author && (
                <>
                  <span>•</span>
                  <p>By {post.author}</p>
                </>
              )}
              {post.readingTime && (
                <>
                  <span>•</span>
                  <p>{post.readingTime} min read</p>
                </>
              )}
              {post.category && (
                <>
                  <span>•</span>
                  <Link 
                    href={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="bg-slate-50/80 hover:bg-slate-100/80 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {post.category}
                  </Link>
                </>
              )}
            </div>
            {post.image && (
              <div className="relative w-full h-[600px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
                />
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-8">
                {post.tags.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-xs bg-slate-50/80 hover:bg-slate-100/80 rounded-full px-2 py-0.5 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
          <div className="lg:w-1/4">
            <BlogSidebar currentSlug={params.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
