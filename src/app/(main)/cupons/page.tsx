import { Metadata } from 'next'

/* COMPONENTS */
import CupomList from '@/components/cupom-list'
import HeroBanner from '@/components/hero-banner'

import { cuponsBanners } from '@/app/data/mock/cupons-banners'

export const metadata: Metadata = {
  title: 'Cupons',
}

export default async function Cupons() {
  return (
    <>
      <section id="cupons-banner-hero">
        <HeroBanner
          mobileHeight={152}
          height={360}
          module="banner_cupons_web"
          mockFallback={cuponsBanners}
        />
      </section>
      <section id="cupons">
        <div className="mx-auto max-w-[1288px] md:pt-24 px-6 md:px-0">
          <h1 className="text-5xl font-chicken-script text-tertiary-800">
            Cupons
          </h1>
          <CupomList />
        </div>
      </section>
    </>
  )
}
