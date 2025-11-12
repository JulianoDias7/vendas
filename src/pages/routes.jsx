import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Sales from '../pages/sales';
import Reports from './reports';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}
