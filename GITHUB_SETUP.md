# GitHub & Deployment Setup Checklist

**Status: READY FOR GITHUB**  
**Last Updated: Feb 7, 2026**

---

## ✅ Pre-GitHub Push Verification

Before pushing code to GitHub, verify:

### Local Build & Tests
- [ ] All dependencies installed: `npm install`
- [ ] All tests passing: `npm run test -- --run` → **Expect: 18/18 passing**
- [ ] Build succeeds: `npm run build` → **Expect: compiled successfully in ~3s**
- [ ] Linting passes: `npm run lint` → **Expect: no errors**
- [ ] No uncommitted changes: `git status` → **Expect: clean working directory**

### Project Files
- [ ] `.env.local` exists with Supabase credentials (create from `.env.example`)
- [ ] `.gitignore` configured (`.env.local`, `node_modules/`, `.next/`)
- [ ] No debug console.logs remaining
- [ ] Database schema matches expectations
- [ ] All TypeScript types correct

---

## 🚀 First Push to GitHub (One Time)

### 1. Install Git (Windows)
```powershell
# Check if git is installed
git --version

# If not found, download from:
# https://git-scm.com/download/win
# Install with default settings
# Close and reopen PowerShell
```

### 2. Configure Git Identity
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your-email@github.com"
```

### 3. Initialize Repository
```bash
cd C:\Users\HP\ifs\ifs-starter
git init
git add .
git commit -m "Initial commit: IFS supermarket e-commerce platform

- Next.js 16 with TypeScript strict mode
- Supabase integration
- 18 passing tests
- CI/CD pipeline configured
- Production-ready build"
```

### 4. Create GitHub Repository
Visit: https://github.com/new
- **Repository name**: `ifs-starter`
- **Description**: "Enterprise e-commerce platform with Next.js 16, advanced filtering, and Supabase"
- **Visibility**: Public (free GitHub Actions) or Private
- **Initialize**: Leave empty (don't add README/gitignore)
- Click **Create repository**

### 5. Push to GitHub
```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ifs-starter.git

# Rename branch if needed
git branch -M main

# Push code
git push -u origin main

# Verify
echo.
echo "✅ Repository pushed! Check GitHub at:"
echo "https://github.com/YOUR_USERNAME/ifs-starter"
```

---

## 🔄 What Happens After First Push

GitHub Actions will **automatically** run your CI pipeline:

### Timeline
- **T+0s**: Push detected
- **T+30s**: Lint job starts → checks code style
- **T+60s**: Test job starts → runs 18 tests
- **T+90s**: Build job starts → compiles Next.js
- **T+120s**: Bundle analysis → comments on PR
- **T+150s**: ✅ All jobs complete

### What You Should See

1. Go to: `https://github.com/YOUR_USERNAME/ifs-starter`
2. Click **Actions** tab
3. Click the latest workflow run
4. You should see:
   ```
   ✅ lint (completed)
   ✅ test (completed) 
   ✅ build (completed)
   ✅ bundle-analysis (completed)
   ```

### If Something Fails

1. Click the failed job for detailed logs
2. Common issues:
   - **Lint failed**: Run `npm run lint:fix` locally
   - **Test failed**: Run `npm run test -- --run` locally to debug
   - **Build failed**: Run `npm run build` locally to see error
3. Fix locally, commit, and push again

---

## 🌳 Ongoing Development Workflow

### For Each New Feature

```bash
# 1. Start from develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes
# ... edit files ...

# 4. Test locally
npm run test -- --run    # Tests must pass
npm run build            # Build must succeed
npm run lint:fix         # Fix any lint issues

# 5. Commit changes
git add .
git commit -m "feat: description of feature

- Detail 1
- Detail 2"

# 6. Push feature branch
git push -u origin feature/your-feature-name

# 7. Create Pull Request on GitHub
# - Go to GitHub
# - Click "Pull Requests" tab
# - Click "New Pull Request"
# - Set base: develop, compare: feature/your-feature-name
# - Click "Create Pull Request"

# 8. Wait for CI to pass
# - GitHub Actions runs automatically
# - Check Actions tab for status
# - Fix any failures and push again

# 9. After approval and CI passes
git checkout develop
git pull origin develop
git merge feature/your-feature-name
git push origin develop
```

### Promoting to Main (Production)

```bash
# Only merge to main when:
# ✅ Code reviewed and approved
# ✅ All CI jobs passing
# ✅ No breaking changes
# ✅ Tests comprehensive
# ✅ Documentation updated

# Create PR: develop → main
# After green checkmarks, merge
# CI automatically re-validates
# Deployment starts automatically (if configured)
```

---

## 📊 CI Pipeline Jobs Explained

### 1. **Lint Job** (30s)
**What it does:**
- Runs ESLint (checks for errors)
- Runs Prettier (checks formatting)

**What can fail:**
- Unused variables
- Missing semicolons
- Inconsistent formatting

**How to fix:**
```bash
npm run lint:fix  # Auto-fixes most issues
git add .
git commit -m "fix: linting issues"
git push
```

### 2. **Test Job** (60s)
**What it does:**
- Runs all 18 tests via Vitest
- Generates coverage report

**What can fail:**
- Test assertions fail
- Type errors
- Missing dependencies

**How to fix:**
```bash
npm run test -- --run  # Run tests locally
# Edit test files to fix
git add .
git commit -m "fix: test failures"
git push
```

### 3. **Build Job** (90s)
**What it does:**
- Compiles TypeScript
- Builds with Next.js Turbopack
- Generates static pages

**What can fail:**
- TypeScript compilation errors
- Missing imports
- Configuration errors

**How to fix:**
```bash
npm run build  # Build locally
# Fix TypeScript/build errors
git add .
git commit -m "fix: build errors"
git push
```

