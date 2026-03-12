import { Link } from "react-router-dom";
import {
  Stethoscope,
  FlaskConical,
  Calculator,
  Landmark,
  Users2,
  FileText,
  BookOpen,
  Briefcase,
  Monitor,
  Sparkles,
  GraduationCap,
  Wrench,
  Hammer,
  Zap,
  Flame,
  Scissors,
  Paintbrush,
  ChefHat,
  Pill,
  Globe,
} from "lucide-react";

const EspecialidadesGrid = () => {
  const especialidades = [
    {
      id: 1,
      nombre: "Enfermería",
      icono: Stethoscope,
      categoria: "Salud",
      duracion: "18 meses",
    },
    {
      id: 2,
      nombre: "Laboratorio",
      icono: FlaskConical,
      categoria: "Salud",
      duracion: "12 meses",
    },
    {
      id: 3,
      nombre: "Contabilidad",
      icono: Calculator,
      categoria: "Administración",
      duracion: "12 meses",
    },
    {
      id: 4,
      nombre: "Bancas y Finanzas",
      icono: Landmark,
      categoria: "Administración",
      duracion: "12 meses",
    },
    {
      id: 5,
      nombre: "Recursos Humanos",
      icono: Users2,
      categoria: "Administración",
      duracion: "12 meses",
    },
    {
      id: 6,
      nombre: "Declarante de Aduanas",
      icono: FileText,
      categoria: "Comercio",
      duracion: "18 meses",
    },
    {
      id: 7,
      nombre: "Secretaría",
      icono: BookOpen,
      categoria: "Administración",
      duracion: "6 meses",
    },
    {
      id: 8,
      nombre: "Gestión Empresarial",
      icono: Briefcase,
      categoria: "Administración",
      duracion: "18 meses",
    },
    {
      id: 9,
      nombre: "Informática ADE y Redes",
      icono: Monitor,
      categoria: "Tecnología",
      duracion: "24 meses",
    },
    {
      id: 10,
      nombre: "Belleza y Estética",
      icono: Sparkles,
      categoria: "Servicios",
      duracion: "12 meses",
    },
    {
      id: 11,
      nombre: "Curso Intensivo de Inglés",
      icono: GraduationCap,
      categoria: "Idiomas",
      duracion: "12 meses",
    },
    {
      id: 12,
      nombre: "Fontanería",
      icono: Wrench,
      categoria: "Técnica",
      duracion: "6 meses",
    },
    {
      id: 13,
      nombre: "Carpintería",
      icono: Hammer,
      categoria: "Técnica",
      duracion: "12 meses",
    },
    {
      id: 14,
      nombre: "Electricidad",
      icono: Zap,
      categoria: "Técnica",
      duracion: "12 meses",
    },
    {
      id: 15,
      nombre: "Soldadura",
      icono: Flame,
      categoria: "Técnica",
      duracion: "6 meses",
    },
    {
      id: 16,
      nombre: "Corte, Confección y Diseño",
      icono: Scissors,
      categoria: "Diseño",
      duracion: "18 meses",
    },
    {
      id: 17,
      nombre: "Decoración Interior y Exterior",
      icono: Paintbrush,
      categoria: "Diseño",
      duracion: "12 meses",
    },
    {
      id: 18,
      nombre: "Cocina y Hostelería",
      icono: ChefHat,
      categoria: "Servicios",
      duracion: "12 meses",
    },
    {
      id: 19,
      nombre: "Farmacia",
      icono: Pill,
      categoria: "Salud",
      duracion: "18 meses",
    },
    {
      id: 20,
      nombre: "Curso de Inglés",
      icono: Globe,
      categoria: "Idiomas",
      duracion: "Variable",
    },
  ];

  const categorias = [...new Set(especialidades.map((e) => e.categoria))];

  const getCategoriaColor = (categoria) => {
    const colores = {
      Salud: "bg-rose-100 text-rose-800 border-rose-200",
      Administración: "bg-blue-100 text-blue-800 border-blue-200",
      Comercio: "bg-amber-100 text-amber-800 border-amber-200",
      Tecnología: "bg-purple-100 text-purple-800 border-purple-200",
      Servicios: "bg-pink-100 text-pink-800 border-pink-200",
      Idiomas: "bg-green-100 text-green-800 border-green-200",
      Técnica: "bg-orange-100 text-orange-800 border-orange-200",
      Diseño: "bg-teal-100 text-teal-800 border-teal-200",
    };
    return colores[categoria] || "bg-gray-100 text-gray-800";
  };

  return (
    <section id="especialidades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#1a365d]/10 text-[#1a365d] rounded-full text-sm font-semibold mb-4">
            Oferta Académica
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            20 Especialidades Profesionales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programas diseñados para insertarte rápidamente en el mercado
            laboral con habilidades prácticas y demandadas.
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button className="px-4 py-2 rounded-full bg-[#1a365d] text-white font-medium">
            Todas
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 hover:border-[#1a365d] hover:text-[#1a365d] transition-colors font-medium"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de especialidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {especialidades.map((esp) => (
            <Link
              key={esp.id}
              to={`/ceep/especialidad/${esp.id}`}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#c9a227]/30 hover:-translate-y-1 cursor-pointer block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1a365d] transition-colors duration-300">
                  <esp.icono className="w-7 h-7 text-[#1a365d] group-hover:text-white transition-colors" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoriaColor(esp.categoria)}`}
                >
                  {esp.categoria}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1a365d] transition-colors">
                {esp.nombre}
              </h3>

              <div className="flex items-center text-gray-500 text-sm">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {esp.duracion}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-[#c9a227] font-semibold text-sm group-hover:underline">
                  Ver detalles →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            ¿No sabes qué especialidad elegir? Te ayudamos a decidir según tus
            intereses.
          </p>
          <Link
            to="/ceep#contacto-ceep"
            className="inline-flex items-center px-8 py-4 bg-[#1a365d] text-white font-semibold rounded-full hover:bg-[#152c4d] transition-all duration-300 hover:shadow-lg"
          >
            Asesoramiento Gratuito
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EspecialidadesGrid;
