import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Modalidades", href: "#modalidades" },
    { name: "Instalaciones", href: "#instalaciones" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#5D1A1A] shadow-lg py-2"
          : "bg-[#5D1A1A]/95 py-3 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Responsive */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Logo PEBOSE - Imagen */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 overflow-hidden rounded-full bg-black-200">
              <img
                src="/PEBOSE-logo.png"
                alt="Logo Centro Bilingüe PEBOSE"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg md:text-xl tracking-wider">
                PEBOSE
              </h1>
              <p className="text-[#6B7B5F] text-[10px] md:text-xs">
                Centro Bilingüe
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#6B7B5F] transition-colors duration-200 text-sm xl:text-base font-medium uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#6B7B5F] text-white px-4 xl:px-6 py-2 rounded-full hover:bg-[#5a6a4f] transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap">
              Admisión 2025
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <a
              href="tel:+521234567890"
              className="w-10 h-10 bg-[#6B7B5F] rounded-full flex items-center justify-center text-white hover:bg-[#5a6a4f] transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu - Full screen overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] md:top-[72px] bg-[#5D1A1A] z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-white hover:bg-white/10 py-4 text-lg font-medium border-b border-white/10 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6">
              <button className="w-full bg-[#6B7B5F] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#5a6a4f] transition-colors">
                Admisión 2025
              </button>
            </div>

            {/* Contact info en móvil */}
            <div className="pt-8 text-center">
              <p className="text-white/60 text-sm mb-2">¿Tienes preguntas?</p>
              <a
                href="tel:+521234567890"
                className="text-white text-xl font-bold hover:text-[#6B7B5F] transition-colors"
              >
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
