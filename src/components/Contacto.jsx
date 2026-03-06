import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    modalidad: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch("http://localhost:8000/contacto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEnviado(true);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          modalidad: "",
          mensaje: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setEnviando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Teléfono",
      value: "+52 (XXX) XXX-XXXX",
      href: "tel:+52",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contacto@pebose.edu",
      href: "mailto:contacto@pebose.edu",
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: "Av. Principal #123, Ciudad",
      href: "#",
    },
    {
      icon: Clock,
      label: "Horario",
      value: "Lun - Vie: 7:00 - 18:00",
      href: "#",
    },
  ];

  return (
    <section id="contacto" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#6B7B5F] font-semibold text-xs md:text-sm uppercase tracking-wider">
            Contacto
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5D1A1A] mt-2 md:mt-3 mb-3 md:mb-4">
            ¿Listo para Inscribirte?
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 sm:px-0">
            Contáctanos para resolver tus dudas, agendar una visita o iniciar el
            proceso de admisión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Info Cards - Grid en móvil, stack en desktop */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 order-2 lg:order-1">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="flex items-center space-x-3 md:space-x-4 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#5D1A1A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#5D1A1A] transition-colors flex-shrink-0">
                  <info.icon className="w-5 h-5 md:w-6 md:h-6 text-[#5D1A1A] group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    {info.label}
                  </p>
                  <p className="text-[#5D1A1A] font-semibold text-sm md:text-base truncate">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Mapa placeholder */}
            <div className="bg-white p-4 rounded-xl md:rounded-2xl shadow-md h-48 md:h-64 flex items-center justify-center sm:col-span-2 lg:col-span-1">
              <div className="text-center text-gray-400">
                <MapPin className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2" />
                <p className="text-sm">Mapa de ubicación</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 order-1 lg:order-2">
            {enviado ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#5D1A1A] mb-2">
                  ¡Mensaje Enviado!
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Nos pondremos en contacto contigo pronto.
                </p>
                <button
                  onClick={() => setEnviado(false)}
                  className="mt-6 text-[#6B7B5F] font-semibold hover:text-[#5D1A1A] transition-colors text-sm md:text-base"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#5D1A1A] focus:ring-2 focus:ring-[#5D1A1A]/20 outline-none transition-all text-sm md:text-base"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#5D1A1A] focus:ring-2 focus:ring-[#5D1A1A]/20 outline-none transition-all text-sm md:text-base"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#5D1A1A] focus:ring-2 focus:ring-[#5D1A1A]/20 outline-none transition-all text-sm md:text-base"
                      placeholder="(XXX) XXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Modalidad de interés
                    </label>
                    <select
                      name="modalidad"
                      value={formData.modalidad}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#5D1A1A] focus:ring-2 focus:ring-[#5D1A1A]/20 outline-none transition-all bg-white text-sm md:text-base"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="guarderia">Guardería de Infantes</option>
                      <option value="preescolar">Preescolar</option>
                      <option value="primaria">Primaria</option>
                      <option value="secundaria">Secundaria</option>
                      <option value="profesional">Formación Profesional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#5D1A1A] focus:ring-2 focus:ring-[#5D1A1A]/20 outline-none transition-all resize-none text-sm md:text-base"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-[#5D1A1A] text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-[#4a1515] transition-colors flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {enviando ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[10px] md:text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas nuestra política de
                  privacidad. Tus datos están protegidos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
