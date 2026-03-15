import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
  tags: string[];
  locale: string;
  thumbnail?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
  locale: string;
  thumbnail?: string;
}

/**
 * Get all unique post slugs
 *
 * Supports two structures:
 *   Folder: content/blog/post-slug/vi.mdx, en.mdx
 *   Flat:   content/blog/post-slug.vi.mdx (legacy)
 */
export function getPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const slugs = new Set<string>();
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Folder structure: post-slug/vi.mdx
        const dirPath = path.join(postsDirectory, entry.name);
        const files = fs.readdirSync(dirPath);
        if (files.some((f) => f.endsWith('.mdx'))) {
          slugs.add(entry.name);
        }
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        // Flat structure: post-slug.vi.mdx
        const nameWithoutExt = entry.name.replace(/\.mdx$/, '');
        const match = nameWithoutExt.match(/^(.+)\.(vi|en)$/);
        if (match) {
          slugs.add(match[1]);
        } else {
          slugs.add(nameWithoutExt);
        }
      }
    }

    return Array.from(slugs);
  } catch {
    return [];
  }
}

/**
 * Get post by slug and locale
 *
 * Resolution order:
 *   1. content/blog/slug/locale.mdx  (folder)
 *   2. content/blog/slug.locale.mdx  (flat)
 *   3. content/blog/slug.mdx         (legacy)
 */
export function getPostBySlug(slug: string, locale: string = 'vi'): Post | null {
  try {
    let fullPath = '';

    // 1. Folder structure: slug/vi.mdx
    const folderPath = path.join(postsDirectory, slug, `${locale}.mdx`);
    if (fs.existsSync(folderPath)) {
      fullPath = folderPath;
    }

    // 2. Flat structure: slug.vi.mdx
    if (!fullPath) {
      const flatPath = path.join(postsDirectory, `${slug}.${locale}.mdx`);
      if (fs.existsSync(flatPath)) {
        fullPath = flatPath;
      }
    }

    // 3. Legacy: slug.mdx
    if (!fullPath) {
      const legacyPath = path.join(postsDirectory, `${slug}.mdx`);
      if (fs.existsSync(legacyPath)) {
        fullPath = legacyPath;
      }
    }

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const title = data.title || data[`title_${locale}`] || slug;
    const excerpt = data.excerpt || data[`excerpt_${locale}`] || '';

    return {
      slug,
      title,
      date: data.date || new Date().toISOString(),
      excerpt,
      content,
      readingTime: readingTime(content).text,
      tags: data.tags || [],
      locale,
      thumbnail: data.thumbnail,
    };
  } catch {
    return null;
  }
}

/**
 * Get all posts for a specific locale
 */
export function getAllPosts(locale: string = 'vi'): PostMeta[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return posts;
}

/**
 * Get posts by tag for a specific locale
 */
export function getPostsByTag(tag: string, locale: string = 'vi'): PostMeta[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get all unique tags across all posts for a locale
 */
export function getAllTags(locale: string = 'vi'): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags);
}
