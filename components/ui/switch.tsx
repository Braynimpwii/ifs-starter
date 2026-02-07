import React from 'react'

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({ id, checked = false, onCheckedChange, ...props }: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked)
    }
  }

  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={handleChange}
      {...props}
      className="h-4 w-4 cursor-pointer"
    />
  )
}

export default Switch
