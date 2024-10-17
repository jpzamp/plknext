import ShimmerCardapioItem from './shimmer-cardapio-card-item'

export default function ShimmerCardapioList() {
  return (
    <div>
      {[...Array(2)].map((_, index) => (
        <div className="animate-pulse" key={`shimmer-loading-${index}`}>
          <hr
            className={`plk-line w-full bg-tertiary-400 opacity-20 ${index !== 0 ? 'mt-[80px]' : 'hidden md:block'}`}
          />
          <div className="mb-6 mt-14 h-[40px] w-48 rounded bg-neutral-400" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <ShimmerCardapioItem key={`shimmer-cardapio-item-${index}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
