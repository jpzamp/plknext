'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'
import useSWR, { mutate } from 'swr'
import debounce from 'lodash.debounce'

import { api } from '../data/api'
import { PlkRestaurant } from '../data/types/restaurant'
import { useAuth } from './session-context'

interface UserLocation {
  latitude: number
  longitude: number
}

interface RestaurantsContextType {
  page: 'LIST' | 'FAVORITES'
  restaurants: PlkRestaurant[]
  isLoadingRestaurants: boolean
  isModalNeedAuthVisible: boolean
  searchQuery: string
  userLocation: UserLocation | undefined
  favoriteRestaurant: (restaurantId: number) => Promise<boolean>
  setUserLocation: (
    userLocation: UserLocation | undefined,
  ) => Dispatch<SetStateAction<UserLocation>>
  setPage: (page: 'LIST' | 'FAVORITES') => void
  setSearchQuery: (query: string) => void
  setModalNeedAuthVisible: Dispatch<SetStateAction<boolean>>
}

const RestaurantsContext = createContext({} as RestaurantsContextType)

export function RestaurantsProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<'LIST' | 'FAVORITES'>('LIST')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [userLocation, setUserLocation] = useState<UserLocation>()
  const [isModalNeedAuthVisible, setModalNeedAuthVisible] =
    useState<boolean>(false)
  const { user, isAuthenticated } = useAuth()

  const debouncedSearchQuery = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query)
      }, 300),
    [],
  )

  async function fetchRestaurants(search: string) {
    const response = await api(
      `/listar-restaurantes?customer_id=${isAuthenticated ? user?.customerId : ''}&search=${search}`,
    )

    const { results } = await response.json()
    const restaurants: PlkRestaurant[] = results

    return restaurants
  }

  const { data: restaurants, isLoading: isLoadingRestaurants } = useSWR(
    `/listar-restaurantes?customer_id=${isAuthenticated ? user?.customerId : ''}&search=${searchQuery}`,
    () => fetchRestaurants(searchQuery),
  )

  async function favoriteRestaurant(restaurantId: number): Promise<boolean> {
    const response = await api(
      `/restaurante/favorito?customer_id=${user?.customerId}&restaurante_id=${restaurantId}`,
      { method: 'POST' },
    )

    if (response.ok) {
      mutate(
        `/listar-restaurantes?customer_id=${user?.customerId}&search=${searchQuery}`,
      )
      return true
    }

    return false
  }

  useEffect(() => {
    return () => {
      debouncedSearchQuery.cancel()
    }
  }, [debouncedSearchQuery])

  return (
    <RestaurantsContext.Provider
      value={{
        page,
        restaurants: restaurants || [],
        isLoadingRestaurants,
        isModalNeedAuthVisible,
        searchQuery,
        userLocation,
        favoriteRestaurant,
        setUserLocation,
        setPage,
        setModalNeedAuthVisible,
        setSearchQuery: debouncedSearchQuery, // Use the debounced function
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}

export const useRestaurants = () => useContext(RestaurantsContext)
