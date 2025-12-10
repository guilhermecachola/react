import tecnologiasJson from "@/app/lab10/data/tecnologias.json";
import TecnologiaCard from "@/app/lab10/components/tecnologia/TecnologiaCard";

export default function TecnologiasPage() {
  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold mb-6 flex justify-center">Tecnologias Exploradas</h2>

      <div className="grid grid-cols-2 gap-14 justify-items-center">
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
