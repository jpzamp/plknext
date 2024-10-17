'use client'

import RestaurantFilterButton from './restaurant-filter-button'

import ListIconComponent from './icons/list-icon'
import FavoriteIconComponent from './icons/favorite-icon'
import { useRestaurants } from '@/app/contexts/restaurants-context'
import { useAuth } from '@/app/contexts/session-context'

export default function RestaurantPageSelector() {
  const { page, setPage, setModalNeedAuthVisible } = useRestaurants()

  const { isAuthenticated } = useAuth()

  function handleFavoritesPageSelect() {
    if (!isAuthenticated) {
      setModalNeedAuthVisible(true)
      return
    }

    setPage('FAVORITES')
  }

  return (
    <div className="flex gap-2">
      <RestaurantFilterButton
        onClick={() => setPage('LIST')}
        selected={page === 'LIST'}
      >
        <ListIconComponent />
        Lista
      </RestaurantFilterButton>
      <RestaurantFilterButton
        onClick={handleFavoritesPageSelect}
        selected={page === 'FAVORITES'}
      >
        <FavoriteIconComponent />
        Favoritos
      </RestaurantFilterButton>
    </div>
  )
}
