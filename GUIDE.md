# Content Guide - Hướng dẫn thêm nội dung

## Mục lục
- [Thêm Blog Post](#thêm-blog-post)
- [Thêm Moment](#thêm-moment)
- [Tags có sẵn](#tags-có-sẵn)

---

## Thêm Blog Post

### Bước 1: Mở file blog
```
src/app/[locale]/blog/page.tsx
```

### Bước 2: Tìm đến array `samplePosts` (dòng ~11)

### Bước 3: Thêm object mới vào đầu array

```typescript
const samplePosts = [
  // === THÊM BÀI MỚI Ở ĐÂY ===
  {
    slug: 'ten-bai-viet-khong-dau',        // URL slug (không dấu, dùng dấu gạch ngang)
    title: {
      vi: 'Tiêu đề tiếng Việt',
      en: 'English Title',
    },
    excerpt: {
      vi: 'Mô tả ngắn bằng tiếng Việt (1-2 câu)',
      en: 'Short description in English (1-2 sentences)',
    },
    date: '2024-01-20',                    // Ngày đăng: YYYY-MM-DD
    readTime: 8,                           // Thời gian đọc (phút)
    tags: ['Tag1', 'Tag2'],                // Danh sách tags
  },
  // === CÁC BÀI CŨ BÊN DƯỚI ===
  {
    slug: 'building-high-performance-teams',
    // ...
  },
];
```

### Ví dụ thêm bài viết mới

```typescript
{
  slug: 'ai-agent-trong-fintech',
  title: {
    vi: 'Ứng dụng AI Agent trong Fintech',
    en: 'Applying AI Agents in Fintech',
  },
  excerpt: {
    vi: 'Chia sẻ kinh nghiệm tích hợp AI Agent vào hệ thống thanh toán, từ chatbot đến fraud detection.',
    en: 'Sharing experience integrating AI Agents into payment systems, from chatbots to fraud detection.',
  },
  date: '2024-01-25',
  readTime: 10,
  tags: ['AI', 'Fintech', 'LangChain'],
},
```

### Tags phổ biến cho Blog
- `Leadership`, `Management`, `Team Building`
- `Architecture`, `Microservices`, `Backend`
- `AI`, `LangChain`, `Machine Learning`
- `Career`, `Interview`, `System Design`
- `DevOps`, `Kubernetes`, `CI/CD`
- `Fintech`, `Payment`, `Security`

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
  {
    id: '1',
    // ...
  },
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

## Upload ảnh local

### Bước 1: Đặt ảnh vào thư mục
```
public/images/moments/ten-anh.jpg
```

### Bước 2: Sử dụng trong code
```typescript
image: '/images/moments/ten-anh.jpg',
```

### Định dạng ảnh khuyến nghị
- **Format:** JPG hoặc WebP
- **Kích thước:** 800x800 hoặc 1200x800 pixels
- **Dung lượng:** < 500KB (nén ảnh trước khi upload)

---

## Checklist sau khi thêm nội dung

- [ ] Đảm bảo `id` hoặc `slug` là unique
- [ ] Điền đủ cả tiếng Việt và tiếng Anh
- [ ] Format ngày đúng: `YYYY-MM-DD`
- [ ] Chạy `npm run dev` để kiểm tra
- [ ] Commit và push lên GitHub để deploy

---

## Cấu trúc thư mục

```
personal_page/
├── public/
│   └── images/
│       └── moments/          # ← Đặt ảnh moments ở đây
│           ├── photo1.jpg
│           └── photo2.jpg
├── src/
│   └── app/
│       └── [locale]/
│           ├── blog/
│           │   └── page.tsx  # ← Sửa file này để thêm blog
│           └── moments/
│               └── page.tsx  # ← Sửa file này để thêm moment
```

---

## Cần hỗ trợ?

Nếu gặp lỗi khi build, kiểm tra:
1. Syntax JSON/TypeScript đúng (dấu phẩy, ngoặc)
2. ID/slug không trùng
3. URL ảnh hợp lệ
4. Chạy `npm run build` để check lỗi
