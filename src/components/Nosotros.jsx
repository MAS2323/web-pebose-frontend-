import { Target, Eye, Heart, Award, Users, BookOpen } from "lucide-react";

const Nosotros = () => {
  const valores = [
    {
      icon: Heart,
      title: "Responsabilidad",
      desc: "Compromiso con la educación de calidad",
    },
    {
      icon: Award,
      title: "Excelencia",
      desc: "Búsqueda constante de mejora continua",
    },
    {
      icon: Target,
      title: "Integridad",
      desc: "Formación ética y valores sólidos",
    },
    {
      icon: Users,
      title: "Innovación",
      desc: "Adaptación a nuevas metodologías",
    },
  ];

  return (
    <section id="nosotros" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Imagen/Ilustración - Responsive */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl mx-auto max-w-md lg:max-w-none">
              <div className="aspect-square bg-gradient-to-br from-[#5D1A1A] to-[#8B2635] flex items-center justify-center p-8 md:p-12">
                <div className="text-center text-white">
                  <div className="w-24 h-24 md:w-32 mx-auto mb-4 md:mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-4xl md:text-6xl font-bold">P</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                    PEBOSE
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    2014 - 2024
                  </p>
                  <p className="mt-3 md:mt-4 text-white/60 text-xs md:text-sm">
                    10 años formando el futuro
                  </p>
                </div>
              </div>
            </div>

            {/* Badge flotante - Responsive */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#6B7B5F] text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
              <div className="text-2xl md:text-3xl font-bold">10+</div>
              <div className="text-xs md:text-sm opacity-90">
                Años de
                <br />
                trayectoria
              </div>
            </div>
          </div>

          {/* Contenido - Responsive */}
          <div className="order-1 lg:order-2">
            <span className="text-[#6B7B5F] font-semibold text-xs md:text-sm uppercase tracking-wider">
              Quiénes Somos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5D1A1A] mt-2 md:mt-3 mb-4 md:mb-6">
              Formando Líderes desde 2014
            </h2>

            <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
              <strong className="text-[#5D1A1A]">PEBOSE</strong> es un centro
              educativo comprometido con la excelencia académica y la formación
              integral de nuestros estudiantes. Desde nuestra fundación en 2014,
              hemos trabajado para crear un ambiente de aprendizaje innovador,
              inclusivo y centrado en el desarrollo de habilidades para el siglo
              XXI.
            </p>

            <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
              Nuestro enfoque pedagógico combina métodos tradicionales con
              tecnología educativa de vanguardia, siempre manteniendo los
              valores éticos y morales como base fundamental de la educación.
            </p>

            {/* Misión y Visión - Stack en móvil, grid en tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 border-[#5D1A1A]">
                <h4 className="font-bold text-[#5D1A1A] text-base md:text-lg mb-2 flex items-center">
                  <Target className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />{" "}
                  Misión
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Brindar una educación integral de calidad que forme personas
                  íntegras, críticas y responsables con su entorno.
                </p>
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 border-[#6B7B5F]">
                <h4 className="font-bold text-[#5D1A1A] text-base md:text-lg mb-2 flex items-center">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />{" "}
                  Visión
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Ser reconocidos como líderes en educación innovadora, formando
                  generaciones que transformen positivamente la sociedad.
                </p>
              </div>
            </div>

            {/* Valores - Grid responsive */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {valores.map((valor, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#5D1A1A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <valor.icon className="w-4 h-4 md:w-5 md:h-5 text-[#5D1A1A]" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-[#5D1A1A] text-xs md:text-sm truncate">
                      {valor.title}
                    </h5>
                    <p className="text-gray-500 text-[10px] md:text-xs mt-0.5 leading-tight">
                      {valor.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
