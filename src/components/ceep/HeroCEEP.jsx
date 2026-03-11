import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  Users,
  Building2,
} from "lucide-react";

const HeroCEEP = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/ceep/aula-enfermeria.jpg",
      title: "Formación Profesional de Excelencia",
      subtitle: "20 especialidades para tu futuro laboral",
    },
    {
      image: "/images/ceep/laboratorio.jpg",
      title: "Instalaciones Modernas",
      subtitle: "Equipamiento de última generación",
    },
    {
      image: "/images/ceep/estudiantes-ceep.jpg",
      title: "Práctica desde el Primer Día",
      subtitle: "Aprendizaje hands-on con profesionales",
    },
    {
      image: "/images/ceep/graduacion.jpg",
      title: "Titulación Oficial",
      subtitle: "Certificados reconocidos nacionalmente",
    },
  ];

  const features = [
    { icon: Award, label: "Titulación Oficial", value: "Certificada" },
    { icon: Clock, label: "Duración", value: "6-24 meses" },
    { icon: Users, label: "Estudiantes", value: "500+" },
    { icon: Building2, label: "Especialidades", value: "20" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Slider Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente institucional */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/95 via-[#1a365d]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#c9a227]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#c9a227]/30">
            <Award className="w-5 h-5 text-[#c9a227]" />
            <span className="text-[#c9a227] font-semibold text-sm uppercase tracking-wider">
              Centro de Estudios Especializados
            </span>
          </div>

          {/* Título dinámico según slide */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            {slides[currentSlide].subtitle}
          </p>

          <p className="text-white/80 text-lg mb-10 max-w-2xl leading-relaxed">
            El CEEP del Centro Bilingüe PEBOSE ofrece formación técnica
            profesional en 20 especialidades de alta demanda laboral. Programas
            prácticos, docentes especializados e instalaciones equipadas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#especialidades"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a227] text-[#1a365d] font-bold rounded-full hover:bg-[#b8941f] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ver Especialidades
            </a>
            <a
              href="#contacto-ceep"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Solicitar Información
            </a>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center"
            >
              <feature.icon className="w-8 h-8 text-[#c9a227] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {feature.value}
              </div>
              <div className="text-white/70 text-sm">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles del slider */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-[#c9a227]"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCEEP;
