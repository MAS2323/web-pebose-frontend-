import {
  GraduationCap,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    institucion: [
      { name: "Nosotros", href: "#nosotros" },
      { name: "Historia", href: "#" },
      { name: "Directorio", href: "#" },
      { name: "Transparencia", href: "#" },
    ],
    oferta: [
      { name: "Guardería", href: "#modalidades" },
      { name: "Preescolar", href: "#modalidades" },
      { name: "Primaria", href: "#modalidades" },
      { name: "Secundaria", href: "#modalidades" },
      { name: "Formación Profesional", href: "#modalidades" },
    ],
    servicios: [
      { name: "Admisiones", href: "#" },
      { name: "Becas", href: "#" },
      { name: "Transporte", href: "#" },
      { name: "Cafetería", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-[#3d1212] text-white pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-[#5D1A1A]" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-wider text-white">
                  PEBOSE
                </h3>
                <p className="text-[#6B7B5F] text-xs md:text-sm">
                  Centro Educativo
                </p>
              </div>
            </div>
            <p className="text-white/90 mb-4 md:mb-6 leading-relaxed text-sm md:text-base max-w-sm">
              Formando líderes íntegros desde 2014. Comprometidos con la
              excelencia académica y la educación integral de nuestros
              estudiantes.
            </p>

            {/* Contacto rápido */}
            <div className="space-y-2 mb-6">
              <a
                href="tel:+521234567890"
                className="flex items-center space-x-2 text-white hover:text-[#6B7B5F] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+52 (XXX) XXX-XXXX</span>
              </a>
              <a
                href="mailto:contacto@pebose.edu"
                className="flex items-center space-x-2 text-white hover:text-[#6B7B5F] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>contacto@pebose.edu</span>
              </a>
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#6B7B5F] transition-colors"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links - AHORA CON TEXTO BLANCO VISIBLE */}
          <div>
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-[#6B7B5F]">
              Institución
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.institucion.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-[#6B7B5F] transition-colors text-sm md:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-[#6B7B5F]">
              Oferta Educativa
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.oferta.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-[#6B7B5F] transition-colors text-sm md:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-[#6B7B5F]">
              Servicios
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-[#6B7B5F] transition-colors text-sm md:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom - CON POWERED BY CENTRADO */}
        <div className="border-t border-white/20 pt-6 md:pt-8">
          {/* Primera fila: Copyright y links legales */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
            <p className="text-white text-xs md:text-sm text-center md:text-left">
              © {currentYear} PEBOSE Centro Educativo. Todos los derechos
              reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <a
                href="#"
                className="text-white hover:text-[#6B7B5F] transition-colors"
              >
                Aviso de Privacidad
              </a>
              <a
                href="#"
                className="text-white hover:text-[#6B7B5F] transition-colors"
              >
                Términos de Uso
              </a>
              <a
                href="#"
                className="text-white hover:text-[#6B7B5F] transition-colors"
              >
                Mapa del Sitio
              </a>
            </div>
          </div>

          {/* Segunda fila: Powered by - CENTRADO */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-[#6B7B5F] text-xs md:text-sm">
              Powered by{" "}
              <a
                href="https://tecnologias-mas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7B5F] hover:text-white transition-colors font-semibold"
              >
                Tecnologías Mas
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
