import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';
import ProtectedRoute from './components/protectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/produtos"
          element={<ProtectedRoute component={Produtos} />}
        />
        <Route
          path="/vendas"
          element={<ProtectedRoute component={Vendas} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
