"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { FaBars, FaTimes, FaCalendar } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/plans", label: "Plans" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-sm shadow-md" : "bg-white/90 backdrop-blur-sm shadow-md"}`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className={`text-xl font-bold transition-colors ${isScrolled ? "text-gray-900" : "text-gray-900"}`}>
          Natural Chiropractic Solutions
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className={`transition-colors ${isScrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.schedulicity.com/scheduling/NCST6P"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isScrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <FaCalendar size={16} />
              Book Now
            </a>
          </div>
          <button onClick={toggleMenu} className={`md:hidden focus:outline-none transition-colors ${isScrolled ? "text-gray-800" : "text-white"}`}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg"
            >
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className="block py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg" onClick={toggleMenu}>
                  {item.label}
                </Link>
              ))}
              <a
                href="https://www.schedulicity.com/scheduling/NCST6P"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 px-4 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                onClick={toggleMenu}
              >
                Book Appointment
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
