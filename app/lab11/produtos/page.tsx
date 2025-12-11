"use client";

import { useState, useEffect } from "react";
import ProdutoShop from "@/app/lab11/components/ProdutoShop";
import produtos from "@/app/lab11/data/produtos.json";
import ProdutoCard from "@/app/lab11/components/ProdutoCard";
import { Product } from "@/app/lab11/models/interfaces";

export default function zProdutosPage() {

  const [cart, setCart] = useState<Product[]>([]);

// Carregar carrinho do localStorage *apenas no browser*
useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    setCart(JSON.parse(saved));
  }
}, []);

// Guardar no localStorage sempre que o carrinho mudar
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


  // atualizar localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // adicionar produto
  function addToCart(produto: Product) {
    setCart((prev: Product[]) => [...prev, produto]);
  }

  // remover produto do carrinho
  function removeFromCart(id: number) {
    setCart((prev: Product[]) => prev.filter((p: Product) => p.id !== id));
  }

  // total
 const total = cart.reduce(
  (soma: number, item: Product) => soma + Number(item.price),
  0
);


  return (
    <main>
      <h1 className="text-3xl font-bold mb-6 text-blue-600 flex justify-center">
        Produtos DEISIshop
      </h1>

      {/* componente extra que tinhas */}
      <ProdutoShop />
    </main>
  );
}
