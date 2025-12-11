"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";
import { Spinner } from "@/components/ui/spinner";
import { Product } from "@/app/lab11/models/interfaces";
import OrderSelect from "@/app/lab11/components/Select";



// fetcher com tipo correto
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao pedir dados");
    return res.json();
  });

export default function ProdutoShop() {
  // estados tipados
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [order, setOrder] = useState("");  
  // SWR tipado corretamente
  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products",
    fetcher
  );

  const [cart, setCart] = useState<Product[]>([]);

// carregar carrinho do localStorage (apenas 1 vez)
useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) setCart(JSON.parse(saved));
}, []);

// sempre que cart muda → guardar na localStorage
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

// função para adicionar ao carrinho
const addToCart = (produto: Product) => {
  setCart((prev) => [...prev, produto]);
};

// função para remover do carrinho
const removeFromCart = (id: number) => {
  setCart((prev) => prev.filter((p) => p.id !== id));
};


  // filtrar dados sempre que search ou data mudarem
  useEffect(() => {
    if (!data) return;

    let results = data.filter((produto: Product) =>
      produto.title.toLowerCase().startsWith(search.toLowerCase())
    );
    
    // aplicar ordenação
    if (order === "nome-asc") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (order === "nome-desc") {
      results = [...results].sort((a, b) => b.title.localeCompare(a.title));
    }
    if (order === "preco-asc") {
      results = [...results].sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (order === "preco-desc") {
      results = [...results].sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredData(results);
  }, [search, order, data]);
  

  // spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-56">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  // erro
  if (error) {
    return <p className="text-red-600 text-center">Erro ao carregar dados.</p>;
  }

  return (
    <div className="p-6">

      
<header className="flex justify-between">
      {/* INPUT DE PESQUISA */}
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 font-bold border-blue-600 rounded p-2 w-3/4 mb-6 text-blue-600 bg-blue-300"
      />
      <OrderSelect order={order} setOrder={setOrder}/>
</header>
      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((produto: Product) => (
         <ProdutoCard 
  produto={produto}
  modo="loja"
  onAdd={addToCart}
/>

        ))}
      </div>
<h2 className="text-2xl font-bold mt-10">Carrinho</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {cart.map((produto: Product) => (
    <ProdutoCard 
      key={produto.id}
      produto={produto}
      modo="cart"
      onRemove={removeFromCart}
    />
  ))}
</div>
    </div>
  );
}
