import { Plane, Ship, Package, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { HEADER_HEIGHT } from './Header';

// Get base path for asset references (GitHub Pages compatible)
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace(/\/+/g, '/');
};

// Smooth scroll utility
const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export default function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (path: string, hash?: string) => {
    if (hash) {
      navigate({ to: path }).then(() => {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - HEADER_HEIGHT;
            smoothScrollTo(offsetPosition, 800);
          }
        }, 100);
      });
    } else {
      navigate({ to: path }).then(() => {
        smoothScrollTo(0, 600);
      });
    }
  };

  return (
    <footer className="bg-[#061426] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={getAssetPath('assets/logo2-1.png')}
              alt="DP Globals" 
              className="h-16 w-auto object-contain mb-4 brightness-0 invert" 
              loading="lazy"
            />
            <h3 className="text-xl font-bold">D P GLOBAL</h3>
            <p className="text-sm font-semibold text-blue-300">
              Navigating Tomorrow's Supply Chain, Today.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Delivering excellence in global logistics and supply chain management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-300">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick('/')}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block gpu-accelerated"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/', 'about')}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block gpu-accelerated"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/media-press')}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block gpu-accelerated"
                >
                  Media & Press
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/', 'contact')}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block gpu-accelerated"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a 
                  href="#careers" 
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block gpu-accelerated"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-300">Core Services</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                <Plane className="h-4 w-4 text-blue-400" />
                <span>Air Freight</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                <Ship className="h-4 w-4 text-blue-400" />
                <span>Ocean Freight</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                <Package className="h-4 w-4 text-blue-400" />
                <span>Project Cargo</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span>Supply Chain Consulting</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-300">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">Address:</p>
                <p className="leading-relaxed">
                  FLAT NO. 123, 2nd FLOOR<br />
                  New Four Storey, Vishal Enclave<br />
                  Tagore Garden Extn.<br />
                  New Delhi-110027
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Phone:</p>
                <p>+91 9999061995</p>
                <p>+91 9891711626</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email:</p>
                <a 
                  href="mailto:vijay.shukla@dpglobal.co.in" 
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  vijay.shukla@dpglobal.co.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2025. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse-slow" /> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
