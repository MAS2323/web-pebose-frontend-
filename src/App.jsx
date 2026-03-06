import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Modalidades from "./components/Modalidades";
import Instalaciones from "./components/Instalaciones";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Modalidades />
        <Instalaciones />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

export default App;
