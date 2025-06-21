"use client";

import {
  Utensils,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-rose-950 via-slate-900 to-gray-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-teal-500 to-rose-500"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1 space-y-6">
            <div className="group">
              <a
                href="#"
                className="inline-flex items-center gap-3 transition-transform duration-300 group-hover:scale-105"
              >
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-shadow duration-300">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-serif bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  SEA Catering
                </span>
              </a>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Healthy meals delivered fresh to your doorstep across Indonesia.
              <span className="text-emerald-400 font-medium">
                {" "}
                Eat well, live well.
              </span>
            </p>

            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group p-2.5 bg-slate-800 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 
                           rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <Icon className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Our Menu", href: "/menu" },
                { name: "Subscription Plans", href: "/subscription" },
                { name: "About Us", href: "/about" },
              ].map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 
                             hover:translate-x-1 transform inline-block text-sm group"
                  >
                    <span className="group-hover:underline decoration-emerald-400 decoration-2 underline-offset-4">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-1.5 bg-slate-800 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-slate-300 text-sm leading-relaxed">
                  Malang, Jawa Timur
                  <br />
                  Indonesia
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-1.5 bg-slate-800 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <a href="tel:+628123456789" className="foot-item">
                  +62 812-3456-789
                  <div className="text-xs text-slate-400">Brian</div>
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-1.5 bg-slate-800 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-emerald-400" />
                </div>
                <a href="mailto:contact@seacatering.com" className="foot-item">
                  contact@seacatering.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()}
            <span className="text-emerald-400 font-medium mx-1">
              SEA Catering
            </span>
            - Crafted with ❤️ for healthy living
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl"></div>
    </footer>
  );
};
