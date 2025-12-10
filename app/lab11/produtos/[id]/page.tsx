"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import ProdutoDetalhe from "@/app/lab11/components/ProdutoDetalhe";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao buscar produto");
    return res.json();
  });

export default function ProdutoPage() {
  const params = useParams();

  // Em Next 15, useParams devolve um objeto SINCRONO (segundo documentação)
  const id = params.id;

  console.log("ID recebido:", id);
  console.log("URL pedido:", `https://deisishop.pythonanywhere.com/products/${id}`);

  const { data, error, isLoading } = useSWR(
    id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-56">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (error) return <p>Erro ao carregar produto.</p>;

  return <ProdutoDetalhe produto={data} />;
}
