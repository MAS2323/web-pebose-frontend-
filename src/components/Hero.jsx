// frontend/src/components/Hero.jsx
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API } from "../config/api";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { number: "10+", label: "Años de Experiencia" },
    { number: "2000+", label: "Estudiantes Formados" },
    { number: "50+", label: "Docentes Calificados" },
    { number: "95%", label: "Satisfacción" },
  ];

  // ✅ Slides de respaldo con placeholders (NO rutas locales)
  const defaultSlides = [
    {
      image:
        "https://res.cloudinary.com/masonewe/image/upload/v1773869845/pebose/hero/hero-1773869844001-ufyy6qtd.jpg",
      alt: "Aula moderna",
    },
    {
      image:
        "https://res.cloudinary.com/masonewe/image/upload/v1773646890/pebose/hero/hero-1773646885438-tjudwar6.jpg",
      alt: "Estudiantes",
    },
    {
      image:
        "https://res.cloudinary.com/masonewe/image/upload/v1773646890/pebose/hero/hero-1773646885438-tjudwar6.jpg",
      alt: "Instalaciones",
    },
    {
      image:
        "https://res.cloudinary.com/masonewe/image/upload/v1773427777/pebose/hero/qeubq7l286fpagsp1hy3.jpg",
      alt: "Eventos",
    },
  ];

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log("🔄 [Hero] Cargando desde:", `${API}/hero/public/slides`);
        const response = await fetch(`${API}/hero/public/slides`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        console.log("✅ [Hero] Respuesta del backend:", result);

        // El backend devuelve: { success: true, count: N,  [...] }
        const slidesData = result.data || result.slides || [];

        console.log("✅ [Hero] Slides cargados:", slidesData.length);

        const formatted = slidesData.map((s) => ({
          image: s.imagen_url,
          alt: s.titulo || "Imagen PEBOSE",
          titulo: s.titulo,
          subtitulo: s.subtitulo,
        }));

        // Usar slides del backend si existen, sino usar defaults
        setSlides(formatted.length > 0 ? formatted : defaultSlides);
      } catch (error) {
        console.error("❌ [Hero] Error cargando slides:", error);
        console.warn("⚠️ Usando slides por defecto");
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-play
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#5D1A1A]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </section>
    );
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background con imágenes */}
      <div className="absolute inset-0">
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
              crossOrigin="anonymous" // ← Agregar esto
              referrerPolicy="no-referrer" // ← Agregar esto
              loading="eager" // ← Cambiar a eager para imágenes críticas
              onError={(e) => {
                // Evitar loop infinito
                if (e.target.dataset.fallback === "true") {
                  console.warn("❌ Fallback también falló para:", slide.image);
                  e.target.style.display = "none";
                  return;
                }

                // Placeholder externo para desarrollo
                const text = encodeURIComponent(slide.alt || "PEBOSE");
                e.target.src = `https://placehold.co/1920x1080/5D1A1A/FFFFFF?text=${text}&font=roboto`;
                e.target.dataset.fallback = "true";

                console.warn(
                  "⚠️ Imagen no encontrada, usando placeholder:",
                  slide.image,
                );
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D1A1A]/90 via-[#5D1A1A]/70 to-[#5D1A1A]/50" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Controles */}
      {slides.length > 1 && (
        <div className="absolute inset-0 z-10 hidden lg:block">
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

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
              />
            ))}
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
          <span className="w-2 h-2 bg-[#6B7B5F] rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">
            Desde 2014 formando líderes
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Educación de <span className="text-[#6B7B5F]">Excelencia</span>
          <br />
          para el Futuro
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-md">
          Formamos niños y jóvenes íntegros con valores sólidos, pensamiento
          crítico y habilidades para la vida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group bg-[#6B7B5F] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5a6a4f] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <span>Conoce Nuestras Modalidades</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group flex items-center gap-3 text-white hover:text-[#6B7B5F] transition-colors">
            <div className="w-14 h-14 rounded-full border-2 border-white/30 group-hover:border-[#6B7B5F] flex items-center justify-center transition-colors backdrop-blur-sm">
              <Play className="w-6 h-6 ml-0.5" />
            </div>
            <span className="font-medium">Ver Video Institucional</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#6B7B5F] mb-1">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
