import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";
import NovaVenda from "./pages/NovaVenda"
import NovoProduto from "./pages/NovoProduto";
import NovaCategoria from "./pages/NovaCategoria";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Páginas protegidas */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/produtos"
          element={<ProtectedRoute component={Produtos} />}
        />
        <Route
          path="/produtos/novo"
          element={<ProtectedRoute component={NovoProduto} />}
        />
        <Route
          path="/categorias/nova"
          element={<ProtectedRoute component={NovaCategoria} />}
        />
        <Route
          path="/vendas"
          element={<ProtectedRoute component={Vendas} />}
        />
        <Route
          path="/vendas/nova"
          element={<ProtectedRoute component={NovaVenda} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
