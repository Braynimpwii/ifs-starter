'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product'
import { SlidersHorizontal } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="w-full">
      {/* Header / Sort Bar (Simplified) */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong className="text-navy-900">{products.length}</strong> products
        </p>
        {/* Add Sorting Dropdown here if needed, updating URL 'sort' param */}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-navy-900">No products found</h3>
              <p className="text-slate-500">Try adjusting your filters.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProductGrid