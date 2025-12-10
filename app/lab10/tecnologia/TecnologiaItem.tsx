import Link from "next/link";
import { Tecnologia } from "@/app/lab10/tecnologia/tecnologia";

interface Props {
  tecnologia: Tecnologia;
  index: number;
}

export default function TecnologiaItem( {tecnologia, index } : Props) {
return (
<div style={{ marginBottom: "16px" }}>
<h3>{tecnologia.title}</h3>
<Link href={`/tecnologia/${index}`}>Ver detalhes</Link>
</div>
);
}