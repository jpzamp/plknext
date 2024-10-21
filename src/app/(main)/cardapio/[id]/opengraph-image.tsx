/* eslint-disable @next/next/no-img-element */
import { api } from '@/app/data/api'
import { PlkProduct } from '@/app/data/types/product'
import { env } from '@/env'
import { ImageResponse } from 'next/og'

//export const runtime = 'edge'

async function getProduct(id: string): Promise<PlkProduct | null> {
  const response = await api(
    `/listar-produtos/${id}`,
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
    'CMS',
  )

  if (response.ok) {
    const product = await response.json()
    return product
  }

  return null
}

export default async function GET({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  const fallBackImage = new URL(
    '/popeyes-og-fallback-image.png',
    env.NEXT_PUBLIC_APPLICATION_BASE_URL,
  ).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FF7D00',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          width={product ? '500' : '400'}
          src={product?.imagem?.at(0)?.url || fallBackImage}
          alt=""
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
