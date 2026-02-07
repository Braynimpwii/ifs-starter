import { z } from 'zod'

// Product validation
export const FinishSchema = z.enum(['chrome', 'matte-black', 'brushed-gold', 'gunmetal', 'nickel'])

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  category: z.string().min(1),
  finish: FinishSchema,
  imageUrl: z.string().url(),
  isNew: z.boolean().default(false),
  rating: z.number().min(0).max(5),
  reviewsCount: z.number().int().min(0),
  inStock: z.boolean(),
})

export type Product = z.infer<typeof ProductSchema>

// Filter validation
export const AdvancedFilterStateSchema = z.object({
  minPrice: z.number().min(0).default(0),
  maxPrice: z.number().positive().default(5000),
  finishes: z.array(FinishSchema).default([]),
  categories: z.array(z.string()).default([]),
  minRating: z.number().min(0).max(5).default(0),
  inStockOnly: z.boolean().default(false),
  searchQuery: z.string().default(''),
  sortBy: z.enum(['relevance', 'price-asc', 'price-desc', 'newest', 'rating']).default('relevance'),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
})

export type AdvancedFilterState = z.infer<typeof AdvancedFilterStateSchema>

// Cart validation
export const CartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  product: ProductSchema.optional(),
})

export type CartItem = z.infer<typeof CartItemSchema>

export const AddToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive().default(1),
})

export type AddToCart = z.infer<typeof AddToCartSchema>

// Order validation
export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  items: z.array(CartItemSchema),
  totalAmount: z.number().positive(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']),
  createdAt: z.date(),
})

export type Order = z.infer<typeof OrderSchema>
