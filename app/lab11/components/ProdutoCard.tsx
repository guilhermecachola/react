"use client"; 
// Indica que este componente é um Client Component em Next.js,
// permitindo usar hooks, eventos, etc.

import Image from "next/image"; 
// Componente otimizado para imagens no Next.js

import Link from "next/link"; 
// Componente para criar links entre páginas

import {  Product } from "@/app/lab11/models/interfaces"; 
// Tipos TypeScript para produtos e itens do carrinho

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// Componentes de UI para estrutura visual de cards


// Definição da interface Props recebida pelo componente
interface Props {
  produto: Product ; // O produto pode ser um Product normal ou um CartItem (com quantidade)
  modo?: "loja" | "cart";       // Controla se o card está no modo loja ou carrinho
  onAdd?: (p: Product ) => void; // Função opcional para adicionar ao carrinho
  onRemove?: (id: number) => void;         // Função opcional para remover do carrinho
  quantidade: number;                      // (Opcional) Quantidade do produto no carrinho
}


// Componente principal ProdutoCard
export default function ProdutoCard({ produto, modo = "loja", onAdd, onRemove }: Props) {
  
  // Constroi o link final da imagem com a base da API
  const linkFinal = "https://deisishop.pythonanywhere.com" + produto.image;

  return (
    // Card visual do produto, com sombra e efeitos
    <Card className="shadow-md hover:shadow-xl transition p-3 bg-blue-300 border-blue-600 border-2">

      <CardHeader>
        {/* Título do produto, centrado e estilizado */}
        <CardTitle className="text-lg font-semibold text-blue-600 h-12 text-center">
          {produto.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Imagem do produto com dimensões fixas */}
        <Image
          src={linkFinal}
          alt={produto.title}
          width={300}
          height={300}
          className="rounded-lg object-cover w-full h-48"
        />

        {/* Preço do produto */}
        <p className="mt-3 text-xl font-bold flex justify-center text-blue-600">
          € {produto.price}
        </p>

        {/* Link para página de informação — aparece só no modo loja */}
        {modo === "loja" && (
          <Link
            href={`/lab11/produtos/${produto.id}`}
            className="mt-3 text-blue-900 flex justify-center border-2 border-blue-800 
                     font-bold rounded-lg bg-gradient-to-b from-blue-600 to-blue-400 py-2"
          >
            + Informação
          </Link>
        )}

        {/* Botão de adicionar ao carrinho — só aparece no modo loja */}
        {modo === "loja" && onAdd && (
          <button
            onClick={() => onAdd(produto)} // Ao clicar, chama a função onAdd passada por props
            className="mt-3 text-blue-900 flex justify-center border-2 border-blue-800 
                     font-bold rounded-lg bg-gradient-to-b from-blue-600 to-blue-400 py-2"
          >
            Adicionar ao Carrinho
          </button>
        )}

        {/* Secção do carrinho — só aparece no modo cart */}
        {modo === "cart" && onRemove && (
          <div>
            {/* Botão para remover item do carrinho */}
            <button
              onClick={() => onRemove(produto.id)} // Remove item pelo ID
              className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
            >
              Remover
            </button>

            {/* Exibe a quantidade do item no carrinho */}
            <p className="mt-2 text-center text-blue-800 font-bold">
              Quantidade: {produto.quantity}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
