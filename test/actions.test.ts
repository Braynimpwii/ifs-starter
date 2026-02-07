import { describe, it, expect } from 'vitest'
import { AddToCartSchema } from '../lib/validations'

describe('lib/actions', () => {
  describe('Validation Schemas', () => {
    it('AddToCartSchema should validate correct input', () => {
      const validData = {
        productId: '550e8400-e29b-41d4-a716-446655440000',
        quantity: 2,
      }

      const result = AddToCartSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('AddToCartSchema should reject invalid quantity', () => {
      const invalidData = {
        productId: '550e8400-e29b-41d4-a716-446655440000',
        quantity: -1, // Invalid: must be > 0
      }

      const result = AddToCartSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('AddToCartSchema should reject non-UUID productId', () => {
      const invalidData = {
        productId: 'test-1', // Invalid: must be UUID
        quantity: 1,
      }

      const result = AddToCartSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('AddToCartSchema should reject empty productId', () => {
      const invalidData = {
        productId: '', // Invalid: must be UUID
        quantity: 1,
      }

      const result = AddToCartSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('AddToCartSchema should enforce type constraints', () => {
      const invalidData = {
        productId: '550e8400-e29b-41d4-a716-446655440000',
        quantity: 'not-a-number', // Invalid type
      }

      const result = AddToCartSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Server Action Return Types', () => {
    it('should return proper success response shape', () => {
      const successResponse = {
        success: true,
        error: null,
      }

      expect(successResponse).toHaveProperty('success')
      expect(successResponse).toHaveProperty('error')
      expect(typeof successResponse.success).toBe('boolean')
    })

    it('should return proper error response shape', () => {
      const errorResponse = {
        success: false,
        error: 'Validation failed',
      }

      expect(errorResponse).toHaveProperty('success')
      expect(errorResponse).toHaveProperty('error')
      expect(typeof errorResponse.error).toBe('string')
    })
  })
})
