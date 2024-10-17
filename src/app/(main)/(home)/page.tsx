import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import AppStoreButton from '@/components/global/app-store-button'

import popeyesStars from '@/public/icons/popeyes-stars.svg'
import rappiIcon from '@/public/icons/rappi-logo.svg'
import ifoodIcon from '@/public/icons/ifood-logo.svg'
import HeroBanner from '@/components/hero-banner'
import { env } from '@/env'

export const metadata: Metadata = {
  title: 'Início',
}

export default async function Home() {
  return (
    <>
      <section id="banner-hero">
        <HeroBanner module="banner_home_web" />
      </section>
      <section
        id="delivery"
        className="bg-[url('/textures/popeyes-delivery-texture-responsive.png')] bg-contain bg-no-repeat lg:bg-cover lg:bg-[url('/textures/popeyes-delivery-texture.png')]"
      >
        <div className="mx-auto max-w-[1288px] min-h-[375px] lg:min-h-[768px] flex items-center justify-end">
          <div className="relative text-right mb-14 px-6 pt-3 w-full lg:w-auto">
            <h1 className="text-tertiary-800 font-bold text-xl lg:text-5xl">
              Bateu a fome? Vai de
            </h1>
            <span className="font-chicken-script text-secondary-500 text-4xl lg:text-8xl">
              Delivery
            </span>
            <Image
              src={popeyesStars}
              className="absolute hidden xl:block right-[-110px] top-10"
              alt="Popeyes Stars"
            />
            <div
              id="delivery-buttons"
              className="flex flex-col lg:flex-row justify-end gap-4 items-center mt-52 lg:mt-9"
            >
              <Link
                href={env.NEXT_PUBLIC_IFOOD_REDIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ED1722] px-8 py-4 w-full lg:w-auto flex items-center justify-center rounded-xl"
              >
                <Image src={ifoodIcon} height={70} alt="iFood icon"></Image>
              </Link>
              <Link
                href={env.NEXT_PUBLIC_RAPPI_REDIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FD6250] px-14 py-3 w-full lg:w-auto flex items-center justify-center rounded-xl"
              >
                <Image src={rappiIcon} height={80} alt="Rappi icon"></Image>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="download-app" className="bg-brick-wall-pattern">
        <div className="relative overflow-hidden mx-auto max-w-[1288px] flex justify-between items-center pt-11">
          <div className="py-9 px-6">
            <h1 className="text-xl lg:text-5xl font-bold mb-10">
              Baixe o App{' '}
              <span className="font-chicken-script font-normal text-5xl lg:text-[96px] text-primary-500">
                Popeyes
              </span>
              <br />e veja todas as ofertas
            </h1>
            <div className="flex flex-col max-w-56 lg:max-w-none lg:flex-row gap-8 mb-4">
              <AppStoreButton store="Google" />
              <AppStoreButton store="Apple" />
            </div>
            <p className="max-w-56 lg:max-w-xl text-[10px] lg:text-sm text-tertiary-600">
              Apple e o logotipo Apple são marcas comerciais da Apple Inc.,
              registadas nos EUA e em outros países. App Store é uma marca de
              serviço da Apple Inc. Google Play é uma marca registada da Google
              Inc. Aplicam-se os termos vigentes.
            </p>
          </div>

          <Image
            src={'/images/img-phone-popeyes-desktop.png'}
            alt="Popeyes Phone App PLK Desktop"
            className="hidden lg:block"
            width={418}
            height={560}
            quality={100}
          />

          <Image
            src={'/images/img-phone-popeyes-mobile.png'}
            alt="Popeyes Phone App PLK Desktop"
            className="block lg:hidden absolute right-[-40px] bottom-20"
            width={175}
            height={270}
            quality={100}
          />
        </div>
      </section>
    </>
  )
}
