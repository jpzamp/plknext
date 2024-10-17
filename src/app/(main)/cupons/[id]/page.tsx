import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { api } from '@/app/data/api'
import { PlkCupom } from '@/app/data/types/cupom'
import PlkContainer from '@/components/global/container'
import BackArrow from '@/components/global/back-arrow'

import ShareButton from '@/components/global/share-button'
import formatBRL from '@/utils/format-price'
import AppStoreButton from '@/components/global/app-store-button'
import CupomTag from '@/components/cupom-tag'
import CouponClaimDialogButton from '@/components/dialogs/cupom-claim-dialog'
import { Suspense } from 'react'

interface CouponProps {
  params: {
    id: string
  }
}

async function getCoupon(id: string): Promise<PlkCupom | null> {
  const response = await api(`/detalhes/cupom?id=${id}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  if (response.ok) {
    const data = await response.json()

    if ('result' in data) {
      // Backend not returning 404 (Why?)
      return null
    }

    return data
  }

  return null
}

export async function generateMetadata({
  params,
}: CouponProps): Promise<Metadata> {
  const product = await getCoupon(params.id)

  return {
    title: product?.nome || 'Cupom Não Encontrado',
  }
}

export async function generateStaticParams() {
  const response = await api(`/listar/cupons`)

  if (response.ok) {
    const { cupons }: { cupons: PlkCupom[] } = await response.json()

    return cupons.map((coupon) => ({
      id: String(coupon.id),
    }))
  }

  return []
}

export default async function CardapioItem({ params }: CouponProps) {
  const coupon = await getCoupon(params.id)

  if (!coupon) {
    redirect('/404')
  }

  return (
    <>
      <section id="coupon-info">
        <PlkContainer className="px-6">
          <BackArrow className="my-6 md:my-16" />

          <div className="flex flex-col md:flex-row w-full gap-9">
            <div className="bg-white relative w-full md:w-2/4 max-h-[470px] flex items-center justify-center rounded-3xl">
              <Image
                width={470}
                height={470}
                loading="lazy"
                src={coupon.imagens[0]?.url}
                alt="Popeyes - Imagem do Cupom"
              />
              <div className="absolute right-0 top-6 flex items-end flex-col gap-1 text-end">
                {coupon.labels?.map((tag, index) => (
                  <CupomTag
                    highlightedPurple={index === 0}
                    highlightedGreen={index === 2}
                    key={`cupom-tag-${index}`}
                  >
                    {tag.nome}
                  </CupomTag>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/4 text-wrap">
              <div className="w-full flex items-center justify-between">
                <h4 className="font-chicken-script text-3xl">{coupon.nome}</h4>
                <Suspense>
                  <ShareButton />
                </Suspense>
              </div>
              <h5 className="text-xl font-bold text-secondary-500">
                {formatBRL(coupon.valor_descontado)}
              </h5>
              <p className="mt-4 text-neutral-800 break-words whitespace-pre-wrap">
                {coupon.descricao}
              </p>
            </div>
          </div>
          <div className="my-8 flex flex-col items-center justify-center">
            <CouponClaimDialogButton coupon={coupon} />

            <span className="mt-8 text-neutral-800 my-8">
              Mostre o código do cupom para o atendente do caixa ou digite no
              totem.
            </span>
          </div>
        </PlkContainer>
      </section>
      <section id="download-the-app" className="bg-white">
        <PlkContainer className="flex items-center justify-center gap-7 py-6 px-6">
          <div className="text-center py-7">
            <span className="font-bold text-tertiary-800 text-base md:text-3xl">
              Aproveite todas as ofertas no
            </span>
            <h2 className="font-chicken-script text-primary-500 text-3xl md:text-7xl">
              App Popeyes
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:flex-row items-center justify-center">
            <AppStoreButton store="Google" />
            <AppStoreButton store="Apple" />
          </div>
        </PlkContainer>
      </section>
    </>
  )
}
