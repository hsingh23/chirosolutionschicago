import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { Feed } from "feed"

const BLOG_DIR = path.join(process.cwd(), "app", "blog", "posts")
const OUTPUT_DIR = path.join(process.cwd(), "public")

async function processBlogPosts() {
  try {
    const files = await fs.readdir(BLOG_DIR)
    const posts = []

    for (const file of files) {
      if (file.endsWith(".md") || file.endsWith(".mdx")) {
        const filePath = path.join(BLOG_DIR, file)
        const content = await fs.readFile(filePath, "utf-8")
        const { data, content: markdownContent } = matter(content)

        posts.push({
          ...data,
          slug: file.replace(/\.mdx?$/, ""),
          content: markdownContent,
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
      favicon: "https://www.chirosolutionschicago.com/favicon.ico",
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
            name: post.author || "Dr. Daniel M. Dziekan",
            email: "chirosolutionschicago@gmail.com",
            link: "https://www.chirosolutionschicago.com/about",
          },
        ],
        date: new Date(post.date),
      })
    })

    await fs.writeFile(path.join(OUTPUT_DIR, "rss.xml"), feed.rss2())
    console.log("Blog posts processed successfully. JSON and RSS files generated.")
  } catch (error) {
    console.error("Error processing blog posts:", error)
  }
}

processBlogPosts()

