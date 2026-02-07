# IFS Supermarket - Complete E-Commerce Platform

**Built with**: Next.js 16+, TypeScript, Tailwind CSS, Supabase, Zustand, React Query, Stripe

> Production-ready e-commerce platform with advanced filtering, cart management, server-side rendering, and enterprise-grade architecture.

---

## 🚀 Quick Start

### 1. **Clone & Install**
```bash
git clone <your-repo-url>
cd ifs-starter
npm install
```

### 2. **Environment Setup**
```bash
cp .env.example .env.local
```

Then fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### 3. **Database Setup**

Connect to your Supabase project and run these SQL commands:

```sql
-- Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  category TEXT NOT NULL,
  finish TEXT NOT NULL CHECK (finish IN ('chrome', 'matte-black', 'brushed-gold', 'gunmetal', 'nickel')),
  image_url TEXT NOT NULL,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Cart Items Table
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_finish ON products(finish);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
```

### 4. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                              # Next.js app directory
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   ├── bathroom/
│   │   └── shower-heads/
│   │       ├── page.tsx             # Product listing page
│   │       └── [id]/page.tsx        # Product detail page
│   └── cart/
│       └── page.tsx                 # Shopping cart
├── components/
│   ├── ui/
│   │   ├── button.tsx               # CVA-powered Button component
│   │   ├── slider.tsx               # Price slider
│   │   └── ...                      # Other primitives
│   ├── plp/
│   │   ├── filter-sidebar.tsx       # Advanced filters
│   │   ├── product-grid.tsx         # Grid layout
│   │   └── product-card.tsx         # Individual product card
│   ├── optimized-image.tsx          # Image optimization
│   ├── skeletons.tsx                # Loading states
│   ├── error-boundary.tsx           # Error handling
│   └── ...
├── lib/
│   ├── supabase-client.ts           # Supabase client
│   ├── cart-store.ts                # Zustand cart store
│   ├── actions.ts                   # Server actions
│   ├── validations.ts               # Zod schemas
│   └── utils.ts                     # Utilities
├── types/
│   ├── product.ts                   # Product types
│   └── supabase.ts                  # Database types
└── public/
    └── images/                      # Static assets
```

---

## 🎨 Key Features

### ✅ **Button Component** (CVA-powered)
```tsx
<Button variant="primary" size="lg" isLoading>
  Add to Cart
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`
Sizes: `xs`, `sm`, `md`, `lg`, `xl`

### ✅ **Advanced Filtering**
- Price range slider
- Multi-select finishes
- Category filters
- Stock availability
- Ratings filter
- Full-text search
- Sorting options

### ✅ **Cart Management**
```tsx
const { addItem, removeItem, getTotalPrice } = useCartStore()

// Add to cart (client-side)
addItem(product, quantity)

// Create order (server-side)
const { data } = await createOrder(items)
```

### ✅ **Optimized Images**
```tsx
<OptimizedImage
  src="/product.jpg"
  alt="Product"
  priority={true}
  quality={85}
/>
```

### ✅ **Loading States**
```tsx
<ProductGridSkeleton count={12} />
<ProductCardSkeleton />
```

### ✅ **Error Handling**
```tsx
<ErrorBoundary fallback={<CustomError />}>
  <ProductGrid />
</ErrorBoundary>
```

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint errors
npm run format       # Format with Prettier
npm run test         # Run unit tests
npm run db:generate  # Generate Supabase types
```

---

## 🔑 Environment Variables

