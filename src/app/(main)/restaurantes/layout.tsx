import { ReactNode } from 'react'

import PlkContainer from '@/components/global/container'
import Image from 'next/image'

import poppyRestaurantIcon from '@/public/images/poppy-restaurants.svg'

import { RestaurantsProvider } from '@/app/contexts/restaurants-context'
import RestaurantPageSelector from '@/components/restaurant-page-selector'

export default function RestaurantsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <RestaurantsProvider>
      <section className="bg-white md:fixed w-full z-[9999]">
        <PlkContainer className="flex items-center md:items-stretch justify-between pt-2 px-2 md:pt-5">
          <div className="flex items-center flex-col px-8 md:px-0">
            <div className="flex relative">
              <h3 className="text-tertiary-800 text-lg md:text-3xl font-bold pb-7">
                Encontre um
              </h3>
              <span className="text-primary-500 block absolute top-4 left-[-20px] md:left-[-40px] font-normal text-4xl md:text-6xl font-chicken-script">
                Restaurante
              </span>
              <Image
                src={poppyRestaurantIcon}
                className="hidden md:block ml-32 mt-2"
                alt="Poppy"
              />
            </div>
          </div>
          <RestaurantPageSelector />
        </PlkContainer>
      </section>
      {children}
    </RestaurantsProvider>
  )
}
