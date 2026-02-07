import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/ProductGrid'
import { FilterSidebar } from '@/components/plp/filter-sidebar'
import type { Product, Finish } from '@/types/product'

export const metadata: Metadata = {
  title: 'Shower Heads | Interior Finishes Supermarket',
  description: 'Premium rainfall and handheld shower heads with advanced water-saving technology.',
}

// DATABASE MOCK (Move to a separate DB service in production)
const ALL_PRODUCTS: Product[] = Array.from({ length: 16 }).map((_, i) => {
  const hasSale = i === 2 || i === 7
  return {
    id: `prod-${i}`,
    name: i % 4 === 0 ? 'Monarch Rainfall Shower' : 'Vortex High-Pressure Handheld',
    price: 189 + i * 25,
    ...(hasSale && { salePrice: 149 + i * 10 }),
    category: 'shower-heads',
    finish: (['matte-black', 'brushed-gold', 'chrome', 'gunmetal', 'nickel'][i % 5]) as Finish,
    image: '/images/hero-showerhead.jpg',
    ...(i < 3 && { isNew: true }),
    rating: 4.5 + (i % 5) * 0.1,
    reviews: 80 + i * 12,
    inStock: i !== 5 && i !== 11,
  }
})

// SERVER-SIDE FILTER LOGIC
function getFilteredProducts(searchParams: { [key: string]: string | string[] | undefined }): Product[] {
  let products = [...ALL_PRODUCTS]

  // Filter: Max Price
  if (searchParams.maxPrice) {
    const maxPrice = Number(searchParams.maxPrice)
    products = products.filter(p => p.price <= maxPrice)
  }

  // Filter: Finishes (Handle single string or array)
  const finishParam = searchParams.finish
  if (finishParam) {
    const finishes = Array.isArray(finishParam) ? finishParam : [finishParam]
    products = products.filter(p => finishes.includes(p.finish))
  }

  // Filter: In Stock Only
  if (searchParams.inStockOnly === '1') {
    products = products.filter(p => p.inStock)
  }

  // Sort
  const sort = searchParams.sort as string | undefined
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') products.sort((a, b) => b.price - a.price)
  if (sort === 'newest') products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))

  return products
}

export default function ShowerHeadsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const filteredProducts = getFilteredProducts(searchParams)

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <div className="relative overflow-hidden bg-navy-900 py-16 text-white lg:py-20">
        {/* Background glows */}
        <div className="pointer-events-none absolute -right-[10%] -top-[20%] h-[400px] w-[400px] rounded-full bg-brand-red/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-[30%] -left-[5%] h-[300px] w-[300px] rounded-full bg-navy-600/40 blur-[80px]" />

        <div className="container relative z-10 mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-slate-400 transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-500" />
            <Link href="/bathroom" className="text-slate-400 transition-colors hover:text-white">
              Bathroom
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-500" />
            <span className="font-medium text-white">Shower Heads</span>
          </nav>

          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">Shower Heads</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Experience the pinnacle of hydro-therapy. Our collection combines water-saving
            technology with architectural precision for the ultimate shower experience.
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-sm font-bold text-brand-glow">
                {ALL_PRODUCTS.length}
              </span>
              <span className="text-sm text-slate-400">Products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-sm font-bold text-brand-glow">
                5
              </span>
              <span className="text-sm text-slate-400">Finishes Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/20 text-sm font-bold text-brand-glow">
                15
              </span>
              <span className="text-sm text-slate-400">Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section with Sidebar & Grid */}
      <div className="container mx-auto flex gap-12 px-4 py-12 lg:py-16">
        {/* Sidebar: Controls URL state - wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="w-64">Loading filters...</div>}>
          <FilterSidebar />
        </Suspense>

        {/* Grid: Displays server-filtered products */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
