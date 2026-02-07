import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from '../components/error-boundary'

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders fallback when error occurs', () => {
    // Create a component that throws
    const ThrowError = () => {
      throw new Error('Test error')
    }

    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error occurred')).toBeInTheDocument()

    spy.mockRestore()
  })

  it('renders default error UI when no fallback provided', () => {
    const ThrowError = () => {
      throw new Error('Test error message')
    }

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/Test error message/)).toBeInTheDocument()

    spy.mockRestore()
  })
})
