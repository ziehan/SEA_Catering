"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const profileRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(profileRef, () => setIsProfileOpen(false));

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    ...(session?.user?.role !== "admin"
      ? [{ href: "/subscription", label: "Subscription" }]
      : []),
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
        <nav className="hidden md:flex justify-center items-center gap-1 p-1 border border-black/10 rounded-full bg-white/60 backdrop-blur-lg shadow-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pl-2">
            {status === "loading" ? (
              <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : status === "authenticated" ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Hi, {session.user?.name?.split(" ")[0]}
                  {session.user.role === "admin" && (
                    <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      ADMIN
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100"
                    >
                      <div className="py-1">
                        {session.user.role === "admin" ? (
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        ) : (
                          <Link
                            href="/auth/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <User className="w-4 h-4" />
                            View Profile
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            signOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
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
                      className={`text-2xl font-semibold transition-colors duration-300 ${
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

              <motion.div
                variants={menuItemVariants}
                className="mt-6 border-t border-white/20 w-full max-w-[200px] pt-8 flex flex-col items-center gap-4"
              >
                {status === "authenticated" ? (
                  <>
                    {session.user.role === "admin" ? (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 text-white text-xl font-semibold"
                      >
                        <LayoutDashboard className="w-6 h-6" />
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/auth/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 text-white text-xl font-semibold"
                      >
                        <UserCircle className="w-6 h-6" />
                        Hi, {session.user?.name?.split(" ")[0]}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-lg"
                    >
                      <LogOut />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-emerald-500 text-white font-bold text-lg"
                  >
                    <LogIn />
                    Login
                  </Link>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
