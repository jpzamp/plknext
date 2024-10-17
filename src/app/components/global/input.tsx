import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  required?: boolean
  errorMessage?: string
  helpMessage?: string
}

// Needs the forwardRef for react-hook-form
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className,
      required = false,
      disabled,
      errorMessage = '',
      helpMessage = '',
      ...props
    },
    ref,
  ) => {
    const hasError = errorMessage.length > 0

    return (
      <div className={`${hasError ? 'mb-8' : 'mb-4'}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={twMerge(
            `
            border border-tertiary-400
            outline-none
            ${disabled ? 'bg-neutral-150 border-tertiary-150 cursor-not-allowed text-tertiary-400' : 'bg-white'}
            ${hasError ? 'border-error-500 bg-red-50' : 'focus:bg-primary-100 focus:border-primary-500'}
            rounded-lg px-4 py-3 w-full transition-all duration-300
            `,
            className,
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? 'error-message' : 'help-message'}
          {...props}
        />
        {!disabled && !hasError && helpMessage && (
          <p id="help-message" className="text-xs text-tertiary-600 mt-1">
            {helpMessage}
          </p>
        )}
        {hasError && (
          <p
            id="error-message"
            className="absolute text-xs text-error-500 mt-1"
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
