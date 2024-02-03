import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Administration/Restautants/AdminRestaurante'
import FormularioRestaurante from './paginas/Administration/Restautants/FormularioRestaurante'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante/>} /> 
    </Routes>
  );
}

export default App;