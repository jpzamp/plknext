'use client'

import { useEffect, useState } from 'react'

import { useRestaurants } from '@/app/contexts/restaurants-context'

import Input from './global/input'
import Button from './global/button'

import LocationNotAllowedDialog from './dialogs/location-not-allowed-dialog'

export default function RestaurantSearchInput() {
  const { page, userLocation, setUserLocation, searchQuery, setSearchQuery } =
    useRestaurants()
  const [isLoadingUserLocation, setUserLocationLoading] =
    useState<boolean>(true)
  const [isModalErrorLocationVisible, setModalErrorLocationVisible] =
    useState<boolean>(false)
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value

    setInputValue(search)

    if (inputValue.length >= 3) {
      setSearchQuery(search)
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser')
      return
    }

    const successCallback = (position: GeolocationPosition) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    const errorCallback = () => {
      setUserLocationLoading(false)
    }

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted')
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

      setUserLocationLoading(false)
    })
  }, [setUserLocation])

  function handleAllowLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser')
      return
    }

    const successCallback = (position: GeolocationPosition) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    const errorCallback = (error: GeolocationPositionError) => {
      setUserLocationLoading(false)
      setModalErrorLocationVisible(true)
      console.error(error)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }

  return (
    <>
      <div
        className={`w-full flex flex-col md:grid md:grid-cols-10 items-start gap-2 md:gap-4 ${page === 'LIST' ? 'block' : 'hidden'}`}
      >
        <div className={!userLocation ? 'col-span-7' : 'col-span-10'}>
          <Input
            placeholder="Pesquise aqui..."
            value={inputValue}
            onChange={handleInputChange}
            className="w-full"
            helpMessage="Pesquise pelo endereço, nome, bairro ou cidade. Para resultados mais precisos, ative sua localização."
          />
        </div>
        {!userLocation && (
          <Button
            className="w-full mb-8 md:mb-0 md:col-span-3 min-h-12"
            loading={isLoadingUserLocation}
            disabled={isLoadingUserLocation}
            onClick={handleAllowLocation}
          >
            Ativar Localização
          </Button>
        )}
      </div>
      <LocationNotAllowedDialog
        setIsOpen={setModalErrorLocationVisible}
        isOpen={isModalErrorLocationVisible}
      />
    </>
  )
}
