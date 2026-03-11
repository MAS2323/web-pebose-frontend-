import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CEEP from "./pages/CEEP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ceep" element={<CEEP />} />
      </Routes>
    </Router>
  );
}

export default App;
