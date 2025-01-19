import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen py-12 pt-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Meet Dr. Daniel M. Dziekan, DC, CCSP</h1>
        <h2 className="text-2xl text-center mb-12 text-gray-600">
          Certified Chiropractic Sports Physician & Mei Zen Cosmetic Acupuncture Practitioner
        </h2>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <Image
              src="/dr-dziekan.jpg"
              alt="Dr. Daniel M. Dziekan"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Dr. Dziekan's Credentials</h3>
            <ul className="list-disc list-inside mb-6">
              <li>Doctor of Chiropractic</li>
              <li>Certified Chiropractic Sports Physician (CCSP)</li>
              <li>Mei Zen Cosmetic Acupuncture Practitioner</li>
              <li>Advanced Training in Sports Medicine</li>
              <li>Expertise in Holistic Wellness</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Dr. Dziekan brings a wealth of experience and a modern approach to chiropractic care and holistic wellness. His unique combination of skills allows him to address both health and aesthetic concerns, providing comprehensive care for his patients.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-12">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-700">
            Our mission is to provide a modern, personalized approach to chiropractic care and holistic wellness, combining cutting-edge technology with time-tested methods. We are committed to helping our patients achieve optimal health, beauty, and vitality through comprehensive, individualized treatment plans.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Clinic</h3>
          <p className="text-gray-700 mb-6">
            Located in the heart of Chicago at 2534 N. Halsted St., our state-of-the-art clinic offers a luxurious and welcoming environment for all our patients. We combine the latest in chiropractic technology with a serene atmosphere to ensure your visit is both effective and relaxing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Image
              src="/clinic-exterior.jpg"
              alt="Clinic Exterior"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/clinic-interior.jpg"
              alt="Clinic Interior"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

