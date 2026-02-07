'use client'

import { cn } from '@/lib/utils'

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-[3/4] bg-slate-200 rounded-lg overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-200" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-1/2 bg-slate-200 rounded" />
        <div className="h-6 w-1/3 bg-slate-200 rounded" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-200 rounded animate-pulse', className)} />
}

export function ButtonSkeleton({ width = "w-24", height = "h-10" }: { width?: string; height?: string }) {
  return <Skeleton className={`${width} ${height}`} />
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={i === lines - 1 ? 'h-4 w-2/3' : 'h-4 w-full'} />
      ))}
    </div>
  )
}
