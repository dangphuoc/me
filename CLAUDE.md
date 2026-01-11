# phuocnguyen.me - Project Documentation

## Quick Overview

Personal website cho Software Engineering Manager với 3 mục đích:
1. **Portfolio** - Giới thiệu bản thân
2. **Tech Blog** - Viết blog kỹ thuật (MDX)
3. **Moments** - Instagram-style photo gallery

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| i18n | next-intl (VI/EN) |
| Theme | next-themes (dark/light/system) |
| Blog | MDX + gray-matter |
| Icons | lucide-react |

## Project Structure

```
personal_page/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (fonts, metadata)
│   │   ├── globals.css                # Global styles + Tailwind
│   │   └── [locale]/                  # i18n dynamic route
│   │       ├── layout.tsx             # Locale layout (Header, Footer, Providers)
│   │       ├── page.tsx               # Homepage
│   │       ├── about/page.tsx         # About page
│   │       ├── blog/
│   │       │   ├── page.tsx           # Blog listing
│   │       │   └── [slug]/page.tsx    # Blog post detail
│   │       ├── moments/page.tsx       # Photo gallery
│   │       └── contact/page.tsx       # Contact form
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Navigation bar
│   │   │   ├── Footer.tsx             # Footer with social links
│   │   │   ├── ThemeToggle.tsx        # Dark/Light/System toggle
│   │   │   └── LanguageSwitcher.tsx   # VI/EN switcher
│   │   └── home/
│   │       ├── Hero.tsx               # Hero section with animations
│   │       ├── TechStack.tsx          # Technology badges
│   │       └── FeaturedPosts.tsx      # Featured blog posts
│   │
│   ├── i18n/
│   │   ├── config.ts                  # Locales config (vi, en)
│   │   └── request.ts                 # Server-side i18n setup
│   │
│   ├── lib/
│   │   └── mdx.ts                     # MDX utilities (getPostBySlug, getAllPosts)
│   │
│   └── middleware.ts                  # i18n routing middleware
│
├── messages/
│   ├── vi.json                        # Vietnamese translations
│   └── en.json                        # English translations
│
├── content/
│   ├── blog/                          # MDX blog posts
│   │   └── *.mdx
│   └── moments/
│       └── moments.json               # Gallery metadata
│
├── public/images/
│   ├── profile/                       # Profile photos
│   └── moments/                       # Gallery images
│
├── next.config.mjs                    # Next.js + next-intl config
├── tailwind.config.ts                 # Tailwind config
└── package.json
```

## Key Files Reference

### Routing & Layout

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root HTML, fonts (Inter, JetBrains Mono), base metadata |
| `src/app/[locale]/layout.tsx` | i18n provider, theme provider, Header/Footer wrapper |
| `src/middleware.ts` | Redirect `/` → `/vi`, handle locale routing |

### Pages

| Route | File | Description |
|-------|------|-------------|
| `/[locale]` | `src/app/[locale]/page.tsx` | Homepage with Hero, FeaturedPosts, TechStack |
| `/[locale]/about` | `src/app/[locale]/about/page.tsx` | Bio, Experience timeline, Skills |
| `/[locale]/blog` | `src/app/[locale]/blog/page.tsx` | Blog listing with search & tag filter |
| `/[locale]/blog/[slug]` | `src/app/[locale]/blog/[slug]/page.tsx` | Blog post detail |
| `/[locale]/moments` | `src/app/[locale]/moments/page.tsx` | Photo gallery with lightbox |
| `/[locale]/contact` | `src/app/[locale]/contact/page.tsx` | Contact form + social links |

### Components

| Component | File | Props/Usage |
|-----------|------|-------------|
| Header | `src/components/layout/Header.tsx` | Navigation, mobile menu, includes ThemeToggle & LanguageSwitcher |
| Footer | `src/components/layout/Footer.tsx` | Social links, copyright |
| ThemeToggle | `src/components/layout/ThemeToggle.tsx` | Cycles: light → dark → system |
| LanguageSwitcher | `src/components/layout/LanguageSwitcher.tsx` | VI/EN toggle buttons |
| Hero | `src/components/home/Hero.tsx` | Animated hero section |
| TechStack | `src/components/home/TechStack.tsx` | Technology badges grid |
| FeaturedPosts | `src/components/home/FeaturedPosts.tsx` | 3 latest blog posts |

