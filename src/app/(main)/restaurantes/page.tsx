import { Metadata } from 'next'

import PlkContainer from '@/components/global/container'
import RestaurantList from '@/components/restaurant-list'
import RestaurantSearchInput from '@/components/restaurant-search-input'

export const metadata: Metadata = {
  title: 'Restaurantes',
}

export default async function Restaurants() {
  return (
    <PlkContainer className="max-w-6xl p-6 mt-6 md:mt-32">
      <RestaurantSearchInput />
      <RestaurantList />
    </PlkContainer>
  )
}
