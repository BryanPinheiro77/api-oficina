import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Sidebar';

export default function Vendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/vendas', { headers: { 'x-access-token': token } })
      .then(resp => setVendas(resp.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Vendas</h2>
        <ul>
          {vendas.map(v => (
            <li key={v.id}>
              #{v.id} — Total: R$ {v.total} — Data: {new Date(v.criado_em).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
