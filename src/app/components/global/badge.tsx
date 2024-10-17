import { HTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md'
}

export default function Badge({
  size = 'sm',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        `block bg-helper-500 w-fit text-white rounded px-2 py-[2px] ${size === 'sm' ? 'text-[10px]' : 'text-[12px]'}`,
        className,
      )}
    >
      {children}
    </span>
  )
}
