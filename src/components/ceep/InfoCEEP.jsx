import { CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const InfoCEEP = () => {
  const ventajas = [
    "Prácticas profesionales desde el primer módulo",
    "Docentes con experiencia laboral real",
    "Convenios con empresas para pasantías",
    "Laboratorios y talleres equipados",
    "Titulación reconocida por el MINEDUC",
    "Bolsa de trabajo activa para egresados",
    "Horarios flexibles (matutino, vespertino, sabatino)",
    "Pagos mensuales accesibles",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenido */}
          <div>
            <span className="inline-block px-4 py-1 bg-[#c9a227]/10 text-[#c9a227] rounded-full text-sm font-semibold mb-4">
              ¿Por qué elegir el CEEP?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Formación práctica para el mundo real
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              El Centro de Estudios Especializados del PEBOSE nació para cubrir
              la demanda de técnicos calificados en el país. Nuestro enfoque es
              100% práctico, preparándote para emprender o conseguir empleo
              inmediatamente después de graduarte.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {ventajas.map((ventaja, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{ventaja}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-[#1a365d] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 bg-[#c9a227] rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-[#1a365d]" />
              </span>
              Información de Contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#c9a227] flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Ubicación</p>
                  <p className="text-white/80 text-sm">
                    Rotonda Arab de Malabo 2, Semu
                    <br />
                    (Mismo campus del Centro Bilingüe PEBOSE)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#c9a227] flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Teléfonos</p>
                  <p className="text-white/80 text-sm">
                    222 505 012
                    <br />
                    222 181 819
                    <br />
                    222 540 044
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#c9a227] flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-white/80 text-sm">
                    info@centrobilingüepebose.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-[#c9a227] flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Horario de Atención</p>
                  <p className="text-white/80 text-sm">
                    Lunes a Viernes: 8:00 - 18:00
                    <br />
                    Sábados: 8:00 - 13:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-[#c9a227] font-bold text-lg italic text-center">
                "La suerte acompaña a la mente preparada"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCEEP;
