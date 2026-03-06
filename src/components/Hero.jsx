import { ArrowRight, Play, ChevronDown } from "lucide-react";

const Hero = () => {
  const stats = [
    { number: "10+", label: "Años de Experiencia" },
    { number: "2000+", label: "Estudiantes Formados" },
    { number: "50+", label: "Docentes Calificados" },
    { number: "95%", label: "Satisfacción" },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5D1A1A] via-[#5D1A1A] to-[#3d1212]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      {/* Círculos decorativos - Responsive */}
      <div className="absolute top-20 right-0 w-48 h-48 md:w-72 md:h-72 bg-[#6B7B5F]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#6B7B5F]/10 rounded-full blur-3xl" />

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Educación de <span className="text-[#6B7B5F]">Excelencia</span>
            <br className="hidden sm:block" />
            <span className="block mt-2">para el Futuro</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
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
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/30 group-hover:border-[#6B7B5F] flex items-center justify-center transition-colors flex-shrink-0">
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
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6B7B5F] mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - Solo en desktop */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
