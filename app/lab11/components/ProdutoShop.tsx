"use client"; // Indica que este componente é renderizado no cliente (Next.js)

import useSWR from "swr"; // Hook para fetch com cache e revalidação automática
import { useState, useEffect } from "react"; // Hooks do React
import ProdutoCard from "./ProdutoCard"; // Componente para mostrar cada produto
import { Spinner } from "@/components/ui/spinner"; // Spinner de carregamento
import { Product } from "@/app/lab11/models/interfaces"; // Interface do tipo Product
import OrderSelect from "@/app/lab11/components/Select"; // Componente de ordenação
import Comprar from "./comprar";
// fetcher com tipo correto
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao pedir dados"); // Se falhar devolve erro
    return res.json(); // Caso contrário devolve JSON
  });

export default function ProdutoShop() {
  
  
  // estados tipados
  const [search, setSearch] = useState<string>(""); // Texto da barra de pesquisa
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Lista filtrada
  const [order, setOrder] = useState(""); // Tipo de ordenação selecionada
  

  // SWR tipado corretamente → obtém lista de produtos da API
  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products",
    fetcher
  );

  const [cart, setCart] = useState<Product[]>([]); // Estado do carrinho

  // carregar carrinho do localStorage (apenas 1 vez no início)
  useEffect(() => {
    const saved = localStorage.getItem("cart"); // tentar obter carrinho guardado
    if (saved) setCart(JSON.parse(saved)); // se existir → carregar no estado
  }, []);

  // sempre que cart muda → guardar no localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // guardar carrinho atualizado
  }, [cart]);

  const precos = cart.map(item => Number(item.price) * item.quantity);

let total = 0;
for (let valor of precos) {
  total = total + valor;
}
  

  // função para adicionar ao carrinho
  const addToCart = (produto: Product) => {
  setCart((prev) => {
    const existing = prev.find((p) => p.id === produto.id);
    
    if (existing) {
      // aumentar quantidade
      return prev.map((p) =>
        p.id === produto.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }

    // adicionar novo item ao carrinho
    return [...prev, { ...produto, quantity: 1 }];
  });
};


  // função para remover do carrinho
 const removeFromCart = (id: number) => {
  setCart((prev) => {
    const item = prev.find((p) => p.id === id);

    if (!item) return prev;

    

    if (item.quantity > 1) {
      return prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      );
    }

    // Se quantidade = 1 → remove o item completamente
    return prev.filter((p) => p.id !== id);
  });
};

  // filtrar dados sempre que search ou data mudarem
  useEffect(() => {
    if (!data) return; // se ainda não há dados, sair

    // filtrar produtos conforme pesquisa
    let results = data.filter((produto: Product) =>
      produto.title.toLowerCase().startsWith(search.toLowerCase())
    );

    // aplicar ordenação por nome crescente
    if (order === "nome-asc") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    // ordenação por nome decrescente
    if (order === "nome-desc") {
      results = [...results].sort((a, b) => b.title.localeCompare(a.title));
    }

    // ordenação por preço crescente
    if (order === "preco-asc") {
      results = [...results].sort((a, b) => Number(a.price) - Number(b.price));
    }

    // ordenação por preço decrescente
    if (order === "preco-desc") {
      results = [...results].sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredData(results); // atualizar lista filtrada
  }, [search, order, data]); // dependências do useEffect

  // spinner enquanto carrega dados
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-56">
        <Spinner className="h-10 w-10" /> {/* Spinner de loading */}
      </div>
    );
  }

  // erro ao carregar produtos
  if (error) {
    return <p className="text-red-600 text-center">Erro ao carregar dados.</p>;
  }

  return (
    <div className="p-6">

      {/* Cabeçalho com barra de pesquisa e seletor de ordenação */}
      <header className="flex justify-between">
        {/* INPUT DE PESQUISA */}
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search} // valor atual
          onChange={(e) => setSearch(e.target.value)} // atualizar pesquisa
          className="border-2 font-bold border-blue-600 rounded p-2 w-3/4 mb-6 text-blue-600 bg-blue-300"
        />

        {/* Componente de ordenação */}
        <OrderSelect order={order} setOrder={setOrder}/>
      </header>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((produto: Product) => (
         
          <ProdutoCard
            key={produto.id}   // chave única obrigatória
            produto={produto}  // dados do produto
            modo="loja"        // indica que é visualização da loja
            onAdd={addToCart}
            quantidade={0}  // função para adicionar ao carrinho
          />

        ))}
      </div>

      {/* Título do Carrinho */}
      <h2 className="mt-3 text-2xl text-blue-900 flex justify-center ">Carrinho</h2>

      {/* GRID DO CARRINHO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cart.map((produto: Product) => (
          <ProdutoCard 
            key={produto.id}      // chave única do item
            produto={produto}     // produto no carrinho
            modo="cart"            // modo carrinho
            quantidade={produto.quantity}       // quantidade no carrinho
            onRemove={removeFromCart} // função para remover
          />
        ))}
      </div>
      <p className="mt-4 text-xl font-bold text-blue-800 flex justify-center">
        Total: {total.toFixed(2)}€
      </p>
       <Comprar cart={cart} setCart={setCart} total={total} />
    </div>
  );
}
