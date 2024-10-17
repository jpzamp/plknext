'use client'

import { useState } from 'react'
import { Collapse } from 'react-collapse'
import { ChevronUp } from 'lucide-react'

import RestaurantCardItem from './restaurant-card-item'
import { DaysOfWeek } from '@/utils/date'

import {
  FuncionamentoRestaurante,
  PlkRestaurant,
} from '@/app/data/types/restaurant'

interface RestaurantStateItemProps {
  stateName: string
  restaurants: PlkRestaurant[]

  isFavoritePage?: boolean

  open?: boolean
}

export default function RestaurantStateItem({
  stateName,
  restaurants,
  isFavoritePage = false,
  open = false,
}: RestaurantStateItemProps) {
  const [collapseOpen, setCollapseOpen] = useState(open)

  const mapRestaurantSchedule = (funcionamento: FuncionamentoRestaurante) => {
    const days = [
      {
        day: DaysOfWeek.Monday,
        start: funcionamento.start_segunda,
        end: funcionamento.end_segunda,
      },
      {
        day: DaysOfWeek.Tuesday,
        start: funcionamento.start_terca,
        end: funcionamento.end_terca,
      },
      {
        day: DaysOfWeek.Wednesday,
        start: funcionamento.start_quarta,
        end: funcionamento.end_quarta,
      },
      {
        day: DaysOfWeek.Thursday,
        start: funcionamento.start_quinta,
        end: funcionamento.end_quinta,
      },
      {
        day: DaysOfWeek.Friday,
        start: funcionamento.start_sexta,
        end: funcionamento.end_sexta,
      },
      {
        day: DaysOfWeek.Saturday,
        start: funcionamento.start_sabado,
        end: funcionamento.end_sabado,
      },
      {
        day: DaysOfWeek.Sunday,
        start: funcionamento.start_domingo,
        end: funcionamento.end_domingo,
      },
    ]

    return days.map((day) => ({
      day: day.day,
      opensAt: day.start,
      closesAt: day.end,
    }))
  }

  function handleCollapse() {
    if (isFavoritePage) return

    setCollapseOpen(!collapseOpen)
  }

  return (
    <div
      id="restaurant-state-wrapper"
      className={`relative py-4 ${isFavoritePage ? 'border-none' : 'border-t border-tertiary-400'}`}
    >
      <div
        className={`flex items-center justify-between text-center ${isFavoritePage ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={handleCollapse}
      >
        <h1
          className={`font-bold mb-5 ${isFavoritePage ? 'text-base text-tertiary-400 uppercase' : 'text-3xl '}`}
        >
          {stateName}{' '}
          <span
            className={`text-tertiary-600 text-2xl ${isFavoritePage ? 'hidden' : 'inline'}`}
          >
            ({restaurants.length})
          </span>
        </h1>
        {!isFavoritePage && (
          <ChevronUp
            size={32}
            color="#F25600"
            className={`transform transition-transform duration-200 ease-in-out ${collapseOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        )}
      </div>
      <Collapse isOpened={isFavoritePage ? true : collapseOpen}>
        <div className="flex flex-col gap-4">
          {restaurants.map((restaurant) => {
            const restaurantSchedule = restaurant.funcionamento_restaurante
              ? mapRestaurantSchedule(restaurant.funcionamento_restaurante)
              : []

            return (
              <RestaurantCardItem
                key={`restaurant-${restaurant.id}`}
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
                restaurantAddress={`${restaurant.logradouro}, ${restaurant.numero} - ${restaurant.cidade}`}
                restaurantPicture={restaurant.imagem[0]?.url}
                restaurantSchedule={restaurantSchedule}
                restaurantLocation={{
                  latitude: parseFloat(restaurant.latitude),
                  longitude: parseFloat(restaurant.longitude),
                }}
                isFavorite={restaurant.favorito}
              />
            )
          })}
        </div>
      </Collapse>
    </div>
  )
}
