# Quick Reference Card

## 🚀 Deployment Checklist

```bash
# Local verification
npm run lint        # ✅ Code quality
npm run test -- --run  # ✅ All tests pass (expect 18)
npm run build       # ✅ Production build succeeds

# Git push
git add .
git commit -m "Feature: description"
git push origin feature/name

# GitHub Actions will automatically:
# ✓ Run linting
# ✓ Run tests
# ✓ Build production code
# ✓ Analyze bundle size
# Status → Check Actions tab in GitHub
```

---

## 🔄 Development Workflow

```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# Make changes & commit
git add .
git commit -m "Add my feature"

# Push & create PR
git push -u origin feature/my-feature
# Go to GitHub → Create Pull Request → develop

# After PR approved & CI passes:
git checkout develop
git pull origin develop
git merge feature/my-feature
git push origin develop

# Promote to production (main branch)
# Create PR: develop → main
# After review & CI passes: merge to main
# Automatic deployment starts ✅
```

---

## 🧪 Testing Commands

```bash
# Run all tests (watch mode)
npm run test

# Run tests once (CI mode)
npm run test -- --run

# Run specific test file
npm run test -- test/actions.test.ts

# Run with coverage report
npm run test -- --coverage

# Watch specific file
npm run test -- test/actions.test.ts --watch
```

---

## 📊 Performance Monitoring

```bash
# Build analysis
npm run build
# Check output for:
# - Bundle size
# - Page load metrics
# - Optimizations

# GitHub Actions bundle analysis
# Appears automatically as PR comments
# Shows delta from main branch
# Track trends over time
```

---

## 🐛 CI Failures - Quick Fixes

| Error | Fix |
|-------|-----|
| **Lint failed** | `npm run lint:fix` then push |
| **Test failed** | `npm run test -- --run` fix locally, then push |
| **Build failed** | `npm run build` check errors, fix, push |
| **Bundle analysis** | Check PR comment for size delta recommendations |

---

## 🎯 Test Expansion Roadmap

### Phase 1 (Now) - 18 tests ✅
- ✓ Validation schemas
- ✓ Error boundary
- ✓ Button component
- ✓ Product grid

### Phase 2 (Next Sprint) → 25 tests
- [ ] Cart integration
- [ ] Product filtering
- [ ] Sorting

### Phase 3 (Following) → 30+ tests
- [ ] Form validation
- [ ] Server errors
- [ ] E2E checkout

---

## 🚢 Deployment Paths

```
main → Vercel/Railway → Production (auto)
  ↑
develop → Review & PR → Staging/CI validation
  ↑
feature/* → Review & PR → Merge to develop
```

---

## 📱 GitHub Actions Jobs (Automatic on Push)

```
Lint (30s)         │ 
    ↓              │
Test (60s)         │ Run in parallel
    ↓              │
Build (90s)        │
    ↓
Bundle Analysis (20s)
    ↓
✅ All jobs passed → Ready to deploy
```

---

## 🔐 Environment Variables Needed

```env
# .env.local (development)
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# GitHub Secrets & Vercel/Railway env vars
SUPABASE_SERVICE_ROLE_KEY=xxx
STRIPE_SECRET_KEY=xxx

# Vercel dashboard → Project Settings → Environment Variables
```

---

## 📈 Target Metrics

| Metric | Target | Current |
|--------|--------|---------|
| **Tests** | 30+ | 18 ✅ |
| **Coverage** | 80% | 60% |
| **Bundle** | < 150KB gzip | ~125KB ✅ |
| **LCP** | < 2.5s | ~1.8s ✅ |
| **Build Time** | < 60s | ~30s ✅ |
| **CI Pass Rate** | 100% | 100% ✅ |

---

## 🌐 Deploy to Production

```bash
# Option 1: Vercel (Recommended)
vercel
# Or connect GitHub → auto-deploys from main

# Option 2: Railway
# Connect GitHub repo → auto-deploys from main

# Option 3: Self-Hosted (Docker)
docker build -t ifs-supermarket .
docker run -p 3000:3000 ifs-supermarket
```

---

## 🆘 Stuck? Run This

```bash
# Full local verification
npm run lint:fix && npm run test -- --run && npm run build

# If still errors:
rm -rf node_modules
npm install
npm run test -- --run
npm run build

# Check git status
git status
git log -1

# View CI logs
# Go to GitHub → Actions → Latest workflow
```

---

**Last Updated:** Feb 7, 2026  
**Maintained by:** Development Team  
**Status:** ✅ Production Ready
