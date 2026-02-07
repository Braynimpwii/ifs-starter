export type Finish = 'chrome' | 'matte-black' | 'brushed-gold' | 'gunmetal' | 'nickel'

export type Product = {
  id: string
  name: string
  description?: string
  price: number
  salePrice?: number
  category: string
  finish: Finish
  image: string
  isNew?: boolean
  rating: number
  reviews: number
  inStock: boolean
}

export type FilterState = {
  minPrice: number
  maxPrice: number
  finishes: Finish[]
  inStockOnly: boolean
}

// Advanced filtering with sorting and pagination
export type AdvancedFilterState = {
  minPrice: number
  maxPrice: number
  finishes: Finish[]
  categories: string[]
  minRating: number
  inStockOnly: boolean
  searchQuery: string
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
  page: number
  limit: number
}
