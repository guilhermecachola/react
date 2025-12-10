import MagiaDoJSX from '@/app/lab10/components/MagiaDoJSX/MagiaDoJSX'
import Link from 'next/link'

export default function Home() {

  const magia = <strong className='flex justify-center text-blue-500'>HTML dentro de JavaScript!</strong>
  const tecnologias = "React e Next.js"

  return (
    <div className="bg-blue-300 p-3 m-3 rounded-xl">
      <header className="flex flex-col gap-4 items-center">
        <h1 className = 'text-blue-500'>React & Next.js</h1>
        <nav className="flex gap-4 text-blue-900">
          <Link href="/">Intro</Link>
          <Link href="/lab10/sobre">Sobre</Link>
          <Link href="/lab10/tecnologias">Tecnologias</Link>
          <Link href="/lab10/caracteristicas">Características</Link>
          <Link href="/lab10/projetos">Projetos</Link>
          <Link href="/lab10/Contador">Contador</Link>
          <Link href="/lab11/produtos">DeisiShop</Link>
         </nav>
      </header>
      
      <h2 className='flex justify-center text-blue-500' >Interfaces Modernos</h2>
      <p className='flex justify-center'>Bem vindo à minha app em React e Next.js</p>
      <p className='flex justify-center'>Um componente é uma função que retorna JSX </p>
      <p className='flex justify-center'> {magia}.</p>
      <p className='flex justify-center'>Os componentes são usados em {tecnologias}</p>
   <MagiaDoJSX />
    </div>
   
  )
}