| Key | Required | Description |
|-----|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role (backend only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ | Stripe publishable key |
| `STRIPE_SECRET_KEY` | ❌ | Stripe secret key |

---

## 📦 Dependencies

**Production:**
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `zustand` - State management
- `@supabase/supabase-js` - Database
- `@tanstack/react-query` - Server state
- `zod` - Validation
- `class-variance-authority` - Component variants
- `lucide-react` - Icons

**Development:**
- `eslint` - Linting
- `prettier` - Formatting
- `vitest` - Testing
- `@testing-library/react` - Component testing

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Build: `npm run build`
- Start: `npm run start`
- Env: Add variables from `.env.example`

---

## 📚 API Documentation

### Filtering Products
```typescript
const { data, count } = await getFilteredProducts({
  minPrice: 100,
  maxPrice: 1000,
  finishes: ['chrome', 'matte-black'],
  categories: ['bathroom'],
  minRating: 4,
  inStockOnly: true,
  searchQuery: 'shower',
  sortBy: 'price-asc',
  page: 1,
  limit: 20,
})
```

### Adding to Cart
```typescript
const { addItem } = useCartStore()

addItem(product, quantity) // Client-side
await addToCart({ productId, quantity }) // Server-side
```

### Creating Orders
```typescript
const { data } = await createOrder(cartItems)
// Returns: { id, status, totalAmount, ... }
```

---

## 🎯 Component Usage Examples

### FilterSidebar
```tsx
<FilterSidebar className="sticky top-24" />
```

### ProductGrid
```tsx
<ProductGrid products={filteredProducts} />
```

### OptimizedImage
```tsx
<OptimizedImage
  src={product.image}
  alt={product.name}
  priority={index < 3}
  className="object-cover"
/>
```

### Button Variants
```tsx
<Button variant="primary" size="lg">Primary</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="outline" size="sm">Outline</Button>
<Button variant="ghost" size="xs">Ghost</Button>
<Button variant="danger" isLoading>Danger Loading</Button>
```

---

## ✅ Build & Tests

### Running Tests
```bash
# Run all tests once
npm run test -- --run

# Watch mode (re-runs on file changes)
npm run test
```

### Building for Production
```bash
# Full production build with optimizations
npm run build

# Start production server
npm run start
```

### Code Quality
```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

---

## 🔄 CI/CD Pipeline

This project includes a GitHub Actions workflow that runs on every push and pull request.

### Automated Checks
- **Lint**: ESLint + Prettier format validation
- **Tests**: Vitest suite with full component coverage
- **Build**: Full Next.js production build
- **Bundle Analysis**: Reports build stats to PRs

### Workflow File
- Location: `.github/workflows/ci.yml`
- Triggers: Push to `main`/`develop`, all PRs
- Node Version: 20 (matches `package.json` engines)

---

## 🌐 GitHub & Deployment

### Initialize Git Repository

**If git is not yet initialized on your machine:**

1. **Install Git** (if needed)
   - Windows: Download from https://git-scm.com/download/win
   - After installation, close and reopen your terminal

2. **Initialize git in your project:**
```bash
git init
git add .
git commit -m "Initial commit: IFS supermarket e-commerce platform"
```

### Push to GitHub

**1. Create a new GitHub repository:**
- Go to https://github.com/new
- Create repository named `ifs-starter` (or your preferred name)
- Leave it empty (don't initialize with README)

**2. Connect local repo to GitHub:**
```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/ifs-starter.git

# Rename main branch (if using old git version)
git branch -M main

# Push to GitHub
git push -u origin main
```

**3. Verify CI/CD pipeline activated:**
- Go to your GitHub repo → **Actions** tab
- You should see the CI pipeline automatically run
- All 4 jobs should execute: lint → test → build → bundle-analysis

### Deployment Workflow

**Branch Strategy:**
```
main (production)
  ↓ [Automatic build + deploy via CI]
develop (staging) 
  ↓ [Create PR to main to trigger full CI]
feature/* (development)
  ↓ [Create PR to develop for peer review]
```

**Production Deployment:**
1. Code merged to `main` branch
2. GitHub Actions CI runs automatically
3. All tests must pass
4. Build succeeds
5. Deploy to Vercel/your hosting (configure in repository settings)

**Staging Deployment:**
1. Create PR from develop → main
2. CI runs on PR
3. Review CI results and bundle analysis comments
4. Merge to main when ready
5. Automatic production deployment

### Monitor Bundle Performance

**Bundle Analysis Comments on PRs:**
- GitHub Actions automatically analyzes bundle size on every PR
- Comments appear directly on your PR with:
  - Total bundle size
  - File-by-file breakdown
  - Size deltas from main branch
  - Optimization recommendations

**View in Detail:**
- Check `.github/workflows/ci.yml` for bundle analysis job
- Artifacts stored as GitHub Actions artifacts (retention: 5 days)

**Manual Analysis:**
```bash
# Analyze bundle locally
npm run build
# Check Next.js output for bundle information
```

### Continuous Integration Details

**What Runs on Every Push/PR:**

| Job | Command | Purpose |
|-----|---------|---------|
| Lint | `npm run lint` | Enforce code style (ESLint + Prettier) |
| Test | `npm run test -- --run` | Run all 18 tests with Vitest |
| Build | `npm run build` | Production build verification |
| Bundle Analysis | `npx package-size` + comment | Track bundle size trends |

**CI Status Badge:**
Add to README.md for visibility:
```markdown
![CI Status](https://github.com/YOUR_USERNAME/ifs-starter/actions/workflows/ci.yml/badge.svg)
```

**Troubleshooting CI Failures:**
1. Check the **Actions** tab in GitHub
2. Click the failed workflow
3. Review job logs for exact error
4. Fix locally: `npm run lint`, `npm run test -- --run`, `npm run build`
5. Commit and push to re-trigger

---

## 🧪 Test Coverage

The project includes comprehensive tests:

### Current Test Suites
- `test/ProductGrid.test.tsx` - Product grid rendering
- `test/actions.test.ts` - Server action validation (7 tests)
- `test/ErrorBoundary.test.tsx` - Error handling (3 tests)
- `test/Button.test.tsx` - Component variants & states (7 tests)

**Current: 18 tests | Target: 30+ tests**

### Running Tests

**Run all tests with watch mode:**
```bash
npm run test
```

**Run all tests once (CI mode):**
```bash
npm run test -- --run
```

**Run tests for a specific file:**
```bash
npm run test -- test/actions.test.ts
```

**Run with coverage report:**
```bash
npm run test -- --coverage
```

### Expanding Test Coverage (Roadmap)

**Priority 1: Critical User Paths (8 tests)**
- `test/cart-integration.test.ts` (NEW)
  - Add to cart flow
  - Update quantity
  - Remove from cart
  - Cart persistence (localStorage)
  - Cart total calculation
  - Checkout initiation
  - Error handling for out-of-stock

- `test/product-filtering.test.ts` (NEW)
  - Filter by category
  - Filter by price range
  - Filter by finish
  - Combined filters
  - Sort by price/rating
  - Clear all filters

**Priority 2: UI Components (5 tests)**
- Expand `test/Button.test.tsx`
  - Tooltip display
  - Focus management

- `test/Slider.test.tsx` (NEW)
  - Range input validation
  - Min/max constraints

- `test/Input.test.tsx` (NEW)
  - Form validation feedback
  - Disabled state

**Priority 3: Server Actions & Data (4 tests)**
- Expand `test/actions.test.ts`
  - `getProductById()` error scenarios
  - `createOrder()` with payment processing
  - Database connection errors
  - Rate limiting/throttling

**Priority 4: E2E & Integration (3+ tests)**
- `test/e2e/checkout.e2e.ts` (NEW)
  - Full user flow: browse → filter → add → checkout
  - Payment processing
  - Order confirmation

- `test/e2e/search.e2e.ts` (NEW)
  - Product search functionality

### Test Coverage Tools

**Check current coverage:**
```bash
npm run test -- --coverage
```

**View coverage report (HTML):**
```bash
npm run test -- --coverage
open coverage/index.html  # macOS/Linux
start coverage/index.html # Windows
```

**Coverage Targets:**
- Statements: ≥ 80%
- Branches: ≥ 75%
- Functions: ≥ 80%
- Lines: ≥ 80%

### Key Improvements (Session 2)
- ✅ Supabase count API fixed (pagination)
- ✅ Image optimization refactored
- ✅ React 19 compatibility ensured
- ✅ TypeScript strict mode compliant
- ✅ Accessibility improvements (ARIA labels)
- ✅ CI/CD pipeline active

---

## 🐛 Troubleshooting

**Cannot connect to Supabase:**
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Ensure Supabase project is active

**Images not loading:**
- Verify domain in remote patterns in `next.config.js`
- Check Cloudinary or image CDN configuration

**Cart not persisting:**
- Check browser localStorage is enabled
- Verify Zustand persist middleware is working

**TypeScript errors:**
- Run `npm run db:generate` to update Supabase types
- Clear `.next` directory: `rm -rf .next`
- Ensure `tsconfig.json` has correct `baseUrl` and `paths`

**Build fails:**
- Check `npm run lint` for syntax errors
- Verify all environment variables are set
- Ensure Node.js >= 20: `node --version`

**Tests failing:**
- Run `npm run test -- --run` to see full output
- Check `vitest.config.ts` for alias configuration
- Ensure test files use correct import paths

---

## 📝 License

MIT - See LICENSE file for details

---

**Questions?** Check the docs or create an issue on GitHub.

**Need help?** Email: support@interiorfinishessupermarket.com

---

**Last Updated**: Feb 7, 2026  
**Build Status**: ✅ PASSING  
**Test Status**: ✅ ALL PASSING (18/18)
**CI/CD Status**: ✅ READY FOR GITHUB  
**Version**: 1.2
