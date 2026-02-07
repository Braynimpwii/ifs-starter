"use client"

import React from 'react'

/**
 * LenisProvider - Simple passthrough provider
 * 
 * Note: @studio-freight/react-lenis requires React 17|18 but project uses React 19.
 * This mock provider maintains the same API surface while delegating children.
 * Smooth scroll library can be added later when compatible version is available.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
