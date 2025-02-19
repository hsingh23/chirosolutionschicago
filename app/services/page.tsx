"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const services = [
  {
    id: "chiropractic-adjustments",
    name: "Chiropractic Adjustments",
    description: "Tailored treatments to improve spinal alignment, relieve pain, and enhance mobility.",
    longDescription:
      "Chiropractic care focuses on spinal alignment to optimize nervous system function. By addressing vertebral misalignments, it promotes overall health and reduces pain. Our chiropractic adjustments include orthopedic exams, neurologic testing, and personalized treatment plans.",
    benefits: [
      "Pain Relief: Alleviates back pain, headaches, and joint discomfort.",
      "Improved Mobility: Enhances range of motion and flexibility.",
      "Systemic Health: Supports immune function and energy levels.",
      "Stress Reduction: Improves posture and reduces muscle tension.",
    ],
    forWho: "Individuals seeking pain relief, improved mobility, and overall wellness.",
    faqs: [
      {
        question: "Does it hurt?",
        answer: "Chiropractic adjustments are typically painless and provide immediate relief.",
      },
      {
        question: "How often should I visit?",
        answer: "Frequency depends on your condition; acute issues may require multiple visits per week, while maintenance is monthly.",
      },
      {
        question: "Is it safe for all ages?",
        answer: "Yes, chiropractic care is suitable for all age groups, from infants to seniors.",
      },
    ],
    complementaryServices: [
      "Therapeutic Massage: Relieves muscle tension and supports alignment.",
      "Acupuncture: Promotes systemic balance and healing.",
      "Lifestyle Coaching: Encourages posture improvement and ergonomic habits.",
    ],
    image: "/images/chiropractic-close-up-of-hands-pinching-skin-on-lower-back-therapist-grabbing-skin-next-to-back-spinevista-313927104.jpeg",
    relatedBlogPosts: [
      { title: "What Does a Sports Chiropractor Do?", slug: "what-does-a-sports-chiropractor-do" },
      { title: "Can a Chiropractor Help with Sciatica?", slug: "can-a-chiropractor-help-with-sciatica" },
    ],
  },
  {
    id: "cosmetic-acupuncture",
    name: "Cosmetic Acupuncture (Mei Zen)",
    description: "Natural facial rejuvenation and anti-aging effects through traditional Chinese medicine.",
    longDescription:
      "Cosmetic acupuncture, also known as facial rejuvenation acupuncture, is a holistic method for enhancing skin health and appearance. By stimulating collagen production and improving circulation, it offers a natural alternative to invasive cosmetic procedures. Our Mei Zen Cosmetic Acupuncture includes facial rejuvenation, neck lifts, chin/jawline definition, and addresses crow's feet and eyelid lift.",
    benefits: [
      "Immediate Results: Improves skin tone, reduces puffiness, and brightens complexion.",
      "Long-Term Effects: Softens wrinkles, enhances elasticity, and tightens skin.",
      "Holistic Wellness: Reduces stress and promotes overall health.",
    ],
    forWho: "Individuals seeking natural anti-aging solutions and overall skin health improvement.",
    faqs: [
      {
        question: "How many sessions will I need?",
        answer: "A typical course includes 10 sessions over five weeks, followed by monthly maintenance.",
      },
      {
        question: "Is it painful?",
        answer: "The ultra-fine needles cause minimal discomfort.",
      },
      {
        question: "Who is a good candidate?",
        answer: "Ideal for individuals with mild to moderate skin concerns or those seeking preventive anti-aging.",
      },
    ],
    complementaryServices: [
      "Facial Gua Sha: Boosts circulation and lymphatic drainage.",
      "Therapeutic Massage: Enhances relaxation and reduces tension.",
      "Nutritional Counseling: Supports skin health from within.",
    ],
    image: "/images/acupuncture--person-holding-woman-nose.jpeg",
  },
  {
    id: "electric-stimulation-acupuncture",
    name: "Electric Stimulation Acupuncture",
    description: "Enhanced acupuncture therapy for pain relief and accelerated healing.",
    longDescription:
      "Electric Stimulation Acupuncture combines traditional acupuncture with gentle electric currents to enhance pain relief and promote faster healing. This technique amplifies the effects of acupuncture, making it particularly effective for chronic pain conditions and stubborn injuries.",
    benefits: [
      "Amplified Pain Relief: Enhances the analgesic effects of acupuncture.",
      "Faster Healing: Stimulates tissue repair and regeneration.",
      "Muscle Relaxation: Helps reduce muscle spasms and tension.",
      "Improved Circulation: Boosts blood flow to treated areas.",
    ],
    forWho: "Individuals with chronic pain, sports injuries, or those seeking enhanced healing.",
    faqs: [
      {
        question: "Is it more painful than regular acupuncture?",
        answer: "Most patients find it comfortable, with only a mild tingling sensation.",
      },
      {
        question: "How long does a session last?",
        answer: "Typically 30-45 minutes, depending on the condition being treated.",
      },
      {
        question: "How many sessions are needed?",
        answer: "This varies by condition, but many patients see improvements within 6-10 sessions.",
      },
    ],
    complementaryServices: [
      "Chiropractic Adjustments: For comprehensive pain management.",
      "Therapeutic Exercises: To support recovery and prevent recurrence.",
      "Cupping Therapy: To enhance circulation and pain relief.",
    ],
    image: "/images/electric acupuncture-asian-woman-receiving-acupuncture-with-electrical-stimulator-at-back-alternative-medicine-conceptvista-382856158.jpeg",
  },
  {
    id: "rehab-physiotherapy",
    name: "Rehab & Physiotherapy",
    description: "Comprehensive rehabilitation and physiotherapy services for injury recovery and performance enhancement.",
    longDescription:
      "Our Rehab & Physiotherapy services offer a comprehensive approach to injury recovery, pain management, and performance enhancement. We utilize evidence-based techniques and state-of-the-art equipment to help patients regain function, reduce pain, and improve their overall quality of life.",
    benefits: [
      "Accelerated Recovery: Speeds up healing process for injuries and surgeries.",
      "Pain Management: Effective techniques for chronic and acute pain relief.",
      "Improved Mobility: Enhances flexibility, strength, and range of motion.",
      "Performance Optimization: Tailored programs for athletes and active individuals.",
    ],
    forWho: "Individuals recovering from injuries, managing chronic conditions, or seeking to improve physical performance.",
    faqs: [
      {
        question: "How long does a typical rehab program last?",
        answer: "The duration varies based on the condition, but most programs range from 4-12 weeks.",
      },
      {
        question: "Do I need a referral from a doctor?",
        answer: "While beneficial, a referral is not always necessary. We can assess your needs during an initial consultation.",
      },
      {
        question: "Will my insurance cover physiotherapy?",
        answer: "Many insurance plans cover physiotherapy. We recommend checking with your provider for specific coverage details.",
      },
    ],
    complementaryServices: [
      "Chiropractic Care: For comprehensive musculoskeletal health.",
      "Acupuncture: To support pain management and healing.",
      "Therapeutic Exercises: For ongoing strength and flexibility.",
    ],
    image: "/images/acupunture-woman-on-a-physiotherapy-table-during-a-massagevista-160109832.jpeg",
  },
  {
    id: "red-light-therapy",
    name: "Red Light Therapy",
    description: "Non-invasive therapy for skin rejuvenation, healing, and reducing inflammation.",
    longDescription:
      "Red Light Therapy uses specific wavelengths of red and near-infrared light to stimulate cellular function. This non-invasive treatment can accelerate healing, reduce inflammation, and promote collagen production, making it effective for skin rejuvenation, wound healing, and pain management.",
    benefits: [
      "Skin Rejuvenation: Improves skin tone, texture, and reduces signs of aging.",
      "Pain Relief: Helps alleviate chronic and acute pain conditions.",
      "Faster Healing: Accelerates wound healing and tissue repair.",
      "Reduced Inflammation: Helps with inflammatory conditions throughout the body.",
    ],
    forWho: "Individuals seeking skin improvement, pain relief, or enhanced healing.",
    faqs: [
      {
        question: "How often should I have treatments?",
        answer: "Typically 2-3 times per week for optimal results, but this can vary based on your specific needs.",
      },
      {
        question: "Is it safe for all skin types?",
        answer: "Yes, it's generally safe for all skin types and colors.",
      },
      {
        question: "How long before I see results?",
        answer: "Some effects are immediate, but optimal results usually appear after 8-12 weeks of consistent treatment.",
      },
    ],
    complementaryServices: [
      "Cosmetic Acupuncture: For enhanced facial rejuvenation.",
      "Chiropractic Care: To support overall healing and pain management.",
      "Nutritional Counseling: To support skin health from within.",
    ],
    image: "/images/red light therapy-cosmetologist-performs-led-light-therapy-for-facial-rejuvenationvista-745586508.jpeg",
  },
  {
    id: "cupping",
    name: "Cupping Therapy",
    description: "Traditional and mobile cupping for muscle tension and detoxification.",
    longDescription:
      "Cupping is a traditional therapeutic technique that uses suction to stimulate circulation, release tension, and promote healing. We offer both fire cupping for deeper tissue stimulation and mobile cupping services that don't leave marks. Cups are applied to the skin to create a vacuum effect that draws blood to the surface, enhances lymphatic drainage, and stretches fascial tissue.",
    benefits: [
      "Pain Relief: Eases chronic back pain, neck tension, and arthritis.",
      "Improved Circulation: Promotes blood flow and speeds up recovery.",
      "Detoxification: Facilitates the removal of metabolic waste.",
      "Respiratory Support: Helps with congestion, asthma, and seasonal allergies.",
      "Relaxation: Reduces stress and fosters a deep sense of calm.",
    ],
    forWho: "Individuals with muscle tension, pain, or those seeking detoxification and relaxation.",
    faqs: [
      {
        question: "Does it leave marks?",
        answer: "Traditional cupping may leave temporary marks that fade within a week. Our mobile cupping service doesn't leave marks.",
      },
      {
        question: "How often should I get cupping?",
        answer: "Acute conditions may require 2-3 sessions per week, while chronic issues benefit from weekly treatments.",
      },
      {
        question: "Is it painful?",
        answer: "Most people find it relaxing, though you may feel a gentle pulling sensation.",
      },
    ],
    complementaryServices: [
      "Acupuncture: Enhances the therapeutic benefits.",
      "Gua Sha: Releases muscle tension and improves circulation.",
      "Therapeutic Massage: Provides comprehensive relief for pain and stress.",
    ],
    image: "/images/fire cupping-hijama-therapy-with-heated-vacuum-cups-on-patient-skin-to-heal-pain-problemsvista-667848836.jpeg",
    relatedBlogPosts: [{ title: "What Does Gua Sha Do?", slug: "what-does-gua-sha-do" }],
  },
  {
    id: "infrared-sauna",
    name: "Infrared Sauna",
    description: "Detoxification and relaxation through infrared heat therapy.",
    longDescription:
      "Our infrared sauna uses advanced technology to penetrate deep into your body, promoting detoxification, relaxation, and overall wellness. Unlike traditional saunas, infrared saunas operate at lower temperatures while providing more therapeutic benefits. The infrared heat helps to eliminate toxins, reduce muscle tension, and improve cardiovascular health.",
    benefits: [
      "Deep Detoxification: Eliminates toxins through sweat.",
      "Improved Circulation: Enhances blood flow throughout the body.",
      "Muscle Relaxation: Relieves tension and soothes sore muscles.",
      "Stress Reduction: Promotes relaxation and mental well-being.",
      "Skin Purification: Cleanses and rejuvenates the skin.",
    ],
    forWho: "Individuals seeking detoxification, stress relief, or improved overall wellness.",
    faqs: [
      {
        question: "How long should a session last?",
        answer: "Typically 20-40 minutes, depending on your tolerance and health goals.",
      },
      {
        question: "How often can I use the infrared sauna?",
        answer: "Most people benefit from 3-4 sessions per week, but it's safe for daily use.",
      },
      {
        question: "Is it safe if I have health conditions?",
        answer: "While generally safe, consult with your healthcare provider if you have any specific health concerns.",
      },
    ],
    complementaryServices: [
      "Detoxification Programs: To enhance overall cleansing effects.",
      "Therapeutic Massage: To further relax muscles post-sauna.",
      "Nutritional Counseling: To support your body's detoxification processes.",
    ],
    image: "/images/sauna-woman-in-white-tank-top-sitting-on-brown-wooden-benchunsplash-h3yj24cjdos.jpeg",
  },
  {
    id: "therapeutic-exercises",
    name: "Therapeutic Exercises",
    description: "Guided athletic training using the Tempo Infrared Motion-Sensor Machine.",
    longDescription:
      "Our therapeutic exercise program utilizes the advanced Tempo Infrared Motion-Sensor Machine to provide guided, personalized workouts. This technology offers real-time feedback on your form and progress, ensuring safe and effective training. We offer a variety of exercise types including core strengthening, mobility work, cardio, HIIT, and yoga.",
    benefits: [
      "Improved Strength and Flexibility: Enhances overall physical fitness.",
      "Injury Prevention: Builds resilience and proper form to avoid injuries.",
      "Personalized Progress: Tailored workouts that adapt to your improving fitness level.",
      "Enhanced Recovery: Aids in rehabilitation from injuries or surgeries.",
      "Cardiovascular Health: Improves heart health and endurance.",
    ],
    forWho: "Athletes, individuals recovering from injuries, or anyone looking to improve their fitness and mobility.",
    faqs: [
      {
        question: "Do I need to be fit to start?",
        answer: "No, the program is adaptable to all fitness levels, from beginners to advanced athletes.",
      },
      {
        question: "How long are the sessions?",
        answer: "Sessions typically last 30-60 minutes, depending on your goals and fitness level.",
      },
      {
        question: "Can it help with specific injuries?",
        answer: "Yes, we can tailor exercises to aid in recovery from various injuries or surgeries.",
      },
    ],
    complementaryServices: [
      "Chiropractic Care: To ensure proper alignment during exercises.",
      "Nutritional Counseling: To support your fitness goals.",
      "Sports Medicine: For comprehensive athletic care and performance enhancement.",
    ],
    image: "/images/exercise-exercisepixabay-86200.jpeg",
  },
  {
    id: "tcm",
    name: "Traditional Chinese Medicine (TCM)",
    description: "Holistic treatments using tongue/pulse diagnosis and organ testing.",
    longDescription:
      "Traditional Chinese Medicine (TCM) is a holistic approach to health that has been practiced for thousands of years. Our TCM treatments may include acupuncture, herbal medicine, dietary therapy, and mind-body practices. We use tongue and pulse diagnosis, along with organ testing, to create personalized treatment plans that balance mind, body, and spirit.",
    benefits: [
      "Holistic Healing: Addresses the root cause of health issues, not just symptoms.",
      "Improved Energy: Balances the body's energy (qi) for better vitality.",
      "Stress Reduction: Promotes relaxation and emotional balance.",
      "Enhanced Immune Function: Strengthens the body's natural defenses.",
      "Personalized Care: Tailored treatments based on individual needs.",
    ],
    forWho: "Individuals seeking a comprehensive, natural approach to health and wellness.",
    faqs: [
      {
        question: "How long does a TCM consultation take?",
        answer: "Initial consultations typically last 60-90 minutes, with follow-up sessions around 45-60 minutes.",
      },
      {
        question: "Are Chinese herbs safe?",
        answer: "When prescribed by a qualified practitioner, Chinese herbs are generally safe and effective.",
      },
      {
        question: "How soon can I expect results?",
        answer: "Some patients experience immediate relief, while others may need several sessions for noticeable improvements.",
      },
    ],
    complementaryServices: [
      "Acupuncture: Often a key component of TCM treatment.",
      "Nutritional Counseling: To support dietary recommendations in TCM.",
      "Qigong or Tai Chi: Mind-body practices that complement TCM principles.",
    ],
    image: "/images/traditional chinese medicine-chinese-herbs-and-acupuncture-needlesvista-144445351.jpeg",
  },
  {
    id: "nutrition-detox",
    name: "Nutrition & Detoxification Programs",
    description: "Customized nutrition plans and detoxification protocols.",
    longDescription:
      "Our Nutrition & Detoxification Programs offer personalized approaches to optimize your health through diet and cleansing. We create customized nutrition plans tailored to your unique needs and health goals. Our detoxification protocols utilize nutraceuticals and infrared sauna therapy to support your body's natural detox processes.",
    benefits: [
      "Weight Management: Achieve and maintain a healthy weight.",
      "Increased Energy: Optimize nutrient intake for improved vitality.",
      "Improved Digestion: Address digestive issues and enhance gut health.",
      "Detoxification: Support your body's natural cleansing processes.",
      "Better Sleep: Improve sleep quality through balanced nutrition.",
    ],
    forWho: "Individuals looking to improve their overall health, manage weight, or address specific health concerns through nutrition.",
    faqs: [
      {
        question: "How long do the programs last?",
        answer: "Programs can range from 2 weeks to several months, depending on your goals and needs.",
      },
      {
        question: "Will I need to take supplements?",
        answer: "Some programs may include targeted supplementation, but this is tailored to individual needs.",
      },
      {
        question: "Can I follow the plan if I have dietary restrictions?",
        answer: "Yes, we customize plans to accommodate various dietary needs and restrictions.",
      },
    ],
    complementaryServices: [
      "Infrared Sauna: To enhance detoxification effects.",
      "Acupuncture: To support digestive health and overall wellness.",
      "Therapeutic Exercises: To complement your nutrition plan for optimal health.",
    ],
    image: "/images/detox program-tablet-computer-diet-plan-and-set-of-healthy-food-with-kitchen-scalevista-415389100.jpeg",
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

  const handleServiceClick = (service: (typeof services)[0]) => {
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
          <div className="md:hidden mb-4 sticky top-0 z-10 bg-white p-4 shadow-md">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (!isMobileMenuOpen) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
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
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={activeService.image || "/placeholder.svg"}
                alt={activeService.name}
                width={800}
                height={800}
                className="w-full object-cover"
                style={{ maxHeight: "600px" }}
              />
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
                <h3 className="text-xl font-semibold mb-2">Who is this for?</h3>
                <p className="text-gray-600 mb-6">{activeService.forWho}</p>
                <h3 className="text-xl font-semibold mb-2">FAQs:</h3>
                <div className="mb-6">
                  {activeService.faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">Complementary Services:</h3>
                <ul className="list-disc list-inside mb-6">
                  {activeService.complementaryServices.map((service, index) => (
                    <li key={index} className="text-gray-600">
                      {service}
                    </li>
                  ))}
                </ul>
                {activeService.relatedBlogPosts && (
                  <>
                    <h3 className="text-xl font-semibold mb-2">Related Blog Posts:</h3>
                    <ul className="list-disc list-inside mb-6">
                      {activeService.relatedBlogPosts.map((post, index) => (
                        <li key={index} className="text-gray-600">
                          <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
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
