'use client'
import { useCardapio } from '@/app/contexts/cardapio-context'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'
import { PlkCategory } from '@/app/data/types/product'
import { ChevronDown } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { Collapse } from 'react-collapse'
import { twMerge } from 'tailwind-merge'
// import PlkCheckbox from './global/checkbox'

export default function CardapioFilterLeft() {
  const { categories, currentCategoryFilterId, setCurrentCategoryFilterId } =
    useCardapio()

  const { sendButtonClickEvent } = useTagManager()

  function isCategoryActive(categoryId: number | undefined): boolean {
    return currentCategoryFilterId === categoryId
  }

  function handleSelectCategory(category: PlkCategory | undefined) {
    sendButtonClickEvent(ButtonEvents.FILTER_CATEGORY, {
      category: category?.nome,
    })
    setCurrentCategoryFilterId(category ? category.id : undefined)
  }

  /*
  function handleFilterByPeople(peopleAmount: number, checked: boolean) {
    if (checked) {
      addFilterPeopleAmount(peopleAmount)
      return
    }

    removeFilterPeopleAmount(peopleAmount)
  }
    */

  return (
    <div className="bg-white rounded-lg border-[0.7px] border-tertiary-150">
      <CardapioFilterSubDivisionLeft divisionName="Categorias">
        <ol className="flex flex-col gap-2">
          <li
            key={`plk-left-filter-all`}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleSelectCategory(undefined)}
          >
            <label
              className={twMerge(
                'block cursor-pointer',
                isCategoryActive(undefined)
                  ? 'text-primary-500'
                  : 'text-tertiary-600',
              )}
            >
              Todas
            </label>
            <div
              className={twMerge(
                'w-5 h-5 rounded-full',
                isCategoryActive(undefined)
                  ? 'bg-[#FF7D00]'
                  : 'border border-tertiary-400',
              )}
            />
          </li>
          {categories.map((category, index) => {
            return (
              <li
                key={`plk-left-filter-${index}`}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleSelectCategory(category)}
              >
                <label
                  className={twMerge(
                    'block cursor-pointer',
                    isCategoryActive(category.id)
                      ? 'text-primary-500'
                      : 'text-tertiary-600',
                  )}
                >
                  {category.nome}
                </label>
                <div
                  className={twMerge(
                    'w-5 h-5 rounded-full',
                    isCategoryActive(category.id)
                      ? 'bg-[#FF7D00]'
                      : 'border border-tertiary-400',
                  )}
                />
              </li>
            )
          })}
        </ol>
      </CardapioFilterSubDivisionLeft>
      {/*
      <CardapioFilterSubDivisionLeft
        divisionName="Serve quantas pessoas"
        defaultCollapseState={false}
      >
        <ol className="flex flex-col gap-2">
          <li className="flex items-center justify-between cursor-pointer">
            <span className="block cursor-pointer text-tertiary-600">
              1 pessoa
            </span>
            <PlkCheckbox
              onCheck={(checked: boolean) => handleFilterByPeople(1, checked)}
            />
          </li>
          <li className="flex items-center justify-between cursor-pointer">
            <span className="block cursor-pointer text-tertiary-600">
              2 pessoas
            </span>
            <PlkCheckbox
              onCheck={(checked: boolean) => handleFilterByPeople(2, checked)}
            />
          </li>
          <li className="flex items-center justify-between cursor-pointer">
            <span className="block cursor-pointer text-tertiary-600">
              3 ou + pessoas
            </span>
            <PlkCheckbox
              onCheck={(checked: boolean) => handleFilterByPeople(3, checked)}
            />
          </li>
        </ol>
      </CardapioFilterSubDivisionLeft>
      */}
    </div>
  )
}

interface CardapioFilterSubDivisionLeftProps {
  divisionName: string
  defaultCollapseState?: boolean
  children?: ReactNode
}

function CardapioFilterSubDivisionLeft({
  divisionName,
  children,
  defaultCollapseState = true,
}: CardapioFilterSubDivisionLeftProps) {
  const [collapse, setCollapse] = useState(defaultCollapseState)

  return (
    <>
      <div
        onClick={() => setCollapse(!collapse)}
        className={twMerge(
          'flex justify-between items-center font-bold text-base px-4 pt-[15px] pb-[12px] cursor-pointer',
          collapse && 'border-b border-tertiary-150',
        )}
      >
        <span>{divisionName}</span>
        <ChevronDown
          color="#F25600"
          className={`transition-transform ease-in-out duration-200 ${collapse ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>
      <Collapse isOpened={collapse}>
        <div className="px-4 pt-[15px] pb-[12px]">{children}</div>
        <hr className="w-full h-[1px] bg-tertiary-400 opacity-10" />
      </Collapse>
    </>
  )
}
