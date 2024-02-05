import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdminRestaurantes from "./paginas/Administration/Restautants/AdminRestaurante";
import FormularioRestaurante from "./paginas/Administration/Restautants/FormularioRestaurante";
import BasePaginaAdmin from "./paginas/Administration/BasePaginaAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<BasePaginaAdmin />}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
