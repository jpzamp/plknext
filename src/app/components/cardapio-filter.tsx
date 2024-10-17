'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useCardapio } from '@/app/contexts/cardapio-context'
import { useKeenSlider } from 'keen-slider/react'
import CardapioFilterItem from './cardapio-filter-item'
import { PlkCategory } from '@/app/data/types/product'
import { scrollToSection } from '@/utils/scroll'
import {
  ButtonEvents,
  useTagManager,
} from '@/app/contexts/google-analytics-context'

export default function CardapioFilters() {
  const { categories, currentCategoryFilterId, isLoading } = useCardapio()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentScrollCategoryId, setCurrentScrollCategoryId] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuBarRef = useRef<HTMLDivElement | null>(null)

  const [isFixed, setIsFixed] = useState<boolean>(false)
  const scrollThreshold = 360 // Height of the header is the threshold

  const { sendButtonClickEvent } = useTagManager()

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 8,
      spacing: 10,
    },
    breakpoints: {
      '(max-width: 500px)': {
        slides: {
          perView: 3,
        },
      },
    },
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => instanceRef.current?.update(), 10) // FIX: Keen Slider Bug (On Switch between NextJS Link Navigation)
  }, [instanceRef])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleSelectCategory(category: PlkCategory) {
    sendButtonClickEvent(ButtonEvents.FILTER_CATEGORY, {
      category: category.nome,
    })
    const elementId = `plk-category-section-${category.nome.toLowerCase().replaceAll(' ', '-')}`
    scrollToSection(elementId)
  }

  const categoryScrollWatcher = useCallback(() => {
    const verticalScroll = window.scrollY

    if (menuBarRef.current) {
      if (verticalScroll > 530) {
        menuBarRef.current.scrollLeft = 250
      } else if (verticalScroll > 800) {
        menuBarRef.current.scrollLeft = 600
      } else {
        menuBarRef.current.scrollLeft = 0
      }
    }

    const position = categories
      .map((category) => {
        const clamp = (value: number) => Math.max(0, value)
        const screenHeight = window.screen.height
        const offset = screenHeight / 2

        const categorySectionId = `plk-category-${category.nome.toLocaleLowerCase().replaceAll(' ', '-')}`
        const element = document.getElementById(categorySectionId)

        if (!element) {
          return {
            id: categorySectionId,
            categoryId: category.id,
            top: -1,
            bottom: -1,
          }
        }

        const rect = element.getBoundingClientRect()
        const top = clamp(rect.top + verticalScroll - offset)
        const bottom = clamp(rect.bottom + verticalScroll - offset)

        return {
          id: categorySectionId,
          categoryId: category.id,
          top,
          bottom,
        }
      })
      .find(
        ({ top, bottom }: { top: number; bottom: number }) =>
          verticalScroll >= top && verticalScroll <= bottom,
      )

    setCurrentScrollCategoryId(position?.categoryId || -1)
  }, [categories])

  useEffect(() => {
    window.addEventListener('resize', categoryScrollWatcher)
    window.addEventListener('scroll', categoryScrollWatcher)
  }, [categoryScrollWatcher])

  const shouldArrowAppears =
    loaded && categories.length > (isMobile ? 3 : 8) && instanceRef.current
  const slideCount = instanceRef.current?.track?.details?.slides?.length ?? 0

  if (isLoading)
    return <div className="min-h-24 bg-neutral-200 animate-pulse w-full" />

  return (
    <>
      {isFixed && <div className="h-[96px]" />}
      <div
        className={`min-h-24 bg-white w-full ${isFixed ? 'fixed top-0 md:top-[96px] z-50' : 'block'}`}
        ref={menuBarRef}
      >
        <div className="mx-auto max-w-[1288px] px-6 md:px-0 w-full">
          <div className="navigation-wrapper">
            <div
              ref={sliderRef}
              className={`keen-slider w-full pt-2 ${categories.length < 9 && 'md:justify-center'}`}
            >
              {categories?.map((category, index) => {
                return (
                  <CardapioFilterItem
                    key={`plk-category-${index}`}
                    category={category}
                    active={
                      currentCategoryFilterId === category.id ||
                      (currentCategoryFilterId === undefined &&
                        currentScrollCategoryId === category.id)
                    }
                    onSelectFilter={() => handleSelectCategory(category)}
                  />
                )
              })}
            </div>
            {shouldArrowAppears && (
              <>
                <Arrow
                  left
                  onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                    e.stopPropagation()
                    if (instanceRef.current) instanceRef.current.prev()
                  }}
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                    e.stopPropagation()
                    if (instanceRef.current) instanceRef.current.next()
                  }}
                  disabled={currentSlide === slideCount - 1}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}) {
  const disabled = props.disabled ? ' arrow--disabled' : ''
  const arrowDirection = props.left
    ? 'arrow-cardapio-left'
    : 'arrow-cardapio-right'

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${arrowDirection} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
    >
      {props.left && (
        <>
          <circle
            className="arrow-circle"
            cx="20"
            cy="20"
            r="20"
            fill="#E5E5E5"
          />
          <path
            className="arrow-path"
            d="M25.0019 10.9851C24.5119 10.4951 23.7219 10.4951 23.2319 10.9851L14.9219 19.2951C14.5319 19.6851 14.5319 20.3151 14.9219 20.7051L23.2319 29.0151C23.7219 29.5051 24.5119 29.5051 25.0019 29.0151C25.4919 28.5251 25.4919 27.7351 25.0019 27.2451L17.7619 19.9951L25.0119 12.7451C25.4919 12.2651 25.4919 11.4651 25.0019 10.9851Z"
            fill="#BDBDBD"
          />
        </>
      )}
      {!props.left && (
        <>
          <circle
            className="arrow-circle"
            cx="20"
            cy="20"
            r="20"
            fill="#E5E5E5"
          />
          <path
            className="arrow-path"
            d="M14.9982 29.0151C15.4882 29.5051 16.2782 29.5051 16.7682 29.0151L25.0782 20.7051C25.4682 20.3151 25.4682 19.6851 25.0782 19.2951L16.7682 10.9851C16.2782 10.4951 15.4882 10.4951 14.9982 10.9851C14.5082 11.4751 14.5082 12.2651 14.9982 12.7551L22.2382 20.0051L14.9882 27.2551C14.5082 27.7351 14.5082 28.5351 14.9982 29.0151Z"
            fill="#BDBDBD"
          />
        </>
      )}
    </svg>
  )
}
