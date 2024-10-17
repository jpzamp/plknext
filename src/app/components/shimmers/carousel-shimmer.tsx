interface LoadingCarouselProps {
  height?: number
  mobileHeight?: number
}

export function CarouselShimmer({
  height = 720,
  mobileHeight = 327,
}: LoadingCarouselProps) {
  return (
    <div className="relative">
      <div className="navigation-wrapper py-14 px-6 md:py-0 md:px-0">
        <div className="keen-slider min-w-[327px] md:min-w-full animate-pulse">
          <div
            className="bg-neutral-400 rounded-3xl w-full md:hidden"
            style={{ height: mobileHeight }}
          />
          <div
            className="bg-neutral-400 w-full hidden md:block"
            style={{ height }}
          />
        </div>
      </div>
    </div>
  )
}
