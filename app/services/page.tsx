"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const services = [
  {
    id: "chiropractic",
    name: "Chiropractic Adjustments",
    description: "Restore proper alignment and function to your spine and joints.",
    longDescription:
      "Our chiropractic adjustments are designed to restore proper alignment and function to your spine and joints. Using precise and gentle techniques, we address misalignments that can cause pain, restrict movement, and impact your overall health. Regular chiropractic care can help alleviate back pain, neck pain, headaches, and improve your body's natural ability to heal itself.",
    benefits: [
      "Pain relief for back, neck, and joint issues",
      "Improved mobility and flexibility",
      "Enhanced nervous system function",
      "Better posture",
      "Increased overall well-being",
    ],
    image: "/images/chiropractic.jpg",
  },
  {
    id: "cosmetic-acupuncture",
    name: "Cosmetic Acupuncture",
    description: "Rejuvenate your skin and reduce signs of aging with Mei Zen techniques.",
    longDescription:
      "Our Mei Zen Cosmetic Acupuncture is a natural alternative to invasive cosmetic procedures. This technique stimulates collagen production, improves circulation, and promotes cellular renewal in the face. By inserting fine needles into specific points, we can reduce the appearance of fine lines, wrinkles, and improve overall skin tone and texture.",
    benefits: [
      "Reduction in fine lines and wrinkles",
      "Improved skin tone and texture",
      "Increased collagen production",
      "Enhanced facial muscle tone",
      "Natural, long-lasting results without surgery",
    ],
    image: "/images/cosmetic-acupuncture.jpg",
  },
  {
    id: "infrared-sauna",
    name: "Infrared Sauna",
    description: "Detoxify, relax, and improve overall wellness with infrared therapy.",
    longDescription:
      "Our infrared sauna uses advanced technology to penetrate deep into your body, promoting detoxification, relaxation, and overall wellness. Unlike traditional saunas, infrared saunas operate at lower temperatures while providing more therapeutic benefits. The infrared heat helps to eliminate toxins, reduce muscle tension, and improve cardiovascular health.",
    benefits: ["Deep detoxification", "Improved circulation", "Muscle relaxation and pain relief", "Stress reduction", "Skin purification and rejuvenation"],
    image: "/images/infrared-sauna.jpg",
  },
  {
    id: "red-light-therapy",
    name: "Red Light Therapy",
    description: "Boost collagen production and accelerate healing with targeted light therapy.",
    longDescription:
      "Red Light Therapy, also known as Low-Level Light Therapy (LLLT), uses specific wavelengths of red and near-infrared light to stimulate cellular function. This non-invasive treatment can accelerate healing, reduce inflammation, and promote collagen production. It's effective for skin rejuvenation, wound healing, and pain management.",
    benefits: ["Increased collagen production", "Faster wound healing", "Reduced inflammation and pain", "Improved skin tone and texture", "Enhanced muscle recovery"],
    image: "/images/red-light-therapy.jpg",
  },
  {
    id: "cupping",
    name: "Cupping (Fire/Mobile)",
    description: "Relieve muscle tension and improve circulation with traditional cupping methods.",
    longDescription:
      "Cupping therapy is an ancient form of alternative medicine that uses suction to stimulate healing. We offer both fire cupping and mobile cupping techniques. This therapy can help release muscle tension, promote blood flow, and aid in the body's natural detoxification process. It's particularly effective for muscle soreness, pain, and inflammation.",
    benefits: [
      "Relief from muscle tension and pain",
      "Improved blood circulation",
      "Enhanced lymphatic drainage",
      "Reduced inflammation",
      "Promotion of relaxation and well-being",
    ],
    image: "/images/cupping.jpg",
  },
  {
    id: "tcm",
    name: "Traditional Chinese Medicine (TCM)",
    description: "Balance your body's energy with ancient healing practices.",
    longDescription:
      "Traditional Chinese Medicine (TCM) is a holistic approach to health that has been practiced for thousands of years. Our TCM treatments may include acupuncture, herbal medicine, dietary therapy, and mind-body practices like qi gong. TCM aims to balance the body's energy (qi) to promote overall health and well-being.",
    benefits: [
      "Holistic approach to health and wellness",
      "Treatment of various chronic conditions",
      "Improved energy and vitality",
      "Stress reduction and emotional balance",
      "Enhanced immune function",
    ],
    image: "/images/tcm.jpg",
  },
  {
    id: "detox-nutrition",
    name: "Detox & Nutritional Counseling",
    description: "Cleanse your body and optimize your nutrition for better health.",
    longDescription:
      "Our detox and nutritional counseling programs are designed to help you cleanse your body of toxins and optimize your nutrition for better health. We offer personalized detox plans and nutritional advice based on your individual needs and health goals. These programs can help improve digestion, boost energy levels, and support overall wellness.",
    benefits: [
      "Elimination of toxins from the body",
      "Improved digestion and nutrient absorption",
      "Increased energy and mental clarity",
      "Weight management support",
      "Customized nutrition plans for optimal health",
    ],
    image: "/images/detox-nutrition.jpg",
  },
  {
    id: "rehab-physiotherapy",
    name: "Rehab & Physiotherapy",
    description: "Recover from injuries and improve physical function with targeted therapies.",
    longDescription:
      "Our rehabilitation and physiotherapy services are designed to help you recover from injuries, surgeries, or chronic conditions. We use a combination of manual therapy, exercises, and advanced techniques to improve your physical function, reduce pain, and prevent future injuries. Our approach is tailored to your specific needs and goals.",
    benefits: [
      "Faster recovery from injuries or surgeries",
      "Improved strength and flexibility",
      "Pain reduction and management",
      "Enhanced physical performance",
      "Prevention of future injuries",
    ],
    image: "/images/rehab-physiotherapy.jpg",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(services[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setActiveService(service);
      }
    }
  }, [searchParams]);

  interface Service {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    benefits: string[];
    image: string;
  }

  const handleServiceClick = (service: Service): void => {
    setActiveService(service);
    setIsMobileMenuOpen(false);
    window.history.pushState({}, "", `?service=${service.id}`);
  };

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
        <p className="text-xl text-center mb-12 text-gray-600">Experience our comprehensive range of luxury chiropractic and holistic wellness services.</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Menu Button */}
          <div className="md:hidden mb-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
              {isMobileMenuOpen ? "Close Menu" : "View All Services"}
            </button>
          </div>

          {/* Left Sidebar */}
          <div className={`md:w-1/4 ${isMobileMenuOpen ? "block" : "hidden md:block"}`}>
            <nav className="sticky top-24">
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => handleServiceClick(service)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeService.id === service.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image src={activeService.image || "/placeholder.svg"} alt={activeService.name} width={800} height={400} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4" id={activeService.id}>
                  {activeService.name}
                </h2>
                <p className="text-gray-600 mb-6">{activeService.longDescription}</p>
                <h3 className="text-xl font-semibold mb-2">Benefits:</h3>
                <ul className="list-disc list-inside mb-6">
                  {activeService.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.schedulicity.com/scheduling/NCST6P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Book This Service Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