### i18n

| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | `locales = ['vi', 'en']`, `defaultLocale = 'vi'` |
| `src/i18n/request.ts` | Load messages from `messages/[locale].json` |
| `messages/vi.json` | Vietnamese translations |
| `messages/en.json` | English translations |

**Translation keys structure:**
```json
{
  "nav": { "home", "about", "blog", "moments", "contact" },
  "home": { "greeting", "role", "intro", "viewBlog", "aboutMe", ... },
  "about": { "title", "bio", "experience", "skills", "education" },
  "blog": { "title", "subtitle", "readMore", "minRead", "search", ... },
  "moments": { "title", "subtitle" },
  "contact": { "title", "subtitle", "name", "email", "message", "send", ... },
  "footer": { "rights", "madeWith" },
  "common": { "loading", "error", "back" }
}
```

### Styling

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind base, custom utilities (`.gradient-text`, `.glass-card`, `.gradient-bg`) |
| `tailwind.config.ts` | Dark mode, custom fonts, animations |

**Custom CSS classes:**
- `.gradient-text` - Gradient text effect
- `.glass-card` - Glassmorphism card style
- `.gradient-bg` - Gradient background
- `.animate-float` - Floating animation
- `.animate-gradient` - Animated gradient

## Common Tasks

### Add new blog post

1. Create `content/blog/[slug].mdx`:
```mdx
---
title: Post Title
title_vi: Tiêu đề tiếng Việt
title_en: English Title
excerpt_vi: Mô tả ngắn
excerpt_en: Short description
date: 2024-01-20
tags:
  - Tag1
  - Tag2
---

# Content here...
```

2. Blog will auto-appear in listing

### Add moment/photo

1. Add image to `public/images/moments/`
2. Update data in `src/app/[locale]/moments/page.tsx` (sampleMoments array):
```typescript
{
  id: 'unique-id',
  image: '/images/moments/photo.jpg', // or Unsplash URL
  caption: {
    vi: 'Caption tiếng Việt',
    en: 'English caption',
  },
  date: '2024-01-20',
  location: 'Location Name',
  tags: ['travel', 'nature'], // Available: travel, work, food, nature, lifestyle, tech, team, culture
  likes: 0,
}
```

**Available tags with colors:**
| Tag | Icon | Color |
|-----|------|-------|
| travel | ✈️ | Blue |
| work | 💼 | Purple |
| food | 🍜 | Orange |
| nature | 🌿 | Green |
| lifestyle | ✨ | Pink |
| tech | 💻 | Cyan |
| team | 👥 | Amber |
| culture | 🏛️ | Red |

**Filter features:**
- Sort by: Newest / Oldest / Popular (by likes)
- Filter by Year
- Filter by Month
- Filter by Tags (multi-select)

### Add translation

1. Add key to both `messages/vi.json` and `messages/en.json`
2. Use in component: `const t = useTranslations('namespace')`
3. Access: `t('key')`

### Update personal info

| Info | File to edit |
|------|--------------|
| Name | `src/components/home/Hero.tsx` |
| Bio | `src/app/[locale]/about/page.tsx` |
| Experience | `src/app/[locale]/about/page.tsx` (experiences array) |
| Skills | `src/app/[locale]/about/page.tsx` (skills object) |
| Social links | `src/components/layout/Footer.tsx` (socialLinks array) |
| Tech stack | `src/components/home/TechStack.tsx` (technologies array) |

## Commands

```bash
npm run dev -- -p 3001   # Development server (port 3001)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
```

## Dependencies

**Runtime:**
- next, react, react-dom
- next-intl (i18n)
- next-themes (dark mode)
- framer-motion (animations)
- lucide-react (icons)
- gray-matter, reading-time (blog)
- clsx (classnames)

**Dev:**
- typescript, @types/*
- tailwindcss, postcss
- eslint, eslint-config-next

## Notes for AI Agents

1. **All pages are under `[locale]`** - Always include locale in paths
2. **Sample data is hardcoded** - Blog posts in pages use sample arrays, not MDX files yet
3. **Images use Unsplash URLs** - Replace with actual images in production
4. **Contact form is demo** - No actual backend, just simulates success
5. **Translations required** - Add both vi.json and en.json when adding new text
6. **Use `'use client'`** - Most components use client-side features (framer-motion, hooks)