### 4. **Bundle Analysis** (20s)
**What it does:**
- Analyzes bundle size on PRs
- Posts comment comparing to main
- Tracks performance trends

**Example comment on PR:**
```
📦 Bundle Analysis

✅ Build size: 125.2 KB (gzip: 32.4 KB)
⚠️ Main bundle grew by 2.3 KB from main branch
ℹ️ Consider lazy-loading heavy components

Recommendation: Review ProductCard imports (5KB)
```

---

## 🚀 Setting Up Deployment

### Choose Your Platform

#### **Option 1: Vercel (Easiest - 5 min)**

1. Go to https://vercel.com
2. Sign up with GitHub account
3. Click "Import Project"
4. Select your `ifs-starter` repository
5. Vercel auto-detects Next.js
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - `SUPABASE_SERVICE_ROLE_KEY`
7. Click **Deploy**
8. Your app is live! 🎉

**Automatic deployment after production setup:**
- Every push to `main` automatically deploys
- Vercel validates with CI first
- Live in 2-3 minutes
- View at: `https://ifs-starter.vercel.app`

#### **Option 2: Railway (Easy - 10 min)**

1. Go to https://railway.app
2. Click "New Project"
3. Select "GitHub Repo"
4. Connect your GitHub account
5. Select `ifs-starter` repository
6. Railway auto-detects Next.js setup
7. Add environment variables
8. Deploy button appears
9. Your app is live!

#### **Option 3: Self-Hosted (Advanced)**

Use any platform: AWS, Google Cloud, DigitalOcean, etc.

```bash
# Build docker image
docker build -t ifs-supermarket .

# Push to registry
docker push your-registry/ifs-supermarket

# Deploy container with environment variables
docker run \
  -e NEXT_PUBLIC_SUPABASE_URL=xxx \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx \
  -e SUPABASE_SERVICE_ROLE_KEY=xxx \
  -p 3000:3000 \
  your-registry/ifs-supermarket
```

---

## 📈 Monitoring After Deploy

### Check Application Health

```bash
# View live logs
vercel logs          # Vercel
docker logs <container-id>  # Docker

# Monitor performance
# - Check Vercel Analytics
# - Monitor database connections
# - Track error rates
```

### Update Documentation

After first deploy, update:

1. **DEPLOYMENT.md** - Deployment path taken
2. **README.md** - Add live URL
3. **QUICK_REFERENCE.md** - Add deployment status

### Performance Targets

Monitor these metrics:

| Metric | Target | Check With |
|--------|--------|-----------|
| Lighthouse Score | 90+ | Vercel Analytics |
| First Contentful Paint (FCP) | < 1.8s | Web Vitals |
| Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Bundle Size | < 150KB gzip | GitHub Actions |

---

## 📋 Expansion Plan

### Test Coverage Growth Path

```timeline
Week 1:  18 tests ✅ current
Week 2:  22 tests - add cart integration
Week 3:  26 tests - add filtering tests
Week 4:  30+ tests - add E2E flows
```

### Features to Test Next

Priority order:
1. **Cart operations** - Add/remove/update (3 tests)
2. **Filtering** - Price/category/finish (4 tests)
3. **Sorting** - By price/rating/new (2 tests)
4. **Server actions** - Error handling (2 tests)
5. **E2E flows** - Complete checkout (3 tests)

See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for test templates.

---

## 🆘 Troubleshooting

### "git not found"
```powershell
# Check installation
git --version

# If fails, reinstall from:
# https://git-scm.com/download/win
# Close and reopen PowerShell
```

### "Permission denied" pushing
```bash
# Use personal access token instead of password
# https://github.com/settings/tokens
# Create token with repo + workflow scopes
# Use token as password when prompting
```

### "CI keeps failing"
```bash
# 1. Check exact error in GitHub Actions logs
# 2. Reproduce locally
npm run lint:fix
npm run test -- --run
npm run build

# 3. If still fails, share CI logs in issue
# https://github.com/YOUR_USERNAME/ifs-starter/issues
```

### "Can't connect to Supabase"
```bash
# 1. Check environment variables
echo $env:NEXT_PUBLIC_SUPABASE_URL

# 2. Verify credentials are correct in .env.local
# 3. Check Supabase project is active
# 4. Check network connectivity
```

---

## ✨ Success Criteria

You're ready for production when:

- ✅ Code pushed to GitHub
- ✅ CI pipeline running (all jobs green)
- ✅ Tests passing (18/18)
- ✅ Build successful (<60s)
- ✅ Deployed to Vercel/Railway
- ✅ App accessible at live URL
- ✅ Environment variables configured
- ✅ Database connected and working
- ✅ Monitoring/analytics configured
- ✅ Team documentation complete

---

## 📞 Quick Links

- **GitHub Repo**: `https://github.com/YOUR_USERNAME/ifs-starter`
- **GitHub Actions**: `.../actions`
- **Vercel Dashboard**: `https://vercel.com`
- **Environment Setup**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Quick Commands**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## 📝 Next Steps

1. **This week:**
   - [ ] Initialize git: `git init`
   - [ ] Create GitHub repo
   - [ ] Push to `main`
   - [ ] Verify CI passes

2. **Next week:**
   - [ ] Set up Vercel deployment
   - [ ] Configure domain
   - [ ] Enable monitoring

3. **Ongoing:**
   - [ ] Expand tests to 30+
   - [ ] Monitor performance metrics
   - [ ] Plan feature releases
   - [ ] Keep documentation updated

---

**Status**: ✅ Ready for GitHub  
**Build**: ✅ Passing  
**Tests**: ✅ 18/18 Passing  
**CI/CD**: ✅ Configured  
**Deployment**: ⏳ Pending GitHub push  

**Questions?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)
