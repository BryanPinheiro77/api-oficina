import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Dashboard</h2>
        <p>Bem-vindo ao painel de gestão da Oficina.</p>
      </div>
    </>
  );
}
