import Link from "next/link";
import { FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Dr. Daniel M. Dziekan</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Certified Chiropractic Sports Physician & Mei Zen Cosmetic Acupuncture Practitioner, providing comprehensive wellness solutions in Chicago.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/chirochicago/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.facebook.com/chirosolutionschicago/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services?service=chiropractic" className="hover:text-white transition-colors">
                  Chiropractic Care
                </Link>
              </li>
              <li>
                <Link href="/services?service=cosmetic-acupuncture" className="hover:text-white transition-colors">
                  Cosmetic Acupuncture
                </Link>
              </li>
              <li>
                <Link href="/services?service=cupping" className="hover:text-white transition-colors">
                  Cupping Therapy
                </Link>
              </li>
              <li>
                <Link href="/services?service=infrared-sauna" className="hover:text-white transition-colors">
                  Infrared Sauna
                </Link>
              </li>
              <li>
                <Link href="/services?service=tcm" className="hover:text-white transition-colors">
                  Traditional Chinese Medicine
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-white transition-colors">
                  Treatment Plans
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <a
                  href="https://www.schedulicity.com/scheduling/NCST6P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <FaCalendar size={16} />
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>
                  2534 N. Halsted St.,
                  <br />
                  Chicago, IL 60614
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="flex-shrink-0" />
                <a href="tel:7735296530" className="hover:text-white transition-colors">
                  (773) 529-6530
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 flex-shrink-0" />
                <a href="mailto:chirosolutionschicago@gmail.com" className="hover:text-white transition-colors break-all">
                  chirosolutionschicago@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-sm">&copy; {currentYear} Dr. Daniel M. Dziekan. All rights reserved.</p>
            <div className="flex gap-4 md:justify-end text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

