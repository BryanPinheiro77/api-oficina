export default function Navbar() {
    function logout() {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#222',
        color: '#fff',
        padding: '10px 20px'
      }}>
        <div>
          <a href="/dashboard" style={{ color: '#fff', marginRight: 15 }}>Dashboard</a>
          <a href="/produtos" style={{ color: '#fff', marginRight: 15 }}>Produtos</a>
          <a href="/vendas" style={{ color: '#fff' }}>Vendas</a>
        </div>
        <button onClick={logout} style={{ background: '#f00', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: 5 }}>
          Sair
        </button>
      </nav>
    );
  }
  