import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/produtos', { headers: { 'x-access-token': token } })
      .then(resp => setProdutos(resp.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Produtos</h2>
        <ul>
          {produtos.map(p => (
            <li key={p.id}>{p.nome} - R$ {p.preco} ({p.estoque} un)</li>
          ))}
        </ul>
      </div>
    </>
  );
}
