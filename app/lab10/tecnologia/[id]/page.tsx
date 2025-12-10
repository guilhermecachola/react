import tecnologias from "@/app/lab10/data/tecnologias.json";
import TecnologiaDetailsCard from "@/app/lab10/components/tecnologia/TecnologiaCard";
import Link from "next/link";
import { Tecnologia } from "@/app/lab10/tecnologia/tecnologia";






interface Props {
  params: {
    id: string;
  };
}

export default function TecnologiaPage({ params }: Props) {
  const index = parseInt(params.id, 10);
  const tecnologia: Tecnologia | undefined = tecnologias[index];

  if (!tecnologia) {
    return <p>Tecnologia não encontrada.</p>;
  }

  const TecnologiaDetailsCardAny = TecnologiaDetailsCard as unknown as any;

  return (
    <div style={{ padding: "20px" }}>
      {}
      <TecnologiaDetailsCardAny tecnologia={tecnologia} />

      <Link href="/tecnologia" style={{ marginTop: "20px", display: "inline-block" }}>
        Voltar
      </Link>
    </div>
  );
}
