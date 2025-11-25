"use client";   // ⬅ OBRIGATÓRIO para usar onClick

export default function CaracteristicasPage() {
  const caracteristicas = [
    "JSX, sintaxe que mistura HTML e JS.",
    "Componentes, funções que retornam JSX.",
    "Componentes Reutilizáveis e Modulares.",
    "Roteamento Automático e APIs.",
    "Hooks: useState, useEffect e useSWR.",
    "Renderização Rápida e SEO Friendly.",
    "TypeScript Seguro e Escalável.",
    "Comunidade Ativa e Popularidade."
  ];

  const handleClick = () => {
    alert("React e Next.js são incríveis para desenvolvimento moderno!");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Características do React e Next.js</h2>

      <ul className="list-disc ml-6 space-y-2">
        {caracteristicas.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Clique
      </button>
    </div>
  );
}
