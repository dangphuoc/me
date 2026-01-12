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
 * Get all unique post slugs (without locale suffix)
 * Files: post.vi.mdx, post.en.mdx -> returns ['post']
 */
export function getPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));

    // Extract unique slugs from files like 'post.vi.mdx' or 'post.en.mdx'
    const slugs = new Set<string>();
    files.forEach((file) => {
      // Remove .mdx extension
      const nameWithoutExt = file.replace(/\.mdx$/, '');
      // Check if it has locale suffix (.vi or .en)
      const match = nameWithoutExt.match(/^(.+)\.(vi|en)$/);
      if (match) {
        slugs.add(match[1]); // Add slug without locale
      } else {
        slugs.add(nameWithoutExt); // Legacy: file without locale suffix
      }
    });

    return Array.from(slugs);
  } catch {
    return [];
  }
}

/**
 * Get post by slug and locale
 * Looks for: slug.locale.mdx first, then falls back to slug.mdx
 */
export function getPostBySlug(slug: string, locale: string = 'vi'): Post | null {
  try {
    // Try locale-specific file first: post.vi.mdx or post.en.mdx
    let fullPath = path.join(postsDirectory, `${slug}.${locale}.mdx`);

    // Fallback to legacy format: post.mdx
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // For locale-specific files, use title/excerpt directly
    // For legacy files, use title_${locale} fallback
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
