"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/subscription", label: "Subscription" },
    { href: "/contact", label: "Contact" },
  ];

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className="fixed top-3 left-0 w-full flex justify-center z-50 px-4">
        <div>
          <nav className="hidden md:flex justify-center items-center gap-1 p-1 border border-black/10 rounded-full bg-white/50 backdrop-blur-lg shadow-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Login
            </Link>
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
            className="md:hidden fixed inset-0 bg-gray-900/80 backdrop-blur-lg flex flex-col items-center justify-center z-40"
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
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.label} variants={menuItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-semibold transition-colors duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/60 hover:text-white"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 px-6 py-3 rounded-full bg-emerald-500 text-white font-bold text-lg"
                >
                  Login
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
