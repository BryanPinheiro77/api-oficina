import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // redireciona e substitui o histórico pra evitar voltar com "voltar"
    return <Navigate to="/login" replace />;
  }

  // se tiver token, renderiza a página protegida
  return <Component />;
}
