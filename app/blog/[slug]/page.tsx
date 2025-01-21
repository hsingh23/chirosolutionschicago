import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPost = {
  title: string;
  content: string;
  date: string;
};

type BlogPosts = {
  [key in "new-years-specials" | "summer-detox-weight-loss-program"]: BlogPost;
};

const blogPosts: BlogPosts = {
  "new-years-specials": {
    title: "See What New Year's Specials Work For You…",
    content: `
      <h2>Exciting New Year's Specials to Kickstart Your Wellness Journey</h2>
      <p>As we welcome the New Year, it's the perfect time to invest in your health and well-being. At Dr. Daniel M. Dziekan's clinic, we're offering some incredible specials to help you start your year off right:</p>
      
      <h3>1. 10 Visit Package Special</h3>
      <p>Purchase any 10 visit package and receive:</p>
      <ul>
        <li>Two 20-minute Acupuncture sessions FREE</li>
        <li>Two 30-minute Tempo workout sessions FREE</li>
      </ul>
      <p>Total value: $260</p>
      
      <h3>2. 22-Day Metabolic Detox Program</h3>
      <p>Purchase our comprehensive 22-Day Metabolic Detox Program for $425 and choose between:</p>
      <ul>
        <li>Two 45-minute Tempo workout sessions FREE (value $50)</li>
        <li>Three 20-minute Infrared Sauna sessions FREE (value $45)</li>
      </ul>
      
      <h3>3. Acupuncture Package</h3>
      <p>Purchase a 3 pack of Acupuncture treatments at $315 and receive:</p>
      <ul>
        <li>A bottle of Stress Relief Chinese Herbs FREE (value $45)</li>
      </ul>
      
      <p>Don't miss out on these amazing offers to jumpstart your health and wellness goals for the New Year. Contact us today to learn more or to book your appointments!</p>
    `,
    date: "December 28, 2024",
  },
  "summer-detox-weight-loss-program": {
    title: "Summer is Coming: Get Ready with Our Detox/Weight Loss Program!",
    content: `
      <h2>Prepare for Summer with Our Comprehensive Detox/Weight Loss Program</h2>
      <p>Hello Natural Chiropractic Solutions Patients & Friends!</p>
      <p>Summer is right around the corner! That means swimsuits, weddings, vacations, and those pictures that come with it… Want to feel good about yourself and have the energy that has left you sluggish during the Winter/Spring? Sign up for our Detox/Weight Loss Program!</p>
      
      <h3>Introducing Our Detox/Weight Loss Program</h3>
      <p>Dr. Dan Dziekan has been working on a program like this for a while, and here it is! As a Certified Chiropractic Sports Physician (CCSP), Dr. Dziekan has been one of the best in the country for sports medicine, holistic medicine, and nutrition that has helped patients and athletes alike. This program is a combination of it all!</p>
      
      <p><strong>Success Story:</strong> Dr. Dziekan lost 16.3 lbs. in 14 days by following this protocol. You can too!</p>
      
      <h3>Program Details</h3>
      <ol>
        <li><strong>Detoxification Options:</strong> Choose from 3 different detoxification programs (17-day, 22-day, or 2-month) to cleanse your liver and gastrointestinal tract. Includes shakes, supplements, a nutritional guidebook, and recipes.</li>
        <li><strong>Tempo Workouts:</strong> Utilize our Infrared Motion-Sensor workout machine for effective calorie burning. Enjoy a variety of workout styles with real-time posture monitoring.</li>
        <li><strong>Acupuncture Treatments:</strong> Benefit from our acupuncture protocols designed for optimal gastrointestinal health and internal organ support.</li>
        <li><strong>FAR Infrared Saunas:</strong> Enhance detoxification, boost immunity, improve muscle relaxation, and support weight loss with our infrared sauna sessions.</li>
      </ol>
      
      <h3>Why Choose Our Program?</h3>
      <ul>
        <li>Comprehensive approach combining nutrition, exercise, and holistic treatments</li>
        <li>Personalized care from Dr. Dziekan, a certified expert in sports medicine and holistic wellness</li>
        <li>State-of-the-art equipment including Tempo smart gym and FAR Infrared Saunas</li>
        <li>Proven results, as demonstrated by Dr. Dziekan's personal success</li>
      </ul>
      
      <p>Don't wait to start your journey to a healthier, more confident you. Contact us today to learn more about our Detox/Weight Loss Program and how it can help you achieve your summer body goals!</p>
    `,
    date: "May 1, 2025",
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof BlogPosts];
  if (!post) {
    return {
      title: "Post Not Found",
    };
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
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof BlogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">Published on {post.date}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}
