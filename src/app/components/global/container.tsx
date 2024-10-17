import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PlkContainerProps {
  children?: ReactNode
  className?: string
}

export default function PlkContainer({
  children,
  className,
}: PlkContainerProps) {
  return (
    <div className={twMerge('mx-auto max-w-[1288px]', className)}>
      {children}
    </div>
  )
}
