import Image from "next/image";

export default function ProdutoDetalhe({ produto } : any) {
  if (!produto) return null;

  // Se image já vier com http, não concatenamos
  const linkFinal = produto.image.startsWith("http")
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <div className="p-6  place-items-center   text-blue-500 ">
      <h1 className="text-3xl font-bold mb-4  text-blue-500">{produto.title}</h1>

      <Image
        src={linkFinal}
        alt={produto.title}
        width={400}
        height={400}
     className="rounded-lg border-2 border-blue-500"
      />

      <p className="text-lg mt-4 font-bold">{produto.description}</p>
      <p className="text-xl font-bold mt-2">{produto.price} €</p>
    </div>
  );
}
