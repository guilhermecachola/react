type ProjetoProps = {
  nome: string;
  url: string;
};

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <p className="mb-2 text-blue-600 flex justify-center">
      Projeto: <strong>{nome}</strong> {" "}
      <a> - </a>{" "}
      <a  href={url} target="_blank" className="text-blue-600 underline" >
        abrir
      </a>
    </p>
  );
}
