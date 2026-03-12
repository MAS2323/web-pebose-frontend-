import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CEEP from "./pages/CEEP";
import EspecialidadDetalle from "./components/ceep/EspecialidadDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ceep" element={<CEEP />} />
        <Route
          path="/ceep/especialidad/:id"
          element={<EspecialidadDetalle />}
        />
      </Routes>
    </Router>
  );
}

export default App;
