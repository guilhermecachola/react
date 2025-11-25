import MagiaDoJSX from '@/app/components/MagiaDoJSX/MagiaDoJSX'
import Link from 'next/link'

export default function Home() {

  const magia = <strong>HTML dentro de JavaScript!</strong>
  const tecnologias = "React e Next.js"

  return (
    <div className="bg-blue-300 p-3 m-3 rounded-xl">
      <header className="flex flex-col gap-4 items-center">
        <h1>React & Next.js</h1>

        <nav className="flex gap-4">
          <Link href="/">Intro</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/tecnologias">Tecnologias</Link>
          <Link href="/caracteristicas">Características</Link>
          <Link href="/projetos">Projetos</Link>
        </nav>
      </header>

      <h2>Interfaces Modernos</h2>
      <p>Bem vindo à minha app em React e Next.js</p>
      <p>Um componente é uma função que retorna JSX – {magia}.</p>
      <p>Os componentes são usados em {tecnologias}</p>

      <MagiaDoJSX />
    </div>
  )
}
