"use client";

import { useState } from "react";
import { Product } from "@/app/lab11/models/interfaces";

interface ComprarProps {
  cart: Product[];              // lista de produtos no carrinho
  setCart: (c: Product[]) => void; // função para atualizar o carrinho
  total:number;                    // total da compra
}

export default function Comprar({ cart, setCart, total }: ComprarProps) {

  const [resultadoCompra, setResultadoCompra] = useState<any>(null);

  // estado do checkbox estudante
  const [student, setStudent] = useState(false);

  // estado do cupão
  const [coupon, setCoupon] = useState("");

  const [name, setName] = useState("");

  // função comprar → envia pedido à API
  const buy = () => {
    fetch("https://deisishop.pythonanywhere.com/buy/", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(p => p.id), // ids dos produtos no carrinho
        name: name,
        student: student,
        coupon: coupon
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })

      .then((resposta) => {
  setResultadoCompra(resposta); // ← guardar resposta da API
  setCart([]);
  setCoupon("");
  setStudent(false);
})


      .catch(() => console.log("Erro ao comprar"));
  };

  return (
    <div className="mt-6  p-4 border-2 rounded text-lg font-semibold text-blue-600  bg-blue-100 border-blue-400 ">

      <h2 className="text-xl font-bold text-blue-400 mb-3 flex justify-center">
        Finalizar Compra
      </h2>

      {/* Checkbox estudante */}
      <label className="flex gap-2 m-3">
        <input
          type="checkbox"
          checked={student}
          onChange={(e) => setStudent(e.target.checked)}
        />
        Estudante DEISI
      </label>

<div className="flex">
     
      <input
        type="text"
        placeholder="Cupão de desconto"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="border-2 p-2 w-3/4 m-3 border-blue-400"
      />

      <input
      type="text"
      placeholder="Insira o seu nome"
      value={name}
    onChange={(nome) => setName(nome.target.value)}
    className="border-2 p-2 w-1/4 m-3 border-blue-400"
    />
</div>
      {/* Botão comprar */}
      <button
        onClick={buy}
        className='py-2 px-4 font-bold rounded m-3 bg-blue-200 border-2 border-blue-600 text-blue-600 hover:bg-blue-300'    
      >
        Comprar ({total.toFixed(2)}€)
      </button>
      {resultadoCompra && (
  <div className="mt-4 p-3 border-2 border-green-600 bg-green-100 rounded">
    <h3 className="font-bold text-green-700">Compra efetuada com sucesso!</h3>
    <pre className="text-sm">{JSON.stringify(resultadoCompra, null, 2)}</pre>
  </div>
)}
    </div>
  );
}
