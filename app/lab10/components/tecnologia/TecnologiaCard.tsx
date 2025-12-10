import Image from "next/image";
import { networkInterfaces } from "os";
import { SWRConfig } from "swr";

interface TecnologiaCardProps {
  title: string;
  image: string;
}

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div className="w-60 h-60 bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-xl transition">
      <Image
        src={`/tecnologias/${image}`}
        alt={title}
        width={80}
        height={80}
        className="mb-4"
      />

      <h3 className="text-lg font-semibold text-center">{title}</h3>
    </div>
  );
}
/*
use state
use effect
use SWR
use params 
hooks 
rotas dinamicas 
Interfacescomponentes e props
*/