import React from 'react'

interface IRestaurantFilterTypeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  children: React.ReactNode
}

const RestaurantFilterButton: React.FC<IRestaurantFilterTypeProps> = ({
  selected,
  children,
  ...props
}) => {
  return (
    <button
      className={`plk-button-restaurant bg-transparent min-w-[80px] md:min-w-[120px] flex flex-col pb-2 items-center h-full gap-[4px] text-xs md:text-base font-bold transition-all duration-300 ease-in-out
        ${selected ? 'text-primary-500 border-b-4 border-primary-500 plk-button-restaurant-active' : 'text-tertiary-400'}
        hover:text-[#f25600] focus:outline-none`}
      {...props}
    >
      {children}
    </button>
  )
}

export default RestaurantFilterButton
