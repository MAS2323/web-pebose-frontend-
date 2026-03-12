import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Nosotros from "../components/Nosotros";
import Modalidades from "../components/Modalidades";
import Instalaciones from "../components/Instalaciones";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Modalidades />
        <Instalaciones />
        <Contacto />

        {/* Sección CEEP destacada en Home */}
        <section className="py-20 bg-[#1a365d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Buscas formación profesional técnica?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Descubre nuestro Centro de Estudios Especializados (CEEP) con 20
              especialidades de alta demanda laboral.
            </p>
            <Link
              to="/ceep"
              className="inline-flex items-center px-8 py-4 bg-[#c9a227] text-[#1a365d] font-bold rounded-full hover:bg-[#b8941f] transition-all duration-300 hover:scale-105"
            >
              Explorar CEEP
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
