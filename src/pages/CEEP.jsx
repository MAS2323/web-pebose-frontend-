import HeroCEEP from "../components/ceep/HeroCEEP";
import EspecialidadesGrid from "../components/ceep/EspecialidadesGrid";
import InfoCEEP from "../components/ceep/InfoCEEP";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UploadDocumentos from "../components/ceep/UploadDocumentos";

const CEEP = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroCEEP />
        <EspecialidadesGrid />
        <UploadDocumentos />
        <InfoCEEP />
      </main>
      <Footer />
    </div>
  );
};

export default CEEP;
