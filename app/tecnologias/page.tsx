import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaCard from "@/app/components/MagiaDoJSX/TecnologiaCard";

export default function TecnologiasPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Tecnologias Exploradas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tecnologiasJson.map((tec, index) => (
          <TecnologiaCard
            key={index}
            title={tec.title}
            image={tec.image}
          />
        ))}
      </div>
    </div>
  );
}
