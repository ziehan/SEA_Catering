import { Utensils, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-rose-800 text-green-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-2 mb-4">
              <Utensils className="h-8 w-8 text-green-700" />
              <span className="text-2xl font-serif text-white">
                SEA Catering
              </span>
            </a>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="foot-item">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="foot-item">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="foot-item">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="foot-item">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="foot-item">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="foot-item">
                  Subscription
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="foot-item">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="foot-item">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="foot-item">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Malang, Jawa Timur, Indonesia</li>
              <li>
                <a href="mailto:contact@seacatering.com" className="foot-item">
                  contact@seacatering.com
                </a>
              </li>
              <li>
                <a href="tel:+621234567890" className="foot-item">
                  +62 123-4567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-3 border-green-500 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} SEA Catering. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
