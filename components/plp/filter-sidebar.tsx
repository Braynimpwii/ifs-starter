"use client"

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Slider } from '@/components/ui/Slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Finish } from '@/types/product'

const FINISHES: { id: Finish; name: string; color: string }[] = [
  { id: 'matte-black', name: 'Matte Black', color: '#1a1a1a' },
  { id: 'chrome', name: 'Chrome', color: '#e2e8f0' },
  { id: 'brushed-gold', name: 'Brushed Gold', color: '#d4af37' },
  { id: 'gunmetal', name: 'Gunmetal', color: '#4a5568' },
  { id: 'nickel', name: 'Nickel', color: '#a8a8a8' },
]

interface FilterSidebarProps {
  className?: string
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Helper to construct URL with single key update
  const updateQuery = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams?.toString() || '')

      if (value === null) {
        params.delete(name)
      } else if (name === 'finish') {
        // Toggle logic for finish array
        const currentFinishes = params.getAll('finish')
        params.delete('finish')

        if (currentFinishes.includes(value)) {
          // Remove this finish
          currentFinishes.filter(f => f !== value).forEach(f => params.append('finish', f))
        } else {
          // Add this finish
          currentFinishes.forEach(f => params.append('finish', f))
          params.append('finish', value)
        }
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  // Push with optional scroll
  const handlePush = useCallback(
    (qs: string) => {
      router.push(qs ? `?${qs}` : '/', { scroll: false })
    },
    [router]
  )

  const clearFilters = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

  // Get current filter state from URL
  const currentFinishes = searchParams?.getAll('finish') || []
  const maxPrice = Number(searchParams?.get('maxPrice') || '2000')
  const inStockOnly = searchParams?.get('inStockOnly') === '1'
  const hasActiveFilters = currentFinishes.length > 0 || inStockOnly || maxPrice < 2000

  return (
    <aside
      className={cn(
        'sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-col gap-8 overflow-y-auto pb-10 lg:flex',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="font-serif text-xl font-bold text-navy-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-brand-red transition-colors hover:text-brand-red-dark"
          >
            Clear
          </button>
        )}
      </div>

      {/* In Stock Only Toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="stock" className="text-sm font-medium text-muted-foreground">
          In Stock Only
        </Label>
        <Switch
          id="stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => handlePush(updateQuery('inStockOnly', checked ? '1' : null))}
        />
      </div>

      {/* Price Range Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Price Range</Label>
          <span className="text-xs font-semibold text-navy-900">${maxPrice}</span>
        </div>
        <Slider
          value={[maxPrice]}
          max={2000}
          step={50}
          className="[&>.relative>.absolute]:bg-navy-900"
          onValueCommit={(val) => handlePush(updateQuery('maxPrice', String(val[0])))}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>$2,000</span>
        </div>
      </div>

      {/* Finish Selection */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-muted-foreground">Finish</Label>
        <div className="flex flex-wrap gap-3">
          {FINISHES.map((finish) => {
            const isSelected = currentFinishes.includes(finish.id)
            return (
              <button
                key={finish.id}
                type="button"
                onClick={() => handlePush(updateQuery('finish', finish.id))}
                className={cn(
                  'relative h-10 w-10 rounded-full border border-border shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2',
                  isSelected && 'ring-2 ring-navy-900 ring-offset-2'
                )}
                style={{ backgroundColor: finish.color }}
                title={finish.name}
                aria-label={`Filter by ${finish.name} finish`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={cn('h-4 w-4', finish.id === 'chrome' ? 'text-navy-900' : 'text-white')}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Category Filter (Placeholder) */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">Category</Label>
        <div className="flex flex-col gap-2">
          {['Rain Showers', 'Handhelds', 'Rail Sets', 'Body Jets'].map((cat) => (
            <button
              type="button"
              key={cat}
              className="group flex items-center gap-2 text-left transition-colors"
            >
              <div className="h-4 w-4 rounded border border-border transition-colors group-hover:border-brand-red" />
              <span className="cursor-pointer text-sm text-muted-foreground transition-colors group-hover:text-brand-red">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
