import Image from "next/image";
import tecnologiasJson from "@/app/data/tecnologias.json";

export default function Tecnologias() {
  const tecnologias = JSON.parse(JSON.stringify(tecnologiasJson));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Tecnologias Exploradas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tecnologias.map((tec: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-xl transition"
          >
            <Image
              src={`/tecnologias/${tec.image}`}
              alt={tec.title}
              width={120}
              height={120}
              className="mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold text-center">{tec.title}</h3>

            <p className="text-gray-600 text-center mt-2">
              {tec.description}
            </p>

            <p className="text-yellow-500 text-center mt-3 font-semibold">
               Rating: {tec.rating}/5
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
