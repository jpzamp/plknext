'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { LoaderCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { scrollToSection } from '@/utils/scroll'

type ButtonType = 'button' | 'submit' | 'reset'
type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  type?: ButtonType
  variant?: ButtonVariant
  redirectTo?: string
  scrollTo?: string
  onClick?: () => void
  onBeforeRedirect?: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  redirectTo,
  scrollTo,
  onClick,
  onBeforeRedirect,
  disabled = false,
  loading = false,
  children,
  className = '',
}) => {
  const baseStyles =
    'px-5 pt-[4.5px] pb-[8.5px] border rounded-full text-xl font-semibold focus:outline-none'

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-highlight-500 text-white rounded-lg',
    secondary:
      'bg-white text-highlight-500 border-2 border-highlight-500 rounded-lg',
    ghost: 'border-none text-base px-0 py-0 underline text-highlight-500',
  }

  const router = useRouter()

  const disabledStyles = `${variant !== 'ghost' && 'border-tertiary-150 bg-tertiary-150'} text-tertiary-400 cursor-not-allowed` // Estilos para o botão desabilitado

  const combinedStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    className,
    disabled && disabledStyles, // Aplica os estilos de desabilitado se o botão estiver desativado
  )

  function handleClick() {
    if (disabled) return
    if (redirectTo) {
      if (onBeforeRedirect) onBeforeRedirect()
      router.push(redirectTo)
      return
    }

    if (scrollTo) scrollToSection(scrollTo)
    if (onClick) onClick()
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={
        loading
          ? twMerge(combinedStyles, 'flex items-center justify-center gap-2')
          : combinedStyles
      }
    >
      {loading && (
        <LoaderCircle width={24} height={24} className="animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button
