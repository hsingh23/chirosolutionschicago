import type { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

interface BlogPost {
  title: string
  date: string
  content: string
}

interface BlogPosts {
  [key: string]: BlogPost
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug)
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Dr. Daniel M. Dziekan's Blog`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      url: `https://www.chirosolutionschicago.com/blog/${params.slug}`,
      siteName: "Dr. Daniel M. Dziekan",
      images: [
        {
          url: `https://www.chirosolutionschicago.com/images/blog-${params.slug}.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  }
}

async function getPostData(slug: string): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), "app/blog/posts")
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      title: data.title,
      date: data.date,
      content: contentHtml,
    }
  } catch (error) {
    return null
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">Published on {post.date}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  )
}

