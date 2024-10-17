/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable n/handle-callback-err */
'use client'
import Image from 'next/image'
import localFont from 'next/font/local'

import { useEffect } from 'react'

import errorImage from '@/public/icons/popeyes-error.svg'

import './globals.css'

const chickenSans = localFont({
  src: [
    {
      path: '../../public/fonts/ChickenSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ChickenSans-Bold.woff2',
      weight: '800',
    },
  ],
  variable: '--font-chicken-sans',
})

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const handleReload = () => {
    window.location.reload()
  }

  useEffect(() => {
    console.error(error)
  }, [])

  return (
    // global-error must include html and body tags
    <html>
      <head>
        <title>Ocorreu um erro | Louisiana Kitchen - Popeyes Brasil</title>
      </head>
      <body
        className={`${chickenSans.variable} font-sans bg-neutral-500 overflow-hidden`}
      >
        <div className="w-screen h-screen flex flex-col items-center justify-center text-center gap-7">
          <Image src={errorImage} alt="Erro - Popeyes" />
          <h1 className="text-2xl font-bold">
            Ops! Ocorreu um erro ao carregar esta página.
          </h1>
          <p className="text-tertiary-600 max-w-[600px]">
            A Poppy não conseguiu carregar esta página. Tente novamente mais
            tarde
          </p>
          <button
            className="text-2xl font-bold px-6 py-[6px] bg-highlight-500 text-white rounded-lg"
            onClick={handleReload}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}
