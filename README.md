# Radiadores Pinheiro 🔧🔥  
Sistema de Estoque e Vendas + Landing Page

![Badge](https://img.shields.io/badge/Node.js-Backend-green)
![Badge](https://img.shields.io/badge/MySQL-Database-blue)
![Badge](https://img.shields.io/badge/React-Frontend-61DAFB)
![Badge](https://img.shields.io/badge/Status-Finalizado-green)

---

## 📌 Sobre o Projeto

O **Radiadores Pinheiro – Sistema Interno** é uma solução completa desenvolvida como projeto acadêmico, atendendo à demanda real da oficina de radiadores da família.

O objetivo foi **resolver dois problemas principais** identificados após visita técnica ao empreendimento:

- Falta de controle de estoque  
- Registro desorganizado das vendas  

Realizamos:

- Levantamento de requisitos diretamente com o empreendedor  
- Criação e validação de um **protótipo funcional**  
- Desenvolvimento completo do **back-end (Node.js + MySQL)**  
- Desenvolvimento do **front-end (React + CSS)**  
- Construção de uma **landing page profissional**

O sistema foi totalmente testado e apresentado em sala para o professor e outra turma em uma dinâmica prática explicando todo o processo.

---

## ✨ Funcionalidades

### 🧭 Landing Page  
- Seção principal com destaque visual  
- Botão de WhatsApp  
- Como chegar (Google Maps)  
- Serviços e informações da oficina  

---

### 📊 Dashboard (Sistema Interno)
- Quantidade total de produtos  
- Valor total em estoque  
- Total vendido  
- Histórico por período  
- Gráficos de venda  
- Meta mensal  

---

### 📦 Produtos  
- Criar produtos  
- Editar / excluir  
- Categorias  
- Controle de estoque  
- Busca por nome  
- Indicador de produtos com estoque baixo  

---

### 💰 Vendas  
- Registrar nova venda  
- Cálculo automático do total  
- Formas de pagamento  
- Baixa automática do estoque  
- Histórico completo  
- Exclusão de registros  

---

## 🗄️ Banco de Dados

O projeto utiliza **MySQL** com tabelas relacionais para:

- usuários  
- produtos  
- categorias  
- vendas  

O script de criação está localizado em:

```
back-end/sql/ddl.sql
```

Execute-o no MySQL Workbench para criar o schema e as tabelas.

---

## ▶️ Como Executar o Projeto

### 📌 Back-end (server)

```
cd back-end
npm install
```

Criar o arquivo `.env`:

```
PORT=5010
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PWD=suaSenha
MYSQL_DB=oficina
```

Rodar o servidor:

```
npm start
```

---

### 📌 Front-end (client)

Instale as dependências:

```
cd front-end
npm install
```

Rodar:

```
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

## 👨‍💻 Autor
**Bryan Mendes Pinheiro** 
- [LinkedIn](https://www.linkedin.com/in/bryan-mendes-0406b92b5) 
- [GitHub](https://github.com/BryanPinheiro77)
