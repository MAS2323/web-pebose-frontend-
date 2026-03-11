import {
  ArrowRight,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stats = [
    { number: "10+", label: "Años de Experiencia" },
    { number: "2000+", label: "Estudiantes Formados" },
    { number: "50+", label: "Docentes Calificados" },
    { number: "95%", label: "Satisfacción" },
  ];

  // Imágenes del centro educativo - Reemplaza con tus URLs
  const slides = [
    {
      image: "/images/aula-moderna.jpg",
      alt: "Aula moderna del Centro PEBOSE",
    },
    {
      image: "/images/estudiantes.jpg",
      alt: "Estudiantes en actividades",
    },
    {
      image: "/images/instalaciones.jpg",
      alt: "Instalaciones del centro",
    },
    {
      image: "/images/eventos.jpg",
      alt: "Eventos escolares",
    },
  ];

  // Auto-play cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Navegación manual
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background para MÓVIL (gradiente original) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5D1A1A] via-[#5D1A1A] to-[#3d1212] lg:hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      {/* Background para DESKTOP (slider de imágenes) */}
      <div className="hidden lg:block absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay oscuro para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D1A1A]/90 via-[#5D1A1A]/70 to-[#5D1A1A]/50" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Patrón decorativo sutil */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      {/* Círculos decorativos - Solo visibles en móvil/tablet */}
      <div className="absolute top-20 right-0 w-48 h-48 md:w-72 md:h-72 bg-[#6B7B5F]/20 rounded-full blur-3xl lg:hidden" />
      <div className="absolute bottom-20 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#6B7B5F]/10 rounded-full blur-3xl lg:hidden" />

      {/* Controles del slider - Solo desktop */}
      <div className="hidden lg:block absolute inset-0 z-5">
        {/* Flechas de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores de slide */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[#6B7B5F] w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 h-1 bg-[#6B7B5F]/30 w-full">
          <div
            className="h-full bg-[#6B7B5F] transition-all duration-500 ease-linear"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8 border border-white/20">
            <span className="w-2 h-2 bg-[#6B7B5F] rounded-full animate-pulse" />
            <span className="text-white/90 text-xs md:text-sm font-medium">
              Desde 2014 formando líderes
            </span>
          </div>

          {/* Título - Responsive */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            Educación de <span className="text-[#6B7B5F]">Excelencia</span>
            <br className="hidden sm:block" />
            <span className="block mt-2">para el Futuro</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-md">
            Formamos niños y jóvenes íntegros con valores sólidos, pensamiento
            crítico y habilidades para la vida.
          </p>

          {/* Botones - Stack en móvil, row en desktop */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button className="group w-full sm:w-auto bg-[#6B7B5F] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#5a6a4f] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <span>Conoce Nuestras Modalidades</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group flex items-center justify-center space-x-2 sm:space-x-3 text-white hover:text-[#6B7B5F] transition-colors w-full sm:w-auto py-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/30 group-hover:border-[#6B7B5F] flex items-center justify-center transition-colors flex-shrink-0 backdrop-blur-sm">
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
              </div>
              <span className="font-medium text-sm md:text-base">
                Ver Video Institucional
              </span>
            </button>
          </div>

          {/* Stats - Grid responsive */}
          <div className="mt-12 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6B7B5F] mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - Solo en desktop */}
      <div className="hidden md:block absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
