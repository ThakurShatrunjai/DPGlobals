import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate, useRouterState } from '@tanstack/react-router';

// Header height constant for scroll offset - matches h-24 (96px)
export const HEADER_HEIGHT = 96;

// Get base path for asset references (GitHub Pages compatible)
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace(/\/+/g, '/');
};

// Smooth scroll utility with requestAnimationFrame optimization
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

export default function Header() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentPath = routerState.location.pathname;

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          setIsScrolled(currentScrollY > 20);
          lastScrollY = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Handle hash navigation on page load and route changes
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const timeoutId = setTimeout(() => {
        scrollToSection(hash);
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [currentPath]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/', hash: 'about' },
    { label: 'Media & Press', path: '/media-press' },
    { label: 'Contact', path: '/', hash: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - HEADER_HEIGHT;
      smoothScrollTo(offsetPosition, 800);
    }
  };

  const handleNavClick = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    
    if (hash && currentPath === path) {
      scrollToSection(hash);
      window.history.replaceState(null, '', `#${hash}`);
    } else if (hash) {
      navigate({ to: path }).then(() => {
        window.location.hash = hash;
        setTimeout(() => {
          scrollToSection(hash);
        }, 300);
      });
    } else {
      navigate({ to: path }).then(() => {
        smoothScrollTo(0, 600);
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 shadow-md gpu-accelerated ${
        isScrolled 
          ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-sm supports-[backdrop-filter]:bg-white/98 dark:supports-[backdrop-filter]:bg-slate-900/98 border-gray-200/80 dark:border-slate-700/80' 
          : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-slate-900/95 border-white/20 dark:border-slate-700/20'
      }`}
    >
      <div className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
        <button 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg gpu-accelerated"
          aria-label="DP Globals Home"
        >
          <img 
            src={getAssetPath('assets/logo2-1.png')}
            alt="DP Globals - Logistically Ahead" 
            className="h-12 md:h-16 w-auto object-contain transition-all duration-300 gpu-accelerated" 
            loading="eager"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path, item.hash)}
              className="nav-link relative text-sm font-semibold text-gray-800 dark:text-gray-100 transition-all duration-300 ease-out hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 gpu-accelerated"
              aria-label={item.label}
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out group-hover:w-full gpu-accelerated"></span>
            </button>
          ))}
          <Button 
            onClick={() => navigate({ to: '/admin' })}
            variant="outline" 
            size="sm"
            className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-md border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 gpu-accelerated"
          >
            Admin
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 gpu-accelerated"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white dark:bg-slate-900">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path, item.hash)}
                  className="text-left text-base font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 py-2 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 gpu-accelerated"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate({ to: '/admin' });
                }}
                variant="outline" 
                className="mt-4 transition-all duration-300 hover:scale-105 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 gpu-accelerated"
              >
                Admin Panel
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
