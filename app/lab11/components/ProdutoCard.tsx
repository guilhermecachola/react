"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/lab11/models/interfaces";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  produto: Product;
  modo?: "loja" | "cart";
  onAdd?: (p: Product) => void;
  onRemove?: (id: number) => void;
}

export default function ProdutoCard({ produto, modo = "loja", onAdd, onRemove }: Props) {
  const linkFinal = "https://deisishop.pythonanywhere.com" + produto.image;

  return (
    <Card className="shadow-md hover:shadow-xl transition p-3 bg-blue-300 border-blue-600 border-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-blue-600 h-12 text-center">
          {produto.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Image
          src={linkFinal}
          alt={produto.title}
          width={300}
          height={300}
          className="rounded-lg object-cover w-full h-48"
        />

        <p className="mt-3 text-xl font-bold flex justify-center text-blue-600">
          € {produto.price}
        </p>

        {/* Link para detalhes apenas no modo loja */}
        {modo === "loja" && (
          <Link
            href={`/lab11/produtos/${produto.id}`}
            className="mt-3 text-blue-900 flex justify-center border-2 border-blue-800 
                     font-bold rounded-lg bg-gradient-to-b from-blue-600 to-blue-400 py-2"
          >
            + Informação
          </Link>
        )}

        {/* BOTÃO ADICIONAR AO CARRINHO */}
        {modo === "loja" && onAdd && (
          <button
            onClick={() => onAdd(produto)}
            className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Adicionar ao Carrinho
          </button>
        )}

        {/* BOTÃO REMOVER DO CARRINHO */}
        {modo === "cart" && onRemove && (
          <button
            onClick={() => onRemove(produto.id)}
            className="mt-3 w-full py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
          >
            Remover
          </button>
        )}
      </CardContent>
    </Card>
  );
}
