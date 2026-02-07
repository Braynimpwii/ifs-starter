'use client';

import React from 'react';

type SliderProps = {
  min?: number
  max?: number
  step?: number
  value: number | number[]
  onChange?: (value: number) => void
  className?: string
}

type HandleChange = (value: number[]) => void

interface EnhancedSliderProps extends SliderProps {
  onValueCommit?: HandleChange
}

export const Slider: React.FC<EnhancedSliderProps> = ({
  min = 0,
  max = 1000,
  step = 1,
  value,
  onChange,
  onValueCommit,
  className = 'w-full',
}) => {
  const current: number = Array.isArray(value) ? value[0]! : (value as number)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleMouseUp = () => {
    if (onValueCommit) {
      onValueCommit([current])
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        className={className}
      />
      <div className="w-20 text-right text-sm text-gray-700">${current}</div>
    </div>
  )
}

export default Slider