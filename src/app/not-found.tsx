import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

import notFound from '@/public/icons/popeyes-not-found.svg'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center gap-7">
      <Image src={notFound} alt="Página não encontrada - Popeyes" />
      <h1 className="text-2xl font-bold">
        Ops! A página que você está procurando não foi encontrada.
      </h1>
      <p className="text-tertiary-600 max-w-[600px]">
        A Poppy não conseguiu encontrar a página que você estava procurando.
        Verifique o endereço ou clique no botão abaixo para voltar à página de
        início de nosso site.
      </p>
      <Link
        className="text-2xl font-bold px-6 py-[6px] bg-highlight-500 text-white rounded-lg"
        href="/"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
