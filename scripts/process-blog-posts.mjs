import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { Feed } from "feed"

const BLOG_DIR = path.join(process.cwd(), "app", "blog", "posts")
const OUTPUT_DIR = path.join(process.cwd(), "public")

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

async function processBlogPosts() {
  try {
    const files = await fs.readdir(BLOG_DIR)
    const posts = []

    for (const file of files) {
      if (file.endsWith(".md") || file.endsWith(".mdx")) {
        const filePath = path.join(BLOG_DIR, file)
        const content = await fs.readFile(filePath, "utf-8")
        const { data, content: markdownContent } = matter(content)

        // Extract first paragraph for excerpt if not provided
        let excerpt = data.excerpt
        if (!excerpt) {
          excerpt = markdownContent
            .split('\n')
            .find(p => p.trim().length > 0)
            ?.replace(/[#*`]/g, '')
            .trim()
            .substring(0, 160)
        }

        // Calculate reading time
        const readingTime = calculateReadingTime(markdownContent);

        posts.push({
          ...data,
          slug: file.replace(/\.mdx?$/, ""),
          content: markdownContent,
          excerpt,
          author: data.author || "Dr. Daniel M. Dziekan",
          tags: data.tags || [],
          category: data.category || "Wellness",
          date: data.date || new Date().toISOString().split('T')[0],
          readingTime,
          wordCount: markdownContent.trim().split(/\s+/).length,
        })
      }
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date))

    await fs.writeFile(path.join(OUTPUT_DIR, "blog-posts.json"), JSON.stringify(posts, null, 2))

    const feed = new Feed({
      title: "Dr. Daniel M. Dziekan's Blog",
      description: "Latest posts from Dr. Daniel M. Dziekan's chiropractic and wellness blog",
      id: "https://www.chirosolutionschicago.com/",
      link: "https://www.chirosolutionschicago.com/blog",
      language: "en",
      image: "https://www.chirosolutionschicago.com/logo.png",
      favicon: "https://www.chirosolutionschicago.com/images/icons/icon-192.png",
      copyright: `All rights reserved ${new Date().getFullYear()}, Dr. Daniel M. Dziekan`,
      author: {
        name: "Dr. Daniel M. Dziekan",
        email: "chirosolutionschicago@gmail.com",
        link: "https://www.chirosolutionschicago.com/about",
      },
    })

    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `https://www.chirosolutionschicago.com/blog/${post.slug}`,
        link: `https://www.chirosolutionschicago.com/blog/${post.slug}`,
        description: post.excerpt,
        content: post.content,
        author: [
          {
            name: post.author,
            email: "chirosolutionschicago@gmail.com",
            link: "https://www.chirosolutionschicago.com/about",
          },
        ],
        date: new Date(post.date),
        category: post.category ? [{ name: post.category }] : undefined,
        extensions: post.tags ? [{ name: 'tags', objects: post.tags }] : undefined,
      })
    })

    await fs.writeFile(path.join(OUTPUT_DIR, "rss.xml"), feed.rss2())
    console.log("Blog posts processed successfully. JSON and RSS files generated.")
  } catch (error) {
    console.error("Error processing blog posts:", error)
  }
}

processBlogPosts()

