import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Produtos from '../pages/produtos';
import Cadastros from './cadastros';

export default function AppRoutes() {
  return (
    <div className="min-h-screen m-4 align-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/cadastros" element={<Cadastros />} />
      </Routes>
    </div>
  );
}
