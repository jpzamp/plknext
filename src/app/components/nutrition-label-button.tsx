'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

export default function NutritionLabelButton() {
  const router = useRouter()

  const { sendButtonClickEvent } = useTagManager()

  function handleClick() {
    sendButtonClickEvent(ButtonEvents.TABELA_NUTRICIONAL)
    router.push('/TABELA-NUTRICIONAL-PLK.pdf')
  }

  return (
    <div
      className="cursor-pointer border-t border-tertiary-400 py-4 flex items-center justify-between mt-8"
      onClick={handleClick}
    >
      <h6 className="font-bold text-tertiary-800">Informação Nutricional</h6>
      <SquareArrowOutUpRight color="#FF7D00" />
    </div>
  )
}
