# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for a Software Engineering Manager: portfolio, tech blog (MDX), and Instagram-style photo gallery. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next-intl (VI/EN), and next-themes.

## Commands

```bash
npm run dev              # Development server (port 3000)
npm run dev -- -p 3001   # Development server on custom port
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
```

No test framework is configured.

## Architecture

### i18n Routing

All pages live under `src/app/[locale]/`. The middleware (`src/middleware.ts`) redirects `/` to `/vi`. Locales: `vi` (default), `en`. Translations live in `messages/vi.json` and `messages/en.json`. Use `useTranslations('namespace')` in components.

### Server/Client Component Split

Pages are **Server Components** that fetch data. Rendering with animations is done in **Client Components** (suffixed with `Client`). Example: `blog/page.tsx` (Server) fetches posts via `lib/mdx.ts`, passes them to `BlogListClient.tsx` (Client).

### Blog System

Blog posts are MDX files in `content/blog/` using **bilingual file convention**: `slug.vi.mdx` and `slug.en.mdx` (one file per language). Legacy single-file format (`slug.mdx` with `title_vi`/`title_en` frontmatter) is still supported as fallback.

**Frontmatter for bilingual files:**
```yaml
---
title: Post Title
excerpt: Short description
date: 2024-01-20
tags: [Tag1, Tag2]
thumbnail: https://images.unsplash.com/photo-xxx?w=800
---
```

**Data flow:** `content/blog/*.mdx` → `lib/mdx.ts` (parse) → Server Component (fetch) → Client Component (render)

New posts auto-appear in blog listing and homepage featured posts (top 3 by date).

### Moments (Photo Gallery)

Photos are hardcoded in `src/app/[locale]/moments/page.tsx` (`sampleMoments` array). Add images to `public/images/moments/` or use Unsplash URLs. Each moment has bilingual captions (`{ vi: '...', en: '...' }`).

## Important Conventions

- **Always provide both vi and en** when adding translations or blog posts
- **Contact form is demo-only** — no backend, simulates success
- **Images** — use Unsplash URLs for illustrations; avoid ASCII art and Mermaid diagrams in blog posts (use Unsplash images + numbered text descriptions for sequences instead)

---

## Blog Writing Style Guide

**QUAN TRỌNG:** Khi viết blog cho project này, luôn tuân theo phong cách **Storytelling Technical** — không viết kiểu tutorial khô khan.

### Nguyên tắc cốt lõi

1. **Technical content là trọng tâm** — Người đọc phải học được kiến thức kỹ thuật thực sự
2. **Storytelling là cách dẫn dắt** — Giải thích kỹ thuật như kể một câu chuyện hấp dẫn
3. **Bilingual** — Mỗi bài viết cần 2 file: `slug.vi.mdx` và `slug.en.mdx`

### Kỹ thuật Storytelling

1. **Mở đầu bằng bối cảnh thực tế** — không bắt đầu bằng định nghĩa khô khan
2. **Dùng analogy để giải thích kỹ thuật** — ví dụ so sánh TCP handshake với việc gọi điện
3. **Xây dựng suspense trước khi reveal** — tạo mystery, rồi mới reveal root cause
4. **Đặt câu hỏi để tạo tò mò**
5. **Kết nối kỹ thuật với trải nghiệm thực**

### Cấu trúc bài viết

**Bố cục phải mượt như một dòng chảy, không lan man.** Trước khi viết, xác định rõ câu hỏi chính và các tuyến truyện.

**Nguyên tắc sắp xếp:**
- Hoàn thành một tuyến trước khi sang tuyến khác
- Mỗi section dẫn tự nhiên đến section tiếp theo
- Gom "how it works" liền mạch, gom "why" liền mạch — không nhảy qua nhảy lại
- KHÔNG dùng "Phần I, Phần II" — dùng tiêu đề tự nhiên, mô tả nội dung

**Cấu trúc cho bài debugging/problem-solving:**
Hook → Manh mối (mystery) → Kiến thức nền (analogy) → Root cause (climax) → Solution → Lessons → Kết

**Cấu trúc cho bài giải thích concept/technology:**
Hook → Bức tranh lớn → How it works → Why it matters → Implications → Kết

### Quy tắc ngôn ngữ

- Ngôn ngữ vui nhộn, gần gũi nhưng lịch sự (ví dụ: "ngây thơ", "bùm", "chốt hạ")
- KHÔNG dùng từ ngữ thô tục hoặc giọng văn quá formal
- Câu ngắn, dễ đọc. Emoji tiết chế (chỉ ở kết bài nếu cần)

### Diagram và Code blocks

- **KHÔNG dùng:** ASCII art phức tạp, Mermaid.ink, table để vẽ sequence
- **NÊN dùng:** Unsplash images + mô tả bằng lời với numbered steps, table cho so sánh
- Code blocks phải có context trước và giải thích sau

### Checklist trước khi publish

- [ ] Hook hấp dẫn ở đầu bài?
- [ ] Kiến thức kỹ thuật giải thích qua analogy?
- [ ] Suspense/mystery trước khi reveal?
- [ ] Code có context và giải thích?
- [ ] Ngôn ngữ vui nhộn nhưng lịch sự?
- [ ] Diagram dùng Unsplash + mô tả bằng lời?
- [ ] Có cả 2 file .vi.mdx và .en.mdx?
