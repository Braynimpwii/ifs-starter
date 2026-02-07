# IFS Supermarket - Enterprise E-Commerce Platform

**Production-ready Next.js e-commerce platform** with advanced filtering, cart management, Supabase integration, and enterprise-grade architecture.

**Built with:** Next.js 16 | TypeScript | Tailwind CSS | Supabase | Zustand | React Query | Stripe

> See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed installation and configuration.

---

## ⚡ Quick Start

```bash
# 1. Clone & Install
git clone <repo-url> && cd ifs-starter && npm install

# 2. Setup Environment
cp .env.example .env.local
# Add your Supabase credentials to .env.local

# 3. Create Database Tables
# Run SQL from SETUP_GUIDE.md in your Supabase console

# 4. Start Development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Key Features

✅ **Advanced Filtering**
- Price range slider
- Multi-select finishes  
- Full-text search
- Sorting by relevance, price, rating, new arrivals
- Rating & stock filters

✅ **Built-in Components**
- CVA-powered Button with 7 variants
- Optimized Image component with blur placeholder
- Loading skeletons
- Error boundaries

✅ **State Management**
- Client: Zustand cart store with persistence
- Server: React Query + Server Actions
- Real-time updates

✅ **Database**
- Supabase PostgreSQL
- Type-safe queries with Zod validation
- Server actions for mutations
- Full-text search support

✅ **Performance**
- Image optimization (WebP, AVIF)
- ISR caching strategy
- Code splitting
- Lazy loading

---

## 🎯 Architecture

### Three-Layer Filtering
1. **Server Actions** - Heavy lifting (DB queries, caching)
2. **Client Filters** - Instant feedback (Zustand store)
3. **URL State** - Persistence (search params)

### Type Safety
```typescript
// Zod validation + TypeScript
const filters = AdvancedFilterStateSchema.parse(input)
const { data } = await getFilteredProducts(filters)
```

### Component Examples
```tsx
// Button with 7 variants
<Button variant="primary" size="lg" isLoading>Add to Cart</Button>

// Optimized images
<OptimizedImage src="/product.jpg" alt="Product" priority />

// Cart management
const { addItem, getTotalPrice } = useCartStore()

// Server actions
const { data } = await getFilteredProducts(filters)
```

---

## 📁 File Structure

```
lib/
  ├── supabase-client.ts       # Supabase setup
  ├── cart-store.ts            # Zustand store
  ├── actions.ts               # Server actions
  ├── validations.ts           # Zod schemas
  └── utils.ts                 # Helper functions

components/
  ├── ui/button.tsx            # CVA Button
  ├── optimized-image.tsx      # Image optimization
  ├── skeletons.tsx            # Loading states
  ├── error-boundary.tsx       # Error handling
  └── plp/                     # Product listing components

types/
  ├── product.ts               # Product types
  └── supabase.ts              # Database types
```

---

## 🔑 Environment Setup

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Optional
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
```

See `.env.example` for all options.

---

## 📚 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production
npm run lint         # Check code
npm run lint:fix     # Fix issues
npm run format       # Format code
npm run test         # Unit tests
npm run db:generate  # Supabase types
```

---

## 🚀 Deployment & CI/CD

### GitHub Actions CI Pipeline
Every push triggers automatic validation:
- ✅ **Lint** - ESLint + Prettier
- ✅ **Test** - Vitest (18 tests)
- ✅ **Build** - Next.js production build
- ✅ **Bundle Analysis** - Size tracking & PR comments

See `.github/workflows/ci.yml` for details.

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ifs-starter.git
git push -u origin main
```

CI will automatically run on push → Check **Actions** tab in GitHub.

### Deployment Options

**Vercel (Recommended - 5 min setup):**
```bash
npm install -g vercel
vercel
# Follow prompts, connect GitHub repo for auto-deploy on push
```

**Self-Hosted:**
```bash
npm run build
npm run start
# Deploy `.next/` directory with Node.js
```

**Docker:**
```dockerfile
# Create Dockerfile with Node:20+
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production && npm run build
CMD ["npm", "start"]
```

Set environment variables in your deployment platform (Vercel, Railway, Render, etc.).

---

## 📖 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Installation, testing, GitHub setup
- [Component Docs](./components/README.md) - Component API  
- [Database Schema](./database/) - SQL definitions

---

**Questions?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) or open an issue
