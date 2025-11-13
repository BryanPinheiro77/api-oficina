import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/novaVenda.css";

export default function NovaVenda() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [formaPagamento, setFormaPagamento] = useState("Dinheiro");

  const [itens, setItens] = useState([]);

  useEffect(() => {
    async function load() {
      const resp = await api.get("/produtos");
      setProdutos(resp.data);
    }
    load();
  }, []);

  // AUTOCOMPLETE
  useEffect(() => {
    if (!busca.trim()) return setFiltrados([]);

    const f = produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );
    setFiltrados(f);
  }, [busca, produtos]);

  function selecionarProduto(p) {
    setProdutoSelecionado(p);
    setBusca(p.nome);
    setPreco(Number(p.preco));
    setFiltrados([]);
  }

  function adicionarItem() {
    if (!busca.trim()) return alert("Digite ou selecione um produto!");

    const precoFinal = Number(preco);
    if (!precoFinal || precoFinal <= 0) return alert("Preço inválido!");

    const qtd = Number(quantidade);

    const novoItem = {
      produto_id: produtoSelecionado ? produtoSelecionado.id : null,
      nome: busca.trim(),
      qtd,
      preco_unit: precoFinal,
      total: precoFinal * qtd,
    };

    setItens([...itens, novoItem]);

    setBusca("");
    setProdutoSelecionado(null);
    setPreco("");
    setQuantidade(1);
  }

  function removerItem(index) {
    const nova = [...itens];
    nova.splice(index, 1);
    setItens(nova);
  }

  async function finalizarVenda() {
    if (itens.length === 0) return alert("Nenhum item adicionado!");

    await api.post("/vendas", {
      cliente_id: null,
      formaPagamento,
      itens
    });

    alert("Venda registrada com sucesso!");
    navigate("/vendas");
  }

  return (
    <div className="novaVenda-page">
      <Sidebar />

      <div className="novaVenda-content">
        <h1>Nova Venda</h1>

        <div className="form-card">

          <label>Produto</label>
          <input
            type="text"
            value={busca}
            placeholder="Digite para buscar..."
            onChange={(e) => {
              setBusca(e.target.value);
              setProdutoSelecionado(null);
            }}
          />

          {filtrados.length > 0 && (
            <div className="autocomplete">
              {filtrados.map((p) => (
                <div
                  className="item"
                  key={p.id}
                  onClick={() => selecionarProduto(p)}
                >
                  {p.nome} — R$ {Number(p.preco).toFixed(2)}
                </div>
              ))}
            </div>
          )}

          <label>Preço</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <label>Quantidade</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />

          <button className="btn-add" onClick={adicionarItem}>
            Adicionar
          </button>
        </div>

        {/* LISTA */}
        <h2>Itens da Venda</h2>

        {itens.length === 0 ? (
          <p className="muted">Nenhum item adicionado.</p>
        ) : (
          <table className="tabela-itens">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {itens.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.nome}</td>
                  <td>{i.qtd}</td>
                  <td>R$ {i.preco_unit.toFixed(2)}</td>
                  <td>R$ {i.total.toFixed(2)}</td>
                  <td>
                    <button className="btn-remove" onClick={() => removerItem(idx)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PAGAMENTO */}
        <select
          className="pagamento"
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option>Dinheiro</option>
          <option>Cartão</option>
          <option>Pix</option>
        </select>

        <button className="btn-finalizar" onClick={finalizarVenda}>
          Finalizar Venda
        </button>
      </div>
    </div>
  );
}
