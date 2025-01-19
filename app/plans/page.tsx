'use client'

import { motion } from 'motion/react'
import { FaCheck } from 'react-icons/fa'
import Link from 'next/link'

const plans = [
  {
    name: 'Essential Care',
    price: '149',
    description: 'Perfect for those starting their wellness journey',
    features: [
      'Initial Consultation & Assessment',
      'Chiropractic Adjustment',
      'Basic Treatment Plan',
      'Exercise Recommendations',
      'Posture Analysis'
    ],
    popular: false
  },
  {
    name: 'Comprehensive Wellness',
    price: '299',
    description: 'Our most popular integrated treatment approach',
    features: [
      'All Essential Care Features',
      'Acupuncture Session',
      'Cupping Therapy',
      'Infrared Sauna Session',
      'Personalized Wellness Plan',
      'Follow-up Consultation'
    ],
    popular: true
  },
  {
    name: 'Premium Rejuvenation',
    price: '499',
    description: 'Complete wellness and beauty transformation',
    features: [
      'All Comprehensive Features',
      'Mei Zen Cosmetic Acupuncture',
      'Red Light Therapy',
      'Custom Herbal Consultation',
      'Priority Scheduling',
      'Monthly Wellness Review'
    ],
    popular: false
  }
]

const membershipPlans = [
  {
    name: 'Monthly Wellness',
    price: '199/month',
    features: [
      '2 Chiropractic Adjustments',
      '1 Acupuncture Session',
      '2 Infrared Sauna Sessions',
      'Member Pricing on Additional Services',
      'Flexible Scheduling'
    ]
  },
  {
    name: 'Beauty & Wellness',
    price: '299/month',
    features: [
      '2 Cosmetic Acupuncture Sessions',
      '2 Chiropractic Adjustments',
      '4 Infrared Sauna Sessions',
      'Unlimited Red Light Therapy',
      'Priority Booking'
    ]
  }
]

export default function Plans() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Treatment Plans & Memberships
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your wellness journey. All plans include personalized care and attention to your specific needs.
          </motion.p>
        </div>

        {/* Treatment Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
              } shadow-xl p-8`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-gray-600 mb-4">{plan.description}</div>
              <div className="text-3xl font-bold mb-6">${plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.schedulicity.com/scheduling/NCST6P"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 px-6 rounded-full transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        {/* Membership Plans */}
        <div className="mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Monthly Membership Options
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">${plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.schedulicity.com/scheduling/NCST6P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 px-6 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-colors"
                >
                  Start Membership
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Our team is here to help you choose the perfect plan for your needs.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="tel:7735296530"
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Call Us
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

