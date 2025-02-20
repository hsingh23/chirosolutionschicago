"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { FaChevronRight, FaStar, FaInstagram, FaFacebook, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

const stats = [
  { value: "2100+", label: "Satisfied Clients" },
  { value: "16+", label: "Years of Experience" },
  { value: "93%", label: "Client Retention" },
  { value: "4.9/5", label: "Average Review" },
];

const coreServices = [
  {
    title: "Sports Chiropractic",
    description:
      "Expert sports chiropractic care combining thorough evaluation with personalized treatment plans. We focus on optimizing spinal alignment, joint mobility, and muscle function to enhance athletic performance and accelerate recovery.",
    image: "/images/chiropractic adjustment-a-woman-getting-a-back-massage-from-a-manunsplash-d7gtkuo9q6s.jpeg",
  },
  {
    title: "Cosmetic Acupuncture",
    description:
      "Experience natural facial rejuvenation with Mei Zen cosmetic acupuncture. This gentle treatment enhances your features by stimulating collagen production, reducing fine lines, and creating natural lift around the eyes, neck, and jawline.",
    image: "/images/acupuncture--person-holding-woman-nose.jpeg",
  },
  {
    title: "Electric Stimulation Acupuncture",
    description: "Combines acupuncture with electric stimulation to enhance pain relief and healing, promoting faster recovery and improved overall wellness.",
    image: "/images/electric acupuncture-asian-woman-receiving-acupuncture-with-electrical-stimulator-at-back-alternative-medicine-conceptvista-382856158.jpeg",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Dr. Dziekan's Mei Zen Cosmetic Acupuncture has completely transformed my skin. The results are amazing! I look years younger and feel more confident than ever.",
    rating: 5,
  },
  {
    name: "Michael T.",
    text: "As an athlete, I appreciate Dr. Dziekan's sports medicine expertise. His treatments have significantly improved my performance and recovery time. I couldn't be happier with the results!",
    rating: 5,
  },
  {
    name: "Lisa K.",
    text: "The combination of chiropractic care and red light therapy has done wonders for my joint pain. I highly recommend Dr. Dziekan's holistic approach to anyone seeking comprehensive wellness solutions.",
    rating: 5,
  },
  {
    name: "David W.",
    text: "I was skeptical about cupping at first, but the results speak for themselves. My muscle tension has decreased dramatically, and I feel more flexible than ever. Dr. Dziekan's expertise is unmatched!",
    rating: 5,
  },
  {
    name: "Emily R.",
    text: "The infrared sauna sessions have been a game-changer for my overall wellness. I feel detoxified and energized after each visit. It's become an essential part of my self-care routine.",
    rating: 5,
  },
  {
    name: "John D.",
    text: "I've been struggling with chronic back pain for years. After just a few sessions with Dr. Dziekan, I'm feeling better than I have in a long time. His comprehensive approach to wellness is truly life-changing.",
    rating: 5,
  },
];

const specializedPrograms = [
  {
    title: "Sports Medicine & Rehabilitation",
    description: "Comprehensive care for athletes and active individuals, including injury prevention and performance optimization.",
  },
  {
    title: "Cosmetic & Anti-Aging Solutions",
    description: "Advanced facial rejuvenation and body sculpting through innovative acupuncture techniques.",
  },
  {
    title: "Wellness Maintenance Plans",
    description: "Regular treatments to sustain long-term health and vitality with flexible subscription options.",
  },
  {
    title: "One Stop Shop",
    description: "One place to get multi-modal treatment via acupuncture, mobile cupping, chiropractic work, detox plans and more.",
  },
];

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
        <motion.div style={{ y }} className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-left z-10 mb-8 md:mb-0">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Enhance Wellness with Tailored Treatments
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl mb-8 text-gray-600">
              Experience comprehensive chiropractic and holistic wellness in the heart of Chicago
            </motion.p>
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              href="https://www.schedulicity.com/scheduling/NCST6P"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Schedule Now
            </motion.a>
          </div>
          <motion.div className="md:w-1/2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <video
              src="https://i.imgur.com/H0GVq4r.mp4"
              className="rounded-lg w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              onClick={(e) => {
                const video = e.target as HTMLVideoElement;
                if (video.muted) {
                  video.muted = false;
                } else {
                  video.muted = true;
                }
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-center mb-12">
            What We Love to Do
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <Image
                  loading="eager"
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="https://www.schedulicity.com/scheduling/NCST6P" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                  Book Now <FaChevronRight className="ml-2" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-center mb-12">
            What People Say About Us
          </motion.h2>
          <div className="relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
            <div className="overflow-hidden">
              <motion.div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                      <p className="font-semibold">- {testimonial.name}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Programs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8">
                Why Choose Us?
              </motion.h2>
              <div className="space-y-6">
                {specializedPrograms.map((program, index) => (
                  <motion.div key={program.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                    <p className="text-gray-600">{program.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                loading="eager" 
                src="/images/collage.jpg" 
                alt="Specialized Programs" 
                fill 
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-center mb-8">
            Office Hours
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-2 text-center">
              <li>Monday, Wednesday, Friday: 1:00 PM - 7:00 PM</li>
              <li>Tuesday, Thursday: 7:30 AM - 12:30 PM</li>
              <li>Saturday: 8:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-6">
                Get in Touch
              </motion.h2>
              <div className="space-y-4">
                <p>2534 N. Halsted St., Chicago, IL 60614</p>
                <p>Phone: (773) 529-6530</p>
                <p>Email: chirosolutionschicago@gmail.com</p>
                <div className="flex space-x-4 mt-6">
                  <a href="https://www.instagram.com/chirochicago/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
                    <FaInstagram size={24} />
                  </a>
                  <a href="https://www.facebook.com/chirosolutionschicago/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
                    <FaFacebook size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.5854797472916!2d-87.64920908455778!3d41.92915797921814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f9b8d2d%3A0x62ad8b907dd755d5!2s2534%20N%20Halsted%20St%2C%20Chicago%2C%20IL%2060614!5e0!3m2!1sen!2sus!4v1652893898974!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
