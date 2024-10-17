'use client'

import { useState } from 'react'
import { Collapse } from 'react-collapse'

import Image from 'next/image'

import { ChevronUp, Heart } from 'lucide-react'

import Button from './global/button'
import Badge from './global/badge'

import {
  getCurrentDayClosingTime,
  getCurrentDayName,
  getDayNameInPortuguese,
  isRestaurantOpen,
  OpenHours,
} from '@/utils/date'
import { useAuth } from '@/app/contexts/session-context'
import { useRestaurants } from '@/app/contexts/restaurants-context'
import { formatTimeString } from '@/utils/time'
import { calculateDistance } from '@/utils/location'

interface RestaurantCardItemProps {
  restaurantId: number
  restaurantName: string
  restaurantAddress: string
  restaurantPicture: string
  restaurantSchedule: OpenHours[]

  restaurantLocation: {
    latitude: number
    longitude: number
  }

  isFavorite?: boolean
}

export default function RestaurantCardItem({
  restaurantId,
  restaurantName,
  restaurantAddress,
  restaurantPicture,
  restaurantSchedule,
  restaurantLocation,
  isFavorite = false,
}: RestaurantCardItemProps) {
  const { isAuthenticated } = useAuth()
  const { userLocation, setModalNeedAuthVisible, favoriteRestaurant } =
    useRestaurants()

  const [favorite, setFavorite] = useState<boolean>(isFavorite)
  const [collapseOpen, setCollapseOpen] = useState<boolean>(false)

  const restaurantCloseHour = getCurrentDayClosingTime(restaurantSchedule)
  const isOpen = isRestaurantOpen(restaurantSchedule)

  async function handleFavoriteRestaurant() {
    if (!isAuthenticated) {
      setModalNeedAuthVisible(true)
      return
    }

    const favoriteSuccess = await favoriteRestaurant(restaurantId)

    if (favoriteSuccess) {
      setFavorite(!favorite)
    }
  }

  return (
    <div className="bg-white w-full min-h-24 rounded-lg px-4 md:px-8 py-4">
      <div className="relative flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-4 items-start">
          <div className="flex items-center mt-2">
            <Button variant="ghost" onClick={handleFavoriteRestaurant}>
              <Heart
                fill={favorite ? '#FF7D00' : 'transparent'}
                stroke="#FF7D00"
                strokeWidth={favorite ? 0 : 2}
              />
            </Button>

            <Image
              src={restaurantPicture}
              className="rounded ml-2 md:ml-8 min-h-[80px] max-w-[124px] max-h-[80px]"
              width={124}
              height={80}
              alt="Popeyes Restaurant Picture"
            />
          </div>

          <div className="text-tertiary-600">
            <h1 className="text-base md:text-xl text-tertiary-800 md:inline font-bold leading-normal">
              {restaurantName}{' '}
            </h1>
            {userLocation && (
              <span className="font-normal text-sm md:text-base md:inline md:ml-6 text-tertiary-600">
                {calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  restaurantLocation.latitude,
                  restaurantLocation.longitude,
                )}{' '}
                km
              </span>
            )}
            <p className="text-[11px] md:text-sm">{restaurantAddress}</p>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-1">
              <Badge
                size="md"
                className={`${isOpen ? 'bg-helper-500' : 'bg-primary-700'}`}
              >
                {isOpen ? 'ABERTO' : 'FECHADO'}
              </Badge>
              <span className="text-[9px] md:text-xs">
                {getCurrentDayName()} -{' '}
                <b className="text-tertiary-800">
                  Aberto até às {formatTimeString(restaurantCloseHour)}
                </b>
              </span>
            </div>
            <Button
              variant="ghost"
              className="flex gap-2 md:ml-72 font-bold"
              onClick={() => setCollapseOpen(!collapseOpen)}
            >
              Mais detalhes
              <ChevronUp
                className={`transform transition-transform duration-200 ease-in-out ${collapseOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </Button>
            <Collapse isOpened={collapseOpen}>
              <h6 className="text-base font-bold text-tertiary-800 mt-2">
                Horários
              </h6>
              <ul className="text-sm">
                {restaurantSchedule.map((item) => (
                  <li key={item.day}>
                    {getDayNameInPortuguese(item.day)} -{' '}
                    {formatTimeString(item.opensAt)} -{' '}
                    {formatTimeString(item.closesAt)}
                  </li>
                ))}
              </ul>
            </Collapse>
          </div>
        </div>
        <Button
          variant="secondary"
          redirectTo="/cupons"
          className="w-full md:w-fit md:absolute md:top-4 md:right-0 mt-4 md:mt-0 rounded-full md:rounded-lg"
        >
          Ver Cupons
        </Button>
      </div>
    </div>
  )
}
