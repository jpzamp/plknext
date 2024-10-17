import ShimmerCupomItem from './shimmer-cupom-item'

export default function ShimmerCupomList() {
  return (
    <div className="flex md:gap-4 flex-wrap justify-between sm:justify-center lg:justify-start md:items-start mt-6">
      {[...Array(8)].map((_, index) => (
        <ShimmerCupomItem key={index} />
      ))}
    </div>
  )
}
