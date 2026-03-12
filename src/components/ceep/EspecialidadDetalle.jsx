import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Download,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EspecialidadDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Base de datos de especialidades (en producción vendría de API)
  const especialidadesData = {
    1: {
      nombre: "Enfermería",
      categoria: "Salud",
      duracion: "18 meses",
      icono: "Stethoscope",
      descripcion:
        "Formación integral en cuidados de enfermería, preparando técnicos capaces de brindar atención primaria en hospitales, clínicas y centros de salud.",
      imagen: "/images/ceep/enfermeria.jpg",
      modulos: [
        "Anatomía y Fisiología Humana",
        "Fundamentos de Enfermería",
        "Farmacología",
        "Enfermería Clínica",
        "Enfermería Quirúrgica",
        "Pediatría y Geriatría",
        "Primeros Auxilios y Emergencias",
        "Prácticas Hospitalarias",
      ],
      salidaLaboral: [
        "Hospitales públicos y privados",
        "Clínicas médicas",
        "Centros de salud",
        "Hogares geriátricos",
        "Servicios de enfermería domiciliaria",
      ],
      requisitos: [
        "Título de bachiller",
        "Cédula de identidad",
        "Certificado de nacimiento",
        "Fotografía tamaño carnet",
      ],
      horarios: [
        "Lunes a Viernes: 8:00 - 12:00",
        "Lunes a Viernes: 14:00 - 18:00",
        "Sábados: 8:00 - 16:00",
      ],
      precio: "Consultar en administración",
      proximoInicio: "15 de Enero 2025",
    },
    2: {
      nombre: "Laboratorio",
      categoria: "Salud",
      duracion: "12 meses",
      icono: "FlaskConical",
      descripcion:
        "Capacitación en análisis clínicos, manejo de equipos de laboratorio y técnicas de diagnóstico para trabajar en laboratorios médicos.",
      imagen: "/images/ceep/laboratorio.jpg",
      modulos: [
        "Química Básica",
        "Biología Celular",
        "Microbiología",
        "Análisis de Sangre",
        "Análisis de Orina",
        "Parasitología",
        "Bacteriología",
        "Control de Calidad",
      ],
      salidaLaboral: [
        "Laboratorios clínicos",
        "Hospitales",
        "Centros de diagnóstico",
        "Laboratorios de investigación",
      ],
      requisitos: [
        "Título de bachiller",
        "Cédula de identidad",
        "Certificado de nacimiento",
      ],
      horarios: [
        "Lunes a Viernes: 8:00 - 12:00",
        "Lunes a Viernes: 14:00 - 18:00",
      ],
      precio: "Consultar en administración",
      proximoInicio: "15 de Enero 2025",
    },
    3: {
      nombre: "Contabilidad",
      categoria: "Administración",
      duracion: "12 meses",
      icono: "Calculator",
      descripcion:
        "Preparación en registro de operaciones financieras, estados contables y gestión fiscal para empresas.",
      imagen: "/images/ceep/contabilidad.jpg",
      modulos: [
        "Matemática Financiera",
        "Contabilidad Básica",
        "Contabilidad Intermedia",
        "Estados Financieros",
        "Legislación Fiscal",
        "Costos y Presupuestos",
        "Auditoría Básica",
        "Software Contable",
      ],
      salidaLaboral: [
        "Empresas privadas",
        "Despachos contables",
        "Instituciones gubernamentales",
        "Independiente",
      ],
      requisitos: ["Título de bachiller", "Cédula de identidad"],
      horarios: ["Lunes a Viernes: 18:00 - 21:00", "Sábados: 8:00 - 14:00"],
      precio: "Consultar en administración",
      proximoInicio: "20 de Enero 2025",
    },
    // ... Agrega las demás 17 especialidades siguiendo el mismo formato
    11: {
      nombre: "Curso Intensivo de Inglés",
      categoria: "Idiomas",
      duracion: "12 meses",
      icono: "GraduationCap",
      descripcion:
        "Programa acelerado para alcanzar fluidez en inglés, enfocado en comunicación oral y escrita para el ámbito profesional.",
      imagen: "/images/ceep/ingles.jpg",
      modulos: [
        "Gramática Estructural",
        "Conversación Diaria",
        "Inglés de Negocios",
        "Comprensión Auditiva",
        "Redacción de Documentos",
        "Preparación TOEFL",
      ],
      salidaLaboral: [
        "Empresas internacionales",
        "Turismo",
        "Traducción básica",
        "Atención al cliente bilingüe",
      ],
      requisitos: [
        "Mayor de 16 años",
        "Conocimientos básicos de inglés (prueba de nivelación)",
      ],
      horarios: ["Lunes a Viernes: 17:00 - 20:00", "Sábados: 8:00 - 14:00"],
      precio: "Consultar en administración",
      proximoInicio: "10 de Enero 2025",
    },
  };

  const especialidad = especialidadesData[id];

  if (!especialidad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Especialidad no encontrada
          </h1>
          <button
            onClick={() => navigate("/ceep")}
            className="px-6 py-3 bg-[#1a365d] text-white rounded-full hover:bg-[#152c4d] transition-colors"
          >
            Volver al CEEP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero de la especialidad */}
      <section className="relative pt-20 pb-16 bg-[#1a365d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/ceep")}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a especialidades
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-[#c9a227]/20 text-[#c9a227] rounded-full text-sm font-semibold mb-4">
                {especialidad.categoria}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {especialidad.nombre}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {especialidad.descripcion}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 text-[#c9a227] mr-2" />
                  <span className="text-white">{especialidad.duracion}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5 text-[#c9a227] mr-2" />
                  <span className="text-white">
                    Inicio: {especialidad.proximoInicio}
                  </span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 text-[#c9a227] mr-2" />
                  <span className="text-white">Titulación oficial</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#c9a227] text-[#1a365d] font-bold rounded-full hover:bg-[#b8941f] transition-all hover:scale-105">
                  Inscribirme Ahora
                </button>
                <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Plan de Estudios
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src={especialidad.imagen}
                alt={especialidad.nombre}
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-[#1a365d]">
                  {especialidad.duracion}
                </div>
                <div className="text-gray-600">de formación</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido detallado */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-12">
              {/* Módulos */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 text-[#c9a227] mr-3" />
                  Plan de Estudios
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {especialidad.modulos.map((modulo, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-xl"
                    >
                      <span className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{modulo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salida laboral */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="w-6 h-6 text-[#c9a227] mr-3" />
                  Salida Laboral
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {especialidad.salidaLaboral.map((salida, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-[#c9a227]/10 rounded-xl border border-[#c9a227]/20"
                    >
                      <CheckCircle className="w-5 h-5 text-[#c9a227] mr-3 flex-shrink-0" />
                      <span className="text-gray-800">{salida}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Requisitos */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Requisitos
                </h3>
                <ul className="space-y-3">
                  {especialidad.requisitos.map((req, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#6B7B5F] mr-3 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Horarios */}
              <div className="bg-[#1a365d] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horarios Disponibles
                </h3>
                <ul className="space-y-3">
                  {especialidad.horarios.map((horario, index) => (
                    <li key={index} className="text-white/80 text-sm">
                      • {horario}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto rápido */}
              <div className="bg-[#c9a227]/10 rounded-2xl p-6 border border-[#c9a227]/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ¿Tienes dudas?
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:222505012"
                    className="flex items-center text-gray-700 hover:text-[#1a365d]"
                  >
                    <Phone className="w-5 h-5 mr-3 text-[#c9a227]" />
                    222 505 012
                  </a>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-[#c9a227] flex-shrink-0" />
                    <span className="text-sm">
                      Rotonda Arab de Malabo 2, Semu
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-4 bg-[#c9a227] text-[#1a365d] font-bold rounded-xl hover:bg-[#b8941f] transition-all hover:scale-105">
                Solicitar Información
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades relacionadas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Otras especialidades de {especialidad.categoria}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(especialidadesData)
              .filter(
                (esp) =>
                  esp.categoria === especialidad.categoria &&
                  esp.nombre !== especialidad.nombre,
              )
              .slice(0, 3)
              .map((esp, idx) => (
                <Link
                  key={idx}
                  to={`/ceep/especialidad/${Object.keys(especialidadesData).find((key) => especialidadesData[key].nombre === esp.nombre)}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{esp.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4">{esp.duracion}</p>
                  <span className="text-[#c9a227] font-semibold text-sm">
                    Ver detalles →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EspecialidadDetalle;
