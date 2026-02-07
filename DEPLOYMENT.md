# Deployment & CI/CD Guide

Complete guide to pushing code to GitHub, setting up CI/CD, monitoring performance, and deploying to production.

---

## 📋 Prerequisites

✅ Node.js 20+ installed  
✅ npm 10+ installed  
✅ GitHub account created  
✅ All tests passing locally (`npm run test -- --run`)  
✅ Build succeeds locally (`npm run build`)  

---

## 🔧 Step 1: Install & Configure Git

### Check if Git is Installed
```powershell
# Windows PowerShell
git --version
```

### Install Git (if needed)
- **Windows**: https://git-scm.com/download/win
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

### Configure Git User
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

---

## 🚀 Step 2: Initialize & Push to GitHub

### 1. Initialize Local Git Repository
```powershell
# From project root directory
git init
git add .
git commit -m "Initial commit: IFS supermarket e-commerce platform"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `ifs-starter` (or your preferred name)
   - **Description**: "Enterprise e-commerce platform with Next.js 16"
   - **Visibility**: Public (for free GitHub Actions) or Private
3. **DO NOT** initialize with README/gitignore (we already have them)
4. Click **Create repository**

### 3. Connect Local Repo to GitHub
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ifs-starter.git

# Rename main branch (if using old git version)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 4. Verify Push Success
- Go to https://github.com/YOUR_USERNAME/ifs-starter
- You should see all your files reflected
- Check **Actions** tab → CI should be running automatically

---

## ✅ Step 3: Verify CI/CD Pipeline

### What Happens Automatically

When you push code, GitHub Actions runs all jobs:

1. **Lint** (30 sec)
   - Checks code style with ESLint
   - Formats with Prettier
   - ❌ Fails if code violates rules

2. **Test** (60 sec)
   - Runs all 18 tests with Vitest
   - 🧪 18 tests must pass
   - ❌ Fails if any test fails

3. **Build** (90 sec)
   - Compiles TypeScript
   - Builds with Next.js Turbopack
   - Generates static pages
   - ❌ Fails if build errors exist

4. **Bundle Analysis** (20 sec)
   - Analyzes bundle size
   - Comments on PRs with size deltas
   - Tracks performance trends

### Monitor CI Status

**Real-time monitoring:**
1. Push code to GitHub
2. Go to your repo → **Actions** tab
3. Click the latest workflow run
4. Watch jobs execute in real-time
5. Each job shows logs when you click it

**Add CI Badge to README:**
```markdown
[![CI Status](https://github.com/YOUR_USERNAME/ifs-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/ifs-starter/actions)
```

### Troubleshooting CI Failures

**Lint Failed:**
```bash
# Fix locally first
npm run lint:fix
git add .
git commit -m "Fix linting issues"
git push
```

**Tests Failed:**
```bash
npm run test -- --run
# Fix failing tests locally
npm run test -- --run
# Commit and push when all pass
```

**Build Failed:**
```bash
npm run build
# Fix any TypeScript/build errors
npm run build
# Verify before pushing
```

---

## 🔄 Step 4: Set Up Development Workflow

### Branch Strategy

**Production (`main`):**
- Merged-and-tested code only
- Automatic deployment to production
- Protected branch (require PR review)

**Staging (`develop`):**
- Stable development branch
- Merged features from feature branches
- Ready for promotion to main

**Features (`feature/feature-name`):**
- Individual developer branches
- Branch off `develop`
- Create PR back to `develop`

### Creating a Feature Branch
```bash
# Create from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Make changes
git add .
git commit -m "Add your feature"

# Push branch
git push -u origin feature/your-feature-name
```

### Creating a Pull Request
1. Go to GitHub repo
2. Click **Pull Requests** tab
3. Click **New Pull Request**
4. Set:
   - **Base branch**: develop (for features) or main (for releases)
   - **Compare branch**: your feature branch
5. Add description of changes
6. Click **Create Pull Request**
7. CI runs automatically on PR
8. Request code review
9. Merge when CI passes ✅ + review approved ✅

---

## 📊 Step 5: Monitor Bundle Performance

### Understand Bundle Analysis Comments

When you create a PR, GitHub Actions posts a comment showing:

```
📦 Bundle Analysis
├─ Total Size: 125.2 KB (gzip: 32.4 KB)
├─ Main Bundle: 95.2 KB (+2.3 KB from main)
├─ App Directory: 30 KB (-1.1 KB)
└─ Recommendations: Lazy load ProductCard (5KB savings)
```

**What to look for:**
- ✅ Size increases < 5KB → good
- ⚠️ Size increases 5-10KB → review if necessary
- ❌ Size increases > 10KB → investigate before merging

### Optimize When Bundle Grows

1. **Identify large imports:**
   ```bash
   npm run analyze  # if script exists
   ```

2. **Lazy load heavy components:**
   ```typescript
   import dynamic from 'next/dynamic';
   const ProductGrid = dynamic(() => import('./ProductGrid'), { loading: () => <Skeleton /> });
   ```

3. **Use Code Splitting:**
   - Next.js splits pages automatically
   - Use dynamic imports for heavy libraries

4. **Check dependencies:**
   ```bash
   npm ls | grep "> 50KB"
   ```

---

## 🚀 Step 6: Deploy to Production

### Option A: Vercel (Recommended)

**Setup (5 minutes):**
1. Go to https://vercel.com
2. Click **Import Project**
3. Connect GitHub account
4. Select `ifs-starter` repository
5. Click **Import**
6. Set environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=xxx
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```
7. Click **Deploy**

**Auto-deploy on push:**
- Every push to `main` automatically deploys
- Vercel builds and verifies with CI
- Live in 2-3 minutes

**Custom domain:**
1. In Vercel dashboard, go to Settings → Domains
2. Add your domain
3. Follow DNS configuration
4. HTTPS auto-enabled with Let's Encrypt

### Option B: Railway

**Setup (10 min):**
1. Go to https://railway.app
2. Click **New Project** → **GitHub Repo**
3. Select `ifs-starter` repo
4. Add environment variables
5. Railway auto-detects Next.js
6. Deploys on push to main

### Option C: Docker Self-Hosted

**Build Docker image:**
```dockerfile
# Dockerfile
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**Build & run:**
```bash
docker build -t ifs-supermarket .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=xxx ifs-supermarket
```

---

## 📈 Step 7: Expand Test Coverage

### Current Test Status
- **Tests**: 18 passing
- **Coverage**: ~60%
- **Target**: 30+ tests, 80%+ coverage

### Priority Tests to Add

**Phase 1 (Next Sprint):**
- [ ] Cart integration tests (add/remove/update)
- [ ] Product filtering tests (price range, finish)
- [ ] Sort functionality tests

**Phase 2 (Following Sprint):**
- [ ] Form validation tests
- [ ] Server action error handling
- [ ] Authentication flow tests

**Phase 3 (Long-term):**
- [ ] E2E checkout flow
- [ ] Payment processing (Stripe mock)
- [ ] Performance benchmarks

### Writing New Tests

**Template:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Arrange
    const input = { /* test data */ };
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

**Run new tests:**
```bash
npm run test -- --run test/new-test.test.ts
```

**Check coverage:**
```bash
npm run test -- --coverage
```

---

## 🔐 Secrets & Environment Variables

### GitHub Secrets

Store sensitive data safely:

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secrets (CI will NOT show values in logs):
   ```
   SUPABASE_SERVICE_ROLE_KEY
   STRIPE_SECRET_KEY
   DATABASE_PASSWORD
   ```

4. Reference in workflow:
   ```yaml
   env:
     SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
   ```

### Vercel Secrets

1. Go to Vercel dashboard → Project → **Settings** → **Environment Variables**
2. Add secrets for:
   - `NEXT_PUBLIC_SUPABASE_URL` (public)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public)
   - `SUPABASE_SERVICE_ROLE_KEY` (secret)

---

## 📋 Pre-Production Checklist

Before deploying to production:

- [ ] All tests passing: `npm run test -- --run`
- [ ] Build succeeds: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Environment variables set in prod
- [ ] Database migrations run
- [ ] Performance acceptable (< 150KB gzip main bundle)
- [ ] Security check with `npm audit`
- [ ] No console.log statements left
- [ ] Error logging configured
- [ ] Analytics tracking ready
- [ ] Backup/rollback plan documented

---

## 🆘 Common Issues

### "git not found"
- **Windows**: Reinstall from https://git-scm.com/download/win
- **macOS**: `brew install git`
- Close and reopen terminal after install

### "Permission denied" on push
- Configure SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Or use HTTPS with personal access token

### CI keeps failing
1. Check the **Actions** logs for exact error
2. Reproduce locally: `npm run lint`, `npm run test -- --run`, `npm run build`
3. Fix and test locally before pushing
4. Push again

### Tests pass locally but fail in CI
- Node.js version mismatch → Check workflows use Node 20
- Environment variable missing → Add to GitHub Secrets
- Module resolution issue → Check package.json and tsconfig

### Bundle size keeps growing
- Run `npm run build` and analyze output
- Identify large dependencies: `npm ls`
- Use dynamic imports for heavy components
- Remove unused dependencies

---

## 📞 Support

**Questions?**
- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Review [README.md](./README.md)
- Check GitHub workflow file: `.github/workflows/ci.yml`
- Open an issue on GitHub

---

**Last Updated:** Feb 7, 2026  
**Status:** ✅ Ready for production deployment
