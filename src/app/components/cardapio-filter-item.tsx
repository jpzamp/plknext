'use client'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { PlkCategory } from '@/app/data/types/product'

import fallbackIcon from '@/public/icons/popeyes-fallback-category-icon.svg'

interface CardapioFilterItemProps {
  category: PlkCategory
  active?: boolean
  onSelectFilter: () => void
}

export default function CardapioFilterItem({
  category,
  active = false,
  onSelectFilter,
}: CardapioFilterItemProps) {
  return (
    <div
      className="group relative keen-slider__slide flex flex-col items-center gap-2 text-center cursor-pointer plk-category-icon-wrapper"
      onClick={onSelectFilter}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
        <defs>
          <filter id="plk-bg-overlay">
            <feColorMatrix
              colorInterpolationFilters="sRGB"
              type="matrix"
              values="1.00 0   0   0   0 0   0.49  0   0   0 0   0   0.00  0   0 0   0   0   1   0 "
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
      <Image
        src={category.imagem?.url || fallbackIcon}
        width={48}
        height={48}
        className={twMerge('opacity-30 plk-category-icon', active && 'active')}
        alt="Plk Icon"
      />
      <span
        className={twMerge(
          'font-bold group-hover:text-primary-500 group-hover:opacity-100',
          active ? 'text-primary-500 opacity-100' : 'opacity-50',
        )}
      >
        {category.nome.length >= 14
          ? category.nome.split(' ')[0]
          : category.nome}
      </span>
      <div className={twMerge('plk-active-indicator', active && 'active')} />
    </div>
  )
}
