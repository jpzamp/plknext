import { Metadata } from 'next'

import { cardapioBanners } from '@/app/data/mock/cardapio-banners'

import HeroBanner from '@/components/hero-banner'
import CardapioFilters from '@/components/cardapio-filter'
import CardapioProductList from '@/components/cardapio-product-list'

import { CardapioProvider } from '@/app/contexts/cardapio-context'
import CardapioFilterLeft from '@/components/cardapio-filter-left'

export const metadata: Metadata = {
  title: 'Cardápio',
}

export default function Cardapio() {
  return (
    <>
      <section id="cardapio-banner-hero">
        <HeroBanner
          mobileHeight={152}
          height={360}
          module="banner_cardapio_web"
          mockFallback={cardapioBanners}
        />
      </section>
      <section id="cardapio" className="mb-12 bg-neutral-500">
        <CardapioProvider>
          <CardapioFilters />

          <div className="mx-auto max-w-[1288px] md:mt-24 px-6 md:px-0 grid grid-cols-2 md:grid-cols-12 gap-20">
            {/* Left side container wrapper */}
            <div className="hidden md:block col-span-3 w-full">
              <CardapioFilterLeft />
            </div>

            {/* Right side container wrapper */}
            <div className="col-span-2 md:col-span-9 w-full">
              <CardapioProductList />
            </div>
          </div>
        </CardapioProvider>
      </section>
    </>
  )
}
