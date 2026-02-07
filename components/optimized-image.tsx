'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  containerClassName?: string
  wrapperClassName?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  wrapperClassName,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('relative w-full h-full', wrapperClassName)}>
      <div className={cn('overflow-hidden bg-slate-100 relative', containerClassName)}>
        <Image
          src={src}
          alt={alt}
          {...(fill ? { fill: true } : { width: width || 800, height: height || 600 })}
          priority={priority}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAA4ADgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAZEAADAQEBAAAAAAAAAAAAAAAAAQIDESH/xAAVAQEBAAAAAAAAAAAAAAAAAQIE/8QAHBEAAgIDAQEAAAAAAAAAAAAAAAECEQMRITFB/9oADAMBAAIRAxEAPwCwV1+Q="
          onLoadingComplete={() => setIsLoading(false)}
          className={cn(
            'object-cover transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 animate-pulse" />
        )}
      </div>
    </div>
  )
}

export function ImageSkeleton() {
  return (
    <div className="aspect-[4/5] bg-slate-100 animate-pulse rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100" />
    </div>
  )
}
