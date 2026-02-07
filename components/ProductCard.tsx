"use client"

import { motion } from 'framer-motion'
import { OptimizedImage } from './optimized-image'
import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '@/types/product'
import { Button } from './ui/Button'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-muted">
        {product.isNew && (
          <div className="absolute right-0 top-0 z-10 bg-brand-red px-3 py-1 text-xs font-bold uppercase text-white">
            New
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
            -{discountPercent}%
          </div>
        )}

        {product.image ? (
          <OptimizedImage
            src={product.image}
            alt={product.name}
            fill
            priority={index < 4}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
            No image
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="rounded-full bg-navy-900/90 px-4 py-2 text-sm font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* Add to Cart Button - Hidden by default, shows on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-end p-4"
        >
          <Button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            disabled={!product.inStock}
            className="w-full gap-2 bg-brand-red hover:bg-brand-red-dark"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col px-1 py-4">
        {/* Finish Badge */}
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          {product.finish.replace('-', ' ')}
        </div>

        {/* Product Name */}
        <h3 className="line-clamp-2 font-serif text-base font-semibold text-navy-900 transition-colors group-hover:text-brand-red">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-brand-glow text-brand-glow'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-brand-red">${product.salePrice}</span>
              <span className="text-sm text-slate-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-navy-900">${product.price}</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProductCard