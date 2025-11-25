type ProjetoProps = {
  nome: string;
  url: string;
};

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <p className="mb-2">
      Projeto: <strong>{nome}</strong> —{" "}
      <a
        href={url}
        target="_blank"
        className="text-blue-600 underline"
      >
        Aceder ao projeto
      </a>
    </p>
  );
}
