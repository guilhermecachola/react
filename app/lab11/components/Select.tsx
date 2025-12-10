"use client";

export default function Select({ order, setOrder } : any) {
  
  return (
    <select
      className="border-2 rounded p-2 mb-6 border-blue-600 bg-blue-300 text-blue-600 font-bold"
      value={order}
      onChange={(e) => setOrder(e.target.value)}
    >
      <option value="">Ordenar...</option>
      <option value="nome-asc">Nome (A → Z)</option>
      <option value="nome-desc">Nome (Z → A)</option>
      <option value="preco-asc">Preço (mais barato)</option>
      <option value="preco-desc">Preço (mais caro)</option>
    </select>
  );
}
