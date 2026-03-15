import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const observerRef = useRef(null);

  // Detectar si estamos en CEEP
  const isCEEP = location.pathname.includes("/ceep");

  // Callback para manejar intersección (fuera del effect)
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Usar requestAnimationFrame para evitar setState síncrono
        requestAnimationFrame(() => {
          setActiveSection(entry.target.id);
        });
      }
    });
  }, []);

  // Intersection Observer para detectar secciones activas
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = [
      "inicio",
      "nosotros",
      "modalidades",
      "instalaciones",
      "contacto",
    ];

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    });

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [location.pathname, handleIntersection]);

  // Manejar scroll pendiente después de navegación
  useEffect(() => {
    if (!pendingScroll || location.pathname !== "/") return;

    const timer = setTimeout(() => {
      const element = document.querySelector(pendingScroll);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(pendingScroll.replace("#", ""));
      }
      setPendingScroll(null);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio", type: "hash", sectionId: "inicio" },
    {
      name: "Nosotros",
      href: "#nosotros",
      type: "hash",
      sectionId: "nosotros",
    },
    {
      name: "Modalidades",
      href: "#modalidades",
      type: "hash",
      sectionId: "modalidades",
    },
    {
      name: "Instalaciones",
      href: "#instalaciones",
      type: "hash",
      sectionId: "instalaciones",
    },
    { name: "CEEP", href: "/ceep", type: "route", sectionId: null },
    {
      name: "Contacto",
      href: "#contacto",
      type: "hash",
      sectionId: "contacto",
    },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.type === "hash") {
      if (location.pathname !== "/") {
        setPendingScroll(link.href);
        navigate("/");
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(link.sectionId);
        }
      }
    } else {
      navigate(link.href);
    }
  };

  // Función para determinar si un link está activo
  const isLinkActive = (link) => {
    if (link.type === "route") {
      return (
        location.pathname === link.href || (link.href === "/ceep" && isCEEP)
      );
    }
    if (location.pathname !== "/") return false;
    return activeSection === link.sectionId;
  };

  // Colores según contexto
  const getActiveColor = () => (isCEEP ? "text-[#c9a227]" : "text-[#6B7B5F]");
  const getInactiveColor = () => "text-white hover:text-[#6B7B5F]";
  const getMobileActiveBg = () =>
    isCEEP
      ? "bg-[#c9a227]/20 text-[#c9a227]"
      : "bg-[#6B7B5F]/20 text-[#6B7B5F]";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? isCEEP
            ? "bg-[#1a365d] shadow-lg py-2"
            : "bg-[#5D1A1A] shadow-lg py-2"
          : isCEEP
            ? "bg-[#1a365d]/95 py-3 md:py-4"
            : "bg-[#5D1A1A]/95 py-3 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 overflow-hidden rounded-full bg-white">
              <img
                src="/PEBOSE-logo.png"
                alt="Logo PEBOSE"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg md:text-xl tracking-wider">
                PEBOSE
              </h1>
              <p
                className={`text-[10px] md:text-xs ${isCEEP ? "text-[#c9a227]" : "text-[#6B7B5F]"}`}
              >
                {isCEEP
                  ? "Centro de Estudios Especializados"
                  : "Centro Bilingüe"}
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative transition-colors duration-200 text-sm xl:text-base font-medium uppercase tracking-wide ${
                    active ? getActiveColor() : getInactiveColor()
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                        isCEEP ? "bg-[#c9a227]" : "bg-[#6B7B5F]"
                      }`}
                    />
                  )}
                </button>
              );
            })}
            <button
              className={`px-4 xl:px-6 py-2 rounded-full transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap ${
                isCEEP
                  ? "bg-[#c9a227] text-[#1a365d] hover:bg-[#b8941f]"
                  : "bg-[#6B7B5F] text-white hover:bg-[#5a6a4f]"
              }`}
            >
              Admisión 2025
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <a
              href="tel:+240 222 505 012"
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
                isCEEP ? "bg-[#c9a227]" : "bg-[#6B7B5F]"
              }`}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`lg:hidden fixed inset-0 top-[60px] md:top-[72px] z-40 overflow-y-auto ${
            isCEEP ? "bg-[#1a365d]" : "bg-[#5D1A1A]"
          }`}
        >
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`block w-full text-left py-4 text-lg font-medium border-b border-white/10 transition-all ${
                    active
                      ? getMobileActiveBg()
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {link.name}
                    {active && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCEEP ? "bg-[#c9a227]" : "bg-[#6B7B5F]"
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
            <div className="pt-6">
              <button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                  isCEEP
                    ? "bg-[#c9a227] text-[#1a365d] hover:bg-[#b8941f]"
                    : "bg-[#6B7B5F] text-white hover:bg-[#5a6a4f]"
                }`}
              >
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
