'use client'

import { HTMLProps } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ChevronLeft } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface BackArrowProps extends HTMLProps<HTMLAnchorElement> {
  className?: string
}

export default function BackArrow({ className, ...props }: BackArrowProps) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <Link
      href="#"
      className={twMerge(
        'flex items-center gap-1 w-fit text-xl text-highlight-500 font-bold',
        className,
      )}
      onClick={handleGoBack}
      {...props}
    >
      <ChevronLeft width={24} />
      <span className="underline decoration-1">Voltar</span>
    </Link>
  )
}
