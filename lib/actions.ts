'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase-client'
import { AddToCartSchema, AdvancedFilterStateSchema } from '@/lib/validations'
import type { AdvancedFilterState } from '@/lib/validations'

export async function getFilteredProducts(filters: AdvancedFilterState) {
  try {
    const validated = AdvancedFilterStateSchema.parse(filters)

    // Request count explicitly from Supabase
    let query = supabase.from('products').select('*', { count: 'exact' })

    // Price filter
    if (validated.minPrice > 0) {
      query = query.gte('price', validated.minPrice)
    }
    if (validated.maxPrice < 5000) {
      query = query.lte('price', validated.maxPrice)
    }

    // Finish filter
    if (validated.finishes.length > 0) {
      query = query.in('finish', validated.finishes)
    }

    // Category filter
    if (validated.categories.length > 0) {
      query = query.in('category', validated.categories)
    }

    // Rating filter
    if (validated.minRating > 0) {
      query = query.gte('rating', validated.minRating)
    }

    // Stock filter
    if (validated.inStockOnly) {
      query = query.eq('in_stock', true)
    }

    // Search filter
    if (validated.searchQuery) {
      query = query.or(
        `name.ilike.%${validated.searchQuery}%,description.ilike.%${validated.searchQuery}%`
      )
    }

    // Sorting
    const sortMap = {
      'price-asc': ['price', { ascending: true }] as const,
      'price-desc': ['price', { ascending: false }] as const,
      newest: ['created_at', { ascending: false }] as const,
      rating: ['rating', { ascending: false }] as const,
      relevance: ['created_at', { ascending: false }] as const,
    }

    const sortEntry = sortMap[validated.sortBy as keyof typeof sortMap] || sortMap.relevance
    const [sortBy, sortConfig] = sortEntry
    query = query.order(sortBy, sortConfig)

    // Pagination
    const offset = (validated.page - 1) * validated.limit
    query = query.range(offset, offset + validated.limit - 1)

    const { data, error, count } = await query

    if (error) throw error

    return { data: data || [], count: typeof count === 'number' ? count : 0, error: null }
  } catch (error) {
    console.error('Filter error:', error)
    return { data: [], count: 0, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Product fetch error:', error)
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function addToCart(input: unknown) {
  try {
    const validated = AddToCartSchema.parse(input)
    // This would typically save to user's cart in the database
    // For now, client-side cart store handles this
    return { success: true, error: null }
  } catch (error) {
    console.error('Add to cart error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function createOrder(items: unknown[]) {
  try {
    // Stub: Order creation would typically save to database
    // For now, just log and return success to prevent type errors
    console.log('Order creation stub called with items:', items)
    revalidatePath('/orders')

    return { data: { id: 'stub-order-1', status: 'pending' }, error: null }
  } catch (error) {
    console.error('Order creation error:', error)
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
