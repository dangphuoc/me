# Content Guide - Hướng dẫn thêm nội dung

## Mục lục
- [Thêm Blog Post](#thêm-blog-post)
- [Thêm Moment](#thêm-moment)
- [Tags có sẵn](#tags-có-sẵn)

---

## Thêm Blog Post

Blog sử dụng **MDX files** trong thư mục `content/blog/`. Mỗi file `.mdx` là một bài viết.

### Bước 1: Tạo file MDX mới

```bash
# Tạo file mới trong content/blog/
content/blog/ten-bai-viet.mdx
```

**Quy tắc đặt tên file:**
- Sử dụng chữ thường, không dấu
- Dùng dấu gạch ngang `-` thay khoảng trắng
- Tên file sẽ trở thành URL slug: `ten-bai-viet` → `/blog/ten-bai-viet`

### Bước 2: Thêm Frontmatter

Mỗi file MDX cần có phần frontmatter ở đầu file:

```mdx
---
title: Tiêu đề mặc định
title_vi: Tiêu đề tiếng Việt
title_en: English Title
excerpt_vi: Mô tả ngắn bằng tiếng Việt (1-2 câu). Hiển thị trong danh sách blog.
excerpt_en: Short description in English (1-2 sentences). Shown in blog listing.
date: 2024-01-20
tags:
  - Tag1
  - Tag2
  - Tag3
thumbnail: https://images.unsplash.com/photo-xxxxx?w=800
---

# Nội dung bài viết bắt đầu từ đây
```

### Bước 3: Viết nội dung

Sau phần frontmatter, viết nội dung bằng Markdown:

```mdx
---
title: API Contract with OpenAPI
title_vi: API Contract - Khi code biết nói chuyện
title_en: API Contract - When Code Learns to Communicate
excerpt_vi: Câu chuyện về những API "câm lặng" và hành trình tìm lại tiếng nói.
excerpt_en: The story of "silent" APIs and the journey to find their voice.
date: 2024-01-15
tags:
  - OpenAPI
  - API Design
  - Microservices
thumbnail: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800
---

# Tiêu đề chính

## Section 1

Nội dung paragraph...

### Subsection 1.1

- Bullet point 1
- Bullet point 2

## Section 2

> Đây là blockquote

### Code block

```java
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

### Bảng

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |

### Hình ảnh

![Alt text](https://images.unsplash.com/photo-xxxxx?w=800)
```

### Bước 4: Kiểm tra

```bash
# Chạy dev server
npm run dev

# Mở browser: http://localhost:3000/vi/blog/ten-bai-viet
```

### Bước 5: Build và deploy

```bash
# Build production
npm run build

# Commit và push
git add .
git commit -m "Add blog: ten-bai-viet"
git push
```

---

## Cấu trúc Frontmatter chi tiết

| Field | Bắt buộc | Mô tả |
|-------|----------|-------|
| `title` | ✅ | Tiêu đề mặc định (fallback) |
| `title_vi` | ✅ | Tiêu đề tiếng Việt |
| `title_en` | ✅ | Tiêu đề tiếng Anh |
| `excerpt_vi` | ✅ | Mô tả ngắn tiếng Việt |
| `excerpt_en` | ✅ | Mô tả ngắn tiếng Anh |
| `date` | ✅ | Ngày đăng (YYYY-MM-DD) |
| `tags` | ✅ | Danh sách tags (array) |
| `thumbnail` | ❌ | URL ảnh thumbnail |

---

## Tips viết blog

### 1. Tránh ASCII diagrams phức tạp

**Không nên:**
```
┌─────────────┐
│   Box 1     │──────►┌─────────────┐
└─────────────┘       │   Box 2     │
                      └─────────────┘
```

**Nên dùng table thay thế:**
```markdown
| Từ | Hành động | Đến |
|----|-----------|-----|
| Box 1 | Connect | Box 2 |
```

### 2. Sử dụng heading hierarchy

```markdown
# H1 - Tiêu đề chính (chỉ 1 cái ở đầu)
## H2 - Section chính
### H3 - Subsection
#### H4 - Chi tiết (ít dùng)
```

### 3. Code blocks với syntax highlighting

Hỗ trợ nhiều ngôn ngữ: `java`, `typescript`, `python`, `yaml`, `json`, `bash`, `sql`...

```markdown
```java
// Code Java ở đây
```
```

### 4. Hình ảnh từ Unsplash

Unsplash cung cấp ảnh miễn phí, chất lượng cao:
- Vào https://unsplash.com
- Tìm ảnh phù hợp
- Copy URL và thêm `?w=800` để optimize

```markdown
![Description](https://images.unsplash.com/photo-xxxxx?w=800)
```

---

## Tags phổ biến cho Blog

### Technical
- `Architecture`, `Microservices`, `Backend`
- `API Design`, `OpenAPI`, `REST`
- `Reactive`, `Non-Blocking`, `Event Loop`
- `Java`, `Vert.x`, `Spring`

### Leadership
- `Leadership`, `Management`, `Team Building`
- `Career`, `Interview`, `Mentoring`

### DevOps
- `DevOps`, `Kubernetes`, `CI/CD`, `Docker`

### Domain
- `Fintech`, `Payment`, `Security`
- `AI`, `LangChain`, `Machine Learning`

---

## Thêm Moment

### Bước 1: Chuẩn bị ảnh
- **Cách 1:** Upload ảnh lên `public/images/moments/` và dùng path `/images/moments/ten-anh.jpg`
- **Cách 2:** Dùng URL từ Unsplash hoặc hosting khác

### Bước 2: Mở file moments
```
src/app/[locale]/moments/page.tsx
```

### Bước 3: Tìm đến array `sampleMoments` (dòng ~20)

### Bước 4: Thêm object mới vào đầu array

```typescript
const sampleMoments = [
  // === THÊM MOMENT MỚI Ở ĐÂY ===
  {
    id: '13',                              // ID unique (tăng dần)
    image: '/images/moments/anh-moi.jpg',  // Hoặc URL từ Unsplash
    caption: {
      vi: 'Caption tiếng Việt',
      en: 'English caption',
    },
    date: '2024-01-20',                    // Ngày: YYYY-MM-DD
    location: 'Ho Chi Minh City',          // Địa điểm
    tags: ['travel', 'nature'],            // Tags (xem danh sách bên dưới)
    likes: 0,                              // Số like ban đầu
  },
  // === CÁC MOMENT CŨ BÊN DƯỚI ===
];
```

### Ví dụ thêm moment mới

**Dùng ảnh local:**
```typescript
{
  id: '13',
  image: '/images/moments/team-building-2024.jpg',
  caption: {
    vi: 'Team building đầu năm 2024 - Vui vẻ và gắn kết',
    en: 'Team building early 2024 - Fun and bonding',
  },
  date: '2024-01-20',
  location: 'Vung Tau, Vietnam',
  tags: ['work', 'team'],
  likes: 0,
},
```

**Dùng ảnh Unsplash:**
```typescript
{
  id: '14',
  image: 'https://images.unsplash.com/photo-xxxxx?w=800',
  caption: {
    vi: 'Cà phê sáng cuối tuần',
    en: 'Weekend morning coffee',
  },
  date: '2024-01-21',
  location: 'District 1, HCMC',
  tags: ['food', 'lifestyle'],
  likes: 0,
},
```

---

## Tags có sẵn

### Tags cho Moments

| Tag | Icon | Tiếng Việt | Màu |
|-----|------|------------|-----|
| `travel` | ✈️ | Du lịch | Blue |
| `work` | 💼 | Công việc | Purple |
| `food` | 🍜 | Ẩm thực | Orange |
| `nature` | 🌿 | Thiên nhiên | Green |
| `lifestyle` | ✨ | Lifestyle | Pink |
| `tech` | 💻 | Công nghệ | Cyan |
| `team` | 👥 | Team | Amber |
| `culture` | 🏛️ | Văn hóa | Red |

**Lưu ý:** Mỗi moment có thể có 1-3 tags.

---

## Cấu trúc thư mục

```
personal_page/
├── content/
│   └── blog/                    # ← MDX blog posts
│       ├── api-contract-openapi.mdx
│       ├── building-reactive-systems.mdx
│       └── non-blocking-io.mdx
├── public/
│   └── images/
│       └── moments/             # ← Ảnh moments
├── src/
│   ├── lib/
│   │   └── mdx.ts               # ← MDX utilities
│   └── app/
│       └── [locale]/
│           ├── blog/
│           │   ├── page.tsx     # Blog listing (server component)
│           │   └── [slug]/
│           │       └── page.tsx # Blog detail (server component)
│           └── moments/
│               └── page.tsx     # ← Sửa để thêm moment
```

---

## Blog System Architecture

```
                    ┌──────────────────┐
                    │  content/blog/   │
                    │   *.mdx files    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    lib/mdx.ts    │
                    │  getPostBySlug() │
                    │  getAllPosts()   │
                    └────────┬─────────┘
                             │
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
    │ blog/page   │   │ blog/[slug] │   │  Homepage   │
    │   (list)    │   │  (detail)   │   │ (featured)  │
    └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
           │                 │                 │
           ▼                 ▼                 ▼
    ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
    │BlogListClient│  │BlogPostClient│  │FeaturedPosts│
    │  (client)   │   │  (client)   │   │  (client)   │
    └─────────────┘   └─────────────┘   └─────────────┘
```

---

## Checklist sau khi thêm nội dung

### Blog Post
- [ ] Tạo file `.mdx` trong `content/blog/`
- [ ] Điền đủ frontmatter (title_vi, title_en, excerpt_vi, excerpt_en, date, tags)
- [ ] Format ngày đúng: `YYYY-MM-DD`
- [ ] Không dùng ASCII diagram phức tạp (dùng table thay thế)
- [ ] Chạy `npm run dev` để kiểm tra
- [ ] Chạy `npm run build` để verify
- [ ] Commit và push lên GitHub

### Moment
- [ ] ID unique
- [ ] Điền đủ cả tiếng Việt và tiếng Anh
- [ ] URL ảnh hợp lệ
- [ ] Format ngày đúng: `YYYY-MM-DD`
- [ ] Chạy `npm run dev` để kiểm tra

---

## Cần hỗ trợ?

Nếu gặp lỗi khi build, kiểm tra:
1. Frontmatter syntax đúng (dấu `---` ở đầu và cuối)
2. YAML indentation đúng (dùng 2 spaces)
3. Tags là array với dấu `-` ở đầu mỗi item
4. URL ảnh hợp lệ
5. Chạy `npm run build` để check lỗi chi tiết
