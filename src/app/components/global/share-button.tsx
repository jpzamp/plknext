'use client'
import { usePathname, useSearchParams } from 'next/navigation'

import * as copy from 'copy-to-clipboard'

import Image from 'next/image'
import Button from './button'

import shareIcon from '@/public/icons/share-icon.svg'
import { useState } from 'react'
import { CopyCheck } from 'lucide-react'

interface ShareButtonProps {
  content?: string
}

export default function ShareButton({ content = '' }: ShareButtonProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [success, setSuccess] = useState(false)

  function handleShare() {
    if (success) return

    const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`

    copy(content.length <= 0 ? fullUrl : content)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000) // 3 seconds
  }

  return (
    <Button variant="ghost" onClick={handleShare}>
      {success ? (
        <CopyCheck color="#BDBDBD" />
      ) : (
        <Image src={shareIcon} alt="Compartilhar cupom" />
      )}
    </Button>
  )
}
