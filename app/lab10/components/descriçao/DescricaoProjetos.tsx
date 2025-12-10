import Projeto from "@/app/lab10/components/Projeto/Projeto";

export default function DescricaoProjetos() {
  return (
    <div className="text-blue-800 p-6 rounded-xl shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4 flex justify-center"> Tecnologias</h3>

      
        <a> HTML, CSS, JavaScript, React e Next.js.
        Estas são as tecnologias utilizadas no desenvolvimentos
        de todos os labs a baixo</a>
      
      <h3 className="text-xl font-semibold mb-4 flex justify-center"> Repositório</h3>

      <p className="mb-4">
       
        <a
          href="https://guilhermecachola.github.io/guilhermecarvalho.github.io/"
          target="_blank"
          className="text-blue-600 flex justify-center"
        >
           GitHub Pages
        </a>
      </p>

      <h3 className="text-xl font-semibold mb-4 flex justify-center"> Projetos</h3>

  <Projeto nome="Lab1" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab1/index.html"/>
  <Projeto nome="Lab2" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab2/index.html"/>
  <Projeto nome="Lab3" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab3/index.html"/>
  <Projeto nome="Lab4" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab4/index.html"/>
  <Projeto nome="Lab5" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab5/index.html"/>
  <Projeto nome="Lab6" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab6/index.html"/>
  <Projeto nome="Lab7" url="https://guilhermecachola.github.io/guilhermecarvalho.github.io/lab7/index.html"/>
  <Projeto nome="DeisiShop" url="https://opulent-waddle-9697j6jjq79246j-3000.app.github.dev/lab11/produtos"/>

 
    </div>
  );
}
