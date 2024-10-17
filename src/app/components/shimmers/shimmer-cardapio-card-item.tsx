'use client'

export default function ShimmerCardapioItem() {
  return (
    <div className="bg-white flex flex-col max-w-44 md:max-w-80 rounded-lg cursor-pointer animate-pulse">
      <div className="min-h-[304px] relative w-full flex items-center justify-center bg-neutral-400 rounded-t-lg" />
      <div className="p-3">
        <span className="block font-bold text-xl mb-2 bg-neutral-400 w-20 h-5 rounded" />
        <div id="plk-tags" className="flex flex-wrap gap-2">
          <span className="block font-bold text-xl mb-2 bg-neutral-400 w-24 h-4 rounded" />
          <span className="block font-bold text-xl mb-2 bg-neutral-400 w-14 h-4 rounded" />
          <span className="block font-bold text-xl mb-2 bg-neutral-400 w-10 h-4 rounded" />
        </div>
      </div>
    </div>
  )
}
