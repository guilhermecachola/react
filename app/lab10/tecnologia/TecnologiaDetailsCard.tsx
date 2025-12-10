import { Tecnologia } from "@/app/lab10/tecnologia/tecnologia";





export interface TecnologiaCardProps {
  tecnologia: Tecnologia;
}

export default function TecnologiaDetailsCard({ tecnologia }: TecnologiaCardProps) {
  return (
    <div  style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
      <h1>{tecnologia.title}</h1>

      <img
        src={`/icons/${tecnologia.image}`}
        alt={tecnologia.title}
        style={{ width: "80px", marginBottom: "12px" }}
      />

      <p>{tecnologia.description}</p>
      <p><strong>Rating:</strong> {tecnologia.rating}</p>
    </div>
  );
}
