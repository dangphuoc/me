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
| Blog | MDX + gray-matter + reading-time |
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
│   │       ├── page.tsx               # Homepage (Server Component)
│   │       ├── about/page.tsx         # About page
│   │       ├── blog/
│   │       │   ├── page.tsx           # Blog listing (Server Component)
│   │       │   └── [slug]/page.tsx    # Blog post detail (Server Component)
│   │       ├── moments/page.tsx       # Photo gallery
│   │       ├── cv/page.tsx            # CV/Resume page
│   │       └── contact/page.tsx       # Contact form
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Navigation bar
│   │   │   ├── Footer.tsx             # Footer with social links
│   │   │   ├── ThemeToggle.tsx        # Dark/Light/System toggle
│   │   │   └── LanguageSwitcher.tsx   # VI/EN switcher
│   │   ├── home/
│   │   │   ├── Hero.tsx               # Hero section with animations
│   │   │   ├── TechStack.tsx          # Technology badges
│   │   │   └── FeaturedPosts.tsx      # Featured blog posts (Client Component)
│   │   └── blog/
│   │       ├── BlogPostClient.tsx     # Blog detail renderer (Client Component)
│   │       └── BlogListClient.tsx     # Blog listing renderer (Client Component)
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
│   └── blog/                          # MDX blog posts
│       ├── non-blocking-io.mdx
│       ├── building-reactive-systems.mdx
│       └── api-contract-openapi.mdx
│
├── public/images/
│   ├── profile/                       # Profile photos
│   └── moments/                       # Gallery images
│
├── next.config.mjs                    # Next.js + next-intl config
├── tailwind.config.ts                 # Tailwind config
└── package.json
```

## Blog System Architecture

Blog system sử dụng **Server Components** để load data và **Client Components** để render với animations.

### Data Flow

```
content/blog/*.mdx
       ↓
  lib/mdx.ts (getPostBySlug, getAllPosts)
       ↓
  Server Components (pages)
       ↓
  Client Components (rendering)
```

### Key Files

| File | Type | Purpose |
|------|------|---------|
| `lib/mdx.ts` | Utility | Đọc và parse MDX files từ `content/blog/` |
| `app/[locale]/blog/page.tsx` | Server | Fetch all posts, pass to BlogListClient |
| `app/[locale]/blog/[slug]/page.tsx` | Server | Fetch single post, pass to BlogPostClient |
| `components/blog/BlogListClient.tsx` | Client | Render blog listing với search/filter |
| `components/blog/BlogPostClient.tsx` | Client | Render blog content với markdown parsing |
| `components/home/FeaturedPosts.tsx` | Client | Render featured posts on homepage |

### MDX Utilities (`lib/mdx.ts`)

```typescript
// Get all post slugs
getPostSlugs(): string[]

// Get single post by slug and locale
getPostBySlug(slug: string, locale: string): Post | null

// Get all posts sorted by date (newest first)
getAllPosts(locale: string): PostMeta[]

// Get posts by tag
getPostsByTag(tag: string, locale: string): PostMeta[]

// Get all unique tags
getAllTags(locale: string): string[]
```

## Key Files Reference

### Routing & Layout

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root HTML, fonts (Inter, JetBrains Mono), base metadata |
| `src/app/[locale]/layout.tsx` | i18n provider, theme provider, Header/Footer wrapper |
| `src/middleware.ts` | Redirect `/` → `/vi`, handle locale routing |

### Pages

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/[locale]` | `src/app/[locale]/page.tsx` | Server | Homepage - fetches posts for FeaturedPosts |
| `/[locale]/about` | `src/app/[locale]/about/page.tsx` | Client | Bio, Experience timeline, Skills |
| `/[locale]/blog` | `src/app/[locale]/blog/page.tsx` | Server | Blog listing - fetches all posts |
| `/[locale]/blog/[slug]` | `src/app/[locale]/blog/[slug]/page.tsx` | Server | Blog detail - fetches single post |
| `/[locale]/cv` | `src/app/[locale]/cv/page.tsx` | Client | CV/Resume page |
| `/[locale]/moments` | `src/app/[locale]/moments/page.tsx` | Client | Photo gallery with lightbox |
| `/[locale]/contact` | `src/app/[locale]/contact/page.tsx` | Client | Contact form + social links |

### Components

| Component | File | Props |
|-----------|------|-------|
| Header | `src/components/layout/Header.tsx` | - |
| Footer | `src/components/layout/Footer.tsx` | - |
| ThemeToggle | `src/components/layout/ThemeToggle.tsx` | - |
| LanguageSwitcher | `src/components/layout/LanguageSwitcher.tsx` | - |
| Hero | `src/components/home/Hero.tsx` | - |
| TechStack | `src/components/home/TechStack.tsx` | - |
| FeaturedPosts | `src/components/home/FeaturedPosts.tsx` | `posts: Post[]` |
| BlogListClient | `src/components/blog/BlogListClient.tsx` | `posts: Post[], locale: string` |
| BlogPostClient | `src/components/blog/BlogPostClient.tsx` | `post: Post, locale: string, author?: string` |

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
  "home": { "greeting", "role", "intro", "viewBlog", "aboutMe", "featuredPosts", "viewAll" },
  "about": { "title", "bio", "experience", "skills", "education" },
  "blog": { "title", "subtitle", "readMore", "minRead", "search", "noResults", "share" },
  "moments": { "title", "subtitle" },
  "contact": { "title", "subtitle", "name", "email", "message", "send" },
  "footer": { "rights", "madeWith" },
  "common": { "loading", "error", "back" }
}
```

### Styling

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind base, custom utilities |
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
title: Post Title (fallback)
title_vi: Tiêu đề tiếng Việt
title_en: English Title
excerpt_vi: Mô tả ngắn bằng tiếng Việt
excerpt_en: Short description in English
date: 2024-01-20
tags:
  - Tag1
  - Tag2
  - Tag3
thumbnail: https://images.unsplash.com/photo-xxx?w=800
---

# Tiêu đề bài viết

Nội dung viết bằng Markdown...

## Heading 2

Paragraph text với **bold** và *italic*.

> Blockquote sẽ được render đẹp

### Code blocks

\`\`\`java
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
\`\`\`

### Tables

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

### Images

![Alt text](https://images.unsplash.com/photo-xxx?w=800)

### Lists

- Item 1
- Item 2
- Item 3

### Links

[Link text](https://example.com)
```

2. **Done!** Blog will auto-appear in:
   - Blog listing page (`/vi/blog`, `/en/blog`)
   - Homepage featured posts (if in top 3 by date)
   - Static paths generated at build time

### Supported Markdown Features

| Feature | Syntax | Rendered |
|---------|--------|----------|
| Headings | `# H1`, `## H2`, `### H3` | Styled headings with borders |
| Bold | `**text**` | Strong text |
| Italic | `*text*` | Emphasized text |
| Code inline | `` `code` `` | Highlighted code |
| Code block | ` ```lang ` | Syntax highlighted block |
| Blockquote | `> quote` | Styled quote card |
| Image | `![alt](url)` | Responsive image with caption |
| Link | `[text](url)` | Blue link |
| Table | `\| col \|` | Styled table |
| List | `- item` or `1. item` | Bullet/numbered list |
| HR | `---` | Divider line |

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
  tags: ['travel', 'nature'],
  likes: 0,
}
```

**Available tags:** travel, work, food, nature, lifestyle, tech, team, culture

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
npm run dev              # Development server (default port 3000)
npm run dev -- -p 3001   # Development server on port 3001
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
- gray-matter, reading-time (blog MDX parsing)
- clsx (classnames)

**Dev:**
- typescript, @types/*
- tailwindcss, postcss
- eslint, eslint-config-next

## Notes for AI Agents

1. **All pages are under `[locale]`** - Always include locale in paths
2. **Blog uses MDX files** - Content stored in `content/blog/*.mdx`, loaded via `lib/mdx.ts`
3. **Server/Client separation** - Pages are Server Components, rendering is Client Components
4. **Images use Unsplash URLs** - Replace with actual images in production
5. **Contact form is demo** - No actual backend, just simulates success
6. **Translations required** - Add both vi.json and en.json when adding new text
7. **Bilingual blog posts** - Use `title_vi`/`title_en` and `excerpt_vi`/`excerpt_en` in frontmatter

## Current Blog Posts

| Slug | Title (VI) | Tags |
|------|------------|------|
| `non-blocking-io` | Non-Blocking I/O - Nghệ thuật không chờ đợi | Non-Blocking, Event Loop, Concurrency |
| `building-reactive-systems` | Xây dựng Reactive Systems - Từ Manifesto đến Thực tiễn | Reactive, Architecture, Resilience |
| `api-contract-openapi` | API Contract - Khi code biết nói chuyện | OpenAPI, Vert.x, API Design, Microservices |
| `connection-was-closed` | Connection Was Closed - Khi một dòng code phá vỡ cả hệ thống | HTTP, Connection Pool, Keep-Alive, Debugging |

---

## Blog Writing Style Guide

**QUAN TRỌNG:** Khi viết blog cho project này, luôn tuân theo phong cách **Storytelling Technical** - không viết kiểu tutorial khô khan.

### Nguyên tắc cốt lõi

1. **Technical content là trọng tâm** - Người đọc phải học được kiến thức kỹ thuật thực sự
2. **Storytelling là cách dẫn dắt** - Giải thích kỹ thuật như kể một câu chuyện hấp dẫn
3. **Bilingual** - Mỗi bài viết cần 2 file: `slug.vi.mdx` và `slug.en.mdx`

### Kỹ thuật Storytelling

#### 1. Mở đầu bằng bối cảnh thực tế
```markdown
# KHÔNG NÊN (khô khan)
HTTP Keep-Alive là một tính năng của HTTP/1.1 cho phép...

# NÊN (storytelling)
Sáu giờ tối ngày 24 tháng 12. Thay vì chuẩn bị tiệc Giáng sinh,
team chúng tôi đang nhìn chằm chằm vào màn hình monitoring...
```

#### 2. Dùng analogy để giải thích kỹ thuật
```markdown
# KHÔNG NÊN
TCP handshake gồm 3 bước: SYN, SYN-ACK, ACK...

# NÊN
Hãy tưởng tượng bạn gọi điện cho ai đó. Trước khi nói chuyện,
bạn phải chờ họ nhấc máy, nói "Alô", rồi bạn đáp lại.
Đó là **bắt tay** - TCP connection cũng hoạt động như vậy...
```

#### 3. Xây dựng suspense trước khi reveal
```markdown
# KHÔNG NÊN
Lỗi do response.close() gây ra.

# NÊN
Câu hỏi này ám ảnh tôi. Tại sao UAT không phát hiện?
**Thứ nhất, request đầu luôn thành công...**
**Thứ hai, traffic thấp giúp che giấu lỗi...**
[Xây dựng mystery, rồi mới reveal root cause]
```

#### 4. Đặt câu hỏi để tạo tò mò
```markdown
Điều gì xảy ra nếu ai đó lén đập vỡ cái bát rồi cất lại tủ?
Người tiếp theo lấy ra... bùm.
```

#### 5. Kết nối kỹ thuật với trải nghiệm thực
```markdown
Anh Hiếu diễn đạt chính xác: "Request A xử lý xong rồi close.
Client ngây thơ không biết mình bị 'đá'..."
```

### Cấu trúc bài viết

1. **Hook** - Bối cảnh hấp dẫn (vấn đề thực tế)
2. **Manh mối** - Xây dựng mystery
3. **Kiến thức nền** - Giải thích kỹ thuật qua analogy
4. **Root cause** - Reveal vấn đề (climax)
5. **Solution** - Code fix + giải thích
6. **Lessons** - Bài học rút ra
7. **Kết** - Wrap up câu chuyện

### Quy tắc ngôn ngữ

**KHÔNG dùng:**
- Từ ngữ thô tục, slang quá mức (méo, vl, dm...)
- Giọng văn quá formal như documentation

**NÊN dùng:**
- Ngôn ngữ vui nhộn, gần gũi nhưng lịch sự
- Ví dụ: "ngây thơ", "bùm", "ầy gù", "chốt hạ"
- Câu ngắn, dễ đọc
- Emoji tiết chế (chỉ ở kết bài nếu cần)

### Diagram và hình ảnh

**KHÔNG dùng:**
- ASCII art phức tạp (dễ vỡ khi render)
- Table để vẽ sequence (xấu)
- Mermaid.ink (trông lạc quẻ với tổng thể bài viết)

**NÊN dùng:**
- **Unsplash images** cho illustration
- **Mô tả bằng lời** với numbered steps cho sequence/flow
- Table cho so sánh, liệt kê

**Ví dụ mô tả sequence:**
```markdown
![Network Connection](https://images.unsplash.com/photo-xxx?w=800)

**Request 1** - Mọi thứ suôn sẻ:
1. Client lấy connection từ pool
2. Gửi request đến server
3. Server xử lý, trả response
4. Server gọi `response.close()` → **âm thầm đóng TCP connection**

**Request 2** - Thảm họa:
1. Client lấy đúng connection đó ra
2. Cố gửi data qua đường dây đã chết
3. **Bùm** - "Connection was closed"
```

### Code blocks

```markdown
# Có context trước code
Developer viết code đó có lẽ nghĩ: "Xong việc thì dọn dẹp cho sạch".
Logic có vẻ đúng. Nhưng...

```java
response.end(result);
response.close();  // ← THỦ PHẠM!
```

# Giải thích sau code
Với HTTP Keep-Alive, `end()` đã là "dọn dẹp" rồi.
Gọi thêm `close()` là **phá hoại**.
```

### Checklist trước khi publish

- [ ] Có hook hấp dẫn ở đầu bài?
- [ ] Kiến thức kỹ thuật được giải thích qua analogy?
- [ ] Có suspense/mystery trước khi reveal?
- [ ] Code có context và giải thích?
- [ ] Ngôn ngữ vui nhộn nhưng lịch sự?
- [ ] Diagram/sequence dùng Unsplash image + mô tả bằng lời (không ASCII, không Mermaid)?
- [ ] Có cả 2 file .vi.mdx và .en.mdx?
