'use client'

import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'
import { useRouter } from 'next/navigation'

import { useKeenSlider } from 'keen-slider/react'

import { Banner } from '@/app/data/types/banner'
import { useState } from 'react'

interface PopeyesCarouselProps {
  banners: Banner[]
  height?: number
  mobileHeight?: number
}

export default function PopeyesCarousel({
  banners,
  height = 720,
  mobileHeight = 327,
}: PopeyesCarouselProps) {
  const router = useRouter()

  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: banners.length > 1,
      slides: {
        origin: 'center',
        perView: 1,
        spacing: 15,
      },
      drag: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            if (banners.length <= 0) return
            slider.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  const shouldArrowAppears = loaded && banners.length > 1 && instanceRef.current
  const slideCount = instanceRef.current?.track?.details?.slides?.length ?? 0

  function handleBannerClick(index: number) {
    const banner = banners[index]
    router.push(banner.actionUrl)
  }

  return (
    <div className="relative">
      <div className={`navigation-wrapper py-14 px-6 md:py-0 md:px-0`}>
        <div
          ref={sliderRef}
          className={`keen-slider min-w-[327px] md:min-w-full`}
        >
          {banners.map((banner, index) => {
            return (
              <div
                className="keen-slider__slide lazy__slide"
                key={index}
                onClick={() => handleBannerClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={banner.image.desktop}
                  alt="Popeyes Banner"
                  width={0}
                  height={0}
                  priority
                  sizes="100vw"
                  style={{ width: '100%', height, objectFit: 'cover' }}
                  className="hidden md:block"
                  quality={100}
                />
                <Image
                  src={banner.image?.mobile || banner.image.desktop}
                  alt="Popeyes Banner"
                  width={0}
                  height={0}
                  priority
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: mobileHeight,
                    objectFit: 'cover',
                  }}
                  className="block md:hidden rounded-3xl"
                  quality={100}
                />
              </div>
            )
          })}
        </div>
        {shouldArrowAppears && (
          <div className="hidden md:block">
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
          </div>
        )}
      </div>
      {shouldArrowAppears && (
        <div className={`dots bottom-[52px] md:bottom-6`}>
          {Array.from(
            Array(instanceRef?.current?.track?.details?.slides?.length).keys(),
          ).map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              ></button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}) {
  const disabled = props.disabled ? ' arrow--disabled' : ''
  const arrowDirection = props.left ? 'arrow--left' : 'arrow--right'

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${arrowDirection} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      {props.left && (
        <path
          d="M34.1037 5.77003C33.1237 4.79003 31.5437 4.79003 30.5637 5.77003L13.7437 22.59C12.9637 23.37 12.9637 24.63 13.7437 25.41L30.5637 42.23C31.5437 43.21 33.1237 43.21 34.1037 42.23C35.0837 41.25 35.0837 39.67 34.1037 38.69L19.4237 24.01L34.1237 9.31003C35.0837 8.33003 35.0837 6.75003 34.1037 5.77003Z"
          fill="white"
        />
      )}
      {!props.left && (
        <path
          d="M13.9963 42.03C14.9763 43.01 16.5563 43.01 17.5363 42.03L34.1563 25.41C34.9363 24.63 34.9363 23.37 34.1563 22.59L17.5363 5.96999C16.5563 4.98999 14.9763 4.98999 13.9963 5.96999C13.0163 6.94999 13.0163 8.52999 13.9963 9.50998L28.4763 24.01L13.9763 38.51C13.0163 39.47 13.0163 41.07 13.9963 42.03Z"
          fill="white"
        />
      )}
    </svg>
  )
}
