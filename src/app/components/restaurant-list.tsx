/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from 'next/image'

import Lottie from 'lottie-react'

import RestaurantStateItem from './restaurant-state-item'

import { PlkRestaurant } from '@/app/data/types/restaurant'
import { useRestaurants } from '@/app/contexts/restaurants-context'

import NeedAuthFavoriteRestaurantDialog from './dialogs/favorite-restaurant-auth-dialog'

import poppyAnimationData from '@/public/poppy-loading-data.json'
import popeyesNotFound from '@/public/icons/popeyes-not-found.svg'
import Button from './global/button'

export default function RestaurantList() {
  const {
    page,
    setPage,
    restaurants,
    isLoadingRestaurants,
    isModalNeedAuthVisible,
    setModalNeedAuthVisible,
  } = useRestaurants()

  const groupedRestaurants: Record<string, PlkRestaurant[]> =
    restaurants.reduce(
      (acc, restaurant) => {
        const state = restaurant.estado
        if (!acc[state]) {
          acc[state] = []
        }
        acc[state].push(restaurant)
        return acc
      },
      {} as Record<string, PlkRestaurant[]>,
    )

  if (isLoadingRestaurants) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Lottie
          animationData={poppyAnimationData}
          className="max-w-64"
          loop={true}
        />
      </div>
    ) // Loading state
  }

  const totalFavorites = Object.entries(groupedRestaurants)
    .filter(([_, restaurants]) =>
      restaurants.some((restaurant) => restaurant.favorito),
    )
    .reduce((acc, [_, restaurants]) => {
      return (
        acc + restaurants.filter((restaurant) => restaurant.favorito).length
      )
    }, 0)

  if (page === 'FAVORITES' && totalFavorites === 0) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center max-w-md text-center mx-auto">
        <Image src={popeyesNotFound} alt="Popeyes Não Encontrado" />
        <h3 className="font-bold text-xl mt-2">
          Você ainda não tem restaurantes favoritos
        </h3>
        <p className="text-tertiary-600">
          Encontre os melhores restaurantes em “Lista” ou “Mapa”. Aproveite e
          ative sua localização para resultados mais precisos.
        </p>
        <Button
          onClick={() => setPage('LIST')}
          className="rounded-full w-full max-w-80 mt-4"
        >
          Voltar para lista
        </Button>
      </div>
    )
  }

  return (
    <>
      <div>
        {page === 'FAVORITES' && (
          <h1 className="text-tertiary-800 text-3xl font-bold">
            Meus restaurantes favoritos{' '}
            <span className="text-tertiary-600 text-2xl">
              ({totalFavorites})
            </span>
          </h1>
        )}
        {Object.entries(groupedRestaurants)
          .sort(([stateA], [stateB]) => stateA.localeCompare(stateB)) // Sort states alphabetically
          .filter(([_, restaurants]) => {
            if (page === 'FAVORITES')
              return restaurants.find((restaurant) => restaurant.favorito)

            return true
          })
          .map(([state, restaurants], index) => (
            <RestaurantStateItem
              key={state}
              stateName={state}
              restaurants={
                page === 'FAVORITES'
                  ? restaurants.filter((restaurant) => restaurant.favorito)
                  : restaurants
              }
              isFavoritePage={page === 'FAVORITES'}
              open={index === 0}
            />
          ))}
      </div>
      <NeedAuthFavoriteRestaurantDialog
        isOpen={isModalNeedAuthVisible}
        setIsOpen={setModalNeedAuthVisible}
      />
    </>
  )
}
