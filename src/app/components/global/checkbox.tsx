import { useState } from 'react'

interface PlkCheckboxProps {
  onCheck: (checked: boolean) => void
}

export default function PlkCheckbox({ onCheck }: PlkCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false)

  const handleToggle = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    onCheck(newCheckedState)
  }

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="hidden"
      />
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-md transition-all duration-100 ${isChecked ? 'bg-[#FF7D00]' : 'border border-tertiary-400'}`}
      >
        {isChecked && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.86337 10.5833L3.55004 8.27002C3.29004 8.01002 2.87004 8.01002 2.61004 8.27002C2.35004 8.53002 2.35004 8.95002 2.61004 9.21002L5.39671 11.9967C5.65671 12.2567 6.07671 12.2567 6.33671 11.9967L13.39 4.94335C13.65 4.68335 13.65 4.26335 13.39 4.00335C13.13 3.74335 12.71 3.74335 12.45 4.00335L5.86337 10.5833Z"
              fill="white"
            />
          </svg>
        )}
      </div>
    </label>
  )
}
