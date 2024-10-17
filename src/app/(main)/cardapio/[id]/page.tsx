import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { api } from '@/app/data/api'
import { PlkProduct } from '@/app/data/types/product'
import PlkContainer from '@/components/global/container'

import ProductAttributes, { ProductType } from '@/components/product-attributes'
import NutritionLabelButton from '@/components/nutrition-label-button'
import Button from '@/components/global/button'
import CupomList from '@/components/cupom-list'
import Badge from '@/components/global/badge'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<PlkProduct | null> {
  const response = await api(`/listar-produtos/${id}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  if (response.ok) {
    const product = await response.json()
    return product
  }

  return null
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product?.nome || 'Produto Não Encontrado',
  }
}

export async function generateStaticParams() {
  const response = await api(`/listar-produtos`)

  if (response.ok) {
    const { results }: { results: PlkProduct[] } = await response.json()

    return results.map((product) => ({
      id: String(product.id),
    }))
  }

  return []
}

export default async function CardapioItem({ params }: ProductProps) {
  const product = await getProduct(params.id)

  if (!product) {
    redirect('/404')
  }

  return (
    <>
      <section
        id="product-info"
        className="bg-brick-wall-pattern-w-hand-mixer pb-24"
      >
        <PlkContainer className="relative pt-8 px-6 md:px-0">
          <span className="text-tertiary-600 before:content-product-scribble before:absolute before:left-[-120px]">
            CARDÁPIO |{' '}
            {product.categorias[0]?.nome?.toUpperCase() || 'CARREGANDO...'}
          </span>
          <h2 className="text-6xl mb-6 md:text-8xl font-chicken-script text-secondary-500 mt-3">
            {product.nome}
          </h2>
          <div className="bg-white flex flex-col md:grid md:grid-cols-6 rounded-lg">
            <div className="min-h-[304px] max-h-[504px] relative w-full flex items-center justify-center col-span-4 rounded-lg">
              <Image
                width={310}
                height={200}
                src={product.imagem[0]?.url}
                className="z-10 w-auto h-auto max-h-[274px] md:max-h-[504px]"
                alt="Plk Product Image"
              />
              <div
                id="orange-bg"
                className="bg-primary-500 absolute bottom-0 w-full h-[204px] z-0 md:rounded-b-lg md:rounded-r-none"
              />
            </div>
            <div className="col-span-2 md:overflow-y-scroll p-6 md:border-l md:border-l-tertiary-400 text-tertiary-600 md:max-h-[504px]">
              <h5 className="flex items-center justify-between font-bold text-2xl text-neutral-900">
                {product.nome}
                {product.nome.length <= 15 && product.pessoas > 0 && (
                  <Badge className="text-primary-700 bg-tertiary-150 font-normal py-0 leading-6">
                    SERVE {product.pessoas} PESSOA
                    {product.pessoas > 1 ? 'S' : ''}
                  </Badge>
                )}
              </h5>
              <p className="mt-4">{product.descricao}</p>

              {product.quantidade_itens?.length > 0 && (
                <div id="product-sub-division" className="mt-10">
                  <div
                    id="product-sub-division-title"
                    className="w-full flex items-center justify-between gap-2"
                  >
                    <span className="font-bold">OPÇÕES DE BALDES</span>
                    <hr className="flex-1 opacity-30" />
                  </div>

                  <p className="mt-1">
                    Você pode escolher em {product.quantidade_itens?.length}{' '}
                    {product.quantidade_itens?.length > 1
                      ? 'tamanhos'
                      : 'tamanho'}
                    :
                  </p>
                  <ol id="product-sizes" className="list-inside list-disc pl-5">
                    {product.quantidade_itens?.map((item, index) => {
                      return (
                        <li
                          key={`product-size-${index}`}
                          className="marker:text-[12px]"
                        >
                          {item.descricao}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )}

              {(product.pedacos || product.files) && (
                <div id="product-sub-division" className="mt-10">
                  <div
                    id="product-sub-division-title"
                    className="w-full flex items-center justify-between gap-2"
                  >
                    <span className="font-bold">CORTE DO FRANGO</span>
                    <hr className="flex-1 opacity-30" />
                  </div>

                  <p className="mt-1">Escolha entre Pedaço ou filé:</p>

                  <div className="flex items-center justify-center gap-11 mt-4">
                    {product.pedacos && (
                      <ProductAttributes productType={ProductType.BoneIn} />
                    )}
                    {product.pedacos && product.files && (
                      <h3 className="block text-tertiary-800 font-bold text-2xl">
                        ou
                      </h3>
                    )}
                    {product.files && (
                      <ProductAttributes productType={ProductType.Boneless} />
                    )}
                  </div>
                </div>
              )}

              {(product.suave || product.vibrante) && (
                <div id="product-sub-division" className="mt-10">
                  <div
                    id="product-sub-division-title"
                    className="w-full flex items-center justify-between gap-2"
                  >
                    <span className="font-bold">TEMPERO</span>
                    <hr className="flex-1 opacity-30" />
                  </div>

                  <p className="mt-1">Escolha entre Suave ou Vibrante:</p>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    {product.suave && (
                      <ProductAttributes productType={ProductType.Mild} />
                    )}
                    {product.suave && product.vibrante && (
                      <h3 className="block text-tertiary-800 font-bold text-2xl">
                        ou
                      </h3>
                    )}
                    {product.vibrante && (
                      <ProductAttributes productType={ProductType.Spicy} />
                    )}
                  </div>
                </div>
              )}

              <NutritionLabelButton />
            </div>
          </div>
          <div
            id="product-cta-buttons"
            className="flex flex-col md:flex-row gap-8 mt-10"
          >
            <Button variant="secondary" redirectTo="/cardapio">
              Voltar para Cardápio
            </Button>
            <Button variant="secondary" redirectTo="/cupons">
              Ver Todos os Cupons
            </Button>
          </div>
        </PlkContainer>
      </section>
      {product.cupons_relacionados?.length > 0 && (
        <section id="product-cupons" className="bg-neutral-150">
          <PlkContainer className="pt-8 px-6 md:px-0">
            <h3 className="text-5xl font-chicken-script text-tertiary-800 pb-8">
              Cupons
            </h3>
            <CupomList
              filter={product.cupons_relacionados?.map((cupom) => cupom.codigo)}
            />
          </PlkContainer>
        </section>
      )}
    </>
  )
}
