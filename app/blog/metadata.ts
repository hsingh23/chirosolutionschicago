import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";

interface BlogPostMeta {
  category?: string;
  tags?: string[];
}

async function getLatestPostInfo() {
  try {
    const fileContent = await fs.readFile(path.join(process.cwd(), "public/blog-posts.json"), "utf-8");
    const posts = JSON.parse(fileContent) as BlogPostMeta[];
    const categories = Array.from(new Set(posts.map(post => post.category || "Uncategorized")));
    const tags = Array.from(new Set(posts.flatMap(post => post.tags || [])));
    return { 
      categories: categories as string[], 
      tags: tags as string[], 
      totalPosts: posts.length 
    };
  } catch (error) {
    return { categories: [], tags: [], totalPosts: 0 };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { categories, tags, totalPosts } = await getLatestPostInfo();
  
  const title = "Expert Chiropractic & Wellness Blog | Dr. Daniel M. Dziekan";
  const description = `Explore ${totalPosts}+ articles on ${categories.join(", ")}, and more. Expert insights on chiropractic care, holistic wellness, and natural health solutions from Dr. Daniel M. Dziekan in Chicago.`;

  return {
    title,
    description,
    keywords: [...categories, ...tags],
    openGraph: {
      title,
      description,
      url: "https://www.chirosolutionschicago.com/blog",
      siteName: "Dr. Daniel M. Dziekan - ChiroSolutions Chicago",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@chirochicago",
      site: "@chirochicago",
    },
    alternates: {
      canonical: "https://www.chirosolutionschicago.com/blog",
    }
  } satisfies Metadata;
}