"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "./", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/subscription", label: "Subscription" },
    { href: "/contact", label: "Contact" },
  ];

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className="fixed top-3 left-0 w-full flex justify-center z-50 px-4">
        <div>
          <nav className="hidden md:flex justify-center items-center gap-1 p-0.5 border border-black/50 rounded-full bg-white/50 backdrop-blur">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-item">
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="nav-item bg-black text-white hover:bg-black/70 hover:text-white/70"
            >
              Login
            </a>
          </nav>

          {!isMenuOpen && (
            <div className="md:hidden flex justify-end fixed top-3 right-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-xl bg-white/40 border border-white/50 mt-3.5 mr-0.75 backdrop-blur-xl"
              >
                <Menu className="h-6 w-6 text-black" />
              </button>
            </div>
          )}
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-rose-900/75 backdrop-blur-lg flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-4 p-2"
            >
              <X className="h-8 w-8 text-white" />
            </button>
            <motion.nav
              className="flex flex-col items-center gap-6"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={menuItemVariants}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-semibold text-white/80 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#"
                variants={menuItemVariants}
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-6 py-3 rounded-full bg-white text-gray-900 font-bold text-lg"
              >
                Login
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
