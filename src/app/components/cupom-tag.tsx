import { twMerge } from 'tailwind-merge'

interface CupomTagProps extends React.ComponentProps<'div'> {
  highlightedPurple?: boolean
  highlightedGreen?: boolean
}

export default function CupomTag({
  highlightedPurple,
  highlightedGreen,
  className,
  children,
  ...props
}: CupomTagProps) {
  return (
    <span
      className={twMerge(
        `text-sm uppercase rounded-l-md block w-fit px-2 py-1 bg-tertiary-150 text-primary-700 ${highlightedPurple && 'bg-secondary-500 text-white'} ${highlightedGreen && 'bg-helper-500 text-white'}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
