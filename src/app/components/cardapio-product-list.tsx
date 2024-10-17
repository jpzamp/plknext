'use client'

import { useCardapio } from '@/app/contexts/cardapio-context'
import { PlkCategory, PlkProduct } from '@/app/data/types/product'
import CardapioCardItem from './cardapio-card-item'
import ShimmerCardapioList from './shimmers/shimmer-cardapio-product-list'

interface ProductByCategory {
  [categoryName: string]: PlkProduct[]
}

const groupProductsByCategory = (products: PlkProduct[]): ProductByCategory => {
  const categoryMap: ProductByCategory = {}

  products.forEach((product) => {
    product.categorias.forEach((category) => {
      if (!categoryMap[category.nome]) categoryMap[category.nome] = []
      categoryMap[category.nome].push(product)
    })
  })

  return categoryMap
}

const sortCategoriesByOrdem = (
  categories: PlkCategory[],
  categoryMap: ProductByCategory,
): ProductByCategory => {
  // Create a sorted list of categories based on 'ordem'
  const sortedCategories = categories
    .filter((category) => category.nome in categoryMap)
    .sort((a, b) => a.ordem - b.ordem)

  // Create a new category map with sorted categories
  const sortedCategoryMap: ProductByCategory = {}

  sortedCategories.forEach((category) => {
    sortedCategoryMap[category.nome] = categoryMap[category.nome]
  })

  return sortedCategoryMap
}

export default function CardapioProductList() {
  const { products, categories, isLoading } = useCardapio()

  if (isLoading) return <ShimmerCardapioList />

  const groupedProducts = groupProductsByCategory(products)
  const sortedGroupedProducts = sortCategoriesByOrdem(
    categories,
    groupedProducts,
  )

  return (
    <div>
      {Object.keys(sortedGroupedProducts).map((categoryName, index) => (
        <div
          key={`plk-category-${categoryName}`}
          id={`plk-category-${categoryName.toLocaleLowerCase().replaceAll(' ', '-')}`}
        >
          <hr
            id={`plk-category-section-${categoryName.toLocaleLowerCase().replaceAll(' ', '-')}`}
            className={`plk-line w-full bg-tertiary-400 opacity-20 ${index !== 0 ? 'mt-[80px]' : 'hidden md:block'}`}
          />
          <h2 className="font-bold text-3xl md:text-[40px] mb-6 mt-14">
            {categoryName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sortedGroupedProducts[categoryName].map((product) => (
              <CardapioCardItem
                key={`plk-product-${product.id}`}
                productId={product.id}
                productName={product.nome}
                productImage={product?.imagens[0]?.url}
                productTags={product.labels.map((label) => label.nome)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
