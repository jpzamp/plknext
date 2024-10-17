'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { PlkProduct, PlkCategory } from '../data/types/product'
import { api } from '../data/api'
import useSWR from 'swr'

interface CardapioContextType {
  products: PlkProduct[]
  categories: PlkCategory[]
  currentCategoryFilterId: number | undefined
  isLoading: boolean
  setCurrentCategoryFilterId: (categoryId: number | undefined) => void
  addFilterPeopleAmount: (peopleAmount: number) => void
  removeFilterPeopleAmount: (peopleAmount: number) => void
}

async function fetchCategories() {
  const response = await api('/listar-categorias')

  const { results } = await response.json()

  const categories: PlkCategory[] = results

  return categories
    .filter((category) => category.produtos.length >= 1)
    .sort((categoryA, categoryB) => categoryA.ordem - categoryB.ordem)
}

async function fetchProducts() {
  const response = await api('/listar-produtos')

  const { results } = await response.json()

  const products: PlkProduct[] = results

  return products
}

const CardapioContext = createContext({} as CardapioContextType)

export function CardapioProvider({ children }: { children: ReactNode }) {
  const { data: fullCategories, isLoading: isCategoriesLoading } = useSWR(
    '/listar-categorias',
    fetchCategories,
  )

  const { data: fullProducts, isLoading: isProductsLoading } = useSWR(
    '/listar-produtos',
    fetchProducts,
  )

  const [filteredProducts, setFilteredProducts] = useState<PlkProduct[]>([])

  const [categories, setCategories] = useState<PlkCategory[]>([])

  const [currentCategoryFilterId, setCurrentCategoryFilterId] = useState<
    number | undefined
  >(undefined)

  const [currentPeopleAmountFilter, setPeopleAmountFilter] = useState<
    number[] | undefined
  >(undefined)

  useEffect(() => {
    if (fullCategories) setCategories(fullCategories)
  }, [fullCategories])

  useEffect(() => {
    if (fullProducts) setFilteredProducts(fullProducts)
  }, [fullProducts])

  const filterByPeople = useCallback(
    (peopleAmounts: number[] | undefined) => {
      if (fullProducts) {
        if (!peopleAmounts || peopleAmounts.length === 0) {
          setFilteredProducts(fullProducts)
          return
        }

        const filtered = fullProducts.filter((product) => {
          if (peopleAmounts.includes(1) && product.pessoas === 1) {
            return true
          }

          if (peopleAmounts.includes(2) && product.pessoas === 2) {
            return true
          }

          if (peopleAmounts.includes(3) && product.pessoas >= 3) {
            return true
          }

          return false
        })

        setFilteredProducts(filtered)
      }
    },
    [fullProducts],
  )

  const filterCategory = useCallback(
    (categoryId: number | undefined) => {
      if (fullProducts) {
        if (categoryId === undefined) {
          setFilteredProducts(fullProducts)
          return
        }

        const filtered = fullProducts.filter((product) =>
          product.categorias.some((category) => category.id === categoryId),
        )
        setFilteredProducts(filtered)
      }
    },
    [fullProducts],
  )

  useEffect(() => {
    filterCategory(currentCategoryFilterId)
  }, [currentCategoryFilterId, filterCategory])

  useEffect(() => {
    filterByPeople(currentPeopleAmountFilter)
  }, [currentPeopleAmountFilter, filterByPeople])

  const isLoading = isCategoriesLoading || isProductsLoading

  function addFilterPeopleAmount(peopleAmount: number) {
    if (!currentPeopleAmountFilter) {
      setPeopleAmountFilter([peopleAmount])
      return
    }

    setPeopleAmountFilter([...currentPeopleAmountFilter, peopleAmount])
  }

  function removeFilterPeopleAmount(peopleAmount: number) {
    if (!currentPeopleAmountFilter) {
      setPeopleAmountFilter([])
      return
    }

    setPeopleAmountFilter(
      currentPeopleAmountFilter.filter((number) => peopleAmount !== number),
    )
  }

  return (
    <CardapioContext.Provider
      value={{
        products: filteredProducts,
        categories,
        currentCategoryFilterId,
        isLoading,
        setCurrentCategoryFilterId,
        addFilterPeopleAmount,
        removeFilterPeopleAmount,
      }}
    >
      {children}
    </CardapioContext.Provider>
  )
}

export const useCardapio = () => useContext(CardapioContext)
