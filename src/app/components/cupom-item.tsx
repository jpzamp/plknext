'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CupomTag from './cupom-tag'
import formatBRL from '@/utils/format-price'
import { ChevronRight } from 'lucide-react'

import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

export interface CupomItemProps extends React.ComponentProps<'div'> {
  title: string
  code: string
  cupomId: number
  oldPrice?: number
  price: number
  image: {
    name: string
    alternativeText: string | null
    url: string
  }
  tags?: {
    id: number
    tag: string
  }[]
}

export default function CupomItem({
  title,
  code,
  cupomId,
  oldPrice,
  price,
  image,
  tags,
}: CupomItemProps) {
  const router = useRouter()

  const { sendButtonClickEvent } = useTagManager()

  function handleOpenCoupon() {
    sendButtonClickEvent(ButtonEvents.VIEW_CUPOM, {
      cupomName: title,
      isDayOffer: false,
      cupomCode: code,
      categoryOrder: 100,
      cupomValue: price || oldPrice,
    })
    router.push(`/cupons/${cupomId}`)
  }

  return (
    <div
      className="max-w-[180px] md:max-w-[310px] cursor-pointer pb-8"
      key={`cupom-code-${code}`}
      onClick={handleOpenCoupon}
    >
      <div className="relative bg-white flex flex-col items-center justify-center max-h-[180px] min-h-[180px] md:max-h-[310px] md:min-h-[310px] rounded-3xl drop-shadow-cupom">
        <Image
          width={310}
          height={310}
          className="w-auto h-auto"
          priority
          src={image.url}
          alt={image.alternativeText || 'Popeyes Image'}
        />
        <div className="absolute right-0 top-6 flex items-end flex-col gap-1 text-end">
          {tags?.map((tag, index) => (
            <CupomTag
              highlightedPurple={index === 0}
              highlightedGreen={index === 2}
              key={`cupom-tag-${index}`}
            >
              {tag.tag}
            </CupomTag>
          ))}
        </div>
      </div>
      <h4 className="text-xl md:text-2xl mt-2">{title}</h4>
      {oldPrice && (
        <span className="text-tertiary-600 text-sm block line-through">
          De {formatBRL(oldPrice)}
        </span>
      )}
      <span className="text-secondary-500 text-xl font-bold">
        {formatBRL(price)}
        <ChevronRight className="inline" size={24} color={'#F25600'} />
      </span>
    </div>
  )
}
