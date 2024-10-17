'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Badge from './global/badge'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

interface CardapioCardItemProps {
  productId: number
  productImage: string
  productName: string
  productTags?: string[]
}

export default function CardapioCardItem({
  productId,
  productImage,
  productName,
  productTags,
}: CardapioCardItemProps) {
  const router = useRouter()

  const { sendButtonClickEvent } = useTagManager()

  function handleRedirectToProductPage() {
    sendButtonClickEvent(ButtonEvents.PRODUCT_VIEW, {
      productId,
      productName,
    })
    router.push(`/cardapio/${productId}`)
  }

  return (
    <div
      className="bg-white flex flex-col max-w-44 md:max-w-80 rounded-lg cursor-pointer"
      onClick={handleRedirectToProductPage}
    >
      <div className="min-h-[174px] md:min-h-[304px] max-h-[304px] relative w-full flex items-center justify-center">
        <Image
          width={310}
          height={200}
          src={productImage}
          className="z-10 w-auto h-auto max-h-[174px] md:max-h-[304px]"
          alt="Plk Product Image"
        />
        <div
          id="orange-bg"
          className="bg-primary-500 absolute bottom-0 w-full h-[104px] z-0"
        />
      </div>
      <div className="p-3">
        <span className="block font-bold text-xl mb-2">{productName}</span>
        <div id="plk-tags" className="flex flex-wrap gap-2">
          {productTags?.slice(0, 3).map((tag) => {
            return (
              <Badge key={`badge-${tag.replace(' ', '-')}`} size="md">
                {tag.toUpperCase()}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}
