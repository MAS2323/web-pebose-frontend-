import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Camera } from "lucide-react";

const Instalaciones = () => {
  const [activeTab, setActiveTab] = useState(0);

  const instalaciones = [
    {
      category: "Aulas",
      title: "Aulas Equipadas",
      description:
        "Espacios modernos con tecnología interactiva, aire acondicionado y mobiliario ergonómico diseñado para el confort y aprendizaje.",
    },
    {
      category: "Laboratorios",
      title: "Laboratorios Científicos",
      description:
        "Laboratorios de física, química y biología equipados con material de última generación para experimentación segura.",
    },
    {
      category: "Deportes",
      title: "Áreas Deportivas",
      description:
        "Canchas polideportivas, gimnasio y áreas verdes para el desarrollo físico y recreativo de nuestros estudiantes.",
    },
    {
      category: "Biblioteca",
      title: "Biblioteca Moderna",
      description:
        "Amplio acervo bibliográfico, sala de lectura digital y espacios de estudio colaborativo.",
    },
  ];

  return (
    <section id="instalaciones" className="py-16 md:py-24 bg-[#5D1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <span className="text-[#6B7B5F] font-semibold text-xs md:text-sm uppercase tracking-wider">
            Nuestras Instalaciones
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 md:mt-3 mb-3 md:mb-4">
            Espacios Diseñados para el Aprendizaje
          </h2>
          <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 sm:px-0">
            Contamos con instalaciones modernas y seguras que facilitan el
            desarrollo académico, deportivo y artístico de nuestros estudiantes.
          </p>
        </div>

        {/* Tabs - Scroll horizontal en móvil */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4 sm:px-0 scrollbar-hide">
          {instalaciones.map((inst, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                activeTab === index
                  ? "bg-[#6B7B5F] text-white shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {inst.category}
            </button>
          ))}
        </div>

        {/* Content - Stack en móvil, grid en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Imagen */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-xl relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 md:w-20 mx-auto mb-3 md:mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 md:w-10 md:h-10 text-white/50" />
                  </div>
                  <p className="text-white/50 text-sm md:text-lg">
                    Imagen de {instalaciones[activeTab].title}
                  </p>
                </div>
              </div>

              {/* Overlay navigation - Solo en tablet+ */}
              <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors items-center justify-between px-4 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() =>
                    setActiveTab((prev) =>
                      prev === 0 ? instalaciones.length - 1 : prev - 1,
                    )
                  }
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-[#5D1A1A]" />
                </button>
                <button
                  onClick={() =>
                    setActiveTab((prev) =>
                      prev === instalaciones.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#5D1A1A]" />
                </button>
              </div>
            </div>

            {/* Thumbnails - Scroll horizontal en móvil */}
            <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 justify-start md:justify-center overflow-x-auto pb-2 md:pb-0 px-4 md:px-0">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-12 md:w-20 md:h-16 rounded-lg bg-gray-800 cursor-pointer border-2 transition-all flex-shrink-0 ${
                    i === 0
                      ? "border-[#6B7B5F]"
                      : "border-transparent hover:border-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="text-white order-1 lg:order-2 px-4 sm:px-0">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              {instalaciones[activeTab].title}
            </h3>
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
              {instalaciones[activeTab].description}
            </p>

            <div className="space-y-3 md:space-y-4">
              <h4 className="font-semibold text-[#6B7B5F] uppercase tracking-wider text-xs md:text-sm">
                Características
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {[
                  "Aire acondicionado",
                  "Tecnología SMART",
                  "Mobiliario ergonómico",
                  "Acceso a internet",
                  "Seguridad 24/7",
                  "Mantenimiento constante",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-2 md:space-x-3 text-white/70 text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 bg-[#6B7B5F] rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 md:mt-8 w-full sm:w-auto bg-white text-[#5D1A1A] px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors">
              Agendar Visita Guiada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instalaciones;
