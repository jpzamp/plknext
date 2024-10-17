'use client'

import useSWR from 'swr'
import { api } from '@/app/data/api'
import { homeBanners } from '@/app/data/mock/home-banners'

import { Banner, CMSBanner } from '@/app/data/types/banner'

import PopeyesCarousel from './carousel'
import { CarouselShimmer } from './shimmers/carousel-shimmer'
import { filterBannerByCurrentDate } from '@/utils/banner-filter'

interface BannerProps {
  module: 'banner_home_web' | 'banner_cupons_web' | 'banner_cardapio_web'
  height?: number
  mobileHeight?: number
  mockFallback?: Banner[]
}

async function getMainBanner(url: string): Promise<CMSBanner[]> {
  const response = await api(url)

  const { results } = await response.json()

  const bannersFromCMS: CMSBanner[] = results

  return bannersFromCMS
}

export default function HeroBanner({
  module,
  height = 720,
  mobileHeight = 327,
  mockFallback = homeBanners,
}: BannerProps) {
  const { data, error, isLoading } = useSWR<CMSBanner[]>(
    `/story?modulo=${module}`,
    getMainBanner,
  )

  if (isLoading || error || !data)
    return <CarouselShimmer height={height} mobileHeight={mobileHeight} />

  const banners = data
    .filter((result) => result.imagem_web)
    .filter(filterBannerByCurrentDate)
    .map((result) => {
      return {
        image: {
          desktop: result.imagem_web.url,
          mobile: result.imagem.url,
        },
        actionUrl: result.link,
      }
    })

  return (
    <PopeyesCarousel
      mobileHeight={mobileHeight}
      height={height}
      banners={banners.length > 0 ? banners : mockFallback}
    />
  )
}
