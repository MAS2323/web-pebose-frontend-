import { Baby, Palette, BookOpen, School, Briefcase } from "lucide-react";

const Modalidades = () => {
  const modalidades = [
    {
      icon: Baby,
      title: "Guardería de Infantes",
      age: "6 meses - 2 años",
      description:
        "Atención personalizada con estimulación temprana, nutrición balanceada y un ambiente seguro para el desarrollo integral de tu bebé.",
      color: "from-pink-500 to-rose-500",
      features: [
        "Estimulación temprana",
        "Nutrición especializada",
        "Área de siesta",
        "Psicomotricidad",
      ],
    },
    {
      icon: Palette,
      title: "Preescolar",
      age: "3 - 5 años",
      description:
        "Aprendizaje lúdico que desarrolla habilidades sociales, emocionales y cognitivas mediante el juego y la exploración.",
      color: "from-amber-400 to-orange-500",
      features: [
        "Aprendizaje lúdico",
        "Desarrollo emocional",
        "Inglés inicial",
        "Arte y música",
      ],
    },
    {
      icon: BookOpen,
      title: "Primaria",
      age: "6 - 11 años",
      description:
        "Formación académica sólida con enfoque en lecto-escritura, matemáticas, ciencias y valores éticos fundamentales.",
      color: "from-emerald-400 to-teal-500",
      features: [
        "Pensamiento lógico",
        "Lectura crítica",
        "Tecnología educativa",
        "Deportes",
      ],
    },
    {
      icon: School,
      title: "Secundaria",
      age: "12 - 16 años",
      description:
        "Preparación académica de excelencia con orientación vocacional, habilidades del siglo XXI y formación ciudadana.",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Orientación vocacional",
        "Laboratorios equipados",
        "Clubes académicos",
        "Idiomas avanzados",
      ],
    },
    {
      icon: Briefcase,
      title: "Centro de Formación Profesional",
      age: "Jóvenes y Adultos",
      description:
        "Cursos técnicos y diplomados que preparan para el mundo laboral con certificaciones reconocidas.",
      color: "from-[#5D1A1A] to-[#8B2635]",
      features: [
        "Cursos técnicos",
        "Certificaciones",
        "Prácticas laborales",
        "Bolsa de trabajo",
      ],
    },
  ];

  return (
    <section id="modalidades" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#6B7B5F] font-semibold text-xs md:text-sm uppercase tracking-wider">
            Nuestra Oferta Educativa
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5D1A1A] mt-2 md:mt-3 mb-3 md:mb-4">
            Modalidades Académicas
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 sm:px-0">
            Ofrecemos una educación integral desde la primera infancia hasta la
            formación profesional, adaptada a cada etapa del desarrollo.
          </p>
        </div>

        {/* Grid responsive - 1 col móvil, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {modalidades.map((mod, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 md:hover:-translate-y-2"
            >
              {/* Header con gradiente */}
              <div className={`h-1.5 md:h-2 bg-gradient-to-r ${mod.color}`} />

              <div className="p-5 md:p-8">
                {/* Icono */}
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <mod.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>

                {/* Badge edad */}
                <div className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] md:text-xs font-semibold rounded-full mb-2 md:mb-3">
                  {mod.age}
                </div>

                {/* Título */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#5D1A1A] mb-2 md:mb-3 group-hover:text-[#6B7B5F] transition-colors">
                  {mod.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">
                  {mod.description}
                </p>

                {/* Features - Grid en móvil */}
                <ul className="grid grid-cols-2 gap-2 mb-5 md:mb-6">
                  {mod.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs md:text-sm text-gray-500"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${mod.color} mr-2 flex-shrink-0`}
                      />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Botón */}
                <button className="w-full py-2.5 md:py-3 border-2 border-[#5D1A1A] text-[#5D1A1A] rounded-lg md:rounded-xl font-semibold text-sm hover:bg-[#5D1A1A] hover:text-white transition-all duration-300">
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modalidades;
