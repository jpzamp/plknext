'use client'
import useSWR from 'swr'

import { api } from '@/app/data/api'

import { PlkCupom } from '@/app/data/types/cupom'

import CupomItem from './cupom-item'
import ShimmerCupomList from '@/components/shimmers/shimmer-cupom-list'
import {
  filterCupomByCurrentDate,
  filterCupomByStartAndEndDate,
} from '@/utils/cupom-filters'

async function fetchCupons(): Promise<PlkCupom[]> {
  const response = await api('/listar/cupons')

  const { cupons } = await response.json()

  const cuponsFromCMS: PlkCupom[] = cupons
    .filter(filterCupomByCurrentDate)
    .filter(filterCupomByStartAndEndDate)

  return cuponsFromCMS
}

interface CupomListProps {
  filter?: string[]
}

export default function CupomList({ filter }: CupomListProps) {
  const {
    data: cuponsResponse,
    error,
    isLoading,
  } = useSWR('/listar/cupons', fetchCupons)

  if (isLoading || error) return <ShimmerCupomList />

  const cuponsList = cuponsResponse
    ?.map((couponCms) => ({
      title: couponCms.nome,
      code: couponCms.codigo,
      cupomId: couponCms.id,
      image: couponCms.imagens[0],
      price: couponCms.valor_descontado,
      oldPrice: couponCms.valor_regular,
      tags: couponCms.labels.map((label) => ({
        id: label.id,
        tag: label.nome,
      })),
    }))
    .filter((cupomItem) => {
      if (filter) return filter.find((cupom) => cupom === cupomItem.code)

      return true
    })

  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
      {cuponsList?.map((cupomItem, index) => (
        <CupomItem {...cupomItem} key={`cupom-${index}`} />
      ))}
    </div>
  )
}
