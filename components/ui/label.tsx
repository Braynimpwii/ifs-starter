import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} className={props.className}>
      {children}
    </label>
  )
}

export default Label
