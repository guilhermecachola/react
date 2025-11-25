import Projeto from "@/app/components/MagiaDoJSX/projeto";

export default function DescricaoProjetos() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <p className="mb-3">
         HTML, CSS, JavaScript, React e Next.js.
      </p>

      <p className="mb-4">
        Projetos:{" "}
        <a
          href="https://SEU_USERNAME.github.io"
          target="_blank"
          className="text-blue-600 underline"
        >
           GitHub Pages
        </a>
      </p>

      <h3 className="text-xl font-semibold mb-4"> Projetos</h3>


    </div>
  );
}
