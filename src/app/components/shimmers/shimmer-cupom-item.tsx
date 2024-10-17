export default function ShimmerCupomItem() {
  return (
    <div className="max-w-[180px] md:max-w-[310px] pb-10 animate-pulse">
      <div className="relative bg-white max-h-[180px] md:max-h-[310px] rounded-3xl">
        <div className="w-[180px] h-[180px] md:w-[310px] md:h-[310px] bg-neutral-400 rounded-3xl" />
      </div>
      <div className="h-4 bg-neutral-400 rounded w-4/5 mt-2"></div>
      <div className="h-3 bg-neutral-400 rounded w-1/2 mt-1"></div>
      <div className="h-4 bg-neutral-400 rounded w-1/2 mt-1"></div>
    </div>
  )
}
