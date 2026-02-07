# IFS Starter - Complete Code Reference

**Generated:** February 7, 2026  
**Project:** Interior Finishes Supermarket (IFS) Starter

---

## Table of Contents

1. [Type Definitions](#type-definitions)
2. [Layout & Global Styles](#layout--global-styles)
3. [Pages](#pages)
4. [Components - UI](#components---ui)
5. [Components - Layout](#components---layout)
6. [Components - PLP (Product Listing Page)](#components---plp-product-listing-page)
7. [Components - Home Sections](#components---home-sections)
8. [Providers](#providers)
9. [Configuration](#configuration)

---

## Type Definitions

### File: `types/product.ts`

```typescript
export type Finish = 'chrome' | 'matte-black' | 'brushed-gold' | 'gunmetal' | 'nickel'

export type Product = {
  id: string
  name: string
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
```

---

## Layout & Global Styles

### File: `app/globals.css`

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* ============================================
     UNIFIED DESIGN SYSTEM - Navy & Red Theme
     ============================================ */
  
  /* Navy Scale - The Dominant Dark */
  --navy-950: #050D14;
  --navy-900: #0B1C2D;
  --navy-800: #0F2942;
  --navy-700: #132E4A;
  --navy-600: #1E3A5F;
  
  /* Brand Red - The Accent Power */
  --brand-red: #C1121F;
  --brand-red-dark: #9A0E19;
  --brand-red-light: #E8333F;
  --brand-glow: #FF6B7A;
  
  /* Semantic Tokens */
  --background: #F8F9FA;
  --foreground: var(--navy-900);
  --card: #FFFFFF;
  --card-foreground: var(--navy-900);
  --popover: #FFFFFF;
  --popover-foreground: var(--navy-900);
  --primary: var(--navy-900);
  --primary-foreground: #F8F9FA;
  --secondary: #F1F3F5;
  --secondary-foreground: var(--navy-900);
  --muted: #E9ECEF;
  --muted-foreground: #6C757D;
  --accent: var(--brand-red);
  --accent-foreground: #FFFFFF;
  --destructive: var(--brand-red);
  --destructive-foreground: #FFFFFF;
  --border: #DEE2E6;
  --input: #DEE2E6;
  --ring: var(--brand-red);
  --radius: 0.5rem;
  
  /* Chart Colors */
  --chart-1: var(--brand-red);
  --chart-2: var(--navy-900);
  --chart-3: var(--navy-600);
  --chart-4: var(--brand-glow);
  --chart-5: var(--navy-700);
  
  /* Sidebar */
  --sidebar: var(--navy-900);
  --sidebar-foreground: #F8F9FA;
  --sidebar-primary: var(--brand-red);
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: var(--navy-700);
  --sidebar-accent-foreground: #F8F9FA;
  --sidebar-border: var(--navy-700);
  --sidebar-ring: var(--brand-red);
}

.dark {
  --background: var(--navy-950);
  --foreground: #F8F9FA;
  --card: var(--navy-900);
  --card-foreground: #F8F9FA;
  --popover: var(--navy-900);
  --popover-foreground: #F8F9FA;
  --primary: #F8F9FA;
  --primary-foreground: var(--navy-900);
  --secondary: var(--navy-800);
  --secondary-foreground: #F8F9FA;
  --muted: var(--navy-800);
  --muted-foreground: #ADB5BD;
  --accent: var(--brand-red);
  --accent-foreground: #FFFFFF;
  --destructive: var(--brand-red);
  --destructive-foreground: #FFFFFF;
  --border: var(--navy-700);
  --input: var(--navy-700);
  --ring: var(--brand-red);
}

@theme inline {
  /* Fonts */
  --font-sans: var(--font-inter), 'Inter', system-ui, sans-serif;
  --font-serif: var(--font-playfair), 'Playfair Display', Georgia, serif;
  --font-mono: 'Geist Mono', 'Geist Mono Fallback', monospace;
  
  /* Navy Colors */
  --color-navy-950: var(--navy-950);
  --color-navy-900: var(--navy-900);
  --color-navy-800: var(--navy-800);
  --color-navy-700: var(--navy-700);
  --color-navy-600: var(--navy-600);
  
  /* Brand Colors */
  --color-brand-red: var(--brand-red);
  --color-brand-red-dark: var(--brand-red-dark);
  --color-brand-red-light: var(--brand-red-light);
  --color-brand-glow: var(--brand-glow);
  
  /* Semantic Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  
  /* Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  
  /* Sidebar */
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* ============================================
   MAGNETIC UI UTILITIES
   ============================================ */

/* Magnetic hover effect for interactive elements */
.magnetic-hover {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.magnetic-hover:hover {
  transform: translateY(-2px);
}

/* Glow effects */
.glow-red {
  box-shadow: 0 0 40px -10px rgba(193, 18, 31, 0.5);
}

.glow-red-intense {
  box-shadow: 0 0 60px -5px rgba(193, 18, 31, 0.6);
}

.glow-navy {
  box-shadow: 0 0 60px -10px rgba(11, 28, 45, 0.8);
}

/* Glassmorphism */
.glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.glass-dark {
  background: linear-gradient(135deg, rgba(11, 28, 45, 0.8) 0%, rgba(11, 28, 45, 0.6) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Navy gradient background */
.bg-navy-gradient {
  background: linear-gradient(135deg, #0B1C2D 0%, #0F2942 50%, #132E4A 100%);
}

/* Animated underline for links */
.underline-magnetic {
  position: relative;
}

.underline-magnetic::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--brand-red);
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.underline-magnetic:hover::after {
  width: 100%;
}
```

---

## Pages

### File: `app/layout.tsx`

```typescript
import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LenisProvider } from '@/components/lenis/LenisProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.interiorfinishessupermarket.com'),
  title: {
    default: 'Interior Finishes Supermarket | Premium Home Finishes',
    template: '%s | Interior Finishes Supermarket',
  },
  description:
    'Interior Finishes Supermarket offers premium bathroom, kitchen, electrical, tiling, and hardware finishes for modern residential and commercial projects.',
  applicationName: 'Interior Finishes Supermarket',
  keywords: [
    'interior finishes',
    'bathroom fittings',
    'kitchen fittings',
    'tiles',
    'lighting',
    'electrical accessories',
    'home renovation',
    'construction materials',
    'interior design',
  ],
  authors: [{ name: 'Interior Finishes Supermarket' }],
  creator: 'Interior Finishes Supermarket',
  publisher: 'Interior Finishes Supermarket',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'Interior Finishes Supermarket | Premium Home Finishes',
    description:
      'Premium bathroom, kitchen, lighting, tiling, and electrical finishes curated for modern homes and commercial spaces.',
    url: 'https://www.interiorfinishessupermarket.com',
    siteName: 'Interior Finishes Supermarket',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Interior Finishes Supermarket showroom',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Finishes Supermarket | Premium Home Finishes',
    description:
      'Discover premium interior finishes for bathrooms, kitchens, lighting, tiling, and modern home renovations.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'home improvement',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-brand-red/20 selection:text-brand-red">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow"
        >
          Skip to content
        </a>

        <LenisProvider>
          <main id="main-content" className="relative flex min-h-screen flex-col">
            {children}
          </main>
        </LenisProvider>

        <Analytics />
      </body>
    </html>
  )
}
```

### File: `app/page.tsx`

```typescript
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { TrustBadges } from '@/components/trust-badges'
import { FeaturedCategories } from '@/components/featured-categories'
import { ShopByRoom } from '@/components/shop-by-room'
import { PromoBanner } from '@/components/promo-banner'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex-1">
        <HeroSection />
        <TrustBadges />
        <FeaturedCategories />
        <ShopByRoom />
        <PromoBanner />
      </div>
      <Footer />
    </>
  )
}
```

### File: `app/bathroom/shower-heads/page.tsx`

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/plp/product-grid'
import type { Product } from '@/types/product'

export const metadata: Metadata = {
  title: 'Shower Heads',
  description:
    'Explore our premium collection of rainfall, handheld, and multi-function shower heads. Water-saving technology meets architectural precision.',
}

// Mock Data (In production this comes from your DB/Headless CMS)
const PRODUCTS: Product[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `prod-${i}`,
  name:
    i % 4 === 0
      ? 'Monarch Rainfall Shower'
      : i % 4 === 1
        ? 'Vortex High-Pressure Handheld'
        : i % 4 === 2
          ? 'Cascade Dual-Function Set'
          : 'Zenith Wall-Mounted Rain Head',
  price: 189 + i * 25,
  salePrice: i === 2 || i === 7 ? 149 + i * 10 : undefined,
  category: 'shower-heads',
  finish:
    i % 5 === 0
      ? 'matte-black'
      : i % 5 === 1
        ? 'brushed-gold'
        : i % 5 === 2
          ? 'chrome'
          : i % 5 === 3
            ? 'gunmetal'
            : 'nickel',
  image: '/images/hero-showerhead.jpg',
  isNew: i < 3,
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 80 + i * 12,
  inStock: i !== 5 && i !== 11,
}))

export default function ShowerHeadsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero - Slim Version */}
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
                {PRODUCTS.length}
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

      {/* Product Grid Section */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <ProductGrid initialProducts={PRODUCTS} />
      </div>
    </div>
  )
}
```

---

## Components - UI

### File: `components/ui/magnetic-button.tsx`

```typescript
'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  magnetStrength?: number
  glowColor?: 'red' | 'navy' | 'none'
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export function MagneticButton({
  children,
  className,
  magnetStrength = 0.3,
  glowColor = 'red',
  variant = 'primary',
  size = 'md',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * magnetStrength
    const deltaY = (e.clientY - centerY) * magnetStrength
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const variantStyles = {
    primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
    secondary: 'bg-navy-900 text-white hover:bg-navy-800',
    ghost: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
  }

  const sizeStyles = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-base font-semibold',
  }

  const glowStyles = {
    red: 'shadow-[0_0_40px_-10px_rgba(193,18,31,0.5)] hover:shadow-[0_0_50px_-5px_rgba(193,18,31,0.6)]',
    navy: 'shadow-[0_0_40px_-10px_rgba(11,28,45,0.6)]',
    none: '',
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300',
        variantStyles[variant],
        sizeStyles[size],
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

---

## Components - PLP (Product Listing Page)

### File: `components/plp/filter-sidebar.tsx` **(NEW)**

```typescript
"use client"

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterState, Finish } from '@/types/product'

interface FilterSidebarProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
}

const FINISHES: { id: Finish; name: string; color: string }[] = [
  { id: 'matte-black', name: 'Matte Black', color: '#1a1a1a' },
  { id: 'chrome', name: 'Chrome', color: '#e2e8f0' },
  { id: 'brushed-gold', name: 'Brushed Gold', color: '#d4af37' },
  { id: 'gunmetal', name: 'Gunmetal', color: '#4a5568' },
  { id: 'nickel', name: 'Nickel', color: '#a8a8a8' },
]

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || '')

      if (name === 'finish') {
        const current = params.getAll('finish')
        if (current.includes(value)) {
          params.delete('finish')
          current.filter((c) => c !== value).forEach((c) => params.append('finish', c))
        } else {
          params.append('finish', value)
        }
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const toggleFinish = (id: Finish) => {
    const current = filters.finishes
    const next = current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    setFilters({ ...filters, finishes: next })

    const qs = createQueryString('finish', id)
    router.push(qs ? `?${qs}` : '/', { scroll: false })
  }

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-col gap-8 overflow-y-auto pb-10 lg:flex">
      <div className="border-b border-border pb-4">
        <h2 className="font-serif text-xl font-bold text-navy-900">Filters</h2>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="stock" className="text-sm font-medium text-muted-foreground">
          In Stock Only
        </Label>
        <Switch
          id="stock"
          checked={filters.inStockOnly}
          onCheckedChange={(checked) => {
            setFilters({ ...filters, inStockOnly: checked })
            const params = new URLSearchParams(searchParams?.toString() || '')
            if (checked) params.set('inStockOnly', '1')
            else params.delete('inStockOnly')
            const qs = params.toString()
            router.push(qs ? `?${qs}` : '/', { scroll: false })
          }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Price Range</Label>
          <span className="text-xs font-semibold text-navy-900">${filters.maxPrice}</span>
        </div>
        <Slider
          defaultValue={[filters.maxPrice]}
          max={2000}
          step={50}
          className="[&>.relative>.absolute]:bg-navy-900"
          onValueChange={(val) => {
            setFilters({ ...filters, maxPrice: val[0] })
            const params = new URLSearchParams(searchParams?.toString() || '')
            params.set('maxPrice', String(val[0]))
            const qs = params.toString()
            router.push(qs ? `?${qs}` : '/', { scroll: false })
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>$2,000</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-muted-foreground">Finish</Label>
        <div className="flex flex-wrap gap-3">
          {FINISHES.map((finish) => {
            const isSelected = filters.finishes.includes(finish.id)
            return (
              <button
                key={finish.id}
                type="button"
                onClick={() => toggleFinish(finish.id)}
                className={cn(
                  'group relative h-10 w-10 rounded-full border border-border shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2',
                  isSelected && 'ring-2 ring-navy-900 ring-offset-2'
                )}
                style={{ backgroundColor: finish.color }}
                title={finish.name}
                aria-label={`Filter by ${finish.name} finish`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={cn('h-4 w-4', finish.id === 'chrome' ? 'text-navy-900' : 'text-white')}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">Category</Label>
        <div className="flex flex-col gap-2">
          {['Rain Showers', 'Handhelds', 'Rail Sets', 'Body Jets'].map((cat) => (
            <button
              type="button"
              key={cat}
              className="group flex items-center gap-2 text-left transition-colors"
            >
              <div className="h-4 w-4 rounded border border-border transition-colors group-hover:border-brand-red" />
              <span className="cursor-pointer text-sm text-muted-foreground transition-colors group-hover:text-brand-red">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
```

### File: `components/plp/product-card.tsx`

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index: number
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col gap-3"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded bg-navy-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              New Arrival
            </span>
          )}
          {product.salePrice && (
            <span className="rounded bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="rounded bg-muted-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-muted-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:bg-white hover:text-brand-red group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Product Image with Zoom Effect */}
        <Link href={`/bathroom/shower-heads/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-700 ease-out group-hover:scale-110',
              !product.inStock && 'opacity-60'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
          <Button
            className="w-full bg-navy-900 text-white transition-colors hover:bg-brand-red disabled:opacity-50"
            disabled={!product.inStock}
          >
            <Plus className="mr-2 h-4 w-4" />
            {product.inStock ? 'Quick Add' : 'Notify Me'}
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{product.reviews} Reviews</p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'
                )}
              />
            ))}
            <span className="ml-1 text-xs font-medium text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        <Link href={`/bathroom/shower-heads/${product.id}`}>
          <h3 className="cursor-pointer font-serif text-base font-semibold leading-tight text-navy-900 transition-colors hover:text-brand-red lg:text-lg">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-brand-red">${product.salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
              <span className="rounded bg-brand-red/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-red">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-navy-900">${product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
```

### File: `components/plp/product-grid.tsx`

```typescript
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FilterSidebar } from './filter-sidebar'
import { ProductCard } from './product-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product, FilterState } from '@/types/product'

interface ProductGridProps {
  initialProducts: Product[]
}

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 2000,
    finishes: [],
    inStockOnly: false,
  })

  const [sort, setSort] = useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Client-side filtering logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (p.price > filters.maxPrice) return false
        if (filters.inStockOnly && !p.inStock) return false
        if (filters.finishes.length > 0 && !filters.finishes.includes(p.finish)) return false
        return true
      })
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        return 0
      })
  }, [initialProducts, filters, sort])

  // Check if any filters are active
  const hasActiveFilters = filters.finishes.length > 0 || filters.inStockOnly || filters.maxPrice < 2000

  const clearAllFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 2000,
      finishes: [],
      inStockOnly: false,
    })
  }

  return (
    <div className="flex gap-12">
      {/* Desktop Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing{' '}
              <strong className="font-semibold text-navy-900">{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>

            {/* Active Filter Pills */}
            {hasActiveFilters && (
              <div className="hidden items-center gap-2 lg:flex">
                {filters.finishes.map((finish) => (
                  <button
                    key={finish}
                    type="button"
                    onClick={() =>
                      setFilters({ ...filters, finishes: filters.finishes.filter((f) => f !== finish) })
                    }
                    className="flex items-center gap-1 rounded-full bg-navy-900/10 px-2.5 py-1 text-xs font-medium text-navy-900 transition-colors hover:bg-brand-red/10 hover:text-brand-red"
                  >
                    {finish.replace('-', ' ')}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {filters.inStockOnly && (
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, inStockOnly: false })}
                    className="flex items-center gap-1 rounded-full bg-navy-900/10 px-2.5 py-1 text-xs font-medium text-navy-900 transition-colors hover:bg-brand-red/10 hover:text-brand-red"
                  >
                    In Stock Only
                    <X className="h-3 w-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-brand-red underline-offset-2 hover:underline"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-border text-navy-900 hover:bg-navy-900/5 lg:hidden bg-transparent"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
                      {filters.finishes.length + (filters.inStockOnly ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] border-border bg-background p-0">
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                  <h2 className="font-serif text-lg font-bold text-navy-900">Filters</h2>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-xs font-medium text-brand-red"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>
              </SheetContent>
            </Sheet>

            {/* View Toggle (visual only) */}
            <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">
              <button
                type="button"
                className="rounded-md bg-navy-900 p-1.5 text-white"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-navy-900"
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] border-border">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* The Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy-900">
                  No products match your selection
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or clearing them to see more products.
                </p>
                <Button
                  variant="link"
                  className="mt-4 text-brand-red hover:text-brand-red-dark"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
```

---

## Components - Home Sections  

*(Continuing in next section due to length...)*

### File: `components/hero-section.tsx`

```typescript
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 80 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%'])
  const foregroundY = useTransform(smoothProgress, [0, 1], ['0%', '-8%'])
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '15%'])
  const maskedTextScale = useTransform(smoothProgress, [0, 0.5], [1, 1.15])
  const maskedTextOpacity = useTransform(smoothProgress, [0, 0.3], [0.08, 0.03])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-navy-900"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-navy-gradient" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="absolute -top-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-brand-red/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-navy-600/40 blur-[100px]" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 py-16 lg:py-0">
        <div className="grid min-h-[90vh] lg:min-h-screen items-center gap-8 lg:grid-cols-2">
          <motion.div
            className="relative z-20"
            style={{ y: foregroundY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <span className="glass rounded-full px-4 py-2 text-sm font-semibold">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-brand-red" />
                <span className="bg-gradient-to-r from-brand-glow to-brand-red bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
                  2026 Collection
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-8 font-serif text-5xl font-bold leading-[0.95] tracking-tight text-balance md:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="block text-white">Engineering</span>
              <span className="block bg-gradient-to-r from-brand-red to-brand-glow bg-clip-text text-transparent">
                Flow.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              Precision-milled brass fittings. 15-year warranty.
              The intersection of industrial durability and fluid aesthetics.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
              <Link href="/bathroom/shower-heads">
                <MagneticButton variant="primary" size="lg" glowColor="red">
                  Shop The Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
              </Link>

              <Link href="/trade">
                <MagneticButton variant="ghost" size="lg" glowColor="none">
                  View Trade Pricing
                </MagneticButton>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8"
            >
              {[
                { value: '500+', label: 'Products' },
                { value: '15yr', label: 'Warranty' },
                { value: '4.9', label: 'Rating' },
              ].map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <div>
                    <p className="text-3xl font-bold text-brand-red">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                  {index < 2 && <div className="h-12 w-px bg-white/10" />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 flex items-center justify-center lg:justify-end"
            style={{ y: imageY }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
              style={{ scale: maskedTextScale, opacity: maskedTextOpacity }}
            >
              <span
                className="whitespace-nowrap font-serif text-[100px] font-black tracking-tighter md:text-[160px] lg:text-[200px] xl:text-[260px]"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(193, 18, 31, 0.4)',
                  textShadow: '0 0 80px rgba(193, 18, 31, 0.2)',
                }}
              >
                PREMIUM
              </span>
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative z-20"
            >
              <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-600 opacity-60 blur-[80px] lg:h-[450px] lg:w-[450px]" />

              <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red opacity-25 blur-[60px] lg:h-[350px] lg:w-[350px]" />

              <div className="relative aspect-[4/5] w-[300px] md:w-[380px] lg:w-[440px] xl:w-[500px]">
                <Image
                  src="/images/hero-showerhead.jpg"
                  alt="Premium rainfall shower head with chrome finish"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                  }}
                  priority
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 380px, 500px"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="glass absolute -bottom-4 -left-4 rounded-2xl p-5 lg:bottom-8 lg:left-0"
                style={{
                  boxShadow:
                    '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                }}
              >
                <p className="text-sm font-medium text-slate-300">Starting from</p>
                <p className="text-3xl font-bold text-white">$89</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-brand-red to-brand-red-dark px-4 py-2 lg:right-4 lg:top-4"
                style={{
                  boxShadow: '0 4px 20px rgba(193, 18, 31, 0.5)',
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Best Seller
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="glass absolute -right-8 bottom-24 hidden rounded-xl p-4 md:block lg:-right-12"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">
                    A+
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Water Efficiency</p>
                    <p className="font-bold text-white">5 Star WELS</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
        }}
      />
    </section>
  )
}
```

### File: `components/header.tsx`

```typescript
'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, ChevronDown, ArrowRight, Bath, ChefHat, Zap, Wrench, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const categories = [
  {
    name: 'Bathroom',
    icon: Bath,
    href: '/bathroom',
    subcategories: [
      { name: 'Shower Heads', href: '/bathroom/shower-heads' },
      { name: 'Faucets & Mixers', href: '/bathroom/faucets' },
      { name: 'Vanities', href: '/bathroom/vanities' },
      { name: 'Toilets', href: '/bathroom/toilets' },
      { name: 'Bathtubs', href: '/bathroom/bathtubs' },
      { name: 'Accessories', href: '/bathroom/accessories' },
    ],
    featured: { title: 'Matte Black Series', discount: '15% Off' },
  },
  {
    name: 'Kitchen',
    icon: ChefHat,
    href: '/kitchen',
    subcategories: [
      { name: 'Kitchen Taps', href: '/kitchen/taps' },
      { name: 'Sinks', href: '/kitchen/sinks' },
      { name: 'Rangehoods', href: '/kitchen/rangehoods' },
      { name: 'Appliances', href: '/kitchen/appliances' },
      { name: 'Cabinet Hardware', href: '/kitchen/hardware' },
    ],
    featured: { title: 'Brushed Gold Collection', discount: '20% Off' },
  },
  {
    name: 'Electrical',
    icon: Zap,
    href: '/electrical',
    subcategories: [
      { name: 'Powerpoints', href: '/electrical/powerpoints' },
      { name: 'Light Switches', href: '/electrical/switches' },
      { name: 'LED Lighting', href: '/electrical/led-lighting' },
      { name: 'Downlights', href: '/electrical/downlights' },
      { name: 'Pendant Lights', href: '/electrical/pendants' },
    ],
    featured: { title: 'Smart Home Range', discount: 'New' },
  },
  {
    name: 'Hardware',
    icon: Wrench,
    href: '/hardware',
    subcategories: [
      { name: 'Door Handles', href: '/hardware/door-handles' },
      { name: 'Cabinet Handles', href: '/hardware/cabinet-handles' },
      { name: 'Hinges', href: '/hardware/hinges' },
      { name: 'Locks', href: '/hardware/locks' },
      { name: 'Hooks & Rails', href: '/hardware/hooks-rails' },
    ],
    featured: { title: 'Brass Hardware', discount: '25% Off' },
  },
  {
    name: 'Lighting',
    icon: Lightbulb,
    href: '/lighting',
    subcategories: [
      { name: 'Ceiling Lights', href: '/lighting/ceiling' },
      { name: 'Wall Lights', href: '/lighting/wall' },
      { name: 'Outdoor Lighting', href: '/lighting/outdoor' },
      { name: 'Smart Lighting', href: '/lighting/smart' },
    ],
    featured: { title: 'Designer Pendants', discount: '10% Off' },
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (categoryName: string) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
    setActiveCategory(categoryName)
  }

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 150)
  }

  const activeData = categories.find((c) => c.name === activeCategory)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy-900 text-white backdrop-blur-md supports-[backdrop-filter]:bg-navy-900/95">
      {/* Top Bar */}
      <div className="border-b border-white/5 bg-navy-950">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[11px] font-medium uppercase tracking-wider text-slate-300">
          <p className="hidden md:block">Free Express Shipping on Orders Over $500</p>
          <div className="flex w-full justify-between gap-4 md:w-auto md:justify-end">
            <Link href="/stores" className="underline-magnetic transition-colors hover:text-brand-red">
              Find a Store
            </Link>
            <Link href="/trade" className="underline-magnetic transition-colors hover:text-brand-red">
              Trade Portal
            </Link>
            <Link href="/contact" className="underline-magnetic transition-colors hover:text-brand-red">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] border-navy-700 bg-navy-900 p-0 text-white">
            <div className="flex h-16 items-center border-b border-white/10 px-4">
              <Link href="/" className="font-serif text-xl font-bold">
                IFS<span className="text-brand-red">.</span>
              </Link>
            </div>
            {/* Mobile Search */}
            <div className="border-b border-white/10 px-4 py-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                />
              </div>
            </div>
            <nav className="flex flex-col p-4">
              {categories.map((category) => (
                <div key={category.name} className="border-b border-white/10 py-3">
                  <Link
                    href={category.href}
                    className="flex items-center gap-3 font-medium text-white transition-colors hover:text-brand-red"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <category.icon className="h-5 w-5 text-brand-red" />
                    {category.name}
                  </Link>
                  <div className="mt-2 flex flex-col gap-1 pl-8">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="py-1 text-sm text-slate-400 transition-colors hover:text-brand-red"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-serif text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-slate-100">
            IFS<span className="text-brand-red">.</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-brand-red">
            Interior Finishes
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden h-full items-center gap-1 lg:flex"
          onMouseLeave={handleMouseLeave}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative flex h-full items-center"
              onMouseEnter={() => handleMouseEnter(category.name)}
            >
              <Link
                href={category.href}
                className={cn(
                  'flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-all',
                  activeCategory === category.name
                    ? 'text-brand-red'
                    : 'text-slate-200 hover:text-white'
                )}
              >
                {category.name}
                <ChevronDown
                  className={cn(
                    'h-3 w-3 transition-transform duration-200',
                    activeCategory === category.name && 'rotate-180'
                  )}
                />
              </Link>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-white hover:bg-white/10 hover:text-brand-red lg:flex"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-brand-red">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:text-brand-red">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
              3
            </span>
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>

      {/* Mega Menu Panel */}
      <AnimatePresence>
        {activeCategory && activeData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full w-full overflow-hidden bg-white shadow-2xl"
            onMouseEnter={() => {
              if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto grid grid-cols-4 gap-8 px-4 py-10 text-navy-900">
              {/* Column 1: Category & Links */}
              <div className="col-span-1 border-r border-slate-100 pr-8">
                <div className="mb-4 flex items-center gap-3">
                  {activeData.icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900">
                      <activeData.icon className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <h3 className="font-serif text-2xl font-bold text-navy-900">{activeCategory}</h3>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={activeData.href}
                      className="group flex cursor-pointer items-center justify-between text-sm font-medium text-slate-600 transition-colors hover:text-brand-red"
                    >
                      View All {activeCategory}
                      <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                  {activeData.subcategories.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.href}
                        className="group flex cursor-pointer items-center justify-between text-sm font-medium text-slate-600 transition-colors hover:text-brand-red"
                      >
                        {sub.name}
                        <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2-3: Visual Cards */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="group relative h-48 cursor-pointer overflow-hidden rounded-xl bg-slate-100 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-navy-900/5 transition-colors group-hover:bg-navy-900/0" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-serif font-bold text-navy-900">Top Sellers</p>
                    <span className="text-xs text-brand-red underline decoration-brand-red/0 transition-all group-hover:decoration-brand-red/100">
                      Shop Now
                    </span>
                  </div>
                </div>
                <div className="group relative h-48 cursor-pointer overflow-hidden rounded-xl bg-slate-100 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-navy-900/5 transition-colors group-hover:bg-navy-900/0" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-serif font-bold text-navy-900">New Arrivals</p>
                    <span className="text-xs text-brand-red underline decoration-brand-red/0 transition-all group-hover:decoration-brand-red/100">
                      Explore
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 4: Promotional Feature */}
              <div className="col-span-1 rounded-xl bg-navy-900 p-6 text-white">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-red">
                  {activeData.featured.discount}
                </p>
                <p className="font-serif text-xl font-bold leading-tight">
                  {activeData.featured.title}
                </p>
                <Button
                  size="sm"
                  className="mt-4 w-full bg-white text-navy-900 transition-colors hover:bg-brand-red hover:text-white"
                >
                  View Offers
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

---

## Providers

### File: `components/lenis/LenisProvider.tsx` **(NEW)**

```typescript
"use client"

import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>
}
```

---

## Configuration

### File: `.vscode/settings.json` **(NEW)**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Summary of Changes

✅ **New Files Created:**
- `types/product.ts` - Updated with `Finish` type and `FilterState`
- `components/plp/filter-sidebar.tsx` - FilterSidebar with URL state sync
- `components/lenis/LenisProvider.tsx` - Smooth scroll wrapper
- `.vscode/settings.json` - VS Code workspace settings

✅ **Files Modified:**
- `app/layout.tsx` - Added LenisProvider wrapper
- `components/ProductCard.tsx` - Updated image container to `aspect-[3/4]` and `rounded-none`

✅ **Dependencies to Install:**
```bash
npm install @studio-freight/react-lenis
```

---

**End of Document** | Generated February 7, 2026
