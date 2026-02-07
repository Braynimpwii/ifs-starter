import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductGrid from '../components/ProductGrid'
import type { Product } from '../types/product'

const items: Product[] = [
  {
    id: '1',
    name: 'A',
    price: 10,
    category: 'test',
    finish: 'chrome',
    image: '/test.jpg',
    rating: 5,
    reviews: 10,
    inStock: true,
  },
  {
    id: '2',
    name: 'B',
    price: 20,
    category: 'test',
    finish: 'matte-black',
    image: '/test.jpg',
    rating: 4,
    reviews: 5,
    inStock: true,
  },
]

describe('ProductGrid', () => {
  it('renders product items', () => {
    render(<ProductGrid products={items} />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
